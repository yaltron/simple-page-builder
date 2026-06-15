import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown, Save } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { ColorPicker } from "@/components/admin/color-picker"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from "lucide-react"

export const Route = createFileRoute("/admin/faqs/")({
  component: AdminFAQsPage,
})

const CATEGORIES = ["General", "IVF", "ICSI", "Costs", "Preparation", "After Treatment", "Gynecology", "Fertility", "Radiology"]

type F = {
  id?: string
  question: string
  answer: string
  category: string
  order_index: number
  is_active: boolean
}

const empty: F = { question: "", answer: "", category: "General", order_index: 0, is_active: true }

function SimpleEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!editor) return <div className="border rounded-lg p-3 text-xs text-muted-foreground">Loading…</div>

  const Btn = ({ on, action, children }: any) => (
    <button
      type="button"
      onClick={action}
      className="p-1.5 rounded hover:bg-gray-100"
      style={{ background: on ? "#E6007E" : "transparent", color: on ? "white" : "#2D0A1E" }}
    >
      {children}
    </button>
  )

  const addLink = () => {
    const url = window.prompt("URL")
    if (!url) return
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex gap-1 p-1 border-b bg-gray-50">
        <Btn on={editor.isActive("bold")} action={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Btn>
        <Btn on={editor.isActive("italic")} action={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </Btn>
        <Btn on={editor.isActive("bulletList")} action={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </Btn>
        <Btn on={editor.isActive("orderedList")} action={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </Btn>
        <Btn on={editor.isActive("link")} action={addLink}>
          <LinkIcon className="w-4 h-4" />
        </Btn>
      </div>
      <EditorContent editor={editor} className="prose prose-sm max-w-none p-3 min-h-[140px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px]" />
    </div>
  )
}

function AdminFAQsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<F | null>(null)
  const [filter, setFilter] = useState<string>("All")
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const load = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("category")
      .order("order_index")
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => {
    if (isAdmin) load()
  }, [isAdmin])

  const save = async () => {
    if (!editing) return
    if (!editing.question.trim() || !editing.answer.trim()) {
      return toast.error("Question and answer are required")
    }
    const { error } = editing.id
      ? await supabase.from("faqs").update(editing).eq("id", editing.id)
      : await supabase.from("faqs").insert(editing)
    if (error) return toast.error(error.message)
    toast.success("Saved")
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return
    const { error } = await supabase.from("faqs").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted")
    load()
  }

  const bulkDelete = async () => {
    if (selected.size === 0) return
    if (!confirm(`Delete ${selected.size} FAQ(s)?`)) return
    const { error } = await supabase.from("faqs").delete().in("id", Array.from(selected))
    if (error) return toast.error(error.message)
    toast.success("Deleted")
    setSelected(new Set())
    load()
  }

  const toggleActive = async (f: any) => {
    const { error } = await supabase.from("faqs").update({ is_active: !f.is_active }).eq("id", f.id)
    if (error) return toast.error(error.message)
    load()
  }

  const move = async (f: any, dir: -1 | 1) => {
    const sameCat = items.filter((x) => x.category === f.category).sort((a, b) => a.order_index - b.order_index)
    const idx = sameCat.findIndex((x) => x.id === f.id)
    const swap = sameCat[idx + dir]
    if (!swap) return
    await supabase.from("faqs").update({ order_index: swap.order_index }).eq("id", f.id)
    await supabase.from("faqs").update({ order_index: f.order_index }).eq("id", swap.id)
    load()
  }

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter)

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="FAQs" breadcrumb="Admin / FAQs">
      <HeadingColorEditor sectionKey="faq_section" label="FAQ Section Heading Color" />

      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg bg-white text-sm">
          <option>All</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {selected.size > 0 && (
          <button onClick={bulkDelete} className="px-3 py-2 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 inline-flex items-center gap-1">
            <Trash2 className="w-4 h-4" /> Delete {selected.size}
          </button>
        )}
        <div className="text-sm text-muted-foreground ml-auto">{filtered.length} FAQ(s)</div>
        <button
          onClick={() => {
            const next = items.filter((i) => i.category === (filter === "All" ? "General" : filter))
            const maxOrder = next.reduce((m, x) => Math.max(m, x.order_index || 0), 0)
            setEditing({ ...empty, category: filter === "All" ? "General" : filter, order_index: maxOrder + 1 })
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
          style={{ background: "#E6007E" }}
        >
          <Plus className="w-4 h-4" /> New FAQ
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 w-8"></th>
              <th className="p-3 text-left">Question</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Order</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(f.id)}
                    onChange={(e) => {
                      const n = new Set(selected)
                      if (e.target.checked) n.add(f.id)
                      else n.delete(f.id)
                      setSelected(n)
                    }}
                  />
                </td>
                <td className="p-3 font-medium text-plum">{f.question}</td>
                <td className="p-3">{f.category}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggleActive(f)} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: f.is_active ? "#dcfce7" : "#f1f5f9", color: f.is_active ? "#166534" : "#475569" }}>
                    {f.is_active ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <div className="inline-flex items-center gap-1">
                    <button onClick={() => move(f, -1)} className="p-1 rounded hover:bg-gray-100"><ArrowUp className="w-3 h-3" /></button>
                    <span className="text-xs w-5">{f.order_index}</span>
                    <button onClick={() => move(f, 1)} className="p-1 rounded hover:bg-gray-100"><ArrowDown className="w-3 h-3" /></button>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(f)} className="p-1.5 rounded hover:bg-gray-100"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => remove(f.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No FAQs.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} FAQ</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="Question">
                <input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </Field>
              <Field label="Answer">
                <SimpleEditor value={editing.answer} onChange={(v) => setEditing({ ...editing, answer: v })} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Order">
                  <input type="number" value={editing.order_index} onChange={(e) => setEditing({ ...editing, order_index: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on /faqs)
              </label>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
                Save
              </button>
            </div>
          </div>
        </div>
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

function HeadingColorEditor({ sectionKey, label }: { sectionKey: string; label: string }) {
  const [color, setColor] = useState("#C2185B")
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from("homepage_content").select("content").eq("section", sectionKey).maybeSingle()
      if (data?.content && typeof (data.content as any).heading_color === "string") {
        setColor((data.content as any).heading_color)
      }
      setLoaded(true)
    })()
  }, [sectionKey])

  const save = async () => {
    setSaving(true)
    const { data: existing } = await supabase.from("homepage_content").select("id, content").eq("section", sectionKey).maybeSingle()
    const next = { ...((existing?.content as object) || {}), heading_color: color }
    const { error } = existing
      ? await supabase.from("homepage_content").update({ content: next as any }).eq("id", existing.id)
      : await supabase.from("homepage_content").insert({ section: sectionKey, content: next as any })
    setSaving(false)
    if (error) toast.error(error.message)
    else toast.success("Saved")
  }

  if (!loaded) return null
  return (
    <div className="bg-white rounded-xl border p-4 mb-5 flex items-center gap-4 flex-wrap">
      <div className="text-sm font-semibold">{label}</div>
      <ColorPicker value={color} onChange={setColor} />
      <button onClick={save} disabled={saving} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#8B0F50" }}>
        <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save Color"}
      </button>
    </div>
  )
}
