import { useEffect, useMemo, useState } from "react"

function splitIso(iso: string | null): { date: string; time: string } {
  if (!iso) return { date: "", time: "" }
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, "0")
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  }
}
function combineToIso(date: string, time: string): string | null {
  if (!date || !time) return null
  const d = new Date(`${date}T${time}`)
  if (isNaN(d.getTime())) return null
  return d.toISOString()
}

function FollowUpDateTime({
  value,
  onSave,
  compact = false,
}: {
  value: string | null
  onSave: (iso: string | null) => void
  compact?: boolean
}) {
  const initial = splitIso(value)
  const [date, setDate] = useState(initial.date)
  const [time, setTime] = useState(initial.time)
  const [error, setError] = useState("")
  useEffect(() => {
    const s = splitIso(value)
    setDate(s.date); setTime(s.time); setError("")
  }, [value])

  const today = new Date().toISOString().split("T")[0]
  const inputStyle: React.CSSProperties = {
    width: "50%",
    border: "1.5px solid rgba(230,0,126,0.3)",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 14,
    color: "#2D0A1E",
    background: "white",
    outline: "none",
  }
  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3e%3cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23E6007E' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    paddingRight: 32,
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "#E6007E")
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => (e.currentTarget.style.borderColor = "rgba(230,0,126,0.3)")

  // Build 48 half-hour options: 12:00 AM .. 11:30 PM
  const timeOptions: { value: string; label: string }[] = []
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      const period = h < 12 ? "AM" : "PM"
      const hour12 = h % 12 === 0 ? 12 : h % 12
      const label = `${hour12}:${String(m).padStart(2, "0")} ${period}`
      timeOptions.push({ value, label })
    }
  }

  const commit = (nd: string, nt: string) => {
    if (!nd || !nt) {
      setError("Please select both date and time for follow up")
      return
    }
    setError("")
    onSave(combineToIso(nd, nt))
  }

  return (
    <div style={{ marginTop: compact ? 8 : 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#2D0A1E", marginBottom: 6 }}>
        Follow Up Date &amp; Time
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <input
          type="date"
          min={today}
          value={date}
          onChange={e => { setDate(e.target.value); commit(e.target.value, time) }}
          style={inputStyle}
          onFocus={focus}
          onBlur={blur}
          aria-label="Follow Up Date"
        />
        <select
          value={time}
          onChange={e => { setTime(e.target.value); commit(date, e.target.value) }}
          style={selectStyle}
          onFocus={focus}
          onBlur={blur}
          aria-label="Follow Up Time"
        >
          <option value="" disabled>Select time...</option>
          {timeOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      {error && <div style={{ color: "#C2185B", fontSize: 12, marginTop: 6 }}>{error}</div>}
    </div>
  )
}
import { createFileRoute } from "@tanstack/react-router"
import { Calendar, CheckCircle2, Clock, Inbox, Search, Download, X, Phone, MessageCircle, Trash2 } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const Route = createFileRoute("/admin/appointments/")({
  component: AdminAppointmentsPage,
})

type Appt = {
  id: string
  full_name: string
  phone: string
  email: string | null
  preferred_date: string
  preferred_time: string
  service: string | null
  consultation_type: string
  message: string | null
  admin_notes: string | null
  status: "new" | "confirmed" | "cancelled" | "completed" | "follow_up"
  follow_up_at: string | null
  created_at: string
  updated_at: string
}

const STATUS_OPTIONS = ["new", "confirmed", "follow_up", "completed", "cancelled"] as const
const STATUS_LABELS: Record<string, string> = {
  new: "New",
  confirmed: "Confirmed",
  follow_up: "Follow Up",
  completed: "Completed",
  cancelled: "Cancelled",
}
const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  new: { bg: "#DBEAFE", fg: "#1E40AF" },
  confirmed: { bg: "#D1FADF", fg: "#027A48" },
  follow_up: { bg: "#F59E0B", fg: "#FFFFFF" },
  completed: { bg: "#E6007E", fg: "#FFFFFF" },
  cancelled: { bg: "#FEE2E2", fg: "#991B1B" },
}

function formatFollowUp(iso: string | null) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })
}

function AdminAppointmentsPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [items, setItems] = useState<Appt[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [search, setSearch] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [selected, setSelected] = useState<Appt | null>(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
    if (error) { toast.error("Failed to load"); return }
    setItems((data || []) as Appt[])
  }

  useEffect(() => {
    if (!isAdmin) return
    load()
    const ch = supabase
      .channel("appointments-admin")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, (payload: any) => {
        if (payload.eventType === "INSERT") {
          const row = payload.new as Appt
          setItems(prev => [row, ...prev.filter(p => p.id !== row.id)])
          toast.success(`🔔 New appointment from ${row.full_name}!`)
        } else if (payload.eventType === "UPDATE") {
          setItems(prev => prev.map(p => p.id === payload.new.id ? payload.new as Appt : p))
        } else if (payload.eventType === "DELETE") {
          setItems(prev => prev.filter(p => p.id !== payload.old.id))
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [isAdmin])

  const filtered = useMemo(() => {
    return items.filter(it => {
      if (statusFilter !== "all" && it.status !== statusFilter) return false
      if (from && it.preferred_date < from) return false
      if (to && it.preferred_date > to) return false
      if (search) {
        const s = search.toLowerCase()
        if (!it.full_name.toLowerCase().includes(s) && !it.phone.includes(s)) return false
      }
      return true
    })
  }, [items, statusFilter, from, to, search])

  const stats = useMemo(() => ({
    total: items.length,
    new: items.filter(i => i.status === "new").length,
    confirmed: items.filter(i => i.status === "confirmed").length,
    completed: items.filter(i => i.status === "completed").length,
  }), [items])

  const updateStatus = async (id: string, status: Appt["status"]) => {
    setBusy(true)
    const patch: any = { status }
    if (status !== "follow_up") patch.follow_up_at = null
    const { error } = await supabase.from("appointments").update(patch).eq("id", id)
    setBusy(false)
    if (error) { toast.error("Update failed"); return }
    toast.success("Status updated")
  }

  const updateFollowUpAt = async (id: string, follow_up_at: string | null) => {
    const { error } = await supabase.from("appointments").update({ follow_up_at }).eq("id", id)
    if (error) { toast.error("Save failed"); return }
    toast.success("Follow-up time saved")
  }

  const updateNotes = async (id: string, admin_notes: string) => {
    const { error } = await supabase.from("appointments").update({ admin_notes }).eq("id", id)
    if (error) { toast.error("Save failed"); return }
    toast.success("Notes saved")
  }

  const remove = async (id: string) => {
    if (!confirm("Delete this appointment?")) return
    const { error } = await supabase.from("appointments").delete().eq("id", id)
    if (error) { toast.error("Delete failed"); return }
    setSelected(null)
    toast.success("Deleted")
  }

  const exportCsv = () => {
    const headers = ["Name","Phone","Email","Service","Date","Time","Status","Message","Received"]
    const rows = filtered.map(i => [
      i.full_name, i.phone, i.email || "", i.service || "",
      i.preferred_date, i.preferred_time, i.status,
      (i.message || "").replace(/\n/g, " "),
      new Date(i.created_at).toISOString(),
    ])
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading || !isAdmin) return <AdminLoading />

  const cards = [
    { label: "Total", value: stats.total, icon: Calendar },
    { label: "New", value: stats.new, icon: Inbox },
    { label: "Confirmed", value: stats.confirmed, icon: Clock },
    { label: "Completed", value: stats.completed, icon: CheckCircle2 },
  ]

  return (
    <AdminShell title="Appointments" breadcrumb="Admin / Appointments">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded-xl p-5 border flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#FFE4EF", color: "#E6007E" }}>
              <c.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#2D0A1E" }}>{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap items-center gap-3">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg border bg-white">
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </select>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="px-3 py-2 text-sm rounded-lg border" placeholder="From" />
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="px-3 py-2 text-sm rounded-lg border" placeholder="To" />
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or phone…" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border" />
          </div>
          <button onClick={exportCsv} className="px-4 py-2 text-sm font-semibold rounded-lg text-white flex items-center gap-2" style={{ background: "#E6007E" }}>
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Follow Up</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-muted-foreground">No appointments found.</td></tr>
              )}
              {filtered.map(it => (
                <tr key={it.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(it)}
                    style={it.status === "new" ? { borderLeft: "4px solid #E6007E" } : undefined}>
                  <td className="px-4 py-3 font-medium">{it.full_name}</td>
                  <td className="px-4 py-3">{it.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{it.service || "-"}</td>
                  <td className="px-4 py-3">{it.preferred_date}</td>
                  <td className="px-4 py-3 text-xs">{it.preferred_time}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <select
                      disabled={busy}
                      value={it.status}
                      onChange={e => updateStatus(it.id, e.target.value as Appt["status"])}
                      className="text-xs px-2 py-1 rounded-full border-0 font-semibold"
                      style={{ background: STATUS_COLORS[it.status].bg, color: STATUS_COLORS[it.status].fg }}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                    {it.status === "follow_up" && (
                      <FollowUpDateTime
                        compact
                        value={it.follow_up_at}
                        onSave={(iso) => updateFollowUpAt(it.id, iso)}
                      />
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">{it.follow_up_at ? formatFollowUp(it.follow_up_at) : "-"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(it.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => remove(it.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <DetailPanel appt={selected} onClose={() => setSelected(null)} onUpdateStatus={updateStatus} onUpdateFollowUp={updateFollowUpAt} onSaveNotes={updateNotes} onDelete={remove} />}
    </AdminShell>
  )
}

function DetailPanel({ appt, onClose, onUpdateStatus, onUpdateFollowUp, onSaveNotes, onDelete }: {
  appt: Appt
  onClose: () => void
  onUpdateStatus: (id: string, s: Appt["status"]) => void
  onUpdateFollowUp: (id: string, v: string | null) => void
  onSaveNotes: (id: string, n: string) => void
  onDelete: (id: string) => void
}) {
  const [notes, setNotes] = useState(appt.admin_notes || "")
  useEffect(() => { setNotes(appt.admin_notes || "") }, [appt.id])
  const phoneClean = appt.phone.replace(/\D/g, "")

  return (
    <div className="fixed inset-0 z-[1000]" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose}>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold" style={{ color: "#2D0A1E" }}>{appt.full_name}</h2>
            <p className="text-xs text-muted-foreground">Received {new Date(appt.created_at).toLocaleString()}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-4">
          <Field label="Phone" value={appt.phone} />
          <Field label="Email" value={appt.email || "-"} />
          <Field label="Service" value={appt.service || "-"} />
          <Field label="Date" value={appt.preferred_date} />
          <Field label="Time" value={appt.preferred_time} />
          <Field label="Type" value={appt.consultation_type} />
          <div>
            <div className="text-xs uppercase text-muted-foreground mb-1">Message</div>
            <div className="text-sm whitespace-pre-wrap p-3 bg-gray-50 rounded-lg">{appt.message || "-"}</div>
          </div>

          <div>
            <div className="text-xs uppercase text-muted-foreground mb-1">Status</div>
            <select value={appt.status} onChange={e => onUpdateStatus(appt.id, e.target.value as Appt["status"])} className="w-full px-3 py-2 text-sm rounded-lg border bg-white">
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
            </select>
            {appt.status === "follow_up" && (
              <FollowUpDateTime
                value={appt.follow_up_at}
                onSave={(iso) => onUpdateFollowUp(appt.id, iso)}
              />
            )}
          </div>

          <div>
            <div className="text-xs uppercase text-muted-foreground mb-1">Internal Notes</div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} className="w-full px-3 py-2 text-sm rounded-lg border" />
            <button onClick={() => onSaveNotes(appt.id, notes)} className="mt-2 px-3 py-1.5 text-xs font-semibold text-white rounded-lg" style={{ background: "#E6007E" }}>Save Notes</button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a href={`tel:${appt.phone}`} className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white rounded-lg" style={{ background: "#1BA0DC" }}>
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href={`https://wa.me/${phoneClean}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white rounded-lg" style={{ background: "#25D366" }}>
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          <button onClick={() => onDelete(appt.id)} className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50">
            <Trash2 className="w-4 h-4" /> Delete Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
