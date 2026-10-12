import { r as reactExports, W as jsxRuntimeExports, a2 as ClientOnly } from "./index.mjs";
import { t as Route$o, s as supabase, L as Link, u as useReveal } from "./router-D3NQCnuk.mjs";
import { I as Icons, S as Sparkles } from "./lucide-react-D02tlVIt.mjs";



import "./index-CZVAwXUt.mjs";
import "./arrow-up-Bz_3TtFV.mjs";
import "./arrow-left-CMfuYZxx.mjs";
import "./arrow-right-C0k9iFax.mjs";
import "./heart-DOOWiMCz.mjs";
import "./undo-BAl34KoQ.mjs";
import "./briefcase-C6CtCSJl.mjs";
import "./user-round-BantWQqJ.mjs";
import "./calendar-range-y4cCQ38i.mjs";
import "./grip-vertical-BZ97lzFr.mjs";
import "./chevron-left-B3DYEMBD.mjs";
import "./chevron-right-CuQoX9Pi.mjs";
import "./circle-check-DNWRcUgB.mjs";
import "./circle-x-Cl8E95HV.mjs";
import "./inbox-D7xsMQ51.mjs";
import "./external-link-CmvYK2QO.mjs";
import "./loader-circle-CW1skEGS.mjs";
import "./eye-ClSFFkn7.mjs";
import "./file-text-Cs7vjiTg.mjs";
import "./heart-handshake-B7Ezscjx.mjs";
import "./twitter-Cvo1xDyB.mjs";
import "./message-circle-YyMldOk1.mjs";
import "./minus-Bw_s4iG4.mjs";
import "./pencil-mCoYCDbe.mjs";
import "./play-B6FCKmIk.mjs";
import "./plus-_pcJFpCM.mjs";
import "./power-DS-TZLWq.mjs";
import "./quote-BllpPa8P.mjs";
import "./save-DVe6ySDW.mjs";
import "./search-BYbblEQo.mjs";
import "./star-DjJ2imAx.mjs";
import "./stethoscope-DY6D4onH.mjs";
import "./trash-2-DhLuOvGs.mjs";
import "./upload-8X_y_6jh.mjs";
import "./users-CS6GCzjY.mjs";

import "../_libs/unenv.mjs";


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
  } = Route$o.useParams();
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
