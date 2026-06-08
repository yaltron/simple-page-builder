import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-Ce2DoEvQ.js";
import { X, s as supabase, u as ue } from "./router-4B5-JGly.js";
import { u as useEditor, m as index_default, n as index_default$1, E as EditorContent } from "./index-DNO7A5xf.js";
import { T as Trash2 } from "./trash-2-Duwar6QF.js";
import { P as Plus } from "./plus-DZCCIbCT.js";
import { a as ArrowUp, A as ArrowDown } from "./arrow-up-Dgr8uSBS.js";
import { P as Pencil } from "./pencil-CVrspOTf.js";
import { B as Bold, I as Italic, a as List, b as ListOrdered, L as Link } from "./list-BneYn18z.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./logo-mJLYSy2R.js";
import "./user-round-fnYlCX4m.js";
import "./file-text-BJ6E_L4F.js";
import "./stethoscope-Dg79Wn2h.js";
import "./briefcase-CL4WmvrV.js";
import "./index-Dn3DJaKR.js";
const CATEGORIES = ["General", "IVF", "ICSI", "Costs", "Preparation", "After Treatment", "Gynecology", "Fertility", "Radiology"];
const empty = {
  question: "",
  answer: "",
  category: "General",
  order_index: 0,
  is_active: true
};
function SimpleEditor({
  value,
  onChange
}) {
  const editor = useEditor({
    extensions: [index_default, index_default$1.configure({
      openOnClick: false,
      HTMLAttributes: {
        rel: "noopener noreferrer"
      }
    })],
    content: value || "",
    onUpdate: ({
      editor: editor2
    }) => onChange(editor2.getHTML()),
    immediatelyRender: false
  });
  reactExports.useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", {
        emitUpdate: false
      });
    }
  }, [value]);
  if (!editor) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-3 text-xs text-muted-foreground", children: "Loading…" });
  const Btn = ({
    on,
    action,
    children
  }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: action, className: "p-1.5 rounded hover:bg-gray-100", style: {
    background: on ? "#E6007E" : "transparent",
    color: on ? "white" : "#2D0A1E"
  }, children });
  const addLink = () => {
    const url = window.prompt("URL");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({
      href: url
    }).run();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg overflow-hidden bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 p-1 border-b bg-gray-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { on: editor.isActive("bold"), action: () => editor.chain().focus().toggleBold().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { on: editor.isActive("italic"), action: () => editor.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { on: editor.isActive("bulletList"), action: () => editor.chain().focus().toggleBulletList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { on: editor.isActive("orderedList"), action: () => editor.chain().focus().toggleOrderedList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { on: editor.isActive("link"), action: addLink, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor, className: "prose prose-sm max-w-none p-3 min-h-[140px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[120px]" })
  ] });
}
function AdminFAQsPage() {
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const [items, setItems] = reactExports.useState([]);
  const [editing, setEditing] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("All");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("faqs").select("*").order("category").order("order_index");
    if (error) ue.error(error.message);
    setItems(data || []);
  };
  reactExports.useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);
  const save = async () => {
    if (!editing) return;
    if (!editing.question.trim() || !editing.answer.trim()) {
      return ue.error("Question and answer are required");
    }
    const {
      error
    } = editing.id ? await supabase.from("faqs").update(editing).eq("id", editing.id) : await supabase.from("faqs").insert(editing);
    if (error) return ue.error(error.message);
    ue.success("Saved");
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    const {
      error
    } = await supabase.from("faqs").delete().eq("id", id);
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    load();
  };
  const bulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} FAQ(s)?`)) return;
    const {
      error
    } = await supabase.from("faqs").delete().in("id", Array.from(selected));
    if (error) return ue.error(error.message);
    ue.success("Deleted");
    setSelected(/* @__PURE__ */ new Set());
    load();
  };
  const toggleActive = async (f) => {
    const {
      error
    } = await supabase.from("faqs").update({
      is_active: !f.is_active
    }).eq("id", f.id);
    if (error) return ue.error(error.message);
    load();
  };
  const move = async (f, dir) => {
    const sameCat = items.filter((x) => x.category === f.category).sort((a, b) => a.order_index - b.order_index);
    const idx = sameCat.findIndex((x) => x.id === f.id);
    const swap = sameCat[idx + dir];
    if (!swap) return;
    await supabase.from("faqs").update({
      order_index: swap.order_index
    }).eq("id", f.id);
    await supabase.from("faqs").update({
      order_index: f.order_index
    }).eq("id", swap.id);
    load();
  };
  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);
  if (loading || !isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: "FAQs", breadcrumb: "Admin / FAQs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "px-3 py-2 border rounded-lg bg-white text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "All" }),
        CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c))
      ] }),
      selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: bulkDelete, className: "px-3 py-2 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
        " Delete ",
        selected.size
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground ml-auto", children: [
        filtered.length,
        " FAQ(s)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        const next = items.filter((i) => i.category === (filter === "All" ? "General" : filter));
        const maxOrder = next.reduce((m, x) => Math.max(m, x.order_index || 0), 0);
        setEditing({
          ...empty,
          category: filter === "All" ? "General" : filter,
          order_index: maxOrder + 1
        });
      }, className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold", style: {
        background: "#E6007E"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
        " New FAQ"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-gray-50 text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 w-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Question" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selected.has(f.id), onChange: (e) => {
            const n = new Set(selected);
            if (e.target.checked) n.add(f.id);
            else n.delete(f.id);
            setSelected(n);
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-plum", children: f.question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: f.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleActive(f), className: "text-[10px] px-2 py-0.5 rounded-full font-semibold", style: {
            background: f.is_active ? "#dcfce7" : "#f1f5f9",
            color: f.is_active ? "#166534" : "#475569"
          }, children: f.is_active ? "Active" : "Hidden" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => move(f, -1), className: "p-1 rounded hover:bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3 h-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs w-5", children: f.order_index }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => move(f, 1), className: "p-1 rounded hover:bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3 h-3" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(f), className: "p-1.5 rounded hover:bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(f.id), className: "p-1.5 rounded hover:bg-red-50 text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }) })
          ] })
        ] }, f.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-10 text-center text-muted-foreground", children: "No FAQs." }) })
      ] })
    ] }) }),
    editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/50 flex justify-end", onClick: () => setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xl bg-white h-full overflow-auto p-6", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg", children: [
          editing.id ? "Edit" : "New",
          " FAQ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(null), className: "ml-auto p-1.5 hover:bg-gray-100 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Question", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: editing.question, onChange: (e) => setEditing({
          ...editing,
          question: e.target.value
        }), className: "w-full px-3 py-2 border rounded-lg" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Answer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleEditor, { value: editing.answer, onChange: (v) => setEditing({
          ...editing,
          answer: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: editing.category, onChange: (e) => setEditing({
            ...editing,
            category: e.target.value
          }), className: "w-full px-3 py-2 border rounded-lg bg-white", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Order", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editing.order_index, onChange: (e) => setEditing({
            ...editing,
            order_index: Number(e.target.value)
          }), className: "w-full px-3 py-2 border rounded-lg" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: editing.is_active, onChange: (e) => setEditing({
            ...editing,
            is_active: e.target.checked
          }) }),
          "Active (visible on /faqs)"
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
  AdminFAQsPage as component
};
