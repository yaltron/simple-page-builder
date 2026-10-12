import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-BL4u9tSP.js";
import { I as ImageUpload } from "./image-upload-M-0_XqF9.js";
import { C as ColorPicker } from "./color-picker-CW1j_8Gk.js";
import { X, t as supabase, u as ue } from "./router-BvFo6ij6.js";
import { P as Plus } from "./plus-txrYVvu7.js";
import { S as Star } from "./star-DHXkNk1H.js";
import { P as Pencil } from "./pencil-kM0J4_v-.js";
import { T as Trash2 } from "./trash-2-BamfwLcJ.js";
import { S as Save } from "./save-Qlm-pCq7.js";
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
import "./index-Dn3DJaKR.js";
const empty = {
  name: "",
  location: "",
  story: "",
  image: null,
  video_url: "",
  rating: 5,
  treatment: "",
  display_order: 0,
  status: "published"
};
function AdminTestimonialsPage() {
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
    } = await supabase.from("testimonials").select("*").order("display_order");
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    const {
      error
    } = editing.id ? await supabase.from("testimonials").update(editing).eq("id", editing.id) : await supabase.from("testimonials").insert(editing);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    const {
      error
    } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Testimonials", breadcrumb: "Admin / Testimonials", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeadingColorEditor, { sectionKey: "testimonials", label: "Testimonials Section Heading Color" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " testimonials"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Testimonial"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-gray-100 overflow-hidden flex-shrink-0", children: t.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.image, alt: t.name, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold truncate", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: t.location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-2", children: Array.from({
          length: t.rating || 0
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current text-yellow-500" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3 mb-3", children: t.story }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(t), className: "flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
            " Edit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(t.id), className: "px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }) })
        ] })
      ] }, t.id)),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No testimonials yet." })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Testimonial"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.image, onChange: (url) => setEditing({
          ...editing,
          image: url
        }), folder: "testimonials" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.name, onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.location || "", onChange: (e) => setEditing({
          ...editing,
          location: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Treatment", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.treatment || "", onChange: (e) => setEditing({
          ...editing,
          treatment: e.target.value
        }), placeholder: "IVF, ICSI…", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Story", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, value: editing.story || "", onChange: (e) => setEditing({
          ...editing,
          story: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Video URL (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.video_url || "", onChange: (e) => setEditing({
          ...editing,
          video_url: e.target.value
        }), placeholder: "https://www.youtube.com/embed/…", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rating", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: editing.rating, onChange: (e) => setEditing({
            ...editing,
            rating: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: n, children: n }, n)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.display_order, onChange: (e) => setEditing({
            ...editing,
            display_order: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.status, onChange: (e) => setEditing({
            ...editing,
            status: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Pub" }),
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
function HeadingColorEditor({
  sectionKey,
  label
}) {
  const [color, setColor] = reactExports.useState("#C2185B");
  const [loaded, setLoaded] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("homepage_content").select("content").eq("section", sectionKey).maybeSingle();
      if (data?.content && typeof data.content.heading_color === "string") {
        setColor(data.content.heading_color);
      }
      setLoaded(true);
    })();
  }, [sectionKey]);
  const save = async () => {
    setSaving(true);
    const {
      data: existing
    } = await supabase.from("homepage_content").select("id, content").eq("section", sectionKey).maybeSingle();
    const next = {
      ...existing?.content || {},
      heading_color: color
    };
    const {
      error
    } = existing ? await supabase.from("homepage_content").update({
      content: next
    }).eq("id", existing.id) : await supabase.from("homepage_content").insert({
      section: sectionKey,
      content: next
    });
    setSaving(false);
    if (error) ue.error(error.message);
    else ue.success("Saved");
  };
  if (!loaded) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-4 mb-5 flex items-center gap-4 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { value: color, onChange: setColor }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
      background: "#8B0F50"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
      " ",
      saving ? "Saving…" : "Save Color"
    ] })
  ] });
}
export {
  AdminTestimonialsPage as component
};
