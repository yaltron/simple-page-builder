import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { t as supabase, h as PageLayout, S as Section, o as SectionHeading, q as motion, a as BRAND, P as PageCTABanner } from "./router-BvFo6ij6.js";
import { V as VideoModal } from "./video-modal-BXPoZlrU.js";
import { Q as Quote } from "./quote-HiWp_oz1.js";
import { S as Star } from "./star-DHXkNk1H.js";
import { P as Play } from "./play-DmTZ1OCN.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
function StoriesPage() {
  const [items, setItems] = reactExports.useState([]);
  const [video, setVideo] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.from("testimonials").select("*").eq("status", "published").order("display_order").then(({
      data
    }) => setItems(data || []));
  }, []);
  const stories = items.filter((i) => !i.video_url);
  const videos = items.filter((i) => !!i.video_url);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Success Stories", breadcrumb: "Success Stories", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: "white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Real Families, Real Joy" }),
      stories.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-10 text-muted-foreground", children: "No stories published yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: stories.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.45,
        delay: i % 3 * 0.08
      }, className: "rounded-2xl overflow-hidden p-6 transition-all hover:-translate-y-1.5", style: {
        background: i % 2 === 0 ? BRAND.pinkSoft : "white",
        border: "1px solid rgba(230,0,126,0.15)"
      }, children: [
        s.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden mb-5 aspect-[4/3]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.image, alt: s.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-10 h-10 mb-3", style: {
          color: BRAND.pink
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-serif italic text-lg mb-4", style: {
          color: BRAND.plum,
          lineHeight: 1.6
        }, children: [
          '"',
          s.story,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", style: {
          color: BRAND.heading
        }, children: s.name }),
        s.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm mb-3", style: {
          color: BRAND.navLink
        }, children: s.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({
          length: s.rating || 5
        }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current", style: {
          color: "#F9A825"
        } }, k)) })
      ] }, s.id)) })
    ] }),
    videos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: BRAND.pinkSoft, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Video Testimonials" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: videos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.4,
        delay: i * 0.08
      }, className: "rounded-2xl overflow-hidden bg-white transition-transform hover:-translate-y-1", style: {
        border: "1px solid rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-video group cursor-pointer", onClick: () => setVideo(v.video_url), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.image || `https://placehold.co/640x360/FFE4EF/C2185B?text=${encodeURIComponent(v.name)}`, alt: v.name, className: "w-full h-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", style: {
            background: BRAND.pink
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-7 h-7 text-white fill-current" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold mb-1", style: {
            color: BRAND.plum
          }, children: v.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setVideo(v.video_url), className: "text-sm font-semibold", style: {
            color: BRAND.pink
          }, children: "Watch Story →" })
        ] })
      ] }, v.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTABanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoModal, { open: video !== null, onClose: () => setVideo(null), src: video ?? void 0, title: "Success Story" })
  ] });
}
export {
  StoriesPage as component
};
