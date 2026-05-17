import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, Play } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/gallery/")({
  component: AdminGalleryPage,
})

type Item = {
  id?: string
  media_type: string
  url: string
  thumbnail: string | null
  title: string
  caption: string
  category: string
  display_order: number
  status: string
}

const empty: Item = { media_type: "image", url: "", thumbnail: null, title: "", caption: "", category: "Clinic", display_order: 0, status: "published" }

function AdminGalleryPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Item | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("gallery_items").select("*").order("display_order", { ascending: true })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    if (!editing.url) return toast.error("Media URL required")
    const { error } = editing.id
      ? await supabase.from("gallery_items").update(editing).eq("id", editing.id)
      : await supabase.from("gallery_items").insert(editing)
    if (error) return toast.error(error.message)
    toast.success("Media updated!"); setEditing(null); load()
  }

  const remove = async (id: string, url?: string, mediaType?: string) => {
    if (!confirm("Are you sure you want to delete this item? This cannot be undone.")) return
    const { error } = await supabase.from("gallery_items").delete().eq("id", id)
    if (error) return toast.error(error.message)
    // Best-effort storage cleanup for images stored in site-media bucket
    if (mediaType === "image" && url && url.includes("/site-media/")) {
      const path = url.split("/site-media/")[1]?.split("?")[0]
      if (path) await supabase.storage.from("site-media").remove([path])
    }
    toast.success("Item deleted."); load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Gallery" breadcrumb="Admin / Gallery">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} items</h2>
        <button onClick={() => setEditing({ ...empty })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Item
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.id} className="bg-white rounded-xl border overflow-hidden group relative">
            <div className="aspect-square bg-gray-100 relative">
              <img src={it.thumbnail || it.url} alt={it.title || ""} className="w-full h-full object-cover" />
              {it.media_type === "video" && <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Play className="w-8 h-8 text-white" /></div>}
              {/* Hover action overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setEditing(it); }}
                  className="inline-flex items-center gap-1.5 rounded-lg font-bold transition-colors"
                  style={{ background: "white", color: "#2D0A1E", padding: "8px 14px", fontSize: 13 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF1F7")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); remove(it.id, it.url, it.media_type); }}
                  className="inline-flex items-center gap-1.5 rounded-lg font-bold transition-colors text-white"
                  style={{ background: "#E6007E", padding: "8px 14px", fontSize: 13 }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#C4006A")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#E6007E")}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
            <div className="p-2 text-xs">
              <div className="font-medium truncate">{it.title || "(untitled)"}</div>
              <div className="text-muted-foreground">{it.category}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No gallery items yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Item</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Media type">
                <select value={editing.media_type} onChange={(e) => setEditing({ ...editing, media_type: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="image">Image</option><option value="video">Video</option>
                </select>
              </Field>
              {editing.media_type === "image" ? (
                <Field label="Image"><ImageUpload value={editing.url} onChange={(url) => setEditing({ ...editing, url: url || "" })} folder="gallery" /></Field>
              ) : (
                <>
                  <Field label="Video URL (YouTube embed)"><input value={editing.url} onChange={(e) => setEditing({ ...editing, url: e.target.value })} placeholder="https://www.youtube.com/embed/…" className="w-full px-3 py-2 border rounded-lg" /></Field>
                  <Field label="Thumbnail image"><ImageUpload value={editing.thumbnail} onChange={(url) => setEditing({ ...editing, thumbnail: url })} folder="gallery" /></Field>
                </>
              )}
              <Field label="Title"><input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Caption"><textarea rows={2} value={editing.caption || ""} onChange={(e) => setEditing({ ...editing, caption: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Clinic</option><option>Team</option><option>Patients</option><option>Events</option>
                  </select>
                </Field>
                <Field label="Display order"><input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              </div>
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
