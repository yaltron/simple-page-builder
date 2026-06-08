import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { s as supabase, h as PageLayout, S as Section, a as BRAND, A as AnimatePresence, n as motion, l as SectionHeading, X } from "./router-4B5-JGly.js";
import { V as VideoModal, t as toYouTubeEmbed } from "./video-modal-BM9n4eHD.js";
import { S as Search } from "./search-BuQbiwCV.js";
import { P as Play } from "./play-j3TZw2pg.js";
import { C as ChevronLeft } from "./chevron-left-CjtAut_D.js";
import { C as ChevronRight } from "./chevron-right-CJtinDDl.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
const cats = ["All", "Clinic", "Team", "Patients", "Events", "Videos"];
function GalleryPage() {
  const [items, setItems] = reactExports.useState([]);
  const [active, setActive] = reactExports.useState("All");
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [video, setVideo] = reactExports.useState(null);
  const [tourOpen, setTourOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.from("gallery_items").select("*").eq("status", "published").order("display_order").then(({
      data
    }) => setItems(data || []));
  }, []);
  const filtered = reactExports.useMemo(() => {
    if (active === "All") return items;
    if (active === "Videos") return items.filter((i) => i.media_type === "video");
    return items.filter((i) => i.category === active);
  }, [items, active]);
  const next = () => setLightbox((i) => i === null ? null : (i + 1) % filtered.length);
  const prev = () => setLightbox((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Gallery", breadcrumb: "Gallery", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-10", children: cats.map((c) => {
        const isActive = active === c;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActive(c), className: "px-5 py-2 rounded-full font-semibold text-sm transition-all", style: {
          background: isActive ? BRAND.pink : "white",
          color: isActive ? "white" : BRAND.pink,
          border: `1px solid ${BRAND.pink}`
        }, children: c }, c);
      }) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "No items in this category yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        columnCount: 3,
        columnGap: 16
      }, className: "max-md:!columns-2 max-sm:!columns-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((img, i) => {
        const isVideo = img.media_type === "video";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
          opacity: 0,
          scale: 0.95
        }, animate: {
          opacity: 1,
          scale: 1
        }, exit: {
          opacity: 0,
          scale: 0.95
        }, transition: {
          duration: 0.35
        }, className: "mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden", onClick: () => isVideo ? setVideo(img.video_url || img.url) : setLightbox(i), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.thumbnail || img.url, alt: img.title || "", loading: "lazy", className: "w-full transition-transform duration-300 group-hover:scale-[1.03]", style: {
            objectFit: "cover"
          } }),
          isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-full flex items-center justify-center transition-all duration-[250ms]", style: {
            width: 60,
            height: 60,
            background: "rgba(255,255,255,0.92)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }, onMouseEnter: (e) => {
            const el = e.currentTarget;
            el.style.background = "#ffffff";
            el.style.transform = "scale(1.12)";
            el.style.boxShadow = "0 0 0 8px rgba(230,0,126,0.15)";
          }, onMouseLeave: (e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.92)";
            el.style.transform = "scale(1)";
            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: "#E6007E",
            fontSize: 22,
            lineHeight: 1,
            marginLeft: 3
          }, children: "▶" }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100", style: {
            background: "rgba(230,0,126,0.15)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-white/90 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6", style: {
            color: BRAND.pink
          } }) }) })
        ] }, img.id);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      padding: "60px 5%",
      background: `linear-gradient(135deg, ${BRAND.pinkSoft} 0%, ${BRAND.blueSoft} 100%)`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Take a Virtual Tour of Our Clinic" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8", style: {
        color: BRAND.navLink,
        marginTop: -20
      }, children: "Explore our facilities from the comfort of your home." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTourOpen(true), className: "inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold transition-transform hover:scale-105", style: {
        background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
        " Watch Tour Video"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightbox !== null && filtered[lightbox] && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-[1000000] flex items-center justify-center p-4", style: {
      background: "rgba(0,0,0,0.9)"
    }, onClick: () => setLightbox(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Close image viewer", onClick: (e) => {
        e.stopPropagation();
        setLightbox(null);
      }, className: "absolute top-5 right-5 text-white p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Previous image", onClick: (e) => {
        e.stopPropagation();
        prev();
      }, className: "absolute left-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: filtered[lightbox].url, alt: filtered[lightbox].title || "", className: "max-h-[85vh] max-w-[90vw] rounded-xl", onClick: (e) => e.stopPropagation() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Next image", onClick: (e) => {
        e.stopPropagation();
        next();
      }, className: "absolute right-5 text-white p-3 rounded-full bg-white/10 hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-6 h-6" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { open: tourOpen, onClose: () => setTourOpen(false), title: "Virtual Clinic Tour" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { open: video !== null, onClose: () => setVideo(null), src: video ? toYouTubeEmbed(video) ?? video : void 0, title: "Gallery Video" })
  ] });
}
export {
  GalleryPage as component
};
