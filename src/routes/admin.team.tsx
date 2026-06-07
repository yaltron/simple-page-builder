import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/team")({
  component: AdminDoctorsPage,
})

type Doc = {
  id?: string
  name: string
  title: string
  bio: string
  image: string | null
  specialties: string[]
  qualifications: string
  experience_years: number | null
  display_order: number
  status: string
}

const empty: Doc = { name: "", title: "", bio: "", image: null, specialties: [], qualifications: "", experience_years: null, display_order: 0, status: "published" }

function AdminDoctorsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Doc | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("doctors").select("*").order("display_order")
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    const { error } = editing.id
      ? await supabase.from("doctors").update(editing).eq("id", editing.id)
      : await supabase.from("doctors").insert(editing)
    if (error) return toast.error(error.message)
    toast.success("Saved"); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this doctor?")) return
    const { error } = await supabase.from("doctors").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Doctors" breadcrumb="Admin / Doctors">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} doctors</h2>
        <button onClick={() => setEditing({ ...empty })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Doctor
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((d) => (
          <div key={d.id} className="bg-white rounded-xl border overflow-hidden">
            <div className="aspect-[4/3] bg-gray-100">
              {d.image && <img src={d.image} alt={d.name} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <div className="font-bold">{d.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{d.title}</div>
              <div className="text-xs"><span className="px-2 py-0.5 rounded-full" style={{ background: d.status === "published" ? "#D1FADF" : "#FEF3C7", color: d.status === "published" ? "#027A48" : "#92400E" }}>{d.status}</span></div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => setEditing(d)} className="flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
                <button onClick={() => remove(d.id)} className="px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No doctors yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Doctor</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Photo"><ImageUpload value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} folder="doctors" /></Field>
              <Field label="Name"><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Title / Specialty"><input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Qualifications"><input value={editing.qualifications || ""} onChange={(e) => setEditing({ ...editing, qualifications: e.target.value })} placeholder="MD, DGO, Fellowship in IVF" className="w-full px-3 py-2 border rounded-lg" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Years of experience"><input type="number" value={editing.experience_years || ""} onChange={(e) => setEditing({ ...editing, experience_years: e.target.value ? Number(e.target.value) : null })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Display order"><input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              </div>
              <Field label="Bio"><textarea rows={4} value={editing.bio || ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Specialties (comma separated)">
                <input
                  value={(editing.specialties || []).join(", ")}
                  onChange={(e) => setEditing({ ...editing, specialties: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </Field>
              <Field label="Status">
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="published">Published</option><option value="draft">Draft</option>
                </select>
              </Field>
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
