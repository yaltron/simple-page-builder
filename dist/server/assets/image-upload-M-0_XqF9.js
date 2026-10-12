import { X as reactExports, M as jsxRuntimeExports } from "../server.js";
import { X, t as supabase, u as ue } from "./router-BvFo6ij6.js";
import { convertImageToWebp } from "./image-to-webp-BeTkcpEw.js";
import { U as Upload } from "./upload-Cl4Q6rBm.js";
function ImageUpload({
  value,
  onChange,
  bucket = "site-media",
  folder = "uploads"
}) {
  const [uploading, setUploading] = reactExports.useState(false);
  const handle = async (e) => {
    const original = e.target.files?.[0];
    if (!original) return;
    setUploading(true);
    try {
      const file = await convertImageToWebp(original);
      const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type });
      if (error) {
        ue.error(error.message);
        return;
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
      ue.success("Image uploaded");
    } catch (err) {
      ue.error(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 rounded-lg overflow-hidden border bg-gray-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "", className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(null), className: "absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "w-32 h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 text-[11px] text-muted-foreground text-center px-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 mb-1" }),
      uploading ? "Uploading…" : "Upload",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-1 leading-tight", children: [
        "JPG, PNG, WEBP",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "(auto-converted to WebP)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handle, disabled: uploading })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "url",
        placeholder: "…or paste image URL",
        value: value || "",
        onChange: (e) => onChange(e.target.value || null),
        className: "w-full px-3 py-2 border rounded-lg text-sm bg-white"
      }
    ) })
  ] });
}
export {
  ImageUpload as I
};
