import { M as jsxRuntimeExports } from "../server.js";
import { h as PageLayout, S as Section, L as Link, a as BRAND } from "./router-4B5-JGly.js";
import { A as ArrowLeft } from "./arrow-left-iHfrrvYd.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
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
