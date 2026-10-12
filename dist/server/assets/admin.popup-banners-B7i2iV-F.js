import { M as jsxRuntimeExports, X as reactExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-BL4u9tSP.js";
import { I as ImageUpload } from "./image-upload-M-0_XqF9.js";
import { A as AnimatePresence, q as motion, X, t as supabase, u as ue } from "./router-BvFo6ij6.js";
import { P as Plus } from "./plus-txrYVvu7.js";
import { P as Power } from "./power-C6A8ed5W.js";
import { E as Eye } from "./eye-CgHePpye.js";
import { P as Pencil } from "./pencil-kM0J4_v-.js";
import { T as Trash2 } from "./trash-2-BamfwLcJ.js";
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
function PopupBannerView({
  open,
  banner,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && banner && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      onClick: onClose,
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.6)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          onClick: (e) => e.stopPropagation(),
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale: 0.8, opacity: 0 },
          transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
          className: "relative w-full max-w-[480px] rounded-[24px] overflow-hidden shadow-2xl",
          style: { background: banner.background_color || "#FFFFFF" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                "aria-label": "Close",
                className: "absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-plum" })
              }
            ),
            banner.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: banner.image_url,
                alt: banner.image_alt || banner.title || "",
                className: "w-full h-56 object-cover",
                style: { borderTopLeftRadius: 24, borderTopRightRadius: 24 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
              banner.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl font-bold", style: { color: "#C2185B" }, children: banner.title }),
              banner.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: banner.description }),
              banner.button_text && banner.button_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: banner.button_url,
                  className: "block w-full text-center mt-2 py-3 rounded-full font-semibold text-white transition-transform hover:scale-[1.02]",
                  style: { background: "#E6007E" },
                  children: banner.button_text
                }
              )
            ] })
          ]
        },
        "card"
      )
    },
    "overlay"
  ) });
}
const empty = {
  title: "",
  description: "",
  image_url: null,
  image_alt: "",
  button_text: "",
  button_url: "",
  is_active: false,
  show_after_seconds: 3,
  show_on_pages: ["all"],
  show_once_per_session: true,
  background_color: "#FFFFFF",
  start_date: null,
  end_date: null
};
const PAGE_OPTIONS = [{
  value: "all",
  label: "All Pages"
}, {
  value: "homepage",
  label: "Homepage"
}, {
  value: "blog",
  label: "Blog"
}, {
  value: "services",
  label: "Services"
}, {
  value: "contact",
  label: "Contact"
}, {
  value: "about",
  label: "About"
}, {
  value: "team",
  label: "Team"
}, {
  value: "faqs",
  label: "FAQs"
}];
function AdminPopupPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [items, setItems] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const [previewing, setPreviewing] = reactExports.useState(null);
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("popup_banners").select("*").order("updated_at", {
      ascending: false
    });
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    const payload = {
      ...editing
    };
    const {
      error
    } = editing.id ? await supabase.from("popup_banners").update(payload).eq("id", editing.id) : await supabase.from("popup_banners").insert(payload);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const toggleActive = async (b) => {
    const {
      error
    } = await supabase.from("popup_banners").update({
      is_active: !b.is_active
    }).eq("id", b.id);
    if (error) return ue.error(error.message);
    ue.success(!b.is_active ? "Activated" : "Deactivated");
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this popup?")) return;
    const {
      error
    } = await supabase.from("popup_banners").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Popup Banners", breadcrumb: "Admin / Popup Banners", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " banners - only one active at a time"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Popup"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      items.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden flex flex-col", children: [
        b.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: b.image_url, alt: "", className: "w-full h-32 object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center text-xs text-muted-foreground", style: {
          background: b.background_color || "#FFF1F7"
        }, children: "No image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold flex-1 truncate", children: b.title || "Untitled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full font-semibold", style: {
              background: b.is_active ? "#dcfce7" : "#f1f5f9",
              color: b.is_active ? "#166534" : "#475569"
            }, children: b.is_active ? "Active" : "Inactive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-3 flex-1", children: b.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mb-3", children: [
            "Pages: ",
            (b.show_on_pages || []).join(", "),
            " · After ",
            b.show_after_seconds,
            "s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => toggleActive(b), className: "flex-1 px-2 py-1.5 text-xs rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "w-3 h-3" }),
              " ",
              b.is_active ? "Deactivate" : "Activate"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPreviewing(b), className: "px-2 py-1.5 text-xs rounded border hover:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(b), className: "px-2 py-1.5 text-xs rounded border hover:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(b.id), className: "px-2 py-1.5 text-xs rounded border text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }) })
          ] })
        ] })
      ] }, b.id)),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No popup banners yet." })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Popup"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPreviewing(editing), className: "ml-auto px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          " Preview"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-2 p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title, onChange: (e) => setEditing({
          ...editing,
          title: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editing.description, onChange: (e) => setEditing({
          ...editing,
          description: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.image_url, onChange: (url) => setEditing({
          ...editing,
          image_url: url
        }), folder: "popups" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Image Alt Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.image_alt, onChange: (e) => setEditing({
          ...editing,
          image_alt: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Button Text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.button_text, onChange: (e) => setEditing({
            ...editing,
            button_text: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Button URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.button_url, onChange: (e) => setEditing({
            ...editing,
            button_url: e.target.value
          }), placeholder: "/contact or https://…", className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Show after (seconds)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: editing.show_after_seconds, onChange: (e) => setEditing({
            ...editing,
            show_after_seconds: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Background Color", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: editing.background_color, onChange: (e) => setEditing({
              ...editing,
              background_color: e.target.value
            }), className: "w-12 h-10 border rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.background_color, onChange: (e) => setEditing({
              ...editing,
              background_color: e.target.value
            }), className: "flex-1 px-3 py-2 border rounded-lg" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Show on pages", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PAGE_OPTIONS.map((p) => {
          const on = editing.show_on_pages.includes(p.value);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            let next = on ? editing.show_on_pages.filter((x) => x !== p.value) : [...editing.show_on_pages, p.value];
            if (p.value === "all" && !on) next = ["all"];
            else if (p.value !== "all" && !on) next = next.filter((x) => x !== "all");
            if (next.length === 0) next = ["all"];
            setEditing({
              ...editing,
              show_on_pages: next
            });
          }, className: "px-3 py-1.5 text-xs rounded-full border", style: {
            background: on ? "#E6007E" : "white",
            color: on ? "white" : "#7A2050",
            borderColor: on ? "#E6007E" : "#e5e7eb"
          }, children: p.label }, p.value);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Start date (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: editing.start_date || "", onChange: (e) => setEditing({
            ...editing,
            start_date: e.target.value || null
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "End date (optional)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: editing.end_date || "", onChange: (e) => setEditing({
            ...editing,
            end_date: e.target.value || null
          }), className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.show_once_per_session, onChange: (e) => setEditing({
            ...editing,
            show_once_per_session: e.target.checked
          }) }),
          "Show once per session"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_active, onChange: (e) => setEditing({
            ...editing,
            is_active: e.target.checked
          }) }),
          "Active (will deactivate any other active popup)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, className: "w-full py-2.5 rounded-lg text-white font-semibold", style: {
          background: "#E6007E"
        }, children: "Save" })
      ] })
    ] }) }),
    previewing && /* @__PURE__ */ jsxRuntimeExports.jsx(PopupBannerView, { open: true, banner: {
      id: "preview",
      title: previewing.title,
      description: previewing.description,
      image_url: previewing.image_url,
      image_alt: previewing.image_alt,
      button_text: previewing.button_text,
      button_url: previewing.button_url || "#",
      show_after_seconds: 0,
      show_on_pages: ["all"],
      show_once_per_session: false,
      background_color: previewing.background_color,
      start_date: null,
      end_date: null
    }, onClose: () => setPreviewing(null) })
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
  AdminPopupPage as component
};
