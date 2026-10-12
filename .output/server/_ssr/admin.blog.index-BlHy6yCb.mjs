import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { L as Link, s as supabase, b as ue } from "./router-D3NQCnuk.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { S as Search } from "./search-BYbblEQo.mjs";
import { P as Plus } from "./plus-_pcJFpCM.mjs";
import { P as Pencil } from "./pencil-mCoYCDbe.mjs";
import { E as Eye } from "./eye-ClSFFkn7.mjs";
import { T as Trash2 } from "./trash-2-DhLuOvGs.mjs";



import "./index-CZVAwXUt.mjs";
import "./user-round-BantWQqJ.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./briefcase-C6CtCSJl.mjs";

import "../_libs/unenv.mjs";


function AdminBlogListPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [posts, setPosts] = reactExports.useState([]);
  const [q, setQ] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("blogs").select("*").order("created_at", {
      ascending: false
    });
    if (error) ue.error(error.message);
    setPosts(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const filtered = posts.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });
  const remove = async (id) => {
    if (!confirm("Delete this post permanently?")) return;
    const {
      error
    } = await supabase.from("blogs").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Blog Posts", breadcrumb: "Admin / Blog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search title…", className: "w-full pl-9 pr-3 py-2 border rounded-lg bg-white" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "px-3 py-2 border rounded-lg bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blog/$id", params: {
        id: "new"
      }, className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Post"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Author" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Words" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-10 text-center text-muted-foreground", children: "No posts found." }) }),
        filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.category || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
            background: p.status === "published" ? "#D1FADF" : "#FEF3C7",
            color: p.status === "published" ? "#027A48" : "#92400E"
          }, children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.author || "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: new Date(p.published_at || p.created_at).toLocaleDateString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: p.word_count || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog/$id", params: {
              id: p.id
            }, className: "p-1.5 hover:bg-pink-50 rounded", title: "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
            p.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
              slug: p.slug
            }, target: "_blank", className: "p-1.5 hover:bg-pink-50 rounded", title: "View", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(p.id), className: "p-1.5 hover:bg-red-50 rounded text-red-600", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] }) })
        ] }, p.id))
      ] })
    ] }) })
  ] });
}
export {
  AdminBlogListPage as component
};
