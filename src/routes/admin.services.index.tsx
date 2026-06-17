import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/services/")({
  component: AdminServicesPage,
})

type Svc = {
  id?: string
  title: string
  slug: string
  short_description: string
  description: string
  icon: string
  featured_image: string | null
  display_order: number
  status: string
  full_content: string | null
  page_heading: string | null
  page_subtext: string | null
  meta_title: string | null
  meta_description: string | null
  hero_image_url: string | null
  hero_image_alt: string | null
  key_points: string[]
}

const empty: Svc = {
  title: "", slug: "", short_description: "", description: "",
  icon: "Heart", featured_image: null, display_order: 0, status: "published",
  full_content: "", page_heading: "", page_subtext: "",
  meta_title: "", meta_description: "",
  hero_image_url: "", hero_image_alt: "", key_points: [],
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function AdminServicesPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Svc | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("services").select("*").order("display_order")
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    const slug = editing.slug || slugify(editing.title)
    const payload = { ...editing, slug, key_points: editing.key_points || [] }
    const { error } = editing.id
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Saved")
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return
    const { error } = await supabase.from("services").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  const updateKP = (i: number, v: string) => {
    if (!editing) return
    const next = [...(editing.key_points || [])]
    next[i] = v
    setEditing({ ...editing, key_points: next })
  }
  const addKP = () => editing && setEditing({ ...editing, key_points: [...(editing.key_points || []), ""] })
  const removeKP = (i: number) => editing && setEditing({ ...editing, key_points: (editing.key_points || []).filter((_, j) => j !== i) })
  const moveKP = (i: number, dir: -1 | 1) => {
    if (!editing) return
    const j = i + dir
    const arr = [...(editing.key_points || [])]
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    setEditing({ ...editing, key_points: arr })
  }

  return (
    <AdminShell title="Services" breadcrumb="Admin / Services">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} services</h2>
        <button onClick={() => setEditing({ ...empty })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Service
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">No services yet.</td></tr>}
            {items.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-muted-foreground">{s.display_order}</td>
                <td className="px-4 py-3 font-medium">{s.title}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{s.slug}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.status === "published" ? "#D1FADF" : "#FEF3C7", color: s.status === "published" ? "#027A48" : "#92400E" }}>{s.status}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing({ ...empty, ...s, key_points: s.key_points || [] })} className="p-1.5 hover:bg-pink-50 rounded"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(s.id)} className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Service</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Slug (URL)">
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
              </Field>
              <Field label="Icon name (lucide-react)">
                <input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Heart, Microscope, Dna…" className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Short description (cards)">
                <textarea rows={2} value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>

              <hr />
              <h3 className="font-bold text-sm">Service Page Content</h3>

              <Field label="Page heading (on /services/slug)">
                <input value={editing.page_heading || ""} onChange={(e) => setEditing({ ...editing, page_heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Page subtext">
                <textarea rows={3} value={editing.page_subtext || ""} onChange={(e) => setEditing({ ...editing, page_subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>

              <div>
                <div className="flex items-center mb-2">
                  <div className="text-xs font-semibold text-muted-foreground">Key points (What to Expect)</div>
                  <button onClick={addKP} className="ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Add point</button>
                </div>
                <div className="space-y-2">
                  {(editing.key_points || []).map((kp, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="flex flex-col">
                        <button onClick={() => moveKP(i, -1)} className="p-0.5 hover:bg-gray-100 rounded"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => moveKP(i, 1)} className="p-0.5 hover:bg-gray-100 rounded"><ArrowDown className="w-3 h-3" /></button>
                      </div>
                      <input value={kp} onChange={(e) => updateKP(i, e.target.value)} className="flex-1 px-3 py-2 border rounded-lg text-sm" />
                      <button onClick={() => removeKP(i)} className="p-1.5 hover:bg-red-50 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  {(editing.key_points || []).length === 0 && <div className="text-xs text-muted-foreground">No points yet.</div>}
                </div>
              </div>

              <Field label="Hero image (service page)">
                <ImageUpload value={editing.hero_image_url} onChange={(url) => setEditing({ ...editing, hero_image_url: url })} folder="services" />
              </Field>
              <Field label="Hero image alt text">
                <input value={editing.hero_image_alt || ""} onChange={(e) => setEditing({ ...editing, hero_image_alt: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>

              <Field label="Full content (rich text)">
                <TiptapEditor value={editing.full_content || ""} onChange={(html) => setEditing({ ...editing, full_content: html })} />
              </Field>

              <hr />
              <h3 className="font-bold text-sm">SEO</h3>
              <Field label="Meta title">
                <input value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Meta description">
                <textarea rows={2} value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>

              <hr />
              <Field label="Featured image (card thumbnail)">
                <ImageUpload value={editing.featured_image} onChange={(url) => setEditing({ ...editing, featured_image: url })} folder="services" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Display order"><input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Status">
                  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option value="published">Published</option><option value="draft">Draft</option>
                  </select>
                </Field>
              </div>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="text-xs font-semibold text-muted-foreground mb-1">{label}</div>{children}</label>
}
