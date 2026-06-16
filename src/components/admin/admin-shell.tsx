import { ReactNode, useEffect, useState } from "react"
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import {
  LayoutDashboard, FileText, LogOut, Stethoscope, UserRound, Image as ImageIcon,
  MessageSquareQuote, CalendarCheck, HelpCircle, Megaphone, Home, Briefcase,
  Info, ChevronDown,
} from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import logo from "@/assets/logo.png"

type LeafItem = { to: string; label: string; params?: Record<string, string>; matchPath?: string }
type NavItem = {
  key: string
  label: string
  icon: any
  to?: string
  badgeKey?: "appointments"
  children?: LeafItem[]
}


const navItems: NavItem[] = [
  { key: "dashboard", to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    key: "homepage", label: "Homepage", icon: Home,
    children: [
      { to: "/admin/homepage/hero", label: "Hero Section" },
      { to: "/admin/homepage/who-we-are", label: "Who We Are" },
      { to: "/admin/homepage/services", label: "Services" },
      { to: "/admin/homepage/how-it-works", label: "How It Works" },
      { to: "/admin/homepage/when-to-visit", label: "When To Visit" },
      { to: "/admin/homepage/doctors-heading", label: "Our Doctors" },
      { to: "/admin/homepage/why-choose-us", label: "Why Choose Us" },
      { to: "/admin/homepage/cta-banner", label: "CTA Banner" },
    ],
  },
  {
    key: "about", label: "About Us", icon: Info,
    children: [
      { to: "/admin/about/our-story", label: "Our Story" },
      { to: "/admin/about/mission-vision", label: "Mission & Vision" },
      { to: "/admin/about/values", label: "Our Values" },
    ],
  },
  { key: "appointments", to: "/admin/appointments", label: "Appointments", icon: CalendarCheck, badgeKey: "appointments" },
  {
    key: "blog", label: "Blog Posts", icon: FileText,
    children: [
      { to: "/admin/blog", label: "All Posts" },
      { to: "/admin/blog/$id", params: { id: "new" }, matchPath: "/admin/blog/new", label: "Add New Post" },
    ],
  },

  { key: "team", to: "/admin/team", label: "Our Team", icon: UserRound },
  { key: "services", to: "/admin/services", label: "Services", icon: Stethoscope },
  { key: "faqs", to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { key: "gallery", to: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { key: "testimonials", to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { key: "popup", to: "/admin/popup-banners", label: "Popup Banners", icon: Megaphone },
  {
    key: "career", label: "Career", icon: Briefcase,
    children: [
      { to: "/admin/career/listings", label: "Job Listings" },
      { to: "/admin/career/applications", label: "Applications" },
    ],
  },
]

const STORAGE_KEY = "admin-sidebar-open"

function isLeafActive(pathname: string, leaf: LeafItem) {
  const target = leaf.matchPath || leaf.to
  if (target === "/admin/blog") return pathname === "/admin/blog"
  if (target === "/admin/blog/new") return pathname === "/admin/blog/new" || (pathname.startsWith("/admin/blog/") && pathname !== "/admin/blog")
  if (target === "/admin") return pathname === "/admin"
  return pathname === target || pathname.startsWith(target + "/")
}

function isParentActive(pathname: string, item: NavItem) {
  if (!item.children) return false
  return item.children.some((c) => isLeafActive(pathname, c))
}


export function AdminShell({ title, breadcrumb, children }: { title: string; breadcrumb?: string; children: ReactNode }) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [newCount, setNewCount] = useState<number>(0)
  const [openKey, setOpenKey] = useState<string | null>(null)

  // initial open key (active parent OR persisted)
  useEffect(() => {
    const activeParent = navItems.find((it) => it.children && isParentActive(pathname, it))
    if (activeParent) {
      setOpenKey(activeParent.key)
      sessionStorage.setItem(STORAGE_KEY, activeParent.key)
      return
    }
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) setOpenKey(stored)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggle = (key: string) => {
    setOpenKey((prev) => {
      const next = prev === key ? null : key
      if (next) sessionStorage.setItem(STORAGE_KEY, next)
      else sessionStorage.removeItem(STORAGE_KEY)
      return next
    })
  }

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
    <div className="flex" style={{ background: "#f8f9fa", height: "100vh", overflow: "hidden" }}>
      <style>{`
        .admin-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
        .admin-sidebar-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
        .admin-main-scroll::-webkit-scrollbar { width: 6px; }
        .admin-main-scroll::-webkit-scrollbar-track { background: #f8f9fa; }
        .admin-main-scroll::-webkit-scrollbar-thumb { background: rgba(230,0,126,0.2); border-radius: 4px; }
        .admin-main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
      `}</style>
      <aside className="w-64 flex-shrink-0 flex flex-col text-white admin-sidebar-scroll" style={{ background: "#2D0A1E", height: "100vh", overflowY: "auto", overflowX: "hidden", position: "sticky", top: 0, left: 0 }}>
        <div style={{ padding: "16px 16px 8px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <img src={logo} alt="Subhashree IVF" style={{ width: 140, height: "auto", objectFit: "contain", display: "block", margin: "0 auto 4px auto", filter: "brightness(1.1)" }} />
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", textAlign: "center", paddingBottom: 8 }}>CMS Dashboard</div>
        </div>
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map((item, idx) => {
            const isParent = !!item.children
            const expanded = isParent && openKey === item.key
            const activeParent = isParent && isParentActive(pathname, item)
            const leafActive = !isParent && item.to ? isLeafActive(pathname, { to: item.to, label: item.label }) : false
            const showActive = leafActive || activeParent || expanded
            const badge = badgeFor(item.badgeKey)

            const parentStyle: React.CSSProperties = {
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: showActive ? "white" : "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              borderRadius: 10,
              transition: "background 0.2s",
              background: showActive ? "rgba(230,0,126,0.15)" : "transparent",
              borderLeft: showActive ? "3px solid #E6007E" : "3px solid transparent",
              paddingLeft: showActive ? 13 : 16,
              textDecoration: "none",
              width: "100%",
              border: "none",
              fontFamily: "inherit",
              marginBottom: 2,
            }

            return (
              <div key={item.key}>
                {idx > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px" }} />}

                {isParent ? (
                  <button
                    type="button"
                    onClick={() => toggle(item.key)}
                    style={parentStyle}
                    onMouseEnter={(e) => { if (!showActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)" }}
                    onMouseLeave={(e) => { if (!showActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    <ChevronDown
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.4)",
                        transition: "transform 0.25s ease",
                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        width: 14,
                        height: 14,
                      }}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.to!}
                    style={parentStyle}
                    onMouseEnter={(e) => { if (!showActive) (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)" }}
                    onMouseLeave={(e) => { if (!showActive) (e.currentTarget as HTMLAnchorElement).style.background = "transparent" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {badge !== null && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                        background: "#E6007E", color: "white", minWidth: 18, textAlign: "center",
                      }}>{badge}</span>
                    )}
                  </Link>
                )}

                {isParent && (
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: expanded ? 500 : 0,
                      transition: "max-height 0.3s ease",
                      marginBottom: expanded ? 4 : 0,
                    }}
                  >
                    {item.children!.map((c) => {
                      const active = isLeafActive(pathname, c)
                      return (
                        <Link
                          key={c.matchPath || c.to}
                          to={c.to as any}
                          params={c.params as any}

                          style={{
                            padding: "9px 16px 9px 44px",
                            fontSize: 13,
                            fontWeight: active ? 600 : 500,
                            color: active ? "#F48FB1" : "rgba(255,255,255,0.60)",
                            borderRadius: 8,
                            transition: "all 0.2s",
                            display: "block",
                            background: active ? "rgba(230,0,126,0.10)" : "transparent",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              const el = e.currentTarget as HTMLAnchorElement
                              el.style.color = "white"
                              el.style.background = "rgba(255,255,255,0.06)"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!active) {
                              const el = e.currentTarget as HTMLAnchorElement
                              el.style.color = "rgba(255,255,255,0.60)"
                              el.style.background = "transparent"
                            }
                          }}
                        >
                          {c.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px" }} />

          <button
            onClick={logout}
            style={{
              padding: "12px 16px",
              fontSize: 14,
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              width: "100%",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent" }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 min-w-0 flex flex-col admin-main-scroll" style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
        <header className="h-14 bg-white border-b px-6 flex items-center">
          <div>
            <div className="text-xs text-muted-foreground">{breadcrumb || "Admin"}</div>
            <h1 className="text-base font-bold" style={{ color: "#2D0A1E" }}>{title}</h1>
          </div>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  )
}

export function AdminLoading() {
  return <div className="min-h-screen flex items-center justify-center" style={{ background: "#f8f9fa" }}>
    <div className="text-sm text-muted-foreground">Loading admin…</div>
  </div>
}
