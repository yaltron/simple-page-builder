import { M as jsxRuntimeExports, X as reactExports } from "../server.js";
import { v as useNavigate, y as useRouterState, t as supabase, b as ChevronDown, L as Link, u as ue } from "./router-BvFo6ij6.js";
import { L as LayoutDashboard, H as House, b as Info, C as CalendarCheck, U as UserRound, a as CircleQuestionMark, I as Image, d as MessageSquareQuote, M as Megaphone, c as LogOut } from "./user-round-Bj-qJepX.js";
import { F as FileText } from "./file-text-UddeTg2U.js";
import { S as Stethoscope } from "./stethoscope-DDFrHJkj.js";
import { B as Briefcase } from "./briefcase-B6s7EvLN.js";
const logo = "/logo.png";
const navItems = [
  { key: "dashboard", to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    key: "homepage",
    label: "Homepage",
    icon: House,
    children: [
      { to: "/admin/homepage/hero", label: "Hero Section" },
      { to: "/admin/homepage/who-we-are", label: "Who We Are" },
      { to: "/admin/homepage/services", label: "Services" },
      { to: "/admin/homepage/how-it-works", label: "How It Works" },
      { to: "/admin/homepage/when-to-visit", label: "When To Visit" },
      { to: "/admin/homepage/doctors-heading", label: "Our Doctors" },
      { to: "/admin/homepage/why-choose-us", label: "Why Choose Us" },
      { to: "/admin/homepage/cta-banner", label: "CTA Banner" }
    ]
  },
  {
    key: "about",
    label: "About Us",
    icon: Info,
    children: [
      { to: "/admin/about/our-story", label: "Our Story" },
      { to: "/admin/about/mission-vision", label: "Mission & Vision" },
      { to: "/admin/about/why-choose-us", label: "Why Choose Us" },
      { to: "/admin/about/values", label: "Our Values" },
      { to: "/admin/about/cta-banner", label: "CTA Banner" }
    ]
  },
  { key: "appointments", to: "/admin/appointments", label: "Appointments", icon: CalendarCheck, badgeKey: "appointments" },
  {
    key: "blog",
    label: "Blog Posts",
    icon: FileText,
    children: [
      { to: "/admin/blog", label: "All Posts" },
      { to: "/admin/blog/$id", params: { id: "new" }, matchPath: "/admin/blog/new", label: "Add New Post" }
    ]
  },
  { key: "team", to: "/admin/team", label: "Our Team", icon: UserRound },
  { key: "services", to: "/admin/services", label: "Services", icon: Stethoscope },
  { key: "faqs", to: "/admin/faqs", label: "FAQs", icon: CircleQuestionMark },
  {
    key: "gallery",
    label: "Gallery",
    icon: Image,
    children: [
      { to: "/admin/gallery", label: "All Items" },
      { to: "/admin/gallery/podcasts", label: "Podcasts" },
      { to: "/admin/gallery/virtual-tour", label: "Virtual Tour" }
    ]
  },
  { key: "testimonials", to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { key: "popup", to: "/admin/popup-banners", label: "Popup Banners", icon: Megaphone },
  {
    key: "career",
    label: "Career",
    icon: Briefcase,
    children: [
      { to: "/admin/career/listings", label: "Job Listings" },
      { to: "/admin/career/applications", label: "Applications" }
    ]
  }
];
const STORAGE_KEY = "admin-sidebar-open";
function isLeafActive(pathname, leaf) {
  const target = leaf.matchPath || leaf.to;
  if (target === "/admin/blog") return pathname === "/admin/blog";
  if (target === "/admin/blog/new") return pathname === "/admin/blog/new" || pathname.startsWith("/admin/blog/") && pathname !== "/admin/blog";
  if (target === "/admin") return pathname === "/admin";
  return pathname === target || pathname.startsWith(target + "/");
}
function isParentActive(pathname, item) {
  if (!item.children) return false;
  return item.children.some((c) => isLeafActive(pathname, c));
}
function AdminShell({ title, breadcrumb, children }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [newCount, setNewCount] = reactExports.useState(0);
  const [openKey, setOpenKey] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const activeParent = navItems.find((it) => it.children && isParentActive(pathname, it));
    if (activeParent) {
      setOpenKey(activeParent.key);
      sessionStorage.setItem(STORAGE_KEY, activeParent.key);
      return;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setOpenKey(stored);
  }, [pathname]);
  const toggle = (key) => {
    setOpenKey((prev) => {
      const next = prev === key ? null : key;
      if (next) sessionStorage.setItem(STORAGE_KEY, next);
      else sessionStorage.removeItem(STORAGE_KEY);
      return next;
    });
  };
  reactExports.useEffect(() => {
    let mounted = true;
    const load = async () => {
      const { count } = await supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "new");
      if (mounted) setNewCount(count || 0);
    };
    load();
    const ch = supabase.channel("appointments-badge").on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, load).subscribe();
    return () => {
      mounted = false;
      supabase.removeChannel(ch);
    };
  }, []);
  const logout = async () => {
    await supabase.auth.signOut();
    ue.success("Logged out");
    navigate({ to: "/admin/login" });
  };
  const badgeFor = (key) => key === "appointments" && newCount > 0 ? newCount : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", style: { background: "#f8f9fa", height: "100vh", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .admin-sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        .admin-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
        .admin-sidebar-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
        .admin-main-scroll::-webkit-scrollbar { width: 6px; }
        .admin-main-scroll::-webkit-scrollbar-track { background: #f8f9fa; }
        .admin-main-scroll::-webkit-scrollbar-thumb { background: rgba(230,0,126,0.2); border-radius: 4px; }
        .admin-main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
      ` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 flex-shrink-0 flex flex-col text-white admin-sidebar-scroll", style: { background: "#2D0A1E", height: "100vh", overflowY: "auto", overflowX: "hidden", position: "sticky", top: 0, left: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "16px 16px 8px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Shubhashree IVF", className: "crisp-logo", style: { height: 36, width: "auto", maxWidth: 140, objectFit: "contain", objectPosition: "center", display: "block", margin: "0 auto 4px auto", background: "white", borderRadius: 8, padding: 4 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.45)", textAlign: "center", paddingBottom: 8 }, children: "CMS Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-3 py-2 overflow-y-auto", children: [
        navItems.map((item, idx) => {
          const isParent = !!item.children;
          const expanded = isParent && openKey === item.key;
          const activeParent = isParent && isParentActive(pathname, item);
          const leafActive = !isParent && item.to ? isLeafActive(pathname, { to: item.to, label: item.label }) : false;
          const showActive = leafActive || activeParent || expanded;
          const badge = badgeFor(item.badgeKey);
          const parentStyle = {
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
            marginBottom: 2
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            idx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px" } }),
            isParent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => toggle(item.key),
                style: parentStyle,
                onMouseEnter: (e) => {
                  if (!showActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                },
                onMouseLeave: (e) => {
                  if (!showActive) e.currentTarget.style.background = "transparent";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }),
                    item.label
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      style: {
                        fontSize: 12,
                        color: "rgba(255,255,255,0.4)",
                        transition: "transform 0.25s ease",
                        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                        width: 14,
                        height: 14
                      }
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                style: parentStyle,
                onMouseEnter: (e) => {
                  if (!showActive) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                },
                onMouseLeave: (e) => {
                  if (!showActive) e.currentTarget.style.background = "transparent";
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4" }),
                    item.label
                  ] }),
                  badge !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 999,
                    background: "#E6007E",
                    color: "white",
                    minWidth: 18,
                    textAlign: "center"
                  }, children: badge })
                ]
              }
            ),
            isParent && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  overflow: "hidden",
                  maxHeight: expanded ? 500 : 0,
                  transition: "max-height 0.3s ease",
                  marginBottom: expanded ? 4 : 0
                },
                children: item.children.map((c) => {
                  const active = isLeafActive(pathname, c);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: c.to,
                      params: c.params,
                      style: {
                        padding: "9px 16px 9px 44px",
                        fontSize: 13,
                        fontWeight: active ? 600 : 500,
                        color: active ? "#F48FB1" : "rgba(255,255,255,0.60)",
                        borderRadius: 8,
                        transition: "all 0.2s",
                        display: "block",
                        background: active ? "rgba(230,0,126,0.10)" : "transparent",
                        textDecoration: "none"
                      },
                      onMouseEnter: (e) => {
                        if (!active) {
                          const el = e.currentTarget;
                          el.style.color = "white";
                          el.style.background = "rgba(255,255,255,0.06)";
                        }
                      },
                      onMouseLeave: (e) => {
                        if (!active) {
                          const el = e.currentTarget;
                          el.style.color = "rgba(255,255,255,0.60)";
                          el.style.background = "transparent";
                        }
                      },
                      children: c.label
                    },
                    c.matchPath || c.to
                  );
                })
              }
            )
          ] }, item.key);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: logout,
            style: {
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
              fontFamily: "inherit"
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
              " Logout"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 min-w-0 flex flex-col admin-main-scroll", style: { height: "100vh", overflowY: "auto", overflowX: "hidden" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "h-14 bg-white border-b px-6 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: breadcrumb || "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold", style: { color: "#2D0A1E" }, children: title })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-6", children })
    ] })
  ] });
}
function AdminLoading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", style: { background: "#f8f9fa" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Loading admin…" }) });
}
function useAdminAuth(opts = {}) {
  const { redirectIfNotAdmin = true } = opts;
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [loading, setLoading] = reactExports.useState(true);
  const [userId, setUserId] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    const check = async (uid) => {
      if (!uid) {
        if (!cancelled) {
          setUserId(null);
          setIsAdmin(false);
          setLoading(false);
          if (redirectIfNotAdmin) navigate({ to: "/admin/login", search: { from: pathname } });
        }
        return;
      }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid).eq("role", "admin").maybeSingle();
      if (cancelled) return;
      const admin = !!data;
      setUserId(uid);
      setIsAdmin(admin);
      setLoading(false);
      if (redirectIfNotAdmin && !admin) navigate({ to: "/admin/login", search: { from: pathname } });
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      check(session?.user?.id ?? null);
    });
    supabase.auth.getSession().then(({ data }) => check(data.session?.user?.id ?? null));
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);
  return { loading, userId, isAdmin };
}
export {
  AdminLoading as A,
  AdminShell as a,
  useAdminAuth as u
};
