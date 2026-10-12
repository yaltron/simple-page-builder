import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-BL4u9tSP.js";
import { I as ImageUpload } from "./image-upload-M-0_XqF9.js";
import { R as RichTextEditor } from "./rich-text-editor-HgXCz3DN.js";
import { X, t as supabase, u as ue } from "./router-BvFo6ij6.js";
import { P as Plus } from "./plus-txrYVvu7.js";
import { P as Pencil } from "./pencil-kM0J4_v-.js";
import { T as Trash2 } from "./trash-2-BamfwLcJ.js";
import { a as ArrowUp, A as ArrowDown } from "./arrow-up-CQuBkeJa.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./user-round-Bj-qJepX.js";
import "./file-text-UddeTg2U.js";
import "./stethoscope-DDFrHJkj.js";
import "./briefcase-B6s7EvLN.js";
import "./image-to-webp-BeTkcpEw.js";
import "./upload-Cl4Q6rBm.js";
import "./undo-BUOOtPLg.js";
import "./quote-HiWp_oz1.js";
import "./minus-zLwwLlLj.js";
import "./index-Dn3DJaKR.js";
const empty = {
  title: "",
  slug: "",
  short_description: "",
  description: "",
  icon: "Heart",
  featured_image: null,
  display_order: 0,
  status: "published",
  full_content: "",
  page_heading: "",
  page_subtext: "",
  meta_title: "",
  meta_description: "",
  hero_image_url: "",
  hero_image_alt: "",
  key_points: []
};
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function AdminServicesPage() {
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
    } = await supabase.from("services").select("*").order("display_order");
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    const slug = editing.slug || slugify(editing.title);
    const payload = {
      ...editing,
      slug,
      key_points: editing.key_points || []
    };
    const {
      error
    } = editing.id ? await supabase.from("services").update(payload).eq("id", editing.id) : await supabase.from("services").insert(payload);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;
    const {
      error
    } = await supabase.from("services").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  const updateKP = (i, v) => {
    if (!editing) return;
    const next = [...editing.key_points || []];
    next[i] = v;
    setEditing({
      ...editing,
      key_points: next
    });
  };
  const addKP = () => editing && setEditing({
    ...editing,
    key_points: [...editing.key_points || [], ""]
  });
  const removeKP = (i) => editing && setEditing({
    ...editing,
    key_points: (editing.key_points || []).filter((_, j) => j !== i)
  });
  const moveKP = (i, dir) => {
    if (!editing) return;
    const j = i + dir;
    const arr = [...editing.key_points || []];
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setEditing({
      ...editing,
      key_points: arr
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Services", breadcrumb: "Admin / Services", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " services"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Service"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-left text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: "No services yet." }) }),
        items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t hover:bg-gray-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: s.display_order }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: s.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-xs", children: s.slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
            background: s.status === "published" ? "#D1FADF" : "#FEF3C7",
            color: s.status === "published" ? "#027A48" : "#92400E"
          }, children: s.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing({
              ...empty,
              ...s,
              key_points: s.key_points || []
            }), className: "p-1.5 hover:bg-pink-50 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(s.id), className: "p-1.5 hover:bg-red-50 rounded text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
          ] })
        ] }, s.id))
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Service"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title, onChange: (e) => setEditing({
          ...editing,
          title: e.target.value,
          slug: editing.slug || slugify(e.target.value)
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug (URL)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.slug, onChange: (e) => setEditing({
          ...editing,
          slug: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg font-mono text-sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Icon name (lucide-react)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.icon, onChange: (e) => setEditing({
          ...editing,
          icon: e.target.value
        }), placeholder: "Heart, Microscope, Dna…", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Short description (cards)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editing.short_description || "", onChange: (e) => setEditing({
          ...editing,
          short_description: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm", children: "Service Page Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Page heading (on /services/slug)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.page_heading || "", onChange: (e) => setEditing({
          ...editing,
          page_heading: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Page subtext", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editing.page_subtext || "", onChange: (e) => setEditing({
          ...editing,
          page_subtext: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground", children: "Key points (What to Expect)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: addKP, className: "ml-auto text-xs px-2 py-1 rounded border inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
              " Add point"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            (editing.key_points || []).map((kp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => moveKP(i, -1), className: "p-0.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => moveKP(i, 1), className: "p-0.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: kp, onChange: (e) => updateKP(i, e.target.value), className: "flex-1 px-3 py-2 border rounded-lg text-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeKP(i), className: "p-1.5 hover:bg-red-50 text-red-600 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }) })
            ] }, i)),
            (editing.key_points || []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "No points yet." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hero image (service page)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.hero_image_url, onChange: (url) => setEditing({
          ...editing,
          hero_image_url: url
        }), folder: "services" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Hero image alt text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.hero_image_alt || "", onChange: (e) => setEditing({
          ...editing,
          hero_image_alt: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full content (rich text)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextEditor, { value: editing.full_content || "", onChange: (html) => setEditing({
          ...editing,
          full_content: html
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm", children: "SEO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Meta title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.meta_title || "", onChange: (e) => setEditing({
          ...editing,
          meta_title: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Meta description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editing.meta_description || "", onChange: (e) => setEditing({
          ...editing,
          meta_description: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Featured image (card thumbnail)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.featured_image, onChange: (url) => setEditing({
          ...editing,
          featured_image: url
        }), folder: "services" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Display order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.display_order, onChange: (e) => setEditing({
            ...editing,
            display_order: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.status, onChange: (e) => setEditing({
            ...editing,
            status: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "w-full py-2.5 rounded-lg text-white font-semibold", style: {
          background: "#E6007E"
        }, children: "Save" })
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
  AdminServicesPage as component
};
