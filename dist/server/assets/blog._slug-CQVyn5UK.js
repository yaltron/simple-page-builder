import { M as jsxRuntimeExports } from "../server.js";
import { k as Route, B as BASE_URL, h as PageLayout, S as Section, L as Link, a as BRAND, n as motion, C as Calendar, c as Clock, F as Facebook, P as PageCTABanner, u as ue } from "./router-4B5-JGly.js";
import { A as ArrowLeft } from "./arrow-left-iHfrrvYd.js";
import { T as Twitter, a as Linkedin, L as Link2 } from "./twitter-7XL9ywFp.js";
import { M as MessageCircle } from "./message-circle-CdfqQonY.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
function BlogPostPage() {
  const data = Route.useLoaderData();
  const p = data.post;
  const related = data.related || [];
  const fmtDate = p.published_at ? new Date(p.published_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "";
  const url = `${BASE_URL}/blog/${p.slug}`;
  const shareTitle = encodeURIComponent(p.title);
  const shareUrl = encodeURIComponent(url);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      ue.success("Link copied!");
    } catch {
      ue.error("Could not copy");
    }
  };
  const shareBtn = "w-9 h-9 rounded-full inline-flex items-center justify-center transition-transform hover:scale-110";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: p.title, breadcrumb: "Blog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 mb-6 font-semibold", style: {
        color: BRAND.pink
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
        " Back to Blog"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5
      }, children: [
        p.featured_image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden mb-8 aspect-[16/9]", style: {
          background: BRAND.pinkSoft
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.featured_image, alt: p.featured_image_alt || p.title, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm mb-6 flex-wrap", style: {
          color: BRAND.navLink
        }, children: [
          p.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold px-2 py-0.5 rounded-full", style: {
            background: BRAND.pinkSoft,
            color: BRAND.pink
          }, children: p.category }),
          fmtDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            " ",
            fmtDate
          ] }),
          p.reading_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            " ",
            p.reading_time,
            " min read"
          ] }),
          p.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "by ",
            p.author
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blog-content", dangerouslySetInnerHTML: {
          __html: p.content || ""
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t flex items-center gap-3 flex-wrap", style: {
          borderColor: BRAND.border
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", style: {
            color: BRAND.heading
          }, children: "Share:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Share on Facebook", className: shareBtn, style: {
            background: "#1877F2",
            color: "white"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Share on Twitter", className: shareBtn, style: {
            background: "#0F1419",
            color: "white"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Share on LinkedIn", className: shareBtn, style: {
            background: "#0A66C2",
            color: "white"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`, target: "_blank", rel: "noopener noreferrer", "aria-label": "Share on WhatsApp", className: shareBtn, style: {
            background: "#25D366",
            color: "white"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copyLink, "aria-label": "Copy link", className: shareBtn, style: {
            background: BRAND.pinkSoft,
            color: BRAND.pink
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }) })
        ] })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: BRAND.pinkSoft, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl md:text-3xl font-bold mb-6", style: {
        color: BRAND.heading
      }, children: "Related Articles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: related.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: r.slug
      }, className: "bg-white rounded-2xl overflow-hidden border hover:-translate-y-1 transition-transform", style: {
        borderColor: "rgba(230,0,126,0.12)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.featured_image || `https://placehold.co/800x520/FFE4EF/C2185B?text=Article`, alt: r.featured_image_alt || r.title, className: "w-full h-full object-cover", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          r.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold mb-2", style: {
            color: BRAND.pink
          }, children: r.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg font-bold mb-2 line-clamp-2", style: {
            color: BRAND.heading
          }, children: r.title }),
          r.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm line-clamp-2", style: {
            color: BRAND.navLink
          }, children: r.excerpt })
        ] })
      ] }, r.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageCTABanner, {})
  ] });
}
export {
  BlogPostPage as component
};
