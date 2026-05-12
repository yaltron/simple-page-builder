import { ReactNode, useEffect, useState } from "react"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { LayoutDashboard, FileText, LogOut, Hospital, Stethoscope, UserRound, Image as ImageIcon, MessageSquareQuote, CalendarCheck } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/appointments", label: "Appointments", icon: CalendarCheck, badgeKey: "appointments" as const },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText },
  { to: "/admin/services", label: "Services", icon: Stethoscope },
  { to: "/admin/doctors", label: "Doctors", icon: UserRound },
  { to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
]

export function AdminShell({ title, breadcrumb, children }: { title: string; breadcrumb?: string; children: ReactNode }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const logout = async () => {
    await supabase.auth.signOut()
    toast.success("Logged out")
    navigate({ to: "/admin/login" })
  }

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
            return (
              <Link
                key={it.to}
                to={it.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ background: active ? "#E6007E" : "transparent", color: "white" }}
              >
                <it.icon className="w-4 h-4" />
                {it.label}
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
