import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { w as useParams, v as useNavigate, t as supabase, u as ue, L as Link, X } from "./router-BvFo6ij6.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-BL4u9tSP.js";
import { R as RichTextEditor } from "./rich-text-editor-HgXCz3DN.js";
import { C as ChevronLeft } from "./chevron-left-PwjwD_7H.js";
import { U as Upload } from "./upload-Cl4Q6rBm.js";
import { C as CircleCheck } from "./circle-check-CoMWJa-j.js";
import { C as CircleX } from "./circle-x-B4NauK2F.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
import "./user-round-Bj-qJepX.js";
import "./file-text-UddeTg2U.js";
import "./stethoscope-DDFrHJkj.js";
import "./briefcase-B6s7EvLN.js";
import "./undo-BUOOtPLg.js";
import "./quote-HiWp_oz1.js";
import "./minus-zLwwLlLj.js";
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
}
function stripHtml(html) {
  if (typeof window === "undefined") return html.replace(/<[^>]*>/g, " ");
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}
function keywordDensity(html, keyword) {
  if (!keyword) return 0;
  const text = stripHtml(html).toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return 0;
  const k = keyword.toLowerCase();
  const matches = (text.match(new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g")) || []).length;
  return +(matches / words.length * 100).toFixed(2);
}
const CATEGORIES = ["IVF", "ICSI", "Fertility Tips", "Patient Stories", "News", "General"];
const PROJECT_URL = "https://shubhashreeivf.com";
function BlogEditorPage() {
  const {
    id
  } = useParams({
    from: "/admin/blog/$id"
  });
  const isNew = id === "new";
  const {
    loading,
    isAdmin
  } = useAdminAuth();
  const navigate = useNavigate();
  const [loadingPost, setLoadingPost] = reactExports.useState(!isNew);
  const [saving, setSaving] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    featured_image_alt: "",
    author: "",
    category: "General",
    tags: [],
    focus_keyword: "",
    secondary_keywords: [],
    meta_title: "",
    meta_description: "",
    word_count: 0,
    reading_time: 0,
    status: "draft",
    published_at: null
  });
  const [chars, setChars] = reactExports.useState(0);
  const [tagInput, setTagInput] = reactExports.useState("");
  const [secInput, setSecInput] = reactExports.useState("");
  const [slugTouched, setSlugTouched] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isNew || !isAdmin) return;
    (async () => {
      const {
        data,
        error
      } = await supabase.from("blogs").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        ue.error("Post not found");
        navigate({
          to: "/admin/blog"
        });
        return;
      }
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        featured_image_alt: data.featured_image_alt || "",
        author: data.author || "",
        category: data.category || "General",
        tags: data.tags || [],
        focus_keyword: data.focus_keyword || "",
        secondary_keywords: data.secondary_keywords || [],
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        word_count: data.word_count || 0,
        reading_time: data.reading_time || 0,
        status: data.status || "draft",
        published_at: data.published_at
      });
      setSlugTouched(true);
      setLoadingPost(false);
    })();
  }, [id, isNew, isAdmin]);
  reactExports.useEffect(() => {
    if (!slugTouched && form.title) setForm((f) => ({
      ...f,
      slug: slugify(form.title)
    }));
  }, [form.title]);
  const update = (patch) => setForm((f) => ({
    ...f,
    ...patch
  }));
  const onContent = (html, words, c) => {
    setChars(c);
    setForm((f) => ({
      ...f,
      content: html,
      word_count: words,
      reading_time: Math.max(1, Math.round(words / 200))
    }));
  };
  const uploadFeatured = async (original) => {
    const {
      convertImageToWebp
    } = await import("./image-to-webp-BeTkcpEw.js");
    const file = await convertImageToWebp(original);
    const ext = file.name.split(".").pop();
    const path = `featured/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const {
      error
    } = await supabase.storage.from("blog-images").upload(path, file, {
      contentType: file.type
    });
    if (error) return ue.error(error.message);
    const {
      data
    } = supabase.storage.from("blog-images").getPublicUrl(path);
    update({
      featured_image: data.publicUrl
    });
    ue.success("Image uploaded");
  };
  const save = async (status) => {
    if (!form.title.trim()) return ue.error("Title is required");
    if (!form.slug.trim()) return ue.error("Slug is required");
    setSaving(true);
    const payload = {
      ...form,
      status: status ?? form.status
    };
    if (isNew) {
      const {
        data,
        error
      } = await supabase.from("blogs").insert(payload).select("id").single();
      setSaving(false);
      if (error) return ue.error(error.message);
      ue.success(status === "published" ? "Published!" : "Draft saved");
      navigate({
        to: "/admin/blog/$id",
        params: {
          id: data.id
        }
      });
    } else {
      const {
        error
      } = await supabase.from("blogs").update(payload).eq("id", id);
      setSaving(false);
      if (error) return ue.error(error.message);
      update({
        status: payload.status
      });
      ue.success(status === "published" ? "Published!" : "Saved");
    }
  };
  const checks = reactExports.useMemo(() => {
    stripHtml(form.content).toLowerCase();
    const k = form.focus_keyword.toLowerCase().trim();
    const firstP = (form.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "").toLowerCase();
    return {
      kInTitle: !!k && form.title.toLowerCase().includes(k),
      kInMeta: !!k && form.meta_description.toLowerCase().includes(k),
      kInFirst: !!k && stripHtml(firstP).includes(k),
      kInSlug: !!k && form.slug.includes(k.replace(/\s+/g, "-")),
      titleLen: form.meta_title.length >= 50 && form.meta_title.length <= 60,
      descLen: form.meta_description.length > 0 && form.meta_description.length <= 160,
      altText: !!form.featured_image_alt && !!form.featured_image,
      wordCount: form.word_count >= 300,
      hasH2: /<h2[\s>]/i.test(form.content)
    };
  }, [form]);
  const density = keywordDensity(form.content, form.focus_keyword);
  const readability = form.word_count > 0 ? (() => {
    const sentences = stripHtml(form.content).split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
    const avg = form.word_count / sentences;
    return avg < 14 ? "Easy" : avg < 22 ? "Medium" : "Hard";
  })() : "-";
  if (loading || !isAdmin || loadingPost) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLoading, {});
  const colorFor = (count, min, max) => count >= min && count <= max ? "#027A48" : count > max ? "#B42318" : "#92400E";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminShell, { title: isNew ? "New Post" : "Edit Post", breadcrumb: "Admin / Blog / Editor", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/blog", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-pink-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
      " Back to posts"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.title, onChange: (e) => update({
            title: e.target.value
          }), placeholder: "Post title", className: "w-full text-2xl font-bold outline-none border-b py-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              PROJECT_URL,
              "/blog/"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.slug, onChange: (e) => {
              setSlugTouched(true);
              update({
                slug: slugify(e.target.value)
              });
            }, className: "flex-1 px-2 py-1 border rounded font-mono text-xs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RichTextEditor, { value: form.content, onChange: onContent })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full", style: {
              background: form.status === "published" ? "#D1FADF" : "#FEF3C7",
              color: form.status === "published" ? "#027A48" : "#92400E"
            }, children: form.status })
          ] }),
          form.published_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Published: ",
            new Date(form.published_at).toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: saving, onClick: () => save("draft"), className: "flex-1 py-2 rounded-lg border font-semibold text-sm", children: "Save Draft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: saving, onClick: () => save("published"), className: "flex-1 py-2 rounded-lg text-white font-semibold text-sm", style: {
              background: "#E6007E"
            }, children: "Publish" })
          ] }),
          !isNew && form.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
            slug: form.slug
          }, target: "_blank", className: "block text-center text-xs font-semibold py-1.5", style: {
            color: "#E6007E"
          }, children: "Preview live →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Featured Image" }),
          form.featured_image ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: form.featured_image, alt: "", className: "w-full rounded-lg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update({
              featured_image: "",
              featured_image_alt: ""
            }), className: "absolute top-2 right-2 bg-white/90 rounded-full p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-pink-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-6 h-6 text-muted-foreground mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Click to upload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { hidden: true, type: "file", accept: "image/*", onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) uploadFeatured(f);
            } })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.featured_image_alt, onChange: (e) => update({
            featured_image_alt: e.target.value
          }), placeholder: "Alt text", className: "w-full px-3 py-2 border rounded-lg text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "bg-white rounded-xl border p-5", open: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "text-sm font-semibold cursor-pointer", children: "SEO & Meta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Meta Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                  color: colorFor(form.meta_title.length, 50, 60)
                }, children: [
                  form.meta_title.length,
                  "/60"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.meta_title, onChange: (e) => update({
                meta_title: e.target.value
              }), className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Meta Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                  color: colorFor(form.meta_description.length, 1, 160)
                }, children: [
                  form.meta_description.length,
                  "/160"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.meta_description, onChange: (e) => update({
                meta_description: e.target.value
              }), rows: 3, className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs block mb-1", children: "Focus Keyword" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.focus_keyword, onChange: (e) => update({
                focus_keyword: e.target.value
              }), className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs block mb-1", children: "Secondary Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: form.secondary_keywords.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full", style: {
                background: "#FFE4EF",
                color: "#E6007E"
              }, children: [
                t,
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update({
                  secondary_keywords: form.secondary_keywords.filter((x) => x !== t)
                }), children: "×" })
              ] }, t)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: secInput, onChange: (e) => setSecInput(e.target.value), onKeyDown: (e) => {
                if (e.key === "Enter" && secInput.trim()) {
                  e.preventDefault();
                  update({
                    secondary_keywords: [...form.secondary_keywords, secInput.trim()]
                  });
                  setSecInput("");
                }
              }, placeholder: "Type and press Enter", className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-3 text-xs bg-gray-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#202124] text-xs mb-0.5", children: "Shubhashree IVF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#1a0dab] text-base leading-tight truncate", children: form.meta_title || form.title || "Title preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[#006621] text-xs", children: [
                PROJECT_URL,
                "/blog/",
                form.slug || "slug"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#4d5156] text-xs mt-1 line-clamp-2", children: form.meta_description || form.excerpt || "Description preview…" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "bg-white rounded-xl border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "text-sm font-semibold cursor-pointer", children: "Post Settings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs block mb-1", children: "Author" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.author, onChange: (e) => update({
                author: e.target.value
              }), className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs block mb-1", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (e) => update({
                category: e.target.value
              }), className: "w-full px-3 py-2 border rounded-lg text-sm bg-white", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs block mb-1", children: "Tags" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: form.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100", children: [
                t,
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => update({
                  tags: form.tags.filter((x) => x !== t)
                }), children: "×" })
              ] }, t)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: tagInput, onChange: (e) => setTagInput(e.target.value), onKeyDown: (e) => {
                if (e.key === "Enter" && tagInput.trim()) {
                  e.preventDefault();
                  update({
                    tags: [...form.tags, tagInput.trim()]
                  });
                  setTagInput("");
                }
              }, placeholder: "Type and press Enter", className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Excerpt" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  form.excerpt.length,
                  "/300"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.excerpt, onChange: (e) => update({
                excerpt: e.target.value.slice(0, 300)
              }), rows: 3, className: "w-full px-3 py-2 border rounded-lg text-sm" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "bg-white rounded-xl border p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "text-sm font-semibold cursor-pointer", children: "Keyword Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Density" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-sm", children: [
                  density,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Words" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", children: form.word_count })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Read time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-sm", children: [
                  form.reading_time,
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Readability" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sm", children: readability })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 mt-2", children: [["Focus keyword in title", checks.kInTitle], ["Focus keyword in meta description", checks.kInMeta], ["Focus keyword in first paragraph", checks.kInFirst], ["Focus keyword in slug", checks.kInSlug], ["Meta title length (50-60)", checks.titleLen], ["Meta description ≤ 160", checks.descLen], ["Featured image has alt text", checks.altText], ["At least 300 words", checks.wordCount], ["Content has at least one H2", checks.hasH2]].map(([label, ok]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-red-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
            ] }, label)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  BlogEditorPage as component
};
