import { useEffect, useMemo, useState } from "react"
import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router"
import { ChevronLeft, Upload, X, CheckCircle2, XCircle } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { supabase } from "@/integrations/supabase/client"
import { slugify, stripHtml, keywordDensity } from "@/lib/blog-utils"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/blog/$id")({
  component: BlogEditorPage,
})

const CATEGORIES = ["IVF", "ICSI", "Fertility Tips", "Patient Stories", "News", "General"]
const PROJECT_URL = "https://shubhashreeivf.com"

function BlogEditorPage() {
  const { id } = useParams({ from: "/admin/blog/$id" })
  const isNew = id === "new"
  const { loading, isAdmin } = useAdminAuth()
  const navigate = useNavigate()
  const [loadingPost, setLoadingPost] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    featured_image: "", featured_image_alt: "",
    author: "", category: "General", tags: [] as string[],
    focus_keyword: "", secondary_keywords: [] as string[],
    meta_title: "", meta_description: "",
    word_count: 0, reading_time: 0,
    status: "draft" as "draft" | "published",
    published_at: null as string | null,
  })
  const [chars, setChars] = useState(0)
  const [tagInput, setTagInput] = useState("")
  const [secInput, setSecInput] = useState("")
  const [slugTouched, setSlugTouched] = useState(false)

  useEffect(() => {
    if (isNew || !isAdmin) return
    ;(async () => {
      const { data, error } = await supabase.from("blogs").select("*").eq("id", id).maybeSingle()
      if (error || !data) { toast.error("Post not found"); navigate({ to: "/admin/blog" }); return }
      setForm({
        title: data.title, slug: data.slug, excerpt: data.excerpt || "", content: data.content || "",
        featured_image: data.featured_image || "", featured_image_alt: data.featured_image_alt || "",
        author: data.author || "", category: data.category || "General", tags: data.tags || [],
        focus_keyword: data.focus_keyword || "", secondary_keywords: data.secondary_keywords || [],
        meta_title: data.meta_title || "", meta_description: data.meta_description || "",
        word_count: data.word_count || 0, reading_time: data.reading_time || 0,
        status: (data.status as any) || "draft",
        published_at: data.published_at,
      })
      setSlugTouched(true)
      setLoadingPost(false)
    })()
  }, [id, isNew, isAdmin])

  // Auto-slug
  useEffect(() => {
    if (!slugTouched && form.title) setForm((f) => ({ ...f, slug: slugify(form.title) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title])

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }))

  const onContent = (html: string, words: number, c: number) => {
    setChars(c)
    setForm((f) => ({ ...f, content: html, word_count: words, reading_time: Math.max(1, Math.round(words / 200)) }))
  }

  const uploadFeatured = async (original: File) => {
    const { convertImageToWebp } = await import("@/lib/image-to-webp")
    const file = await convertImageToWebp(original)
    const ext = file.name.split(".").pop()
    const path = `featured/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type })
    if (error) return toast.error(error.message)
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path)
    update({ featured_image: data.publicUrl })
    toast.success("Image uploaded")
  }

  const save = async (status?: "draft" | "published") => {
    if (!form.title.trim()) return toast.error("Title is required")
    if (!form.slug.trim()) return toast.error("Slug is required")
    setSaving(true)
    const payload = { ...form, status: status ?? form.status }
    if (isNew) {
      const { data, error } = await supabase.from("blogs").insert(payload).select("id").single()
      setSaving(false)
      if (error) return toast.error(error.message)
      toast.success(status === "published" ? "Published!" : "Draft saved")
      navigate({ to: "/admin/blog/$id", params: { id: data.id } })
    } else {
      const { error } = await supabase.from("blogs").update(payload).eq("id", id)
      setSaving(false)
      if (error) return toast.error(error.message)
      update({ status: payload.status })
      toast.success(status === "published" ? "Published!" : "Saved")
    }
  }

  const checks = useMemo(() => {
    const text = stripHtml(form.content).toLowerCase()
    const k = form.focus_keyword.toLowerCase().trim()
    const firstP = (form.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "").toLowerCase()
    return {
      kInTitle: !!k && form.title.toLowerCase().includes(k),
      kInMeta: !!k && form.meta_description.toLowerCase().includes(k),
      kInFirst: !!k && stripHtml(firstP).includes(k),
      kInSlug: !!k && form.slug.includes(k.replace(/\s+/g, "-")),
      titleLen: form.meta_title.length >= 50 && form.meta_title.length <= 60,
      descLen: form.meta_description.length > 0 && form.meta_description.length <= 160,
      altText: !!form.featured_image_alt && !!form.featured_image,
      wordCount: form.word_count >= 300,
      hasH2: /<h2[\s>]/i.test(form.content),
    }
  }, [form])

  const density = keywordDensity(form.content, form.focus_keyword)
  const readability = form.word_count > 0 ? (() => {
    const sentences = stripHtml(form.content).split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1
    const avg = form.word_count / sentences
    return avg < 14 ? "Easy" : avg < 22 ? "Medium" : "Hard"
  })() : "-"

  if (loading || !isAdmin || loadingPost) return <AdminLoading />

  const colorFor = (count: number, min: number, max: number) =>
    count >= min && count <= max ? "#027A48" : count > max ? "#B42318" : "#92400E"

  return (
    <AdminShell title={isNew ? "New Post" : "Edit Post"} breadcrumb="Admin / Blog / Editor">
      <div className="mb-4">
        <Link to="/admin/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-pink-600">
          <ChevronLeft className="w-4 h-4" /> Back to posts
        </Link>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* LEFT 60% */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border p-5 space-y-3">
            <input value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="Post title"
              className="w-full text-2xl font-bold outline-none border-b py-2" />
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{PROJECT_URL}/blog/</span>
              <input value={form.slug} onChange={(e) => { setSlugTouched(true); update({ slug: slugify(e.target.value) }) }}
                className="flex-1 px-2 py-1 border rounded font-mono text-xs" />
            </div>
          </div>

          <TiptapEditor value={form.content} onChange={onContent} />
        </div>

        {/* RIGHT 40% */}
        <div className="lg:col-span-2 space-y-4">
          {/* Publish */}
          <div className="bg-white rounded-xl border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Status</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: form.status === "published" ? "#D1FADF" : "#FEF3C7", color: form.status === "published" ? "#027A48" : "#92400E" }}>{form.status}</span>
            </div>
            {form.published_at && (
              <div className="text-xs text-muted-foreground">Published: {new Date(form.published_at).toLocaleString()}</div>
            )}
            <div className="flex gap-2">
              <button disabled={saving} onClick={() => save("draft")} className="flex-1 py-2 rounded-lg border font-semibold text-sm">Save Draft</button>
              <button disabled={saving} onClick={() => save("published")} className="flex-1 py-2 rounded-lg text-white font-semibold text-sm" style={{ background: "#E6007E" }}>Publish</button>
            </div>
            {!isNew && form.status === "published" && (
              <Link to="/blog/$slug" params={{ slug: form.slug }} target="_blank" className="block text-center text-xs font-semibold py-1.5" style={{ color: "#E6007E" }}>Preview live →</Link>
            )}
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-xl border p-5 space-y-3">
            <div className="text-sm font-semibold">Featured Image</div>
            {form.featured_image ? (
              <div className="relative">
                <img src={form.featured_image} alt="" className="w-full rounded-lg" />
                <button onClick={() => update({ featured_image: "", featured_image_alt: "" })} className="absolute top-2 right-2 bg-white/90 rounded-full p-1"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-pink-400">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Click to upload</span>
                <input hidden type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFeatured(f) }} />
              </label>
            )}
            <input value={form.featured_image_alt} onChange={(e) => update({ featured_image_alt: e.target.value })} placeholder="Alt text" className="w-full px-3 py-2 border rounded-lg text-sm" />
          </div>

          {/* SEO */}
          <details className="bg-white rounded-xl border p-5" open>
            <summary className="text-sm font-semibold cursor-pointer">SEO & Meta</summary>
            <div className="mt-3 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label>Meta Title</label>
                  <span style={{ color: colorFor(form.meta_title.length, 50, 60) }}>{form.meta_title.length}/60</span>
                </div>
                <input value={form.meta_title} onChange={(e) => update({ meta_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label>Meta Description</label>
                  <span style={{ color: colorFor(form.meta_description.length, 1, 160) }}>{form.meta_description.length}/160</span>
                </div>
                <textarea value={form.meta_description} onChange={(e) => update({ meta_description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs block mb-1">Focus Keyword</label>
                <input value={form.focus_keyword} onChange={(e) => update({ focus_keyword: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs block mb-1">Secondary Keywords</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {form.secondary_keywords.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: "#FFE4EF", color: "#E6007E" }}>{t}
                      <button onClick={() => update({ secondary_keywords: form.secondary_keywords.filter((x) => x !== t) })}>×</button>
                    </span>
                  ))}
                </div>
                <input value={secInput} onChange={(e) => setSecInput(e.target.value)} onKeyDown={(e) => {
                  if (e.key === "Enter" && secInput.trim()) { e.preventDefault(); update({ secondary_keywords: [...form.secondary_keywords, secInput.trim()] }); setSecInput("") }
                }} placeholder="Type and press Enter" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>

              {/* Google preview */}
              <div className="border rounded-lg p-3 text-xs bg-gray-50">
                <div className="text-[#202124] text-xs mb-0.5">Shubhashree IVF</div>
                <div className="text-[#1a0dab] text-base leading-tight truncate">{form.meta_title || form.title || "Title preview"}</div>
                <div className="text-[#006621] text-xs">{PROJECT_URL}/blog/{form.slug || "slug"}</div>
                <div className="text-[#4d5156] text-xs mt-1 line-clamp-2">{form.meta_description || form.excerpt || "Description preview…"}</div>
              </div>
            </div>
          </details>

          {/* Post settings */}
          <details className="bg-white rounded-xl border p-5">
            <summary className="text-sm font-semibold cursor-pointer">Post Settings</summary>
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs block mb-1">Author</label>
                <input value={form.author} onChange={(e) => update({ author: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs block mb-1">Category</label>
                <select value={form.category} onChange={(e) => update({ category: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm bg-white">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs block mb-1">Tags</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {form.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100">{t}
                      <button onClick={() => update({ tags: form.tags.filter((x) => x !== t) })}>×</button>
                    </span>
                  ))}
                </div>
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) { e.preventDefault(); update({ tags: [...form.tags, tagInput.trim()] }); setTagInput("") }
                }} placeholder="Type and press Enter" className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><label>Excerpt</label><span>{form.excerpt.length}/300</span></div>
                <textarea value={form.excerpt} onChange={(e) => update({ excerpt: e.target.value.slice(0, 300) })} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm" />
              </div>
            </div>
          </details>

          {/* Analysis */}
          <details className="bg-white rounded-xl border p-5">
            <summary className="text-sm font-semibold cursor-pointer">Keyword Analysis</summary>
            <div className="mt-3 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded p-2"><div className="text-muted-foreground">Density</div><div className="font-bold text-sm">{density}%</div></div>
                <div className="bg-gray-50 rounded p-2"><div className="text-muted-foreground">Words</div><div className="font-bold text-sm">{form.word_count}</div></div>
                <div className="bg-gray-50 rounded p-2"><div className="text-muted-foreground">Read time</div><div className="font-bold text-sm">{form.reading_time} min</div></div>
                <div className="bg-gray-50 rounded p-2"><div className="text-muted-foreground">Readability</div><div className="font-bold text-sm">{readability}</div></div>
              </div>
              <ul className="space-y-1 mt-2">
                {[
                  ["Focus keyword in title", checks.kInTitle],
                  ["Focus keyword in meta description", checks.kInMeta],
                  ["Focus keyword in first paragraph", checks.kInFirst],
                  ["Focus keyword in slug", checks.kInSlug],
                  ["Meta title length (50-60)", checks.titleLen],
                  ["Meta description ≤ 160", checks.descLen],
                  ["Featured image has alt text", checks.altText],
                  ["At least 300 words", checks.wordCount],
                  ["Content has at least one H2", checks.hasH2],
                ].map(([label, ok]) => (
                  <li key={label as string} className="flex items-center gap-2">
                    {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <XCircle className="w-3.5 h-3.5 text-red-500" />}
                    <span>{label as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </AdminShell>
  )
}
