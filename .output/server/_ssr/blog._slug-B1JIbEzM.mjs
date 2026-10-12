import { W as jsxRuntimeExports } from "./index.mjs";
import { P as PageLayout, S as Section, L as Link, B as BRAND } from "./router-D3NQCnuk.mjs";
import { A as ArrowLeft } from "./arrow-left-CMfuYZxx.mjs";



import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


const SplitErrorComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(PageLayout, { title: "Post not found", breadcrumb: "Blog", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-center py-10", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This article isn't available." }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 font-semibold", style: {
    color: BRAND.pink
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
    " Back to blog"
  ] })
] }) }) });
export {
  SplitErrorComponent as errorComponent
};
