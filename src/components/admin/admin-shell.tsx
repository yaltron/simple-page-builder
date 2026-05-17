import { ReactNode, useEffect, useState } from "react"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { LayoutDashboard, FileText, LogOut, Stethoscope, UserRound, Image as ImageIcon, MessageSquareQuote, CalendarCheck, HelpCircle, Megaphone, Home, Briefcase } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import logo from "@/assets/logo.png"

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarCheck, badgeKey: "appointments" as const },
  { to: "/admin/homepage", label: "Homepage & About", icon: Home },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/services", label: "Services", icon: Stethoscope },
  { to: "/admin/doctors", label: "Doctors", icon: UserRound },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/popup", label: "Popup Banners", icon: Megaphone },
  { to: "/admin/careers", label: "Careers", icon: Briefcase },
]

export function AdminShell({ title, breadcrumb, children }: { title: string; breadcrumb?: string; children: ReactNode }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [newCount, setNewCount] = useState<number>(0)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const { count } = await supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "new")
      if (mounted) setNewCount(count || 0)
    }
    load()
    const ch = supabase.channel("appointments-badge")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, load)
      .subscribe()
    return () => { mounted = false; supabase.removeChannel(ch) }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out")
    navigate({ to: "/admin/login" })
  }

  const badgeFor = (key?: string) => key === "appointments" && newCount > 0 ? newCount : null

  return (
    <div className="min-h-screen flex" style={{ background: "#f8f9fa" }}>
      <aside className="w-60 flex-shrink-0 flex flex-col text-white" style={{ background: "#2D0A1E" }}>
        <div className="p-5 flex items-center gap-2 border-b border-white/10">
          <Hospital className="w-6 h-6 text-pink-400" />
          <div className="font-serif font-bold">Subhashree CMS</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => {
            const active = it.to === "/admin" ? pathname === "/admin" : pathname.startsWith(it.to)
            const badge = badgeFor((it as any).badgeKey)
            return (
              <Link
                key={it.to}
                to={it.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ background: active ? "#E6007E" : "transparent", color: "white" }}
              >
                <it.icon className="w-4 h-4" />
                <span className="flex-1">{it.label}</span>
                {badge !== null && (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "#E6007E", color: "white", minWidth: 18, textAlign: "center" }}>
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
        <button onClick={logout} className="m-3 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/10">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 bg-white border-b px-6 flex items-center">
          <div>
            <div className="text-xs text-muted-foreground">{breadcrumb || "Admin"}</div>
            <h1 className="text-base font-bold" style={{ color: "#2D0A1E" }}>{title}</h1>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </main>
    </div>
  )
}

export function AdminLoading() {
  return <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8f9fa" }}>
    <div className="text-sm text-muted-foreground">Loading admin…</div>
  </div>
}
