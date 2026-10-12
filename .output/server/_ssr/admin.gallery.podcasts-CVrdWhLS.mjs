import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { X, s as supabase, b as ue } from "./router-D3NQCnuk.mjs";
import { a as getYouTubeThumbnail } from "./youtube-id-BFcJ0C81.mjs";
import { P as Plus } from "./plus-_pcJFpCM.mjs";
import { P as Pencil } from "./pencil-mCoYCDbe.mjs";
import { T as Trash2 } from "./trash-2-DhLuOvGs.mjs";



import "./user-round-BantWQqJ.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


const empty = {
  title: "",
  description: "",
  youtube_url: "",
  order_index: 0,
  is_active: true
};
function AdminPodcastsPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [items, setItems] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("podcasts").select("*").order("order_index", {
      ascending: true
    });
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    if (!editing.youtube_url.trim()) return ue.error("YouTube URL is required");
    const payload = {
      ...editing,
      description: editing.description || null
    };
    const {
      error
    } = editing.id ? await supabase.from("podcasts").update(payload).eq("id", editing.id) : await supabase.from("podcasts").insert(payload);
    if (error) return ue.error(error.message);
    ue.success("Podcast saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this podcast? This cannot be undone.")) return;
    const {
      error
    } = await supabase.from("podcasts").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Podcast deleted");
    load();
  };
  const toggleActive = async (it) => {
    const {
      error
    } = await supabase.from("podcasts").update({
      is_active: !it.is_active
    }).eq("id", it.id);
    if (error) return ue.error(error.message);
    load();
  };
  const updateOrder = async (it, v) => {
    const {
      error
    } = await supabase.from("podcasts").update({
      order_index: v
    }).eq("id", it.id);
    if (error) return ue.error(error.message);
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Podcasts", breadcrumb: "Admin / Gallery / Podcasts", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " podcasts"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty,
        order_index: items.length
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#8B0F50"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " Add Podcast"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border overflow-hidden", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-10", children: "No podcasts yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Thumbnail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-24", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-24", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-32 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((it) => {
        const thumb = getYouTubeThumbnail(it.youtube_url);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: thumb ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumb, alt: "", style: {
            width: 64,
            height: 40,
            objectFit: "cover",
            borderRadius: 6
          } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-10 bg-gray-100 rounded" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium", children: it.title || "(untitled)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", defaultValue: it.order_index, onBlur: (e) => updateOrder(it, Number(e.target.value)), className: "w-16 px-2 py-1 border rounded" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleActive(it), className: "px-2 py-1 rounded text-xs font-semibold", style: {
            background: it.is_active ? "#DCFCE7" : "#FEE2E2",
            color: it.is_active ? "#166534" : "#991B1B"
          }, children: it.is_active ? "Active" : "Hidden" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(it), className: "inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-xs mr-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => remove(it.id), className: "inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 text-red-600 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }),
              " Delete"
            ] })
          ] })
        ] }, it.id);
      }) })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "Add",
          " Podcast"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title, onChange: (e) => setEditing({
          ...editing,
          title: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "YouTube URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.youtube_url, onChange: (e) => setEditing({
          ...editing,
          youtube_url: e.target.value
        }), placeholder: "https://www.youtube.com/watch?v=...", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editing.description || "", onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order index", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.order_index, onChange: (e) => setEditing({
          ...editing,
          order_index: Number(e.target.value)
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_active, onChange: (e) => setEditing({
            ...editing,
            is_active: e.target.checked
          }) }),
          "Active (visible on website)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "w-full py-2.5 rounded-lg text-white font-semibold", style: {
          background: "#8B0F50"
        }, children: editing.id ? "Save Changes" : "Add Podcast" })
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground mb-1", children: label }),
    children
  ] });
}
export {
  AdminPodcastsPage as component
};
