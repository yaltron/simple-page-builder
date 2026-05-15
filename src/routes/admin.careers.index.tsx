import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus, Pencil, Trash2, X, FileDown } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/careers/")({
  component: AdminCareersPage,
})

type Listing = {
  id?: string
  title: string
  department: string
  type: string
  location: string
  experience: string
  description: string
  requirements: string
  is_active: boolean
  deadline: string | null
}

const empty: Listing = {
  title: "", department: "", type: "Full-time", location: "Kathmandu, Nepal",
  experience: "", description: "", requirements: "",
  is_active: true, deadline: null,
}

function AdminCareersPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [tab, setTab] = useState<"jobs" | "apps">("jobs")

  if (loading || !isAdmin) return <AdminLoading />

  return (
    <AdminShell title="Careers" breadcrumb="Admin / Careers">
      <div className="flex gap-1 mb-5 border-b">
        {[{ k: "jobs", l: "Job Listings" }, { k: "apps", l: "Applications" }].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className="px-4 py-2 text-sm font-semibold border-b-2 transition-colors"
            style={{ borderColor: tab === t.k ? "#E6007E" : "transparent", color: tab === t.k ? "#E6007E" : "#475569" }}
          >
            {t.l}
          </button>
        ))}
      </div>
      {tab === "jobs" ? <JobsTab /> : <ApplicationsTab />}
    </AdminShell>
  )
}

function JobsTab() {
  const [items, setItems] = useState<any[]>([])
  const [editing, setEditing] = useState<Listing | null>(null)

  const load = async () => {
    const { data, error } = await supabase.from("career_listings").select("*").order("created_at", { ascending: false })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (!editing.title.trim()) return toast.error("Title required")
    const payload = { ...editing, deadline: editing.deadline || null }
    const { error } = editing.id
      ? await supabase.from("career_listings").update(payload).eq("id", editing.id)
      : await supabase.from("career_listings").insert(payload)
    if (error) return toast.error(error.message)
    toast.success("Saved"); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this listing?")) return
    const { error } = await supabase.from("career_listings").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  const toggle = async (j: any) => {
    await supabase.from("career_listings").update({ is_active: !j.is_active }).eq("id", j.id)
    load()
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <h2 className="text-sm text-muted-foreground">{items.length} listing(s)</h2>
        <button onClick={() => setEditing({ ...empty })} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>
          <Plus className="w-4 h-4" /> New Listing
        </button>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-3 font-medium">{j.title}</td>
                <td className="p-3">{j.department || "—"}</td>
                <td className="p-3">{j.type || "—"}</td>
                <td className="p-3 text-center">
                  <button onClick={() => toggle(j)} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: j.is_active ? "#dcfce7" : "#f1f5f9", color: j.is_active ? "#166534" : "#475569" }}>
                    {j.is_active ? "Active" : "Hidden"}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(j)} className="p-1.5 rounded hover:bg-gray-100"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => remove(j.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="p-10 text-center text-muted-foreground">No listings.</td></tr>}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={() => setEditing(null)}>
          <div className="w-full max-w-xl bg-white h-full overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-5">
              <h2 className="font-bold text-lg">{editing.id ? "Edit" : "New"} Listing</h2>
              <button onClick={() => setEditing(null)} className="ml-auto p-1.5 hover:bg-gray-100 rounded"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <Field label="Title *"><input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Department"><input value={editing.department} onChange={(e) => setEditing({ ...editing, department: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Type">
                  <select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-white">
                    <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Location"><input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
                <Field label="Experience"><input placeholder="e.g. 2-4 years" value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              </div>
              <Field label="Description"><textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Requirements"><textarea rows={4} value={editing.requirements} onChange={(e) => setEditing({ ...editing, requirements: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <Field label="Application Deadline"><input type="date" value={editing.deadline || ""} onChange={(e) => setEditing({ ...editing, deadline: e.target.value || null })} className="w-full px-3 py-2 border rounded-lg" /></Field>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                Active (visible on /careers)
              </label>
              <button onClick={save} className="w-full py-2.5 rounded-lg text-white font-semibold" style={{ background: "#E6007E" }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"]
const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  new: { bg: "#fce7f3", fg: "#9d174d" },
  reviewing: { bg: "#fef3c7", fg: "#92400e" },
  shortlisted: { bg: "#dbeafe", fg: "#1e40af" },
  rejected: { bg: "#f1f5f9", fg: "#475569" },
  hired: { bg: "#dcfce7", fg: "#166534" },
}

function ApplicationsTab() {
  const [items, setItems] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("all")

  const load = async () => {
    const { data, error } = await supabase.from("career_applications").select("*").order("created_at", { ascending: false })
    if (error) toast.error(error.message)
    setItems(data || [])
  }
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("career_applications").update({ status }).eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Updated"); load()
  }

  const viewResume = async (path: string) => {
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(path, 60 * 5)
    if (error) return toast.error(error.message)
    window.open(data.signedUrl, "_blank")
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this application?")) return
    const { error } = await supabase.from("career_applications").delete().eq("id", id)
    if (error) return toast.error(error.message)
    toast.success("Deleted"); load()
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter)

  return (
    <>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 border rounded-lg bg-white text-sm">
          <option value="all">All</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="text-sm text-muted-foreground ml-auto">{filtered.length} application(s)</div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Applicant</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const c = STATUS_COLORS[a.status] || STATUS_COLORS.new
              return (
                <tr key={a.id} className="border-t align-top">
                  <td className="p-3">
                    <div className="font-medium">{a.full_name}</div>
                    <div className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="p-3">{a.position}</td>
                  <td className="p-3 text-xs">
                    <div>{a.email}</div>
                    <div className="text-muted-foreground">{a.phone}</div>
                  </td>
                  <td className="p-3 text-center">
                    {a.resume_url ? (
                      <button onClick={() => viewResume(a.resume_url)} className="inline-flex items-center gap-1 text-xs text-pink-700 hover:underline">
                        <FileDown className="w-3.5 h-3.5" /> View
                      </button>
                    ) : "—"}
                  </td>
                  <td className="p-3 text-center">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="text-[11px] px-2 py-1 rounded-full font-semibold border-0 outline-none"
                      style={{ background: c.bg, color: c.fg }}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => remove(a.id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-10 text-center text-muted-foreground">No applications.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
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
