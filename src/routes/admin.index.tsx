import { useEffect, useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { FileText, CheckCircle2, Clock, Image as ImgIcon, CalendarCheck, CalendarDays, CalendarRange } from "lucide-react"
import { AdminShell, AdminLoading } from "@/components/admin/admin-shell"
import { useAdminAuth } from "@/lib/use-admin-auth"
import { supabase } from "@/integrations/supabase/client"

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  const { loading, isAdmin } = useAdminAuth()
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })
  const [appts, setAppts] = useState({ newCount: 0, today: 0, week: 0 })
  const [recent, setRecent] = useState<any[]>([])
  const [recentAppts, setRecentAppts] = useState<any[]>([])

  useEffect(() => {
    if (!isAdmin) return
    ;(async () => {
      const { data: all } = await supabase.from("blogs").select("id,title,status,published_at,created_at").order("created_at", { ascending: false })
      const list = all || []
      setStats({
        total: list.length,
        published: list.filter((b) => b.status === "published").length,
        drafts: list.filter((b) => b.status === "draft").length,
      })
      setRecent(list.slice(0, 5))

      const today = new Date(); today.setHours(0,0,0,0)
      const todayStr = today.toISOString().slice(0,10)
      const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7)
      const [{ count: newCount }, { count: todayCount }, { count: weekCount }, { data: latestAppts }] = await Promise.all([
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("appointments").select("id", { count: "exact", head: true }).eq("preferred_date", todayStr),
        supabase.from("appointments").select("id", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
        supabase.from("appointments").select("id,full_name,phone,preferred_date,preferred_time,status,created_at").order("created_at", { ascending: false }).limit(5),
      ])
      setAppts({ newCount: newCount || 0, today: todayCount || 0, week: weekCount || 0 })
      setRecentAppts(latestAppts || [])
    })()
  }, [isAdmin])

  if (loading || !isAdmin) return <AdminLoading />

  const cards = [
    { label: "New Appointments", value: appts.newCount, icon: CalendarCheck, accent: true },
    { label: "Today's Appointments", value: appts.today, icon: CalendarDays, accent: true },
    { label: "This Week", value: appts.week, icon: CalendarRange, accent: true },
    { label: "Total Posts", value: stats.total, icon: FileText },
    { label: "Published", value: stats.published, icon: CheckCircle2 },
    { label: "Drafts", value: stats.drafts, icon: Clock },
    { label: "Media", value: "-", icon: ImgIcon },
  ]

  return (
    <AdminShell title="Dashboard" breadcrumb="Admin / Dashboard">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c: any) => (
          <div key={c.label} className="bg-white rounded-xl p-5 border flex items-center gap-4" style={c.accent ? { borderColor: "#E6007E33", boxShadow: "0 2px 12px rgba(230,0,126,0.06)" } : undefined}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: c.accent ? "#E6007E" : "#FFE4EF", color: c.accent ? "white" : "#E6007E" }}>
              <c.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#2D0A1E" }}>{c.value}</div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden mb-6">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold" style={{ color: "#2D0A1E" }}>Recent Appointments</h2>
          <Link to="/admin/appointments" className="text-sm font-semibold" style={{ color: "#E6007E" }}>View all →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-muted-foreground">
            <tr><th className="px-5 py-3">Name</th><th className="px-5 py-3">Phone</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th></tr>
          </thead>
          <tbody>
            {recentAppts.length === 0 && <tr><td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">No appointments yet.</td></tr>}
            {recentAppts.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-5 py-3 font-medium">{a.full_name}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.phone}</td>
                <td className="px-5 py-3 text-muted-foreground">{a.preferred_date} · {a.preferred_time}</td>
                <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: a.status === "new" ? "#FFE4EF" : a.status === "confirmed" ? "#D1FADF" : "#F3F4F6", color: a.status === "new" ? "#E6007E" : a.status === "confirmed" ? "#027A48" : "#374151" }}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="font-bold" style={{ color: "#2D0A1E" }}>Recent Posts</h2>
          <Link to="/admin/blog" className="text-sm font-semibold" style={{ color: "#E6007E" }}>View all →</Link>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase text-muted-foreground">
            <tr><th className="px-5 py-3">Title</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th></tr>
          </thead>
          <tbody>
            {recent.length === 0 && <tr><td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">No posts yet. <Link to="/admin/blog/$id" params={{ id: "new" }} className="font-semibold" style={{ color: "#E6007E" }}>Create one →</Link></td></tr>}
            {recent.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-5 py-3 font-medium">{b.title}</td>
                <td className="px-5 py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: b.status === "published" ? "#D1FADF" : "#FEF3C7", color: b.status === "published" ? "#027A48" : "#92400E" }}>{b.status}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{new Date(b.published_at || b.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
