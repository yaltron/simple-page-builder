import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { j as Route, N as Navbar, n as motion, A as AnimatePresence, d as Footer } from "./router-4B5-JGly.js";
import { M as Minus } from "./minus-LJROBNSp.js";
import { P as Plus } from "./plus-DZCCIbCT.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
function FAQsPage() {
  const {
    faqs
  } = Route.useLoaderData();
  const [active, setActive] = reactExports.useState("All");
  const [open, setOpen] = reactExports.useState(null);
  const [list, setList] = reactExports.useState(faqs);
  reactExports.useEffect(() => {
    setList(faqs);
  }, [faqs]);
  const categories = reactExports.useMemo(() => {
    const s = Array.from(new Set(list.map((f) => f.category)));
    return ["All", ...s];
  }, [list]);
  const filtered = reactExports.useMemo(() => active === "All" ? list : list.filter((f) => f.category === active), [list, active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-24 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl lg:text-5xl font-bold text-plum", children: "Answers to Your Fertility Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-3 max-w-xl mx-auto", children: "Browse common questions about IVF, ICSI, costs and preparation." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center mb-8", children: categories.map((c) => {
        const isOn = c === active;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setActive(c);
          setOpen(null);
        }, className: "px-4 py-2 rounded-full text-sm font-medium transition-colors", style: {
          background: isOn ? "#E6007E" : "white",
          color: isOn ? "white" : "#7A2050",
          border: isOn ? "none" : "1px solid rgba(122,32,80,0.2)"
        }, children: c }, c);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl px-6 lg:px-8 shadow-sm", children: [
        filtered.map((f, idx) => {
          const isOpen = open === f.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 10
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.35,
            delay: idx * 0.04
          }, className: "border-b border-plum/10 last:border-b-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(isOpen ? null : f.id), className: "w-full py-6 flex items-center justify-between text-left group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg font-semibold text-plum pr-8 group-hover:text-rose transition-colors", children: f.question }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose group-hover:bg-rose group-hover:text-white transition-colors", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
              height: 0,
              opacity: 0
            }, animate: {
              height: "auto",
              opacity: 1
            }, exit: {
              height: 0,
              opacity: 0
            }, transition: {
              duration: 0.3
            }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6 text-muted-foreground leading-relaxed pr-12 prose prose-sm max-w-none prose-a:text-rose", dangerouslySetInnerHTML: {
              __html: f.answer
            } }) }) })
          ] }, f.id);
        }),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center text-muted-foreground", children: "No FAQs in this category yet." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  FAQsPage as component
};
