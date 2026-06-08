import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { s as supabase, c as Clock, L as Link } from "./router-4B5-JGly.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-Ce2DoEvQ.js";
import { C as CalendarCheck, I as Image } from "./user-round-fnYlCX4m.js";
import { C as CalendarDays, a as CalendarRange } from "./calendar-range-VxvM3j6w.js";
import { F as FileText } from "./file-text-BJ6E_L4F.js";
import { C as CircleCheck } from "./circle-check-fYV4Wd0M.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
import "./logo-mJLYSy2R.js";
import "./stethoscope-Dg79Wn2h.js";
import "./briefcase-CL4WmvrV.js";
function AdminDashboardPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [stats, setStats] = reactExports.useState({
    total: 0,
    published: 0,
    drafts: 0
  });
  const [appts, setAppts] = reactExports.useState({
    newCount: 0,
    today: 0,
    week: 0
  });
  const [recent, setRecent] = reactExports.useState([]);
  const [recentAppts, setRecentAppts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const {
        data: all
      } = await supabase.from("blogs").select("id,title,status,published_at,created_at").order("created_at", {
        ascending: false
      });
      const list = all || [];
      setStats({
        total: list.length,
        published: list.filter((b) => b.status === "published").length,
        drafts: list.filter((b) => b.status === "draft").length
      });
      setRecent(list.slice(0, 5));
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const todayStr = today.toISOString().slice(0, 10);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const [{
        count: newCount
      }, {
        count: todayCount
      }, {
        count: weekCount
      }, {
        data: latestAppts
      }] = await Promise.all([supabase.from("appointments").select("id", {
        count: "exact",
        head: true
      }).eq("status", "new"), supabase.from("appointments").select("id", {
        count: "exact",
        head: true
      }).eq("preferred_date", todayStr), supabase.from("appointments").select("id", {
        count: "exact",
        head: true
      }).gte("created_at", weekAgo.toISOString()), supabase.from("appointments").select("id,full_name,phone,preferred_date,preferred_time,status,created_at").order("created_at", {
        ascending: false
      }).limit(5)]);
      setAppts({
        newCount: newCount || 0,
        today: todayCount || 0,
        week: weekCount || 0
      });
      setRecentAppts(latestAppts || []);
    })();
  }, [isAdmin]);
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  const cards = [{
    label: "New Appointments",
    value: appts.newCount,
    icon: CalendarCheck,
    accent: true
  }, {
    label: "Today's Appointments",
    value: appts.today,
    icon: CalendarDays,
    accent: true
  }, {
    label: "This Week",
    value: appts.week,
    icon: CalendarRange,
    accent: true
  }, {
    label: "Total Posts",
    value: stats.total,
    icon: FileText
  }, {
    label: "Published",
    value: stats.published,
    icon: CircleCheck
  }, {
    label: "Drafts",
    value: stats.drafts,
    icon: Clock
  }, {
    label: "Media",
    value: "-",
    icon: Image
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Dashboard", breadcrumb: "Admin / Dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-5 border flex items-center gap-4", style: c.accent ? {
      borderColor: "#E6007E33",
      boxShadow: "0 2px 12px rgba(230,0,126,0.06)"
    } : void 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center", style: {
        background: c.accent ? "#E6007E" : "#FFE4EF",
        color: c.accent ? "white" : "#E6007E"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", style: {
          color: "#2D0A1E"
        }, children: c.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.label })
      ] })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", style: {
          color: "#2D0A1E"
        }, children: "Recent Appointments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/appointments", className: "text-sm font-semibold", style: {
          color: "#E6007E"
        }, children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          recentAppts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-5 py-10 text-center text-muted-foreground", children: "No appointments yet." }) }),
          recentAppts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: a.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: a.phone }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-muted-foreground", children: [
              a.preferred_date,
              " · ",
              a.preferred_time
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full capitalize", style: {
              background: a.status === "new" ? "#FFE4EF" : a.status === "confirmed" ? "#D1FADF" : "#F3F4F6",
              color: a.status === "new" ? "#E6007E" : a.status === "confirmed" ? "#027A48" : "#374151"
            }, children: a.status }) })
          ] }, a.id))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", style: {
          color: "#2D0A1E"
        }, children: "Recent Posts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog", className: "text-sm font-semibold", style: {
          color: "#E6007E"
        }, children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          recent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 3, className: "px-5 py-10 text-center text-muted-foreground", children: [
            "No posts yet. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog/$id", params: {
              id: "new"
            }, className: "font-semibold", style: {
              color: "#E6007E"
            }, children: "Create one →" })
          ] }) }),
          recent.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: b.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
              background: b.status === "published" ? "#D1FADF" : "#FEF3C7",
              color: b.status === "published" ? "#027A48" : "#92400E"
            }, children: b.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground", children: new Date(b.published_at || b.created_at).toLocaleDateString() })
          ] }, b.id))
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboardPage as component
};
