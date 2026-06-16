import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ColorPicker } from "@/components/admin/color-picker"
import { TiptapEditor } from "@/components/admin/tiptap-editor"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/homepage/why-choose-us")({
  component: Page,
})

type F = {
  id?: string
  title: string
  slug: string
  short_description: string
  full_content: string
  icon: string
  icon_bg_color: string
  page_heading: string
  page_subtext: string
  meta_title: string
  meta_description: string
  order_index: number
  is_active: boolean
}

const empty: F = {
  title: "", slug: "", short_description: "", full_content: "",
  icon: "Sparkles", icon_bg_color: "#8B0F50",
  page_heading: "", page_subtext: "",
  meta_title: "", meta_description: "",
  order_index: 0, is_active: true,
}

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

function Page() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<F | null>(null)

  const load = async () => {
    const { data, error } = await supabase
      .from("trust_features" as any)
      .select("*")
      .order("order_index")
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])

  const save = async () => {
    if (!editing) return
    if (!editing.title.trim()) return toast.error("Title required")
    const payload = { ...editing, slug: editing.slug || slugify(editing.title) }
    const { error } = editing.id
      ? await supabase.from("trust_features" as any).update(payload).eq("id", editing.id)
      : await supabase.from("trust_features" as any).insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Saved"); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this feature card?")) return
    const { error } = await supabase.from("trust_features" as any).delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  const move = async (f: any, dir: -1 | 1) => {
    const sorted = [...items].sort((a, b) => a.order_index - b.order_index)
    const idx = sorted.findIndex((x) => x.id === f.id)
    const swap = sorted[idx + dir]
    if (!swap) return
    await supabase.from("trust_features" as any).update({ order_index: swap.order_index }).eq("id", f.id)
    await supabase.from("trust_features" as any).update({ order_index: f.order_index }).eq("id", swap.id)
    load()
  }

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Why Choose Us" breadcrumb="Admin / Homepage / Why Choose Us">
      <div className="flex items-center mb-5">
        <h2 className="text-sm text-muted-foreground">{items.length} feature card{items.length === 1 ? "" : "s"}</h2>
        <button onClick={() => setEditing({ ...empty, order_index: (items.reduce((m: number, x: any) => Math.max(m, x.order_index || 0), 0)) + 1 })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#8B0F50" }}>
          <Plus className="w-4 h-4" /> New Card
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((f: any) => (
          <div key={f.id} className="bg-white rounded-xl border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg" style={{ background: f.icon_bg_color }} />
              <div className="min-w-0">
                <div className="font-bold truncate">{f.title}</div>
                <div className="text-xs text-muted-foreground truncate">/{f.slug}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{f.short_description}</p>
            <div className="flex gap-2 items-center">
              <button onClick={() => move(f, -1)} className="p-1.5 border rounded"><ArrowUp className="w-3 h-3" /></button>
              <button onClick={() => move(f, 1)} className="p-1.5 border rounded"><ArrowDown className="w-3 h-3" /></button>
              <button onClick={() => setEditing(f)} className="flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
              <button onClick={() => remove(f.id)} className="px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="col-span-full text-center text-muted-foreground py-10">No cards yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-2xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Feature Card</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Title">
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Slug">
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" />
              </Field>
              <Field label="Short Description (card text)">
                <textarea rows={2} value={editing.short_description} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Icon (Lucide name e.g. UserCheck, HeartHandshake, HandCoins, Sparkles)">
                <input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Icon Background Color">
                <ColorPicker value={editing.icon_bg_color} onChange={(v) => setEditing({ ...editing, icon_bg_color: v })} />
              </Field>
              <Field label="Page Heading (detail page)">
                <input value={editing.page_heading} onChange={(e) => setEditing({ ...editing, page_heading: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Page Subtext">
                <input value={editing.page_subtext} onChange={(e) => setEditing({ ...editing, page_subtext: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Full Content (rich text)">
                <TiptapEditor value={editing.full_content} onChange={(html) => setEditing({ ...editing, full_content: html })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Meta Title">
                  <input value={editing.meta_title} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
                <Field label="Meta Description">
                  <input value={editing.meta_description} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Order">
                  <input type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
                <label className="flex items-center gap-2 text-sm pt-7">
                  <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                  Active (visible on homepage)
                </label>
              </div>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#8B0F50" }}>Save</button>
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
