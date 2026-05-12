import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
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
}

const empty: Svc = { title: "", slug: "", short_description: "", description: "", icon: "Heart", featured_image: null, display_order: 0, status: "published" }

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
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    const payload = { ...editing, slug }
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
              <th className="px-4 py-3">Icon</th>
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
                <td className="px-4 py-3 text-muted-foreground">{s.icon}</td>
                <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: s.status === "published" ? "#D1FADF" : "#FEF3C7", color: s.status === "published" ? "#027A48" : "#92400E" }}>{s.status}</span></td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setEditing(s)} className="p-1.5 hover:bg-pink-50 rounded"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(s.id)} className="p-1.5 hover:bg-red-50 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Service</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Slug (auto from title if blank)"><input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Icon name (lucide-react)"><input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Heart, Microscope, Dna…" className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Short description"><textarea rows={2} value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Long description"><textarea rows={4} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Featured image"><ImageUpload value={editing.featured_image} onChange={(url) => setEditing({ ...editing, featured_image: url })} folder="services" /></Field>
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
