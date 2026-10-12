import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { C as ColorPicker } from "./color-picker-BcfGrOpe.mjs";
import { R as RichTextEditor } from "./rich-text-editor-CX4qyGpg.mjs";
import { X, s as supabase, b as ue } from "./router-D3NQCnuk.mjs";
import { P as Plus } from "./plus-_pcJFpCM.mjs";
import { A as ArrowUp, a as ArrowDown } from "./arrow-up-Bz_3TtFV.mjs";
import { P as Pencil } from "./pencil-mCoYCDbe.mjs";
import { T as Trash2 } from "./trash-2-DhLuOvGs.mjs";



import "./user-round-BantWQqJ.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./undo-BAl34KoQ.mjs";
import "./quote-BllpPa8P.mjs";
import "./minus-Bw_s4iG4.mjs";
import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


const empty = {
  title: "",
  slug: "",
  short_description: "",
  full_content: "",
  icon: "Sparkles",
  icon_bg_color: "#8B0F50",
  page_heading: "",
  page_subtext: "",
  meta_title: "",
  meta_description: "",
  order_index: 0,
  is_active: true
};
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
function Page() {
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
    } = await supabase.from("trust_features").select("*").order("order_index");
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) return ue.error("Title required");
    const payload = {
      ...editing,
      slug: editing.slug || slugify(editing.title)
    };
    const {
      error
    } = editing.id ? await supabase.from("trust_features").update(payload).eq("id", editing.id) : await supabase.from("trust_features").insert(payload);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this feature card?")) return;
    const {
      error
    } = await supabase.from("trust_features").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  const move = async (f, dir) => {
    const sorted = [...items].sort((a, b) => a.order_index - b.order_index);
    const idx = sorted.findIndex((x) => x.id === f.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    await supabase.from("trust_features").update({
      order_index: swap.order_index
    }).eq("id", f.id);
    await supabase.from("trust_features").update({
      order_index: f.order_index
    }).eq("id", swap.id);
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Why Choose Us", breadcrumb: "Admin / Homepage / Why Choose Us", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " feature card",
        items.length === 1 ? "" : "s"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty,
        order_index: items.reduce((m, x) => Math.max(m, x.order_index || 0), 0) + 1
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#8B0F50"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Card"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      items.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg", style: {
            background: f.icon_bg_color
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold truncate", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
              "/",
              f.slug
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3 mb-3", children: f.short_description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => move(f, -1), className: "p-1.5 border rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => move(f, 1), className: "p-1.5 border rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(f), className: "flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
            " Edit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(f.id), className: "px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }) })
        ] })
      ] }, f.id)),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No cards yet." })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Feature Card"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title, onChange: (e) => setEditing({
          ...editing,
          title: e.target.value,
          slug: editing.slug || slugify(e.target.value)
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.slug, onChange: (e) => setEditing({
          ...editing,
          slug: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg font-mono text-sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Short Description (card text)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editing.short_description, onChange: (e) => setEditing({
          ...editing,
          short_description: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Icon (Lucide name e.g. UserCheck, HeartHandshake, HandCoins, Sparkles)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.icon, onChange: (e) => setEditing({
          ...editing,
          icon: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Icon Background Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { value: editing.icon_bg_color, onChange: (v) => setEditing({
          ...editing,
          icon_bg_color: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Page Heading (detail page)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.page_heading, onChange: (e) => setEditing({
          ...editing,
          page_heading: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Page Subtext", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.page_subtext, onChange: (e) => setEditing({
          ...editing,
          page_subtext: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Content (rich text)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextEditor, { value: editing.full_content, onChange: (html) => setEditing({
          ...editing,
          full_content: html
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Meta Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.meta_title, onChange: (e) => setEditing({
            ...editing,
            meta_title: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Meta Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.meta_description, onChange: (e) => setEditing({
            ...editing,
            meta_description: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.order_index, onChange: (e) => setEditing({
            ...editing,
            order_index: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm pt-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_active, onChange: (e) => setEditing({
              ...editing,
              is_active: e.target.checked
            }) }),
            "Active (visible on homepage)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "w-full py-2.5 rounded-lg text-white font-semibold", style: {
          background: "#8B0F50"
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
  Page as component
};
