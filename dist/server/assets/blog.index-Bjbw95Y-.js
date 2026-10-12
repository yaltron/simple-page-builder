import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { t as supabase, h as PageLayout, S as Section, q as motion, a as BRAND, C as Calendar, c as Clock, L as Link, o as SectionHeading, M as Mail, u as ue } from "./router-BvFo6ij6.js";
import { A as ArrowRight } from "./arrow-right-CLD2G2QK.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
const PAGE_SIZE = 6;
function BlogPage() {
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [cat, setCat] = reactExports.useState("All");
  const [page, setPage] = reactExports.useState(1);
  const [email, setEmail] = reactExports.useState("");
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("blogs").select("id,title,slug,excerpt,featured_image,featured_image_alt,category,author,published_at,reading_time").eq("status", "published").order("published_at", {
        ascending: false
      });
      setPosts(data || []);
      setLoading(false);
    })();
  }, []);
  const categories = reactExports.useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))], [posts]);
  const filtered = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const pageItems = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "";
  const subscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return ue.error("Enter a valid email");
    ue.success("Subscribed!");
    setEmail("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageLayout, { title: "Blogs and News", breadcrumb: "Blogs and News", children: [
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-12", children: "Loading posts…" }) }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-muted-foreground py-12", children: "No posts published yet." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      featured && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { style: {
        padding: "60px 5%",
        background: "white"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "grid lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden", style: {
        background: BRAND.pinkSoft
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.featured_image || `https://placehold.co/1200x750/FFE4EF/C2185B?text=Featured`, alt: featured.featured_image_alt || featured.title, className: "w-full h-full object-cover", loading: "eager" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-bold mb-3", style: {
            background: BRAND.pink,
            color: "white"
          }, children: featured.category || "Featured" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl font-bold mb-3", style: {
            color: BRAND.heading
          }, children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", style: {
            color: BRAND.navLink
          }, children: featured.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm mb-5", style: {
            color: BRAND.navLink
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
              fmtDate(featured.published_at)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
              featured.reading_time || 5,
              " min"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
            slug: featured.slug
          }, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold", style: {
            background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
          }, children: [
            "Read Article ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { bg: BRAND.pinkSoft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-8", children: categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setCat(c);
          setPage(1);
        }, className: "px-4 py-1.5 rounded-full text-sm font-semibold", style: {
          background: cat === c ? BRAND.pink : "white",
          color: cat === c ? "white" : BRAND.pink,
          border: `1px solid ${BRAND.pink}`
        }, children: c }, c)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: pageItems.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, className: "bg-white rounded-2xl overflow-hidden border hover:-translate-y-1 transition-transform", style: {
          borderColor: "rgba(230,0,126,0.12)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.featured_image || `https://placehold.co/800x520/FFE4EF/C2185B?text=Article`, alt: p.featured_image_alt || p.title, className: "w-full h-full object-cover", loading: "lazy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold mb-2", style: {
              color: BRAND.pink
            }, children: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg font-bold mb-2 line-clamp-2", style: {
              color: BRAND.heading
            }, children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-3 line-clamp-2", style: {
              color: BRAND.navLink
            }, children: p.excerpt }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", style: {
              color: BRAND.navLink
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3" }),
                fmtDate(p.published_at)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
                slug: p.slug
              }, className: "font-bold inline-flex items-center gap-1", style: {
                color: BRAND.pink
              }, children: [
                "Read ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] })
        ] }, p.id)) }),
        totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-8", children: Array.from({
          length: totalPages
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage(i + 1), className: "w-9 h-9 rounded-full text-sm font-semibold", style: {
          background: page === i + 1 ? BRAND.pink : "white",
          color: page === i + 1 ? "white" : BRAND.pink,
          border: `1px solid ${BRAND.pink}`
        }, children: i + 1 }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { bg: "white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { children: "Stay Updated" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6", style: {
        color: BRAND.navLink,
        marginTop: -16
      }, children: "Get fertility tips and clinic news in your inbox." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: subscribe, className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@email.com", className: "w-full pl-9 pr-3 py-2.5 border rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "px-5 py-2.5 rounded-full text-white font-bold", style: {
          background: `linear-gradient(90deg, ${BRAND.pink}, ${BRAND.pinkDark})`
        }, children: "Subscribe" })
      ] })
    ] }) })
  ] });
}
export {
  BlogPage as component
};
