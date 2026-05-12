import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, Eye, Power } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ImageUpload } from "@/components/admin/image-upload"
import { PopupBannerView } from "@/components/popup-banner"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/popup/")({
  component: AdminPopupPage,
})

type B = {
  id?: string
  title: string
  description: string
  image_url: string | null
  image_alt: string
  button_text: string
  button_url: string
  is_active: boolean
  show_after_seconds: number
  show_on_pages: string[]
  show_once_per_session: boolean
  background_color: string
  start_date: string | null
  end_date: string | null
}

const empty: B = {
  title: "",
  description: "",
  image_url: null,
  image_alt: "",
  button_text: "",
  button_url: "",
  is_active: false,
  show_after_seconds: 3,
  show_on_pages: ["all"],
  show_once_per_session: true,
  background_color: "#FFFFFF",
  start_date: null,
  end_date: null,
}

const PAGE_OPTIONS = [
  { value: "all", label: "All Pages" },
  { value: "homepage", label: "Homepage" },
  { value: "blog", label: "Blog" },
  { value: "services", label: "Services" },
  { value: "contact", label: "Contact" },
  { value: "about", label: "About" },
  { value: "team", label: "Team" },
  { value: "faqs", label: "FAQs" },
]

function AdminPopupPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<B | null>(null)
  const [previewing, setPreviewing] = useState<B | null>(null)

  const load = async () => {
    const { data, error } = await supabase
      .from("popup_banners")
      .select("*")
      .order("updated_at", { ascending: false })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin])

  const save = async () => {
    if (!editing) return
    const payload = { ...editing }
    const { error } = editing.id
      ? await supabase.from("popup_banners").update(payload).eq("id", editing.id)
      : await supabase.from("popup_banners").insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Saved")
    setEditing(null)
    load()
  }

  const toggleActive = async (b: any) => {
    const { error } = await supabase
      .from("popup_banners")
      .update({ is_active: !b.is_active })
      .eq("id", b.id)
    if (error) return toast.error(error.message)
    toast.success(!b.is_active ? "Activated" : "Deactivated")
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this popup?")) return
    const { error } = await supabase.from("popup_banners").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted")
    load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Popup Banners" breadcrumb="Admin / Popup Banners">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} banners — only one active at a time</h2>
        <button
          onClick={() => setEditing({ ...empty })}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ background: "#E6007E" }}
        >
          <Plus className="w-4 h-4" /> New Popup
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((b) => (
          <div key={b.id} className="bg-white rounded-xl border overflow-hidden flex flex-col">
            {b.image_url ? (
              <img src={b.image_url} alt="" className="w-full h-32 object-cover" />
            ) : (
              <div className="h-32 flex items-center justify-center text-xs text-muted-foreground" style={{ background: b.background_color || "#FFF1F7" }}>
                No image
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start gap-2 mb-2">
                <div className="font-bold flex-1 truncate">{b.title || "Untitled"}</div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: b.is_active ? "#dcfce7" : "#f1f5f9", color: b.is_active ? "#166534" : "#475569" }}
                >
                  {b.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{b.description}</p>
              <div className="text-[10px] text-muted-foreground mb-3">
                Pages: {(b.show_on_pages || []).join(", ")} · After {b.show_after_seconds}s
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleActive(b)} className="flex-1 px-2 py-1.5 text-xs rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1">
                  <Power className="w-3 h-3" /> {b.is_active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => setPreviewing(b)} className="px-2 py-1.5 text-xs rounded border hover:bg-gray-50">
                  <Eye className="w-3 h-3" />
                </button>
                <button onClick={() => setEditing(b)} className="px-2 py-1.5 text-xs rounded border hover:bg-gray-50">
                  <Pencil className="w-3 h-3" />
                </button>
                <button onClick={() => remove(b.id)} className="px-2 py-1.5 text-xs rounded border text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No popup banners yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Popup</h2>
              <button onClick={() => setPreviewing(editing)} className="ml-auto px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button onClick={() => setEditing(null)} className="ml-2 p-1.5 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Title">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Description">
                <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Image">
                <ImageUpload value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="popups" />
              </Field>
              <Field label="Image Alt Text">
                <input value={editing.image_alt} onChange={(e) => setEditing({ ...editing, image_alt: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Button Text">
                  <input value={editing.button_text} onChange={(e) => setEditing({ ...editing, button_text: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
                <Field label="Button URL">
                  <input value={editing.button_url} onChange={(e) => setEditing({ ...editing, button_url: e.target.value })} placeholder="/contact or https://…" className="w-full px-3 py-2 border rounded-lg" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Show after (seconds)">
                  <input type="number" min={0} value={editing.show_after_seconds} onChange={(e) => setEditing({ ...editing, show_after_seconds: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
                <Field label="Background Color">
                  <div className="flex gap-2">
                    <input type="color" value={editing.background_color} onChange={(e) => setEditing({ ...editing, background_color: e.target.value })} className="w-12 h-10 border rounded" />
                    <input value={editing.background_color} onChange={(e) => setEditing({ ...editing, background_color: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" />
                  </div>
                </Field>
              </div>
              <Field label="Show on pages">
                <div className="flex flex-wrap gap-2">
                  {PAGE_OPTIONS.map((p) => {
                    const on = editing.show_on_pages.includes(p.value)
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => {
                          let next = on ? editing.show_on_pages.filter((x) => x !== p.value) : [...editing.show_on_pages, p.value]
                          if (p.value === "all" && !on) next = ["all"]
                          else if (p.value !== "all" && !on) next = next.filter((x) => x !== "all")
                          if (next.length === 0) next = ["all"]
                          setEditing({ ...editing, show_on_pages: next })
                        }}
                        className="px-3 py-1.5 text-xs rounded-full border"
                        style={{ background: on ? "#E6007E" : "white", color: on ? "white" : "#7A2050", borderColor: on ? "#E6007E" : "#e5e7eb" }}
                      >
                        {p.label}
                      </button>
                    )
                  })}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start date (optional)">
                  <input type="date" value={editing.start_date || ""} onChange={(e) => setEditing({ ...editing, start_date: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
                <Field label="End date (optional)">
                  <input type="date" value={editing.end_date || ""} onChange={(e) => setEditing({ ...editing, end_date: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.show_once_per_session} onChange={(e) => setEditing({ ...editing, show_once_per_session: e.target.checked })} />
                Show once per session
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (will deactivate any other active popup)
              </label>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {previewing && (
        <PopupBannerView
          open={true}
          banner={{
            id: "preview",
            title: previewing.title,
            description: previewing.description,
            image_url: previewing.image_url,
            image_alt: previewing.image_alt,
            button_text: previewing.button_text,
            button_url: previewing.button_url || "#",
            show_after_seconds: 0,
            show_on_pages: ["all"],
            show_once_per_session: false,
            background_color: previewing.background_color,
            start_date: null,
            end_date: null,
          } as any}
          onClose={() => setPreviewing(null)}
        />
      )}
    </AdminShell>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  )
}
