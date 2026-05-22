// Client-side image → WebP converter.
// Decodes the file in the browser, optionally downscales very large
// dimensions, and re-encodes as WebP. Returns a new File with .webp ext.
//
// Why: WebP is ~25-35% smaller than JPEG/PNG at equivalent quality, so
// pages load faster and we can accept much larger source uploads without
// blowing past storage / bandwidth budgets.

export type ConvertOptions = {
  quality?: number // 0..1, default 0.85
  maxDimension?: number // longest edge in px, default 2400
}

export async function convertImageToWebp(
  file: File,
  opts: ConvertOptions = {}
): Promise<File> {
  const { quality = 0.85, maxDimension = 2400 } = opts

  // Pass-through for non-images and SVG (vector → don't rasterize)
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return file
  }
  // Already webp + reasonable size → skip work
  if (file.type === "image/webp") return file

  const bitmap = await loadBitmap(file)
  const { width, height } = fitWithin(bitmap.width, bitmap.height, maxDimension)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    if ("close" in bitmap) (bitmap as ImageBitmap).close();
    return file
  }
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, width, height);
  if ("close" in bitmap) (bitmap as ImageBitmap).close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality)
  )

  if (!blob) return file

  const baseName = file.name.replace(/\.[^.]+$/, "")
  return new File([blob], `${baseName}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  })
}

async function loadBitmap(
  file: File
): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file)
    } catch {
      // fall through to <img> path
    }
  }
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(e)
    }
    img.src = url
  })
}

function fitWithin(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h }
  const ratio = w > h ? max / w : max / h
  return { width: Math.round(w * ratio), height: Math.round(h * ratio) }
}
