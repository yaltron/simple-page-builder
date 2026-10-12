import { X as reactExports, M as jsxRuntimeExports, C as ClientOnly } from "../server.js";
import { k as Route, t as supabase, L as Link, x as useReveal } from "./router-BvFo6ij6.js";
import { I as Icons, S as Sparkles } from "./lucide-react-c3fZY9Zi.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
import "./arrow-up-CQuBkeJa.js";
import "./arrow-left-CMu1od4e.js";
import "./arrow-right-CLD2G2QK.js";
import "./heart-MF2aljID.js";
import "./undo-BUOOtPLg.js";
import "./briefcase-B6s7EvLN.js";
import "./user-round-Bj-qJepX.js";
import "./calendar-range-Be1SeQwu.js";
import "./grip-vertical-5YpQjzkI.js";
import "./chevron-left-PwjwD_7H.js";
import "./chevron-right-Ch93CQ9A.js";
import "./circle-check-CoMWJa-j.js";
import "./circle-x-B4NauK2F.js";
import "./inbox-gp6N2nNs.js";
import "./external-link-hNnu8za2.js";
import "./loader-circle-_Jr2PT_X.js";
import "./eye-CgHePpye.js";
import "./file-text-UddeTg2U.js";
import "./heart-handshake-Jbg5EEB8.js";
import "./twitter-Br0jIBUj.js";
import "./message-circle-ywXszmfU.js";
import "./minus-zLwwLlLj.js";
import "./pencil-kM0J4_v-.js";
import "./play-DmTZ1OCN.js";
import "./plus-txrYVvu7.js";
import "./power-C6A8ed5W.js";
import "./quote-HiWp_oz1.js";
import "./save-Qlm-pCq7.js";
import "./search-C-FO9USo.js";
import "./star-DHXkNk1H.js";
import "./stethoscope-DDFrHJkj.js";
import "./trash-2-BamfwLcJ.js";
import "./upload-Cl4Q6rBm.js";
import "./users-BdjHrEqu.js";
function pickIcon(name) {
  const I = Icons[name || ""];
  return I || Sparkles;
}
function Shell({
  children
}) {
  useReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-background", "aria-busy": "true" }) });
}
function WhyUsDetailPage() {
  const {
    slug
  } = Route.useParams();
  const [feature, setFeature] = reactExports.useState(null);
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("trust_features").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
      setFeature(data || null);
      setLoaded(true);
    })();
  }, [slug]);
  if (!loaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-20 text-center text-muted-foreground", children: "Loading…" }) });
  }
  if (!feature) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-3", children: "Feature not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-[#8B0F50] underline", children: "Back to home" })
    ] }) });
  }
  const Icon = pickIcon(feature.icon);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Shell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      background: "linear-gradient(180deg, #FFF1F7 0%, #ffffff 100%)",
      padding: "70px 5%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg", style: {
        background: feature.icon_bg_color || "#8B0F50"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-9 h-9", strokeWidth: 1.8 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif font-bold mb-3", style: {
        color: "#8B0F50",
        fontSize: "clamp(28px, 4.5vw, 44px)"
      }, children: feature.page_heading || feature.title }),
      feature.page_subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto", children: feature.page_subtext })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      background: "#fff",
      padding: "60px 5%"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto blog-content", dangerouslySetInnerHTML: {
      __html: feature.full_content || ""
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: {
      background: "#8B0F50",
      padding: "70px 5%",
      color: "#fff",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif font-bold mb-3", style: {
        fontSize: "clamp(24px, 3.5vw, 36px)"
      }, children: "Ready to Experience the Difference?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 max-w-xl mx-auto mb-7", children: "Our compassionate team is here for you at every step." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-block px-8 py-3 rounded-full font-bold transition-transform hover:scale-105", style: {
        background: "#fff",
        color: "#8B0F50"
      }, children: "Book Consultation" })
    ] })
  ] });
}
export {
  WhyUsDetailPage as component
};
