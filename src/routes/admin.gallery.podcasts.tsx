import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { getYouTubeThumbnail } from "@/lib/youtube-id"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/gallery/podcasts")({
  component: AdminPodcastsPage,
})

type Podcast = {
  id?: string
  title: string
  description: string | null
  youtube_url: string
  order_index: number
  is_active: boolean
}

const empty: Podcast = { title: "", description: "", youtube_url: "", order_index: 0, is_active: true }

function AdminPodcastsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Podcast | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("podcasts").select("*").order("order_index", { ascending: true })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    if (!editing.youtube_url.trim()) return toast.error("YouTube URL is required")
    const payload = { ...editing, description: editing.description || null }
    const { error } = editing.id
      ? await supabase.from("podcasts").update(payload).eq("id", editing.id)
      : await supabase.from("podcasts").insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Podcast saved")
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this podcast? This cannot be undone.")) return
    const { error } = await supabase.from("podcasts").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Podcast deleted")
    load()
  }

  const toggleActive = async (it: any) => {
    const { error } = await supabase.from("podcasts").update({ is_active: !it.is_active }).eq("id", it.id)
    if (error) return toast.error(error.message)
    load()
  }

  const updateOrder = async (it: any, v: number) => {
    const { error } = await supabase.from("podcasts").update({ order_index: v }).eq("id", it.id)
    if (error) return toast.error(error.message)
    load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Podcasts" breadcrumb="Admin / Gallery / Podcasts">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} podcasts</h2>
        <button onClick={() => setEditing({ ...empty, order_index: items.length })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#8B0F50" }}>
          <Plus className="w-4 h-4" /> Add Podcast
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {items.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">No podcasts yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Title</th>
                <th className="p-3 w-24">Order</th>
                <th className="p-3 w-24">Active</th>
                <th className="p-3 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => {
                const thumb = getYouTubeThumbnail(it.youtube_url)
                return (
                  <tr key={it.id} className="border-t">
                    <td className="p-3">
                      {thumb ? <img src={thumb} alt="" style={{ width: 64, height: 40, objectFit: "cover", borderRadius: 6 }} /> : <div className="w-16 h-10 bg-gray-100 rounded" />}
                    </td>
                    <td className="p-3 font-medium">{it.title || "(untitled)"}</td>
                    <td className="p-3">
                      <input type="number" defaultValue={it.order_index} onBlur={(e) => updateOrder(it, Number(e.target.value))} className="w-16 px-2 py-1 border rounded" />
                    </td>
                    <td className="p-3">
                      <button onClick={() => toggleActive(it)} className="px-2 py-1 rounded text-xs font-semibold" style={{ background: it.is_active ? "#DCFCE7" : "#FEE2E2", color: it.is_active ? "#166534" : "#991B1B" }}>
                        {it.is_active ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => setEditing(it)} className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-xs mr-1"><Pencil className="w-3 h-3" /> Edit</button>
                      <button onClick={() => remove(it.id)} className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 text-red-600 text-xs"><Trash2 className="w-3 h-3" /> Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "Add"} Podcast</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="YouTube URL">
                <input value={editing.youtube_url} onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Description (optional)">
                <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Order index">
                <input type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on website)
              </label>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#8B0F50" }}>
                {editing.id ? "Save Changes" : "Add Podcast"}
              </button>
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
