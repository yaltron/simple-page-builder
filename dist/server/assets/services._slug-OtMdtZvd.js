import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { m as Route, t as supabase, N as Navbar, a as BRAND, L as Link, d as Footer, q as motion, i as Phone } from "./router-BvFo6ij6.js";
import { C as Check, I as Icons } from "./lucide-react-c3fZY9Zi.js";
import { A as ArrowRight } from "./arrow-right-CLD2G2QK.js";
import { M as MessageCircle } from "./message-circle-ywXszmfU.js";
import { H as Heart } from "./heart-MF2aljID.js";
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
  return I || Heart;
}
function ServiceDetailPage() {
  const {
    slug
  } = Route.useParams();
  const [service, setService] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [notFoundState, setNotFoundState] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      const {
        data
      } = await supabase.from("services").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (cancel) return;
      if (!data) {
        setNotFoundState(true);
      } else {
        setService(data);
        if (data.meta_title || data.title) document.title = `${data.meta_title || data.title} - Shubhashree IVF`;
        if (data.meta_description) {
          let m = document.querySelector('meta[name="description"]');
          if (!m) {
            m = document.createElement("meta");
            m.setAttribute("name", "description");
            document.head.appendChild(m);
          }
          m.setAttribute("content", data.meta_description);
        }
      }
      setLoading(false);
    })();
    return () => {
      cancel = true;
    };
  }, [slug]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen flex items-center justify-center text-muted-foreground", children: "Loading…" });
  if (notFoundState || !service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: {
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        padding: 40
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl font-bold", style: {
          color: BRAND.heading
        }, children: "Service not found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "px-5 py-2 rounded-full text-white font-semibold", style: {
          background: BRAND.pink
        }, children: "Back to services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const Icon = pickIcon(service.icon);
  const heading = service.page_heading || service.title;
  const heroImg = service.hero_image_url || service.featured_image;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: {
      height: 240,
      background: "linear-gradient(135deg, #FFF1F7 0%, #fff 50%, #EAF7FD 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 5%"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-[60px] h-[60px] mb-2", style: {
        color: "#8B0F50"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
        fontFamily: "'Playfair Display', serif",
        color: "#8B0F50",
        fontSize: "clamp(28px, 4vw, 36px)",
        fontWeight: 700,
        margin: 0
      }, children: service.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        color: BRAND.navLink,
        marginTop: 10,
        fontSize: 13
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", style: {
          color: BRAND.navLink
        }, children: "Home" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          margin: "0 8px",
          opacity: 0.6
        }, children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", style: {
          color: BRAND.navLink
        }, children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          margin: "0 8px",
          opacity: 0.6
        }, children: "›" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "#8B0F50"
        }, children: service.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      padding: "60px 5%",
      background: "white"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-[60fr_40fr] gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif font-bold", style: {
          color: "#8B0F50",
          fontSize: "1.8rem",
          marginBottom: 12
        }, children: heading }),
        service.page_subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: BRAND.navLink,
          fontSize: 16,
          lineHeight: 1.7
        }, children: service.page_subtext }),
        service.key_points && service.key_points.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { style: {
            margin: "28px 0",
            border: 0,
            borderTop: `1px solid ${BRAND.border}`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif font-bold", style: {
            color: "#8B0F50",
            fontSize: "1.3rem",
            marginBottom: 14
          }, children: "What to Expect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 mb-6", children: service.key_points.map((kp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center", style: {
              background: "#8B0F50"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              color: BRAND.plum,
              lineHeight: 1.6
            }, children: kp })
          ] }, i)) })
        ] }),
        service.full_content && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { style: {
            margin: "28px 0",
            border: 0,
            borderTop: `1px solid ${BRAND.border}`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm sm:prose max-w-none", style: {
            color: BRAND.plum
          }, dangerouslySetInnerHTML: {
            __html: service.full_content
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold", style: {
          background: "#8B0F50"
        }, children: [
          "Book a Consultation for ",
          service.title,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.aside, { initial: {
        opacity: 0,
        x: 20
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        duration: 0.5,
        delay: 0.1
      }, className: "space-y-6", children: [
        heroImg && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: service.hero_image_alt || service.title, style: {
          width: "100%",
          height: "auto",
          borderRadius: 20,
          boxShadow: "0 8px 40px rgba(139,15,80,0.12)",
          display: "block"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          background: "#FFF1F7",
          borderRadius: 16,
          padding: 24
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif font-bold mb-4", style: {
            color: "#8B0F50",
            fontSize: "1.2rem"
          }, children: "Have Questions?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "tel:+9779861141699", className: "flex items-center gap-3 mb-3 font-semibold", style: {
            color: BRAND.plum
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5", style: {
              color: "#8B0F50"
            } }),
            " +977 9861141699"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/9779861141699", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold mb-3", style: {
            background: "#25D366",
            color: "white"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
            " WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white font-bold", style: {
            background: "#8B0F50"
          }, children: "Book Consultation" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ServiceDetailPage as component
};
