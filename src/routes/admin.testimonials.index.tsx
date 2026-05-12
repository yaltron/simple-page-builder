import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, Star } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/testimonials/")({
  component: AdminTestimonialsPage,
})

type T = {
  id?: string
  name: string
  location: string
  story: string
  image: string | null
  video_url: string
  rating: number
  treatment: string
  display_order: number
  status: string
}

const empty: T = { name: "", location: "", story: "", image: null, video_url: "", rating: 5, treatment: "", display_order: 0, status: "published" }

function AdminTestimonialsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<T | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("testimonials").select("*").order("display_order")
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    const { error } = editing.id
      ? await supabase.from("testimonials").update(editing).eq("id", editing.id)
      : await supabase.from("testimonials").insert(editing)
    if (error) return toast.error(error.message)
    toast.success("Saved"); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return
    const { error } = await supabase.from("testimonials").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Testimonials" breadcrumb="Admin / Testimonials">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} testimonials</h2>
        <button onClick={() => setEditing({ ...empty })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Testimonial
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                {t.image && <img src={t.image} alt={t.name} className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0">
                <div className="font-bold truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground truncate">{t.location}</div>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">{Array.from({ length: t.rating || 0 }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />)}</div>
            <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{t.story}</p>
            <div className="flex gap-2">
              <button onClick={() => setEditing(t)} className="flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => remove(t.id)} className="px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No testimonials yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Testimonial</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Photo"><ImageUpload value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} folder="testimonials" /></Field>
              <Field label="Name"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Location"><input value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Treatment"><input value={editing.treatment || ""} onChange={(e) => setEditing({ ...editing, treatment: e.target.value })} placeholder="IVF, ICSI…" className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Story"><textarea rows={5} value={editing.story || ""} onChange={(e) => setEditing({ ...editing, story: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Video URL (optional)"><input value={editing.video_url || ""} onChange={(e) => setEditing({ ...editing, video_url: e.target.value })} placeholder="https://www.youtube.com/embed/…" className="w-full px-3 py-2 border rounded-lg" /></Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Rating">
                  <select value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </Field>
                <Field label="Order"><input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Status">
                  <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option value="published">Pub</option><option value="draft">Draft</option>
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
