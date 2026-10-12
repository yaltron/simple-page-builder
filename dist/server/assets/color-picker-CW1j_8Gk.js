import { M as jsxRuntimeExports } from "../server.js";
const SWATCHES = ["#C2185B", "#E6007E", "#2D0A1E", "#1BA0DC", "#8B0F50", "#FFFFFF"];
function ColorPicker({
  value,
  onChange
}) {
  const v = value || "#E6007E";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    SWATCHES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(c),
        "aria-label": c,
        className: "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110",
        style: { background: c, borderColor: v.toLowerCase() === c.toLowerCase() ? "#2D0A1E" : "rgba(0,0,0,0.12)" }
      },
      c
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "color",
        value: v,
        onChange: (e) => onChange(e.target.value),
        className: "w-7 h-7 rounded cursor-pointer border",
        "aria-label": "Custom color"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        value: v,
        onChange: (e) => onChange(e.target.value),
        placeholder: "#E6007E",
        className: "w-24 px-2 py-1 border rounded text-sm font-mono"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-5 h-5 rounded border", style: { background: v }, "aria-hidden": "true" })
  ] });
}
export {
  ColorPicker as C
};
