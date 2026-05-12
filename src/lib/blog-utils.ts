export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
}

export function stripHtml(html: string): string {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, " ")
  const div = document.createElement("div")
  div.innerHTML = html
  return div.textContent || div.innerText || ""
}

export function wordCount(html: string): number {
  const text = stripHtml(html).trim()
  if (!text) return 0
  return text.split(/\s+/).length
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200))
}

export function keywordDensity(html: string, keyword: string): number {
  if (!keyword) return 0
  const text = stripHtml(html).toLowerCase()
  const words = text.split(/\s+/).filter(Boolean)
  if (!words.length) return 0
  const k = keyword.toLowerCase()
  const matches = (text.match(new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")) || []).length
  return +((matches / words.length) * 100).toFixed(2)
}
