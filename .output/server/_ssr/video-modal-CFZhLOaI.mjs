import { r as reactExports, W as jsxRuntimeExports } from "./index.mjs";
import { A as AnimatePresence, m as motion, X } from "./router-D3NQCnuk.mjs";
function toYouTubeEmbed(url) {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}?rel=0&modestbranding=1`;
  }
  return url;
}
function VideoModal({
  open,
  onClose,
  src = "https://www.youtube.com/embed/dQw4w9WgXcQ",
  title = "Our Story"
}) {
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const embedSrc = toYouTubeEmbed(src) ?? src;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 flex items-center justify-center p-4",
      style: { background: "rgba(0,0,0,0.85)", zIndex: 1e6 },
      onClick: onClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onClose();
            },
            className: "absolute top-5 right-5 text-white p-2",
            "aria-label": "Close video",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-8 h-8" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "iframe",
              {
                src: embedSrc,
                title,
                width: "100%",
                height: "100%",
                frameBorder: 0,
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                allowFullScreen: true,
                referrerPolicy: "strict-origin-when-cross-origin",
                loading: "lazy",
                className: "w-full h-full border-0"
              }
            )
          }
        )
      ]
    }
  ) });
}
export {
  VideoModal as V,
  toYouTubeEmbed as t
};
