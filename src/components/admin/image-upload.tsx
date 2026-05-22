import { useState } from "react"
import { Upload, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { convertImageToWebp } from "@/lib/image-to-webp"
import { toast } from "sonner"

export function ImageUpload({
  value,
  onChange,
  bucket = "site-media",
  folder = "uploads",
}: {
  value?: string | null
  onChange: (url: string | null) => void
  bucket?: string
  folder?: string
}) {
  const [uploading, setUploading] = useState(false)

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const original = e.target.files?.[0]
    if (!original) return
    setUploading(true)
    try {
      const file = await convertImageToWebp(original)
      const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: false, contentType: file.type })
      if (error) {
        toast.error(error.message)
        return
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      onChange(data.publicUrl)
      toast.success("Image uploaded")
    } catch (err: any) {
      toast.error(err?.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-start gap-3">
      {value ? (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border bg-gray-50">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange(null)} className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <label className="w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 text-xs text-muted-foreground">
          <Upload className="w-5 h-5 mb-1" />
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={uploading} />
        </label>
      )}
      <div className="flex-1">
        <input
          type="url"
          placeholder="…or paste image URL"
          value={value || ""}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
        />
      </div>
    </div>
  )
}
