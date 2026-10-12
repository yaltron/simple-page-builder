import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-x8M1bRId.mjs";
import { I as ImageUpload } from "./image-upload-bZam0mLR.mjs";
import { C as ColorPicker } from "./color-picker-BcfGrOpe.mjs";
import { X, s as supabase, b as ue } from "./router-D3NQCnuk.mjs";
import { P as Plus } from "./plus-_pcJFpCM.mjs";
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
  name: "",
  title: "",
  bio: "",
  image: null,
  specialties: [],
  qualifications: "",
  experience_years: null,
  display_order: 0,
  status: "published",
  nmc_number: "",
  nmc_color: "#8B0F50"
};
function AdminDoctorsPage() {
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
    } = await supabase.from("doctors").select("*").order("display_order");
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
    } = editing.id ? await supabase.from("doctors").update(editing).eq("id", editing.id) : await supabase.from("doctors").insert(editing);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    const {
      error
    } = await supabase.from("doctors").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "Doctors", breadcrumb: "Admin / Doctors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm text-muted-foreground", children: [
        items.length,
        " doctors"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing({
        ...empty
      }), className: "ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New Doctor"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      items.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-gray-100", children: d.image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image, alt: d.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-2", children: d.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full", style: {
            background: d.status === "published" ? "#D1FADF" : "#FEF3C7",
            color: d.status === "published" ? "#027A48" : "#92400E"
          }, children: d.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(d), className: "flex-1 px-3 py-1.5 text-sm rounded border hover:bg-gray-50 inline-flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(d.id), className: "px-3 py-1.5 text-sm rounded border text-red-600 hover:bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" }) })
          ] })
        ] })
      ] }, d.id)),
      items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center text-muted-foreground py-10", children: "No doctors yet." })
    ] }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " Doctor"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: editing.image, onChange: (url) => setEditing({
          ...editing,
          image: url
        }), folder: "doctors" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.name, onChange: (e) => setEditing({
          ...editing,
          name: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title / Specialty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.title || "", onChange: (e) => setEditing({
          ...editing,
          title: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Qualifications", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.qualifications || "", onChange: (e) => setEditing({
          ...editing,
          qualifications: e.target.value
        }), placeholder: "MD, DGO, Fellowship in IVF", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "NMC Registration Number", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.nmc_number || "", onChange: (e) => setEditing({
          ...editing,
          nmc_number: e.target.value
        }), placeholder: "e.g. 12345", className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "NMC Number Color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { value: editing.nmc_color || "#8B0F50", onChange: (hex) => setEditing({
          ...editing,
          nmc_color: hex
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Years of experience", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.experience_years || "", onChange: (e) => setEditing({
            ...editing,
            experience_years: e.target.value ? Number(e.target.value) : null
          }), className: "w-full px-3 py-2 border rounded-lg" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Display order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.display_order, onChange: (e) => setEditing({
            ...editing,
            display_order: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Bio", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, value: editing.bio || "", onChange: (e) => setEditing({
          ...editing,
          bio: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Specialties (comma separated)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: (editing.specialties || []).join(", "), onChange: (e) => setEditing({
          ...editing,
          specialties: e.target.value.split(",").map((x) => x.trim()).filter(Boolean)
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
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
  AdminDoctorsPage as component
};
