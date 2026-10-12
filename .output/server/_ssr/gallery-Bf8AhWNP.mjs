import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { s as supabase, P as PageLayout, S as Section, B as BRAND, A as AnimatePresence, m as motion, a as SectionHeading, X } from "./router-D3NQCnuk.mjs";
import { V as VideoModal, t as toYouTubeEmbed } from "./video-modal-CFZhLOaI.mjs";
import { g as getYouTubeEmbedUrl } from "./youtube-id-BFcJ0C81.mjs";
import { a as useHomepageSection } from "./use-cms-content-CkL30vlf.mjs";
import { S as Search } from "./search-BYbblEQo.mjs";
import { C as ChevronLeft } from "./chevron-left-B3DYEMBD.mjs";
import { C as ChevronRight } from "./chevron-right-CuQoX9Pi.mjs";
import { P as Play } from "./play-B6FCKmIk.mjs";



import "./index-CZVAwXUt.mjs";

import "../_libs/unenv.mjs";


const TOUR_DEFAULTS = {
  heading: "Take a Virtual Tour of Our Clinic",
  subtext: "Explore our facilities from the comfort of your home.",
  button_text: "Watch Tour Video",
  video_url: "",
  autoplay: false,
  is_active: true
};
const cats = ["All", "Clinic", "Team", "Patients", "Events", "Videos"];
function getOptimizedUrl(url) {
  if (!url) return "";
  if (url.includes("supabase.co") && url.includes("/storage/v1/object/public/")) {
    const rendered = url.replace("/storage/v1/object/public/", "/storage/v1/render/image/public/");
    const sep = rendered.includes("?") ? "&" : "?";
    return `${rendered}${sep}width=800&quality=75&format=webp`;
  }
  return url;
}
function GalleryPage() {
  const [items, setItems] = reactExports.useState([]);
  const [podcasts, setPodcasts] = reactExports.useState([]);
  const [active, setActive] = reactExports.useState("All");
  const [lightbox, setLightbox] = reactExports.useState(null);
  const [video, setVideo] = reactExports.useState(null);
  const [tourOpen, setTourOpen] = reactExports.useState(false);
  const tour = useHomepageSection("virtual_tour", TOUR_DEFAULTS);
  const podcastScrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    supabase.from("gallery_items").select("*").eq("status", "published").order("display_order").then(({
      data
    }) => setItems(data || []));
    supabase.from("podcasts").select("*").eq("is_active", true).order("order_index", {
      ascending: true
    }).then(({
      data
    }) => setPodcasts(data || []));
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
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-muted-foreground", children: "No items in this category yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
              @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              .gallery-img-wrap { position: relative; }
              .gallery-img-skeleton {
                position: absolute; inset: 0;
                background: linear-gradient(90deg, #f0e0e8 25%, #fce4ec 50%, #f0e0e8 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: inherit;
                transition: opacity 0.3s ease;
              }
              .gallery-img-loaded { opacity: 0; pointer-events: none; }
            ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          columnCount: 3,
          columnGap: 16,
          contentVisibility: "auto",
          containIntrinsicSize: "300px"
        }, className: "max-md:!columns-2 max-sm:!columns-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((img, i) => {
          const isVideo = img.media_type === "video";
          const rawSrc = img.thumbnail || img.url;
          const optimizedSrc = getOptimizedUrl(rawSrc);
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
          }, className: "mb-4 break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden gallery-img-wrap", onClick: () => isVideo ? setVideo(img.video_url || img.url) : setLightbox(i), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: optimizedSrc, alt: img.title || "", loading: "lazy", decoding: "async", onLoad: (e) => {
              const skel = e.currentTarget.parentElement?.querySelector(".gallery-img-skeleton");
              if (skel) skel.classList.add("gallery-img-loaded");
            }, className: "w-full transition-transform duration-300 group-hover:scale-[1.03]", style: {
              objectFit: "cover",
              display: "block"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery-img-skeleton", "aria-hidden": "true" }),
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
      ] })
    ] }),
    podcasts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      padding: "60px 5%",
      background: "white"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Take a Look at our Podcast" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
              .podcast-strip-wrap { position: relative; }
              .podcast-strip {
                display: flex; flex-direction: row; gap: 20px;
                overflow-x: auto; scroll-behavior: smooth;
                padding-bottom: 16px;
                scrollbar-width: thin;
                scrollbar-color: rgba(139,15,80,0.3) transparent;
                -webkit-overflow-scrolling: touch;
              }
              .podcast-strip::-webkit-scrollbar { height: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb { background: rgba(139,15,80,0.3); border-radius: 8px; }
              .podcast-strip::-webkit-scrollbar-thumb:hover { background: rgba(139,15,80,0.5); }
              .podcast-card {
                min-width: 280px; max-width: 280px;
                border-radius: 16px; overflow: hidden; background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                border: 1px solid rgba(139,15,80,0.10);
                flex-shrink: 0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .podcast-card:hover {
                transform: translateY(-6px);
                box-shadow: 0 12px 40px rgba(139,15,80,0.15);
              }
              .podcast-arrow {
                position: absolute; top: 50%; transform: translateY(-50%);
                width: 44px; height: 44px; border-radius: 50%;
                background: #8B0F50; color: white; font-size: 18px;
                border: none; cursor: pointer;
                box-shadow: 0 4px 16px rgba(139,15,80,0.3);
                display: flex; align-items: center; justify-content: center;
                z-index: 2; transition: background 0.2s;
              }
              .podcast-arrow:hover { background: #6D0A3E; }
              .podcast-arrow-left { left: -8px; }
              .podcast-arrow-right { right: -8px; }
              .podcast-title {
                font-family: 'Playfair Display', serif;
                font-size: 15px; font-weight: 700; color: #2D0A1E;
                margin: 0 0 6px 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
              .podcast-desc {
                font-size: 13px; color: #7A2050; line-height: 1.5; margin: 0;
                display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
              }
            ` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "podcast-strip-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Scroll podcasts left", className: "podcast-arrow podcast-arrow-left", onClick: () => podcastScrollRef.current?.scrollBy({
          left: -300,
          behavior: "smooth"
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: podcastScrollRef, className: "podcast-strip", children: podcasts.map((p) => {
          const embed = getYouTubeEmbedUrl(p.youtube_url);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "podcast-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              width: "100%",
              height: 160,
              background: "#000"
            }, children: embed ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: embed, width: "100%", height: "160", frameBorder: 0, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, loading: "lazy", title: p.title || "Podcast", style: {
              display: "block",
              border: 0
            } }) : null }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: 16
            }, children: [
              p.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "podcast-title", children: p.title }),
              p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "podcast-desc", children: p.description })
            ] })
          ] }, p.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": "Scroll podcasts right", className: "podcast-arrow podcast-arrow-right", onClick: () => podcastScrollRef.current?.scrollBy({
          left: 300,
          behavior: "smooth"
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }) })
      ] })
    ] }) }),
    tour.is_active !== false && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
      padding: "60px 5%",
      background: `linear-gradient(135deg, ${BRAND.pinkSoft} 0%, ${BRAND.blueSoft} 100%)`
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: tour.heading }),
      tour.subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8", style: {
        color: BRAND.navLink,
        marginTop: -20
      }, children: tour.subtext }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTourOpen(true), className: "inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-bold transition-transform hover:scale-105", style: {
        background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-current" }),
        " ",
        tour.button_text
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { open: tourOpen, onClose: () => setTourOpen(false), title: "Virtual Clinic Tour", src: (() => {
      if (!tour.video_url) return void 0;
      const embed = toYouTubeEmbed(tour.video_url) ?? tour.video_url;
      const sep = embed.includes("?") ? "&" : "?";
      return tour.autoplay ? `${embed}${sep}autoplay=1&mute=1` : `${embed}${sep}autoplay=0`;
    })() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { open: video !== null, onClose: () => setVideo(null), src: video ? toYouTubeEmbed(video) ?? video : void 0, title: "Gallery Video" })
  ] });
}
export {
  GalleryPage as component
};
