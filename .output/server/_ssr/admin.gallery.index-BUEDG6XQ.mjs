import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { I as ImageUpload } from "./image-upload-bZam0mLR.mjs";
import { X, s as supabase, b as ue } from "./router-D3NQCnuk.mjs";
import { P as Plus } from "./plus-_pcJFpCM.mjs";
import { P as Play } from "./play-B6FCKmIk.mjs";
import { P as Pencil } from "./pencil-mCoYCDbe.mjs";
import { T as Trash2 } from "./trash-2-DhLuOvGs.mjs";



import "./user-round-BantWQqJ.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./upload-8X_y_6jh.mjs";
import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


import "./image-to-webp-BeTkcpEw.mjs";
const empty = {
  media_type: "image",
  url: "",
  thumbnail: null,
  title: "",
  caption: "",
  category: "Clinic",
  display_order: 0,
  status: "published"
};
function AdminGalleryPage() {
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
    } = await supabase.from("gallery_items").select("*").order("display_order", {
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
    if (!editing.url) return ue.error("Media URL required");
    const {
      error
    } = editing.id ? await supabase.from("gallery_items").update(editing).eq("id", editing.id) : await supabase.from("gallery_items").insert(editing);
    if (error) return ue.error(error.message);
    ue.success("Media updated!");
    setEditing(null);
    load();
  };
  const remove = async (id, url, mediaType) => {
    if (!confirm("Are you sure you want to delete this item? This cannot be undone.")) return;
    const {
      error
    } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) return ue.error(error.message);
    if (mediaType === "image" && url && url.includes("/site-media/")) {
      const path = url.split("/site-media/")[1]?.split("?")[0];
      if (path) await supabase.storage.from("site-media").remove([path]);
    }
    ue.success("Item deleted.");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Gallery", breadcrumb: "Admin / Gallery", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " items"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Item"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [
      items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden group relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-square bg-gray-100 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.thumbnail || it.url, alt: it.title || "", className: "w-full h-full object-cover" }),
          it.media_type === "video" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-8 h-8 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity", style: {
            background: "rgba(0,0,0,0.55)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
              setEditing(it);
            }, className: "inline-flex items-center gap-1.5 rounded-lg font-bold transition-colors", style: {
              background: "white",
              color: "#2D0A1E",
              padding: "8px 14px",
              fontSize: 13
            }, onMouseEnter: (e) => e.currentTarget.style.background = "#FFF1F7", onMouseLeave: (e) => e.currentTarget.style.background = "white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: (e) => {
              e.stopPropagation();
              e.preventDefault();
              remove(it.id, it.url, it.media_type);
            }, className: "inline-flex items-center gap-1.5 rounded-lg font-bold transition-colors text-white", style: {
              background: "#E6007E",
              padding: "8px 14px",
              fontSize: 13
            }, onMouseEnter: (e) => e.currentTarget.style.background = "#C4006A", onMouseLeave: (e) => e.currentTarget.style.background = "#E6007E", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
              " Delete"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: it.title || "(untitled)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: it.category })
        ] })
      ] }, it.id)),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No gallery items yet." })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Item"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Media type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.media_type, onChange: (e) => setEditing({
          ...editing,
          media_type: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "image", children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "video", children: "Video" })
        ] }) }),
        editing.media_type === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.url, onChange: (url) => setEditing({
          ...editing,
          url: url || ""
        }), folder: "gallery" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Video URL (YouTube embed)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.url, onChange: (e) => setEditing({
            ...editing,
            url: e.target.value
          }), placeholder: "https://www.youtube.com/embed/…", className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Thumbnail image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.thumbnail, onChange: (url) => setEditing({
            ...editing,
            thumbnail: url
          }), folder: "gallery" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title || "", onChange: (e) => setEditing({
          ...editing,
          title: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Caption", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editing.caption || "", onChange: (e) => setEditing({
          ...editing,
          caption: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.category, onChange: (e) => setEditing({
            ...editing,
            category: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Clinic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Patients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Events" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Display order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.display_order, onChange: (e) => setEditing({
            ...editing,
            display_order: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editing.status, onChange: (e) => setEditing({
          ...editing,
          status: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" })
        ] }) }),
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
  AdminGalleryPage as component
};
