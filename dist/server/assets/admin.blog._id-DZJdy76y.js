import { W as reactExports, M as jsxRuntimeExports } from "../server.js";
import { s as supabase, u as ue, q as useParams, p as useNavigate, L as Link$1, X } from "./router-4B5-JGly.js";
import { u as useAdminAuth, A as AdminLoading, a as AdminShell } from "./use-admin-auth-Ce2DoEvQ.js";
import { N as Node3, t as nodeInputRule, R as ResizableNodeView, s as mergeAttributes, M as Mark, b as Extension, l as getStyleProperty, r as markPasteRule, q as markInputRule, d as Plugin, e as PluginKey, S as Selection, f as SelectionRange, T as TextSelection, F as Fragment, g as Slice, a as DecorationSet, D as Decoration, p as keydownHandler, c as NodeSelection, h as Transform, i as callOrReturn, k as getExtensionField, j as findParentNodeClosestToPos, C as CharacterCount, P as Placeholder, u as useEditor, m as index_default$7, o as index_default$8, n as index_default$9, E as EditorContent } from "./index-DNO7A5xf.js";
import { H as Heading1, c as Heading2, d as Heading3, U as Underline, S as Strikethrough, a as Code, b as CodeXml, T as Table$1, f as Undo, R as Redo, e as Minimize2, M as Maximize2, C as CircleX } from "./undo-CbuQIKny.js";
import { B as Bold, I as Italic, a as List, b as ListOrdered, L as Link } from "./list-BneYn18z.js";
import { Q as Quote } from "./quote-Ci86XyD3.js";
import { I as Image$1 } from "./user-round-fnYlCX4m.js";
import { M as Minus } from "./minus-LJROBNSp.js";
import { C as ChevronLeft } from "./chevron-left-CjtAut_D.js";
import { U as Upload } from "./upload-DroGKuN0.js";
import { C as CircleCheck } from "./circle-check-fYV4Wd0M.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./index-Dn3DJaKR.js";
import "./logo-mJLYSy2R.js";
import "./file-text-BJ6E_L4F.js";
import "./stethoscope-Dg79Wn2h.js";
import "./briefcase-CL4WmvrV.js";
var inputRegex$1 = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
var Image = Node3.create({
  name: "image",
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resize: false
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: null
      },
      height: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  parseMarkdown: (token, helpers) => {
    return helpers.createNode("image", {
      src: token.href,
      title: token.title,
      alt: token.text
    });
  },
  renderMarkdown: (node) => {
    var _a, _b, _c, _d, _e, _f;
    const src = (_b = (_a = node.attrs) == null ? void 0 : _a.src) != null ? _b : "";
    const alt = (_d = (_c = node.attrs) == null ? void 0 : _c.alt) != null ? _d : "";
    const title = (_f = (_e = node.attrs) == null ? void 0 : _e.title) != null ? _f : "";
    return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})`;
  },
  addNodeView() {
    if (!this.options.resize || !this.options.resize.enabled || typeof document === "undefined") {
      return null;
    }
    const { directions, minWidth, minHeight, alwaysPreserveAspectRatio } = this.options.resize;
    return ({ node, getPos, HTMLAttributes, editor }) => {
      const el = document.createElement("img");
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (value != null) {
          switch (key) {
            case "width":
            case "height":
              break;
            default:
              el.setAttribute(key, value);
              break;
          }
        }
      });
      el.src = HTMLAttributes.src;
      const nodeView = new ResizableNodeView({
        element: el,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === void 0) {
            return;
          }
          this.editor.chain().setNodeSelection(pos).updateAttributes(this.name, {
            width,
            height
          }).run();
        },
        onUpdate: (updatedNode, _decorations, _innerDecorations) => {
          if (updatedNode.type !== node.type) {
            return false;
          }
          return true;
        },
        options: {
          directions,
          min: {
            width: minWidth,
            height: minHeight
          },
          preserveAspectRatio: alwaysPreserveAspectRatio === true
        }
      });
      const dom = nodeView.dom;
      dom.style.visibility = "hidden";
      dom.style.pointerEvents = "none";
      el.onload = () => {
        dom.style.visibility = "";
        dom.style.pointerEvents = "";
      };
      return nodeView;
    };
  },
  addCommands() {
    return {
      setImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  },
  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex$1,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;
          return { src, alt, title };
        }
      })
    ];
  }
});
var index_default$6 = Image;
var MAX_FIND_CHILD_SPAN_DEPTH = 20;
var findChildSpans = (element, depth = 0) => {
  const childSpans = [];
  if (!element.children.length || depth > MAX_FIND_CHILD_SPAN_DEPTH) {
    return childSpans;
  }
  Array.from(element.children).forEach((child) => {
    if (child.tagName === "SPAN") {
      childSpans.push(child);
    } else if (child.children.length) {
      childSpans.push(...findChildSpans(child, depth + 1));
    }
  });
  return childSpans;
};
var mergeNestedSpanStyles = (element) => {
  if (!element.children.length) {
    return;
  }
  const childSpans = findChildSpans(element);
  if (!childSpans) {
    return;
  }
  childSpans.forEach((childSpan) => {
    var _a, _b;
    const childStyle = childSpan.getAttribute("style");
    const closestParentSpanStyleOfChild = (_b = (_a = childSpan.parentElement) == null ? void 0 : _a.closest("span")) == null ? void 0 : _b.getAttribute("style");
    childSpan.setAttribute("style", `${closestParentSpanStyleOfChild};${childStyle}`);
  });
};
var TextStyle = Mark.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      mergeNestedSpanStyles: true
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        consuming: false,
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          if (this.options.mergeNestedSpanStyles) {
            mergeNestedSpanStyles(element);
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleTextStyle: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      removeEmptyTextStyle: () => ({ tr }) => {
        const { selection } = tr;
        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (node.isTextblock) {
            return true;
          }
          if (!node.marks.filter((mark) => mark.type === this.type).some((mark) => Object.values(mark.attrs).some((value) => !!value))) {
            tr.removeMark(pos, pos + node.nodeSize, this.type);
          }
        });
        return true;
      }
    };
  }
});
var BackgroundColor = Extension.create({
  name: "backgroundColor",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) => {
              var _a;
              const value = (_a = getStyleProperty(element, "background-color")) != null ? _a : element.style.backgroundColor;
              return value == null ? void 0 : value.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }
              return {
                style: `background-color: ${attributes.backgroundColor}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setBackgroundColor: (backgroundColor) => ({ chain }) => {
        return chain().setMark("textStyle", { backgroundColor }).run();
      },
      unsetBackgroundColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { backgroundColor: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var Color = Extension.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => {
              var _a;
              const value = (_a = getStyleProperty(element, "color")) != null ? _a : element.style.color;
              return value == null ? void 0 : value.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }
              return {
                style: `color: ${attributes.color}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (color) => ({ chain }) => {
        return chain().setMark("textStyle", { color }).run();
      },
      unsetColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { color: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var FontFamily = Extension.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            // Prefer the raw inline `style` attribute so unquoted or
            // single-quoted multi-word names are preserved instead of being
            // canonicalized by `element.style.fontFamily`, which forces double
            // quotes that then get HTML-encoded to `&quot;` on serialization.
            parseHTML: (element) => {
              var _a;
              return (_a = getStyleProperty(element, "font-family")) != null ? _a : element.style.fontFamily;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) {
                return {};
              }
              return {
                style: `font-family: ${attributes.fontFamily}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontFamily: (fontFamily) => ({ chain }) => {
        return chain().setMark("textStyle", { fontFamily }).run();
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            // Prefer the raw inline `style` attribute so the original format
            // is preserved instead of the canonicalized value returned by
            // `element.style.fontSize`.
            parseHTML: (element) => {
              var _a;
              return (_a = getStyleProperty(element, "font-size")) != null ? _a : element.style.fontSize;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            // Prefer the raw inline `style` attribute so the original format
            // is preserved instead of the canonicalized value returned by
            // `element.style.lineHeight`.
            parseHTML: (element) => {
              var _a;
              return (_a = getStyleProperty(element, "line-height")) != null ? _a : element.style.lineHeight;
            },
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight) => ({ chain }) => {
        return chain().setMark("textStyle", { lineHeight }).run();
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain().setMark("textStyle", { lineHeight: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
Extension.create({
  name: "textStyleKit",
  addExtensions() {
    const extensions = [];
    if (this.options.backgroundColor !== false) {
      extensions.push(BackgroundColor.configure(this.options.backgroundColor));
    }
    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options.color));
    }
    if (this.options.fontFamily !== false) {
      extensions.push(FontFamily.configure(this.options.fontFamily));
    }
    if (this.options.fontSize !== false) {
      extensions.push(FontSize.configure(this.options.fontSize));
    }
    if (this.options.lineHeight !== false) {
      extensions.push(LineHeight.configure(this.options.lineHeight));
    }
    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle));
    }
    return extensions;
  }
});
var inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;
var pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;
var Highlight = Mark.create({
  name: "highlight",
  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }
    return {
      color: {
        default: null,
        // Prefer `data-color` (set by our own `renderHTML`) for lossless
        // round-trips. Otherwise parse the raw inline `style` attribute so
        // the original color format (e.g. `#rrggbb`) is preserved instead of
        // the canonicalized `rgb(...)` value from `element.style.backgroundColor`.
        parseHTML: (element) => element.getAttribute("data-color") || getStyleProperty(element, "background-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }
          return {
            "data-color": attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`
          };
        }
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["mark", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  renderMarkdown: (node, h) => {
    return `==${h.renderChildren(node)}==`;
  },
  parseMarkdown: (token, h) => {
    return h.applyMark("highlight", h.parseInline(token.tokens || []));
  },
  markdownTokenizer: {
    name: "highlight",
    level: "inline",
    start: (src) => src.indexOf("=="),
    tokenize(src, _, h) {
      const rule = /^(==)([^=]+)(==)/;
      const match = rule.exec(src);
      if (match) {
        const innerContent = match[2].trim();
        const children = h.inlineTokens(innerContent);
        return {
          type: "highlight",
          raw: match[0],
          text: innerContent,
          tokens: children
        };
      }
    }
  },
  addCommands() {
    return {
      setHighlight: (attributes) => ({ commands }) => {
        return commands.setMark(this.name, attributes);
      },
      toggleHighlight: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      unsetHighlight: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight()
    };
  },
  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type
      })
    ];
  }
});
var index_default$5 = Highlight;
let readFromCache;
let addToCache;
if (typeof WeakMap != "undefined") {
  let cache = /* @__PURE__ */ new WeakMap();
  readFromCache = (key) => cache.get(key);
  addToCache = (key, value) => {
    cache.set(key, value);
    return value;
  };
} else {
  const cache = [];
  const cacheSize = 10;
  let cachePos = 0;
  readFromCache = (key) => {
    for (let i = 0; i < cache.length; i += 2) if (cache[i] == key) return cache[i + 1];
  };
  addToCache = (key, value) => {
    if (cachePos == cacheSize) cachePos = 0;
    cache[cachePos++] = key;
    return cache[cachePos++] = value;
  };
}
var TableMap = class {
  constructor(width, height, map, problems) {
    this.width = width;
    this.height = height;
    this.map = map;
    this.problems = problems;
  }
  findCell(pos) {
    for (let i = 0; i < this.map.length; i++) {
      const curPos = this.map[i];
      if (curPos != pos) continue;
      const left = i % this.width;
      const top = i / this.width | 0;
      let right = left + 1;
      let bottom = top + 1;
      for (let j = 1; right < this.width && this.map[i + j] == curPos; j++) right++;
      for (let j = 1; bottom < this.height && this.map[i + this.width * j] == curPos; j++) bottom++;
      return {
        left,
        top,
        right,
        bottom
      };
    }
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  colCount(pos) {
    for (let i = 0; i < this.map.length; i++) if (this.map[i] == pos) return i % this.width;
    throw new RangeError(`No cell with offset ${pos} found`);
  }
  nextCell(pos, axis, dir) {
    const { left, right, top, bottom } = this.findCell(pos);
    if (axis == "horiz") {
      if (dir < 0 ? left == 0 : right == this.width) return null;
      return this.map[top * this.width + (dir < 0 ? left - 1 : right)];
    } else {
      if (dir < 0 ? top == 0 : bottom == this.height) return null;
      return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)];
    }
  }
  rectBetween(a, b) {
    const { left: leftA, right: rightA, top: topA, bottom: bottomA } = this.findCell(a);
    const { left: leftB, right: rightB, top: topB, bottom: bottomB } = this.findCell(b);
    return {
      left: Math.min(leftA, leftB),
      top: Math.min(topA, topB),
      right: Math.max(rightA, rightB),
      bottom: Math.max(bottomA, bottomB)
    };
  }
  cellsInRect(rect) {
    const result = [];
    const seen = {};
    for (let row = rect.top; row < rect.bottom; row++) for (let col = rect.left; col < rect.right; col++) {
      const index = row * this.width + col;
      const pos = this.map[index];
      if (seen[pos]) continue;
      seen[pos] = true;
      if (col == rect.left && col && this.map[index - 1] == pos || row == rect.top && row && this.map[index - this.width] == pos) continue;
      result.push(pos);
    }
    return result;
  }
  positionAt(row, col, table) {
    for (let i = 0, rowStart = 0; ; i++) {
      const rowEnd = rowStart + table.child(i).nodeSize;
      if (i == row) {
        let index = col + row * this.width;
        const rowEndIndex = (row + 1) * this.width;
        while (index < rowEndIndex && this.map[index] < rowStart) index++;
        return index == rowEndIndex ? rowEnd - 1 : this.map[index];
      }
      rowStart = rowEnd;
    }
  }
  static get(table) {
    return readFromCache(table) || addToCache(table, computeMap(table));
  }
};
function computeMap(table) {
  if (table.type.spec.tableRole != "table") throw new RangeError("Not a table node: " + table.type.name);
  const width = findWidth(table), height = table.childCount;
  const map = [];
  let mapPos = 0;
  let problems = null;
  const colWidths = [];
  for (let i = 0, e = width * height; i < e; i++) map[i] = 0;
  for (let row = 0, pos = 0; row < height; row++) {
    const rowNode = table.child(row);
    pos++;
    for (let i = 0; ; i++) {
      while (mapPos < map.length && map[mapPos] != 0) mapPos++;
      if (i == rowNode.childCount) break;
      const cellNode = rowNode.child(i);
      const { colspan, rowspan, colwidth } = cellNode.attrs;
      for (let h = 0; h < rowspan; h++) {
        if (h + row >= height) {
          (problems || (problems = [])).push({
            type: "overlong_rowspan",
            pos,
            n: rowspan - h
          });
          break;
        }
        const start = mapPos + h * width;
        for (let w = 0; w < colspan; w++) {
          if (map[start + w] == 0) map[start + w] = pos;
          else (problems || (problems = [])).push({
            type: "collision",
            row,
            pos,
            n: colspan - w
          });
          const colW = colwidth && colwidth[w];
          if (colW) {
            const widthIndex = (start + w) % width * 2, prev = colWidths[widthIndex];
            if (prev == null || prev != colW && colWidths[widthIndex + 1] == 1) {
              colWidths[widthIndex] = colW;
              colWidths[widthIndex + 1] = 1;
            } else if (prev == colW) colWidths[widthIndex + 1]++;
          }
        }
      }
      mapPos += colspan;
      pos += cellNode.nodeSize;
    }
    const expectedPos = (row + 1) * width;
    let missing = 0;
    while (mapPos < expectedPos) if (map[mapPos++] == 0) missing++;
    if (missing) (problems || (problems = [])).push({
      type: "missing",
      row,
      n: missing
    });
    pos++;
  }
  if (width === 0 || height === 0) (problems || (problems = [])).push({ type: "zero_sized" });
  const tableMap = new TableMap(width, height, map, problems);
  let badWidths = false;
  for (let i = 0; !badWidths && i < colWidths.length; i += 2) if (colWidths[i] != null && colWidths[i + 1] < height) badWidths = true;
  if (badWidths) findBadColWidths(tableMap, colWidths, table);
  return tableMap;
}
function findWidth(table) {
  let width = -1;
  let hasRowSpan = false;
  for (let row = 0; row < table.childCount; row++) {
    const rowNode = table.child(row);
    let rowWidth = 0;
    if (hasRowSpan) for (let j = 0; j < row; j++) {
      const prevRow = table.child(j);
      for (let i = 0; i < prevRow.childCount; i++) {
        const cell = prevRow.child(i);
        if (j + cell.attrs.rowspan > row) rowWidth += cell.attrs.colspan;
      }
    }
    for (let i = 0; i < rowNode.childCount; i++) {
      const cell = rowNode.child(i);
      rowWidth += cell.attrs.colspan;
      if (cell.attrs.rowspan > 1) hasRowSpan = true;
    }
    if (width == -1) width = rowWidth;
    else if (width != rowWidth) width = Math.max(width, rowWidth);
  }
  return width;
}
function findBadColWidths(map, colWidths, table) {
  if (!map.problems) map.problems = [];
  const seen = {};
  for (let i = 0; i < map.map.length; i++) {
    const pos = map.map[i];
    if (seen[pos]) continue;
    seen[pos] = true;
    const node = table.nodeAt(pos);
    if (!node) throw new RangeError(`No cell with offset ${pos} found`);
    let updated = null;
    const attrs = node.attrs;
    for (let j = 0; j < attrs.colspan; j++) {
      const colWidth = colWidths[(i + j) % map.width * 2];
      if (colWidth != null && (!attrs.colwidth || attrs.colwidth[j] != colWidth)) (updated || (updated = freshColWidth(attrs)))[j] = colWidth;
    }
    if (updated) map.problems.unshift({
      type: "colwidth mismatch",
      pos,
      colwidth: updated
    });
  }
}
function freshColWidth(attrs) {
  if (attrs.colwidth) return attrs.colwidth.slice();
  const result = [];
  for (let i = 0; i < attrs.colspan; i++) result.push(0);
  return result;
}
function tableNodeTypes(schema) {
  let result = schema.cached.tableNodeTypes;
  if (!result) {
    result = schema.cached.tableNodeTypes = {};
    for (const name in schema.nodes) {
      const type = schema.nodes[name], role = type.spec.tableRole;
      if (role) result[role] = type;
    }
  }
  return result;
}
const tableEditingKey = new PluginKey("selectingCells");
function cellAround($pos) {
  for (let d = $pos.depth - 1; d > 0; d--) if ($pos.node(d).type.spec.tableRole == "row") return $pos.node(0).resolve($pos.before(d + 1));
  return null;
}
function cellWrapping($pos) {
  for (let d = $pos.depth; d > 0; d--) {
    const role = $pos.node(d).type.spec.tableRole;
    if (role === "cell" || role === "header_cell") return $pos.node(d);
  }
  return null;
}
function isInTable(state) {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--) if ($head.node(d).type.spec.tableRole == "row") return true;
  return false;
}
function selectionCell(state) {
  const sel = state.selection;
  if ("$anchorCell" in sel && sel.$anchorCell) return sel.$anchorCell.pos > sel.$headCell.pos ? sel.$anchorCell : sel.$headCell;
  else if ("node" in sel && sel.node && sel.node.type.spec.tableRole == "cell") return sel.$anchor;
  const $cell = cellAround(sel.$head) || cellNear(sel.$head);
  if ($cell) return $cell;
  throw new RangeError(`No cell found around position ${sel.head}`);
}
function cellNear($pos) {
  for (let after = $pos.nodeAfter, pos = $pos.pos; after; after = after.firstChild, pos++) {
    const role = after.type.spec.tableRole;
    if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos);
  }
  for (let before = $pos.nodeBefore, pos = $pos.pos; before; before = before.lastChild, pos--) {
    const role = before.type.spec.tableRole;
    if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos - before.nodeSize);
  }
}
function pointsAtCell($pos) {
  return $pos.parent.type.spec.tableRole == "row" && !!$pos.nodeAfter;
}
function moveCellForward($pos) {
  return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize);
}
function inSameTable($cellA, $cellB) {
  return $cellA.depth == $cellB.depth && $cellA.pos >= $cellB.start(-1) && $cellA.pos <= $cellB.end(-1);
}
function nextCell($pos, axis, dir) {
  const table = $pos.node(-1);
  const map = TableMap.get(table);
  const tableStart = $pos.start(-1);
  const moved = map.nextCell($pos.pos - tableStart, axis, dir);
  return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
}
function removeColSpan(attrs, pos, n = 1) {
  const result = {
    ...attrs,
    colspan: attrs.colspan - n
  };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    result.colwidth.splice(pos, n);
    if (!result.colwidth.some((w) => w > 0)) result.colwidth = null;
  }
  return result;
}
function addColSpan(attrs, pos, n = 1) {
  const result = {
    ...attrs,
    colspan: attrs.colspan + n
  };
  if (result.colwidth) {
    result.colwidth = result.colwidth.slice();
    for (let i = 0; i < n; i++) result.colwidth.splice(pos, 0, 0);
  }
  return result;
}
function columnIsHeader(map, table, col) {
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let row = 0; row < map.height; row++) if (table.nodeAt(map.map[col + row * map.width]).type != headerCell) return false;
  return true;
}
var CellSelection = class CellSelection2 extends Selection {
  constructor($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const rect = map.rectBetween($anchorCell.pos - tableStart, $headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    const cells = map.cellsInRect(rect).filter((p) => p != $headCell.pos - tableStart);
    cells.unshift($headCell.pos - tableStart);
    const ranges = cells.map((pos) => {
      const cell = table.nodeAt(pos);
      if (!cell) throw new RangeError(`No cell with offset ${pos} found`);
      const from = tableStart + pos + 1;
      return new SelectionRange(doc.resolve(from), doc.resolve(from + cell.content.size));
    });
    super(ranges[0].$from, ranges[0].$to, ranges);
    this.$anchorCell = $anchorCell;
    this.$headCell = $headCell;
  }
  map(doc, mapping) {
    const $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
    const $headCell = doc.resolve(mapping.map(this.$headCell.pos));
    if (pointsAtCell($anchorCell) && pointsAtCell($headCell) && inSameTable($anchorCell, $headCell)) {
      const tableChanged = this.$anchorCell.node(-1) != $anchorCell.node(-1);
      if (tableChanged && this.isRowSelection()) return CellSelection2.rowSelection($anchorCell, $headCell);
      else if (tableChanged && this.isColSelection()) return CellSelection2.colSelection($anchorCell, $headCell);
      else return new CellSelection2($anchorCell, $headCell);
    }
    return TextSelection.between($anchorCell, $headCell);
  }
  content() {
    const table = this.$anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const rect = map.rectBetween(this.$anchorCell.pos - tableStart, this.$headCell.pos - tableStart);
    const seen = {};
    const rows = [];
    for (let row = rect.top; row < rect.bottom; row++) {
      const rowContent = [];
      for (let index = row * map.width + rect.left, col = rect.left; col < rect.right; col++, index++) {
        const pos = map.map[index];
        if (seen[pos]) continue;
        seen[pos] = true;
        const cellRect = map.findCell(pos);
        let cell = table.nodeAt(pos);
        if (!cell) throw new RangeError(`No cell with offset ${pos} found`);
        const extraLeft = rect.left - cellRect.left;
        const extraRight = cellRect.right - rect.right;
        if (extraLeft > 0 || extraRight > 0) {
          let attrs = cell.attrs;
          if (extraLeft > 0) attrs = removeColSpan(attrs, 0, extraLeft);
          if (extraRight > 0) attrs = removeColSpan(attrs, attrs.colspan - extraRight, extraRight);
          if (cellRect.left < rect.left) {
            cell = cell.type.createAndFill(attrs);
            if (!cell) throw new RangeError(`Could not create cell with attrs ${JSON.stringify(attrs)}`);
          } else cell = cell.type.create(attrs, cell.content);
        }
        if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
          const attrs = {
            ...cell.attrs,
            rowspan: Math.min(cellRect.bottom, rect.bottom) - Math.max(cellRect.top, rect.top)
          };
          if (cellRect.top < rect.top) cell = cell.type.createAndFill(attrs);
          else cell = cell.type.create(attrs, cell.content);
        }
        rowContent.push(cell);
      }
      rows.push(table.child(row).copy(Fragment.from(rowContent)));
    }
    const fragment = this.isColSelection() && this.isRowSelection() ? table : rows;
    return new Slice(Fragment.from(fragment), 1, 1);
  }
  replace(tr, content = Slice.empty) {
    const mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      const { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
      tr.replace(mapping.map($from.pos), mapping.map($to.pos), i ? Slice.empty : content);
    }
    const sel = Selection.findFrom(tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)), -1);
    if (sel) tr.setSelection(sel);
  }
  replaceWith(tr, node) {
    this.replace(tr, new Slice(Fragment.from(node), 0, 0));
  }
  forEachCell(f) {
    const table = this.$anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const cells = map.cellsInRect(map.rectBetween(this.$anchorCell.pos - tableStart, this.$headCell.pos - tableStart));
    for (let i = 0; i < cells.length; i++) f(table.nodeAt(cells[i]), tableStart + cells[i]);
  }
  isColSelection() {
    const anchorTop = this.$anchorCell.index(-1);
    const headTop = this.$headCell.index(-1);
    if (Math.min(anchorTop, headTop) > 0) return false;
    const anchorBottom = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan;
    const headBottom = headTop + this.$headCell.nodeAfter.attrs.rowspan;
    return Math.max(anchorBottom, headBottom) == this.$headCell.node(-1).childCount;
  }
  static colSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const anchorRect = map.findCell($anchorCell.pos - tableStart);
    const headRect = map.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.top <= headRect.top) {
      if (anchorRect.top > 0) $anchorCell = doc.resolve(tableStart + map.map[anchorRect.left]);
      if (headRect.bottom < map.height) $headCell = doc.resolve(tableStart + map.map[map.width * (map.height - 1) + headRect.right - 1]);
    } else {
      if (headRect.top > 0) $headCell = doc.resolve(tableStart + map.map[headRect.left]);
      if (anchorRect.bottom < map.height) $anchorCell = doc.resolve(tableStart + map.map[map.width * (map.height - 1) + anchorRect.right - 1]);
    }
    return new CellSelection2($anchorCell, $headCell);
  }
  isRowSelection() {
    const table = this.$anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = this.$anchorCell.start(-1);
    const anchorLeft = map.colCount(this.$anchorCell.pos - tableStart);
    const headLeft = map.colCount(this.$headCell.pos - tableStart);
    if (Math.min(anchorLeft, headLeft) > 0) return false;
    const anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan;
    const headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
    return Math.max(anchorRight, headRight) == map.width;
  }
  eq(other) {
    return other instanceof CellSelection2 && other.$anchorCell.pos == this.$anchorCell.pos && other.$headCell.pos == this.$headCell.pos;
  }
  static rowSelection($anchorCell, $headCell = $anchorCell) {
    const table = $anchorCell.node(-1);
    const map = TableMap.get(table);
    const tableStart = $anchorCell.start(-1);
    const anchorRect = map.findCell($anchorCell.pos - tableStart);
    const headRect = map.findCell($headCell.pos - tableStart);
    const doc = $anchorCell.node(0);
    if (anchorRect.left <= headRect.left) {
      if (anchorRect.left > 0) $anchorCell = doc.resolve(tableStart + map.map[anchorRect.top * map.width]);
      if (headRect.right < map.width) $headCell = doc.resolve(tableStart + map.map[map.width * (headRect.top + 1) - 1]);
    } else {
      if (headRect.left > 0) $headCell = doc.resolve(tableStart + map.map[headRect.top * map.width]);
      if (anchorRect.right < map.width) $anchorCell = doc.resolve(tableStart + map.map[map.width * (anchorRect.top + 1) - 1]);
    }
    return new CellSelection2($anchorCell, $headCell);
  }
  toJSON() {
    return {
      type: "cell",
      anchor: this.$anchorCell.pos,
      head: this.$headCell.pos
    };
  }
  static fromJSON(doc, json) {
    return new CellSelection2(doc.resolve(json.anchor), doc.resolve(json.head));
  }
  static create(doc, anchorCell, headCell = anchorCell) {
    return new CellSelection2(doc.resolve(anchorCell), doc.resolve(headCell));
  }
  getBookmark() {
    return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos);
  }
};
CellSelection.prototype.visible = false;
Selection.jsonID("cell", CellSelection);
var CellBookmark = class CellBookmark2 {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new CellBookmark2(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc) {
    const $anchorCell = doc.resolve(this.anchor), $headCell = doc.resolve(this.head);
    if ($anchorCell.parent.type.spec.tableRole == "row" && $headCell.parent.type.spec.tableRole == "row" && $anchorCell.index() < $anchorCell.parent.childCount && $headCell.index() < $headCell.parent.childCount && inSameTable($anchorCell, $headCell)) return new CellSelection($anchorCell, $headCell);
    else return Selection.near($headCell, 1);
  }
};
function drawCellSelection(state) {
  if (!(state.selection instanceof CellSelection)) return null;
  const cells = [];
  state.selection.forEachCell((node, pos) => {
    cells.push(Decoration.node(pos, pos + node.nodeSize, { class: "selectedCell" }));
  });
  return DecorationSet.create(state.doc, cells);
}
function isCellBoundarySelection({ $from, $to }) {
  if ($from.pos == $to.pos || $from.pos < $to.pos - 6) return false;
  let afterFrom = $from.pos;
  let beforeTo = $to.pos;
  let depth = $from.depth;
  for (; depth >= 0; depth--, afterFrom++) if ($from.after(depth + 1) < $from.end(depth)) break;
  for (let d = $to.depth; d >= 0; d--, beforeTo--) if ($to.before(d + 1) > $to.start(d)) break;
  return afterFrom == beforeTo && /row|table/.test($from.node(depth).type.spec.tableRole);
}
function isTextSelectionAcrossCells({ $from, $to }) {
  let fromCellBoundaryNode;
  let toCellBoundaryNode;
  for (let i = $from.depth; i > 0; i--) {
    const node = $from.node(i);
    if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
      fromCellBoundaryNode = node;
      break;
    }
  }
  for (let i = $to.depth; i > 0; i--) {
    const node = $to.node(i);
    if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
      toCellBoundaryNode = node;
      break;
    }
  }
  return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0;
}
function normalizeSelection(state, tr, allowTableNodeSelection) {
  const sel = (tr || state).selection;
  const doc = (tr || state).doc;
  let normalize;
  let role;
  if (sel instanceof NodeSelection && (role = sel.node.type.spec.tableRole)) {
    if (role == "cell" || role == "header_cell") normalize = CellSelection.create(doc, sel.from);
    else if (role == "row") {
      const $cell = doc.resolve(sel.from + 1);
      normalize = CellSelection.rowSelection($cell, $cell);
    } else if (!allowTableNodeSelection) {
      const map = TableMap.get(sel.node);
      const start = sel.from + 1;
      const lastCell = start + map.map[map.width * map.height - 1];
      normalize = CellSelection.create(doc, start + 1, lastCell);
    }
  } else if (sel instanceof TextSelection && isCellBoundarySelection(sel)) normalize = TextSelection.create(doc, sel.from);
  else if (sel instanceof TextSelection && isTextSelectionAcrossCells(sel)) normalize = TextSelection.create(doc, sel.$from.start(), sel.$from.end());
  if (normalize) (tr || (tr = state.tr)).setSelection(normalize);
  return tr;
}
const fixTablesKey = new PluginKey("fix-tables");
function changedDescendants(old, cur, offset, f) {
  const oldSize = old.childCount, curSize = cur.childCount;
  outer: for (let i = 0, j = 0; i < curSize; i++) {
    const child = cur.child(i);
    for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) if (old.child(scan) == child) {
      j = scan + 1;
      offset += child.nodeSize;
      continue outer;
    }
    f(child, offset);
    if (j < oldSize && old.child(j).sameMarkup(child)) changedDescendants(old.child(j), child, offset + 1, f);
    else child.nodesBetween(0, child.content.size, f, offset + 1);
    offset += child.nodeSize;
  }
}
function fixTables(state, oldState) {
  let tr;
  const check = (node, pos) => {
    if (node.type.spec.tableRole == "table") tr = fixTable(state, node, pos, tr);
  };
  if (!oldState) state.doc.descendants(check);
  else if (oldState.doc != state.doc) changedDescendants(oldState.doc, state.doc, 0, check);
  return tr;
}
function fixTable(state, table, tablePos, tr) {
  const map = TableMap.get(table);
  if (!map.problems) return tr;
  if (!tr) tr = state.tr;
  const mustAdd = [];
  for (let i = 0; i < map.height; i++) mustAdd.push(0);
  for (let i = 0; i < map.problems.length; i++) {
    const prob = map.problems[i];
    if (prob.type == "collision") {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      const attrs = cell.attrs;
      for (let j = 0; j < attrs.rowspan; j++) mustAdd[prob.row + j] += prob.n;
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, removeColSpan(attrs, attrs.colspan - prob.n, prob.n));
    } else if (prob.type == "missing") mustAdd[prob.row] += prob.n;
    else if (prob.type == "overlong_rowspan") {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        rowspan: cell.attrs.rowspan - prob.n
      });
    } else if (prob.type == "colwidth mismatch") {
      const cell = table.nodeAt(prob.pos);
      if (!cell) continue;
      tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
        ...cell.attrs,
        colwidth: prob.colwidth
      });
    } else if (prob.type == "zero_sized") {
      const pos = tr.mapping.map(tablePos);
      tr.delete(pos, pos + table.nodeSize);
    }
  }
  let first, last;
  for (let i = 0; i < mustAdd.length; i++) if (mustAdd[i]) {
    if (first == null) first = i;
    last = i;
  }
  for (let i = 0, pos = tablePos + 1; i < map.height; i++) {
    const row = table.child(i);
    const end = pos + row.nodeSize;
    const add = mustAdd[i];
    if (add > 0) {
      let role = "cell";
      if (row.firstChild) role = row.firstChild.type.spec.tableRole;
      const nodes = [];
      for (let j = 0; j < add; j++) {
        const node = tableNodeTypes(state.schema)[role].createAndFill();
        if (node) nodes.push(node);
      }
      const side = (i == 0 || first == i - 1) && last == i ? pos + 1 : end - 1;
      tr.insert(tr.mapping.map(side), nodes);
    }
    pos = end;
  }
  return tr.setMeta(fixTablesKey, { fixTables: true });
}
function selectedRect(state) {
  const sel = state.selection;
  const $pos = selectionCell(state);
  const table = $pos.node(-1);
  const tableStart = $pos.start(-1);
  const map = TableMap.get(table);
  return {
    ...sel instanceof CellSelection ? map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart) : map.findCell($pos.pos - tableStart),
    tableStart,
    map,
    table
  };
}
function addColumn(tr, { map, tableStart, table }, col) {
  let refColumn = col > 0 ? -1 : 0;
  if (columnIsHeader(map, table, col + refColumn)) refColumn = col == 0 || col == map.width ? null : 0;
  for (let row = 0; row < map.height; row++) {
    const index = row * map.width + col;
    if (col > 0 && col < map.width && map.map[index - 1] == map.map[index]) {
      const pos = map.map[index];
      const cell = table.nodeAt(pos);
      tr.setNodeMarkup(tr.mapping.map(tableStart + pos), null, addColSpan(cell.attrs, col - map.colCount(pos)));
      row += cell.attrs.rowspan - 1;
    } else {
      const type = refColumn == null ? tableNodeTypes(table.type.schema).cell : table.nodeAt(map.map[index + refColumn]).type;
      const pos = map.positionAt(row, col, table);
      tr.insert(tr.mapping.map(tableStart + pos), type.createAndFill());
    }
  }
  return tr;
}
function addColumnBefore(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.left));
  }
  return true;
}
function addColumnAfter(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addColumn(state.tr, rect, rect.right));
  }
  return true;
}
function removeColumn(tr, { map, table, tableStart }, col) {
  const mapStart = tr.mapping.maps.length;
  for (let row = 0; row < map.height; ) {
    const index = row * map.width + col;
    const pos = map.map[index];
    const cell = table.nodeAt(pos);
    const attrs = cell.attrs;
    if (col > 0 && map.map[index - 1] == pos || col < map.width - 1 && map.map[index + 1] == pos) tr.setNodeMarkup(tr.mapping.slice(mapStart).map(tableStart + pos), null, removeColSpan(attrs, col - map.colCount(pos)));
    else {
      const start = tr.mapping.slice(mapStart).map(tableStart + pos);
      tr.delete(start, start + cell.nodeSize);
    }
    row += attrs.rowspan;
  }
}
function deleteColumn(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    const tr = state.tr;
    if (rect.left == 0 && rect.right == rect.map.width) return false;
    for (let i = rect.right - 1; ; i--) {
      removeColumn(tr, rect, i);
      if (i == rect.left) break;
      const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
      if (!table) throw new RangeError("No table found");
      rect.table = table;
      rect.map = TableMap.get(table);
    }
    dispatch(tr);
  }
  return true;
}
function rowIsHeader(map, table, row) {
  var _table$nodeAt;
  const headerCell = tableNodeTypes(table.type.schema).header_cell;
  for (let col = 0; col < map.width; col++) if (((_table$nodeAt = table.nodeAt(map.map[col + row * map.width])) === null || _table$nodeAt === void 0 ? void 0 : _table$nodeAt.type) != headerCell) return false;
  return true;
}
function addRow(tr, { map, tableStart, table }, row) {
  let rowPos = tableStart;
  for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
  const cells = [];
  let refRow = row > 0 ? -1 : 0;
  if (rowIsHeader(map, table, row + refRow)) refRow = row == 0 || row == map.height ? null : 0;
  for (let col = 0, index = map.width * row; col < map.width; col++, index++) if (row > 0 && row < map.height && map.map[index] == map.map[index - map.width]) {
    const pos = map.map[index];
    const attrs = table.nodeAt(pos).attrs;
    tr.setNodeMarkup(tableStart + pos, null, {
      ...attrs,
      rowspan: attrs.rowspan + 1
    });
    col += attrs.colspan - 1;
  } else {
    var _table$nodeAt2;
    const type = refRow == null ? tableNodeTypes(table.type.schema).cell : (_table$nodeAt2 = table.nodeAt(map.map[index + refRow * map.width])) === null || _table$nodeAt2 === void 0 ? void 0 : _table$nodeAt2.type;
    const node = type === null || type === void 0 ? void 0 : type.createAndFill();
    if (node) cells.push(node);
  }
  tr.insert(rowPos, tableNodeTypes(table.type.schema).row.create(null, cells));
  return tr;
}
function addRowBefore(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.top));
  }
  return true;
}
function addRowAfter(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state);
    dispatch(addRow(state.tr, rect, rect.bottom));
  }
  return true;
}
function removeRow(tr, { map, table, tableStart }, row) {
  let rowPos = 0;
  for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
  const nextRow = rowPos + table.child(row).nodeSize;
  const mapFrom = tr.mapping.maps.length;
  tr.delete(rowPos + tableStart, nextRow + tableStart);
  const seen = /* @__PURE__ */ new Set();
  for (let col = 0, index = row * map.width; col < map.width; col++, index++) {
    const pos = map.map[index];
    if (seen.has(pos)) continue;
    seen.add(pos);
    if (row > 0 && pos == map.map[index - map.width]) {
      const attrs = table.nodeAt(pos).attrs;
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + tableStart), null, {
        ...attrs,
        rowspan: attrs.rowspan - 1
      });
      col += attrs.colspan - 1;
    } else if (row < map.height && pos == map.map[index + map.width]) {
      const cell = table.nodeAt(pos);
      const attrs = cell.attrs;
      const copy = cell.type.create({
        ...attrs,
        rowspan: cell.attrs.rowspan - 1
      }, cell.content);
      const newPos = map.positionAt(row + 1, col, table);
      tr.insert(tr.mapping.slice(mapFrom).map(tableStart + newPos), copy);
      col += attrs.colspan - 1;
    }
  }
}
function deleteRow(state, dispatch) {
  if (!isInTable(state)) return false;
  if (dispatch) {
    const rect = selectedRect(state), tr = state.tr;
    if (rect.top == 0 && rect.bottom == rect.map.height) return false;
    for (let i = rect.bottom - 1; ; i--) {
      removeRow(tr, rect, i);
      if (i == rect.top) break;
      const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
      if (!table) throw new RangeError("No table found");
      rect.table = table;
      rect.map = TableMap.get(rect.table);
    }
    dispatch(tr);
  }
  return true;
}
function isEmpty(cell) {
  const c = cell.content;
  return c.childCount == 1 && c.child(0).isTextblock && c.child(0).childCount == 0;
}
function cellsOverlapRectangle({ width, height, map }, rect) {
  let indexTop = rect.top * width + rect.left, indexLeft = indexTop;
  let indexBottom = (rect.bottom - 1) * width + rect.left, indexRight = indexTop + (rect.right - rect.left - 1);
  for (let i = rect.top; i < rect.bottom; i++) {
    if (rect.left > 0 && map[indexLeft] == map[indexLeft - 1] || rect.right < width && map[indexRight] == map[indexRight + 1]) return true;
    indexLeft += width;
    indexRight += width;
  }
  for (let i = rect.left; i < rect.right; i++) {
    if (rect.top > 0 && map[indexTop] == map[indexTop - width] || rect.bottom < height && map[indexBottom] == map[indexBottom + width]) return true;
    indexTop++;
    indexBottom++;
  }
  return false;
}
function mergeCells(state, dispatch) {
  const sel = state.selection;
  if (!(sel instanceof CellSelection) || sel.$anchorCell.pos == sel.$headCell.pos) return false;
  const rect = selectedRect(state), { map } = rect;
  if (cellsOverlapRectangle(map, rect)) return false;
  if (dispatch) {
    const tr = state.tr;
    const seen = {};
    let content = Fragment.empty;
    let mergedPos;
    let mergedCell;
    for (let row = rect.top; row < rect.bottom; row++) for (let col = rect.left; col < rect.right; col++) {
      const cellPos = map.map[row * map.width + col];
      const cell = rect.table.nodeAt(cellPos);
      if (seen[cellPos] || !cell) continue;
      seen[cellPos] = true;
      if (mergedPos == null) {
        mergedPos = cellPos;
        mergedCell = cell;
      } else {
        if (!isEmpty(cell)) content = content.append(cell.content);
        const mapped = tr.mapping.map(cellPos + rect.tableStart);
        tr.delete(mapped, mapped + cell.nodeSize);
      }
    }
    if (mergedPos == null || mergedCell == null) return true;
    tr.setNodeMarkup(mergedPos + rect.tableStart, null, {
      ...addColSpan(mergedCell.attrs, mergedCell.attrs.colspan, rect.right - rect.left - mergedCell.attrs.colspan),
      rowspan: rect.bottom - rect.top
    });
    if (content.size > 0) {
      const end = mergedPos + 1 + mergedCell.content.size;
      const start = isEmpty(mergedCell) ? mergedPos + 1 : end;
      tr.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
    }
    tr.setSelection(new CellSelection(tr.doc.resolve(mergedPos + rect.tableStart)));
    dispatch(tr);
  }
  return true;
}
function splitCell(state, dispatch) {
  const nodeTypes = tableNodeTypes(state.schema);
  return splitCellWithType(({ node }) => {
    return nodeTypes[node.type.spec.tableRole];
  })(state, dispatch);
}
function splitCellWithType(getCellType) {
  return (state, dispatch) => {
    const sel = state.selection;
    let cellNode;
    let cellPos;
    if (!(sel instanceof CellSelection)) {
      var _cellAround;
      cellNode = cellWrapping(sel.$from);
      if (!cellNode) return false;
      cellPos = (_cellAround = cellAround(sel.$from)) === null || _cellAround === void 0 ? void 0 : _cellAround.pos;
    } else {
      if (sel.$anchorCell.pos != sel.$headCell.pos) return false;
      cellNode = sel.$anchorCell.nodeAfter;
      cellPos = sel.$anchorCell.pos;
    }
    if (cellNode == null || cellPos == null) return false;
    if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) return false;
    if (dispatch) {
      let baseAttrs = cellNode.attrs;
      const attrs = [];
      const colwidth = baseAttrs.colwidth;
      if (baseAttrs.rowspan > 1) baseAttrs = {
        ...baseAttrs,
        rowspan: 1
      };
      if (baseAttrs.colspan > 1) baseAttrs = {
        ...baseAttrs,
        colspan: 1
      };
      const rect = selectedRect(state), tr = state.tr;
      for (let i = 0; i < rect.right - rect.left; i++) attrs.push(colwidth ? {
        ...baseAttrs,
        colwidth: colwidth && colwidth[i] ? [colwidth[i]] : null
      } : baseAttrs);
      let lastCell;
      for (let row = rect.top; row < rect.bottom; row++) {
        let pos = rect.map.positionAt(row, rect.left, rect.table);
        if (row == rect.top) pos += cellNode.nodeSize;
        for (let col = rect.left, i = 0; col < rect.right; col++, i++) {
          if (col == rect.left && row == rect.top) continue;
          tr.insert(lastCell = tr.mapping.map(pos + rect.tableStart, 1), getCellType({
            node: cellNode,
            row,
            col
          }).createAndFill(attrs[i]));
        }
      }
      tr.setNodeMarkup(cellPos, getCellType({
        node: cellNode,
        row: rect.top,
        col: rect.left
      }), attrs[0]);
      if (sel instanceof CellSelection) tr.setSelection(new CellSelection(tr.doc.resolve(sel.$anchorCell.pos), lastCell ? tr.doc.resolve(lastCell) : void 0));
      dispatch(tr);
    }
    return true;
  };
}
function setCellAttr(name, value) {
  return function(state, dispatch) {
    if (!isInTable(state)) return false;
    const $cell = selectionCell(state);
    if ($cell.nodeAfter.attrs[name] === value) return false;
    if (dispatch) {
      const tr = state.tr;
      if (state.selection instanceof CellSelection) state.selection.forEachCell((node, pos) => {
        if (node.attrs[name] !== value) tr.setNodeMarkup(pos, null, {
          ...node.attrs,
          [name]: value
        });
      });
      else tr.setNodeMarkup($cell.pos, null, {
        ...$cell.nodeAfter.attrs,
        [name]: value
      });
      dispatch(tr);
    }
    return true;
  };
}
function deprecated_toggleHeader(type) {
  return function(state, dispatch) {
    if (!isInTable(state)) return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state), tr = state.tr;
      const cells = rect.map.cellsInRect(type == "column" ? {
        left: rect.left,
        top: 0,
        right: rect.right,
        bottom: rect.map.height
      } : type == "row" ? {
        left: 0,
        top: rect.top,
        right: rect.map.width,
        bottom: rect.bottom
      } : rect);
      const nodes = cells.map((pos) => rect.table.nodeAt(pos));
      for (let i = 0; i < cells.length; i++) if (nodes[i].type == types.header_cell) tr.setNodeMarkup(rect.tableStart + cells[i], types.cell, nodes[i].attrs);
      if (tr.steps.length === 0) for (let i = 0; i < cells.length; i++) tr.setNodeMarkup(rect.tableStart + cells[i], types.header_cell, nodes[i].attrs);
      dispatch(tr);
    }
    return true;
  };
}
function isHeaderEnabledByType(type, rect, types) {
  const cellPositions = rect.map.cellsInRect({
    left: 0,
    top: 0,
    right: type == "row" ? rect.map.width : 1,
    bottom: type == "column" ? rect.map.height : 1
  });
  for (let i = 0; i < cellPositions.length; i++) {
    const cell = rect.table.nodeAt(cellPositions[i]);
    if (cell && cell.type !== types.header_cell) return false;
  }
  return true;
}
function toggleHeader(type, options) {
  options = options || { useDeprecatedLogic: false };
  if (options.useDeprecatedLogic) return deprecated_toggleHeader(type);
  return function(state, dispatch) {
    if (!isInTable(state)) return false;
    if (dispatch) {
      const types = tableNodeTypes(state.schema);
      const rect = selectedRect(state), tr = state.tr;
      const isHeaderRowEnabled = isHeaderEnabledByType("row", rect, types);
      const isHeaderColumnEnabled = isHeaderEnabledByType("column", rect, types);
      const selectionStartsAt = (type === "column" ? isHeaderRowEnabled : type === "row" ? isHeaderColumnEnabled : false) ? 1 : 0;
      const cellsRect = type == "column" ? {
        left: 0,
        top: selectionStartsAt,
        right: 1,
        bottom: rect.map.height
      } : type == "row" ? {
        left: selectionStartsAt,
        top: 0,
        right: rect.map.width,
        bottom: 1
      } : rect;
      const newType = type == "column" ? isHeaderColumnEnabled ? types.cell : types.header_cell : type == "row" ? isHeaderRowEnabled ? types.cell : types.header_cell : types.cell;
      rect.map.cellsInRect(cellsRect).forEach((relativeCellPos) => {
        const cellPos = relativeCellPos + rect.tableStart;
        const cell = tr.doc.nodeAt(cellPos);
        if (cell) tr.setNodeMarkup(cellPos, newType, cell.attrs);
      });
      dispatch(tr);
    }
    return true;
  };
}
toggleHeader("row", { useDeprecatedLogic: true });
toggleHeader("column", { useDeprecatedLogic: true });
const toggleHeaderCell = toggleHeader("cell", { useDeprecatedLogic: true });
function findNextCell($cell, dir) {
  if (dir < 0) {
    const before = $cell.nodeBefore;
    if (before) return $cell.pos - before.nodeSize;
    for (let row = $cell.index(-1) - 1, rowEnd = $cell.before(); row >= 0; row--) {
      const rowNode = $cell.node(-1).child(row);
      const lastChild = rowNode.lastChild;
      if (lastChild) return rowEnd - 1 - lastChild.nodeSize;
      rowEnd -= rowNode.nodeSize;
    }
  } else {
    if ($cell.index() < $cell.parent.childCount - 1) return $cell.pos + $cell.nodeAfter.nodeSize;
    const table = $cell.node(-1);
    for (let row = $cell.indexAfter(-1), rowStart = $cell.after(); row < table.childCount; row++) {
      const rowNode = table.child(row);
      if (rowNode.childCount) return rowStart + 1;
      rowStart += rowNode.nodeSize;
    }
  }
  return null;
}
function goToNextCell(direction) {
  return function(state, dispatch) {
    if (!isInTable(state)) return false;
    const cell = findNextCell(selectionCell(state), direction);
    if (cell == null) return false;
    if (dispatch) {
      const $cell = state.doc.resolve(cell);
      dispatch(state.tr.setSelection(TextSelection.between($cell, moveCellForward($cell))).scrollIntoView());
    }
    return true;
  };
}
function deleteTable(state, dispatch) {
  const $pos = state.selection.$anchor;
  for (let d = $pos.depth; d > 0; d--) if ($pos.node(d).type.spec.tableRole == "table") {
    if (dispatch) dispatch(state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView());
    return true;
  }
  return false;
}
function deleteCellSelection(state, dispatch) {
  const sel = state.selection;
  if (!(sel instanceof CellSelection)) return false;
  if (dispatch) {
    const tr = state.tr;
    const baseContent = tableNodeTypes(state.schema).cell.createAndFill().content;
    sel.forEachCell((cell, pos) => {
      if (!cell.content.eq(baseContent)) tr.replace(tr.mapping.map(pos + 1), tr.mapping.map(pos + cell.nodeSize - 1), new Slice(baseContent, 0, 0));
    });
    if (tr.docChanged) dispatch(tr);
  }
  return true;
}
function pastedCells(slice) {
  if (slice.size === 0) return null;
  let { content, openStart, openEnd } = slice;
  while (content.childCount == 1 && (openStart > 0 && openEnd > 0 || content.child(0).type.spec.tableRole == "table")) {
    openStart--;
    openEnd--;
    content = content.child(0).content;
  }
  const first = content.child(0);
  const role = first.type.spec.tableRole;
  const schema = first.type.schema, rows = [];
  if (role == "row") for (let i = 0; i < content.childCount; i++) {
    let cells = content.child(i).content;
    const left = i ? 0 : Math.max(0, openStart - 1);
    const right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
    if (left || right) cells = fitSlice(tableNodeTypes(schema).row, new Slice(cells, left, right)).content;
    rows.push(cells);
  }
  else if (role == "cell" || role == "header_cell") rows.push(openStart || openEnd ? fitSlice(tableNodeTypes(schema).row, new Slice(content, openStart, openEnd)).content : content);
  else return null;
  return ensureRectangular(schema, rows);
}
function ensureRectangular(schema, rows) {
  const widths = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = row.childCount - 1; j >= 0; j--) {
      const { rowspan, colspan } = row.child(j).attrs;
      for (let r = i; r < i + rowspan; r++) widths[r] = (widths[r] || 0) + colspan;
    }
  }
  let width = 0;
  for (let r = 0; r < widths.length; r++) width = Math.max(width, widths[r]);
  for (let r = 0; r < widths.length; r++) {
    if (r >= rows.length) rows.push(Fragment.empty);
    if (widths[r] < width) {
      const empty = tableNodeTypes(schema).cell.createAndFill();
      const cells = [];
      for (let i = widths[r]; i < width; i++) cells.push(empty);
      rows[r] = rows[r].append(Fragment.from(cells));
    }
  }
  return {
    height: rows.length,
    width,
    rows
  };
}
function fitSlice(nodeType, slice) {
  const node = nodeType.createAndFill();
  return new Transform(node).replace(0, node.content.size, slice).doc;
}
function clipCells({ width, height, rows }, newWidth, newHeight) {
  if (width != newWidth) {
    const added = [];
    const newRows = [];
    for (let row = 0; row < rows.length; row++) {
      const frag = rows[row], cells = [];
      for (let col = added[row] || 0, i = 0; col < newWidth; i++) {
        let cell = frag.child(i % frag.childCount);
        if (col + cell.attrs.colspan > newWidth) cell = cell.type.createChecked(removeColSpan(cell.attrs, cell.attrs.colspan, col + cell.attrs.colspan - newWidth), cell.content);
        cells.push(cell);
        col += cell.attrs.colspan;
        for (let j = 1; j < cell.attrs.rowspan; j++) added[row + j] = (added[row + j] || 0) + cell.attrs.colspan;
      }
      newRows.push(Fragment.from(cells));
    }
    rows = newRows;
    width = newWidth;
  }
  if (height != newHeight) {
    const newRows = [];
    for (let row = 0, i = 0; row < newHeight; row++, i++) {
      const cells = [], source = rows[i % height];
      for (let j = 0; j < source.childCount; j++) {
        let cell = source.child(j);
        if (row + cell.attrs.rowspan > newHeight) cell = cell.type.create({
          ...cell.attrs,
          rowspan: Math.max(1, newHeight - cell.attrs.rowspan)
        }, cell.content);
        cells.push(cell);
      }
      newRows.push(Fragment.from(cells));
    }
    rows = newRows;
    height = newHeight;
  }
  return {
    width,
    height,
    rows
  };
}
function growTable(tr, map, table, start, width, height, mapFrom) {
  const schema = tr.doc.type.schema;
  const types = tableNodeTypes(schema);
  let empty;
  let emptyHead;
  if (width > map.width) for (let row = 0, rowEnd = 0; row < map.height; row++) {
    const rowNode = table.child(row);
    rowEnd += rowNode.nodeSize;
    const cells = [];
    let add;
    if (rowNode.lastChild == null || rowNode.lastChild.type == types.cell) add = empty || (empty = types.cell.createAndFill());
    else add = emptyHead || (emptyHead = types.header_cell.createAndFill());
    for (let i = map.width; i < width; i++) cells.push(add);
    tr.insert(tr.mapping.slice(mapFrom).map(rowEnd - 1 + start), cells);
  }
  if (height > map.height) {
    const cells = [];
    for (let i = 0, start$1 = (map.height - 1) * map.width; i < Math.max(map.width, width); i++) {
      const header = i >= map.width ? false : table.nodeAt(map.map[start$1 + i]).type == types.header_cell;
      cells.push(header ? emptyHead || (emptyHead = types.header_cell.createAndFill()) : empty || (empty = types.cell.createAndFill()));
    }
    const emptyRow = types.row.create(null, Fragment.from(cells)), rows = [];
    for (let i = map.height; i < height; i++) rows.push(emptyRow);
    tr.insert(tr.mapping.slice(mapFrom).map(start + table.nodeSize - 2), rows);
  }
  return !!(empty || emptyHead);
}
function isolateHorizontal(tr, map, table, start, left, right, top, mapFrom) {
  if (top == 0 || top == map.height) return false;
  let found = false;
  for (let col = left; col < right; col++) {
    const index = top * map.width + col, pos = map.map[index];
    if (map.map[index - map.width] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const { top: cellTop, left: cellLeft } = map.findCell(pos);
      tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + start), null, {
        ...cell.attrs,
        rowspan: top - cellTop
      });
      tr.insert(tr.mapping.slice(mapFrom).map(map.positionAt(top, cellLeft, table)), cell.type.createAndFill({
        ...cell.attrs,
        rowspan: cellTop + cell.attrs.rowspan - top
      }));
      col += cell.attrs.colspan - 1;
    }
  }
  return found;
}
function isolateVertical(tr, map, table, start, top, bottom, left, mapFrom) {
  if (left == 0 || left == map.width) return false;
  let found = false;
  for (let row = top; row < bottom; row++) {
    const index = row * map.width + left, pos = map.map[index];
    if (map.map[index - 1] == pos) {
      found = true;
      const cell = table.nodeAt(pos);
      const cellLeft = map.colCount(pos);
      const updatePos = tr.mapping.slice(mapFrom).map(pos + start);
      tr.setNodeMarkup(updatePos, null, removeColSpan(cell.attrs, left - cellLeft, cell.attrs.colspan - (left - cellLeft)));
      tr.insert(updatePos + cell.nodeSize, cell.type.createAndFill(removeColSpan(cell.attrs, 0, left - cellLeft)));
      row += cell.attrs.rowspan - 1;
    }
  }
  return found;
}
function insertCells(state, dispatch, tableStart, rect, cells) {
  let table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc;
  if (!table) throw new Error("No table found");
  let map = TableMap.get(table);
  const { top, left } = rect;
  const right = left + cells.width, bottom = top + cells.height;
  const tr = state.tr;
  let mapFrom = 0;
  function recomp() {
    table = tableStart ? tr.doc.nodeAt(tableStart - 1) : tr.doc;
    if (!table) throw new Error("No table found");
    map = TableMap.get(table);
    mapFrom = tr.mapping.maps.length;
  }
  if (growTable(tr, map, table, tableStart, right, bottom, mapFrom)) recomp();
  if (isolateHorizontal(tr, map, table, tableStart, left, right, top, mapFrom)) recomp();
  if (isolateHorizontal(tr, map, table, tableStart, left, right, bottom, mapFrom)) recomp();
  if (isolateVertical(tr, map, table, tableStart, top, bottom, left, mapFrom)) recomp();
  if (isolateVertical(tr, map, table, tableStart, top, bottom, right, mapFrom)) recomp();
  for (let row = top; row < bottom; row++) {
    const from = map.positionAt(row, left, table), to = map.positionAt(row, right, table);
    tr.replace(tr.mapping.slice(mapFrom).map(from + tableStart), tr.mapping.slice(mapFrom).map(to + tableStart), new Slice(cells.rows[row - top], 0, 0));
  }
  recomp();
  tr.setSelection(new CellSelection(tr.doc.resolve(tableStart + map.positionAt(top, left, table)), tr.doc.resolve(tableStart + map.positionAt(bottom - 1, right - 1, table))));
  dispatch(tr);
}
const handleKeyDown = keydownHandler({
  ArrowLeft: arrow("horiz", -1),
  ArrowRight: arrow("horiz", 1),
  ArrowUp: arrow("vert", -1),
  ArrowDown: arrow("vert", 1),
  "Shift-ArrowLeft": shiftArrow("horiz", -1),
  "Shift-ArrowRight": shiftArrow("horiz", 1),
  "Shift-ArrowUp": shiftArrow("vert", -1),
  "Shift-ArrowDown": shiftArrow("vert", 1),
  Backspace: deleteCellSelection,
  "Mod-Backspace": deleteCellSelection,
  Delete: deleteCellSelection,
  "Mod-Delete": deleteCellSelection
});
function maybeSetSelection(state, dispatch, selection) {
  if (selection.eq(state.selection)) return false;
  if (dispatch) dispatch(state.tr.setSelection(selection).scrollIntoView());
  return true;
}
function arrow(axis, dir) {
  return (state, dispatch, view) => {
    if (!view) return false;
    const sel = state.selection;
    if (sel instanceof CellSelection) return maybeSetSelection(state, dispatch, Selection.near(sel.$headCell, dir));
    if (axis != "horiz" && !sel.empty) return false;
    const end = atEndOfCell(view, axis, dir);
    if (end == null) return false;
    if (axis == "horiz") return maybeSetSelection(state, dispatch, Selection.near(state.doc.resolve(sel.head + dir), dir));
    else {
      const $cell = state.doc.resolve(end);
      const $next = nextCell($cell, axis, dir);
      let newSel;
      if ($next) newSel = Selection.near($next, 1);
      else if (dir < 0) newSel = Selection.near(state.doc.resolve($cell.before(-1)), -1);
      else newSel = Selection.near(state.doc.resolve($cell.after(-1)), 1);
      return maybeSetSelection(state, dispatch, newSel);
    }
  };
}
function shiftArrow(axis, dir) {
  return (state, dispatch, view) => {
    if (!view) return false;
    const sel = state.selection;
    let cellSel;
    if (sel instanceof CellSelection) cellSel = sel;
    else {
      const end = atEndOfCell(view, axis, dir);
      if (end == null) return false;
      cellSel = new CellSelection(state.doc.resolve(end));
    }
    const $head = nextCell(cellSel.$headCell, axis, dir);
    if (!$head) return false;
    return maybeSetSelection(state, dispatch, new CellSelection(cellSel.$anchorCell, $head));
  };
}
function handleTripleClick(view, pos) {
  const doc = view.state.doc, $cell = cellAround(doc.resolve(pos));
  if (!$cell) return false;
  view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
  return true;
}
function handlePaste(view, _, slice) {
  if (!isInTable(view.state)) return false;
  let cells = pastedCells(slice);
  const sel = view.state.selection;
  if (sel instanceof CellSelection) {
    if (!cells) cells = {
      width: 1,
      height: 1,
      rows: [Fragment.from(fitSlice(tableNodeTypes(view.state.schema).cell, slice))]
    };
    const table = sel.$anchorCell.node(-1);
    const start = sel.$anchorCell.start(-1);
    const rect = TableMap.get(table).rectBetween(sel.$anchorCell.pos - start, sel.$headCell.pos - start);
    cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
    insertCells(view.state, view.dispatch, start, rect, cells);
    return true;
  } else if (cells) {
    const $cell = selectionCell(view.state);
    const start = $cell.start(-1);
    insertCells(view.state, view.dispatch, start, TableMap.get($cell.node(-1)).findCell($cell.pos - start), cells);
    return true;
  } else return false;
}
function handleMouseDown$1(view, startEvent) {
  var _cellUnderMouse;
  if (startEvent.button != 0) return;
  if (startEvent.ctrlKey || startEvent.metaKey) return;
  const startDOMCell = domInCell(view, startEvent.target);
  let $anchor;
  if (startEvent.shiftKey && view.state.selection instanceof CellSelection) {
    setCellSelection(view.state.selection.$anchorCell, startEvent);
    startEvent.preventDefault();
  } else if (startEvent.shiftKey && startDOMCell && ($anchor = cellAround(view.state.selection.$anchor)) != null && ((_cellUnderMouse = cellUnderMouse(view, startEvent)) === null || _cellUnderMouse === void 0 ? void 0 : _cellUnderMouse.pos) != $anchor.pos) {
    setCellSelection($anchor, startEvent);
    startEvent.preventDefault();
  } else if (!startDOMCell) return;
  function setCellSelection($anchor$1, event) {
    let $head = cellUnderMouse(view, event);
    const starting = tableEditingKey.getState(view.state) == null;
    if (!$head || !inSameTable($anchor$1, $head)) if (starting) $head = $anchor$1;
    else return;
    const selection = new CellSelection($anchor$1, $head);
    if (starting || !view.state.selection.eq(selection)) {
      const tr = view.state.tr.setSelection(selection);
      if (starting) tr.setMeta(tableEditingKey, $anchor$1.pos);
      view.dispatch(tr);
    }
  }
  function stop() {
    view.root.removeEventListener("mouseup", stop);
    view.root.removeEventListener("dragstart", stop);
    view.root.removeEventListener("mousemove", move);
    if (tableEditingKey.getState(view.state) != null) view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
  }
  function move(_event) {
    const event = _event;
    const anchor = tableEditingKey.getState(view.state);
    let $anchor$1;
    if (anchor != null) $anchor$1 = view.state.doc.resolve(anchor);
    else if (domInCell(view, event.target) != startDOMCell) {
      $anchor$1 = cellUnderMouse(view, startEvent);
      if (!$anchor$1) return stop();
    }
    if ($anchor$1) setCellSelection($anchor$1, event);
  }
  view.root.addEventListener("mouseup", stop);
  view.root.addEventListener("dragstart", stop);
  view.root.addEventListener("mousemove", move);
}
function atEndOfCell(view, axis, dir) {
  if (!(view.state.selection instanceof TextSelection)) return null;
  const { $head } = view.state.selection;
  for (let d = $head.depth - 1; d >= 0; d--) {
    const parent = $head.node(d);
    if ((dir < 0 ? $head.index(d) : $head.indexAfter(d)) != (dir < 0 ? 0 : parent.childCount)) return null;
    if (parent.type.spec.tableRole == "cell" || parent.type.spec.tableRole == "header_cell") {
      const cellPos = $head.before(d);
      const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
      return view.endOfTextblock(dirStr) ? cellPos : null;
    }
  }
  return null;
}
function domInCell(view, dom) {
  for (; dom && dom != view.dom; dom = dom.parentNode) if (dom.nodeName == "TD" || dom.nodeName == "TH") return dom;
  return null;
}
function cellUnderMouse(view, event) {
  const mousePos = view.posAtCoords({
    left: event.clientX,
    top: event.clientY
  });
  if (!mousePos) return null;
  let { inside, pos } = mousePos;
  return inside >= 0 && cellAround(view.state.doc.resolve(inside)) || cellAround(view.state.doc.resolve(pos));
}
var TableView$1 = class TableView {
  constructor(node, defaultCellMinWidth) {
    this.node = node;
    this.defaultCellMinWidth = defaultCellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    this.table.style.setProperty("--default-cell-min-width", `${defaultCellMinWidth}px`);
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    updateColumnsOnResize(node, this.colgroup, this.table, defaultCellMinWidth);
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(node) {
    if (node.type != this.node.type) return false;
    this.node = node;
    updateColumnsOnResize(node, this.colgroup, this.table, this.defaultCellMinWidth);
    return true;
  }
  ignoreMutation(record) {
    return record.type == "attributes" && (record.target == this.table || this.colgroup.contains(record.target));
  }
};
function updateColumnsOnResize(node, colgroup, table, defaultCellMinWidth, overrideCol, overrideValue) {
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild;
  const row = node.firstChild;
  if (!row) return;
  for (let i = 0, col = 0; i < row.childCount; i++) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j++, col++) {
      const hasWidth = overrideCol == col ? overrideValue : colwidth && colwidth[j];
      const cssWidth = hasWidth ? hasWidth + "px" : "";
      totalWidth += hasWidth || defaultCellMinWidth;
      if (!hasWidth) fixedWidth = false;
      if (!nextDOM) {
        const col$1 = document.createElement("col");
        col$1.style.width = cssWidth;
        colgroup.appendChild(col$1);
      } else {
        if (nextDOM.style.width != cssWidth) nextDOM.style.width = cssWidth;
        nextDOM = nextDOM.nextSibling;
      }
    }
  }
  while (nextDOM) {
    var _nextDOM$parentNode;
    const after = nextDOM.nextSibling;
    (_nextDOM$parentNode = nextDOM.parentNode) === null || _nextDOM$parentNode === void 0 || _nextDOM$parentNode.removeChild(nextDOM);
    nextDOM = after;
  }
  if (fixedWidth) {
    table.style.width = totalWidth + "px";
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = totalWidth + "px";
  }
}
const columnResizingPluginKey = new PluginKey("tableColumnResizing");
function columnResizing({ handleWidth = 5, cellMinWidth = 25, defaultCellMinWidth = 100, View = TableView$1, lastColumnResizable = true } = {}) {
  const plugin = new Plugin({
    key: columnResizingPluginKey,
    state: {
      init(_, state) {
        var _plugin$spec;
        const nodeViews = (_plugin$spec = plugin.spec) === null || _plugin$spec === void 0 || (_plugin$spec = _plugin$spec.props) === null || _plugin$spec === void 0 ? void 0 : _plugin$spec.nodeViews;
        const tableName = tableNodeTypes(state.schema).table.name;
        if (View && nodeViews) nodeViews[tableName] = (node, view) => {
          return new View(node, defaultCellMinWidth, view);
        };
        return new ResizeState(-1, false);
      },
      apply(tr, prev) {
        return prev.apply(tr);
      }
    },
    props: {
      attributes: (state) => {
        const pluginState = columnResizingPluginKey.getState(state);
        return pluginState && pluginState.activeHandle > -1 ? { class: "resize-cursor" } : {};
      },
      handleDOMEvents: {
        mousemove: (view, event) => {
          handleMouseMove(view, event, handleWidth, lastColumnResizable);
        },
        mouseleave: (view) => {
          handleMouseLeave(view);
        },
        mousedown: (view, event) => {
          handleMouseDown(view, event, cellMinWidth, defaultCellMinWidth);
        }
      },
      decorations: (state) => {
        const pluginState = columnResizingPluginKey.getState(state);
        if (pluginState && pluginState.activeHandle > -1) return handleDecorations(state, pluginState.activeHandle);
      },
      nodeViews: {}
    }
  });
  return plugin;
}
var ResizeState = class ResizeState2 {
  constructor(activeHandle, dragging) {
    this.activeHandle = activeHandle;
    this.dragging = dragging;
  }
  apply(tr) {
    const state = this;
    const action = tr.getMeta(columnResizingPluginKey);
    if (action && action.setHandle != null) return new ResizeState2(action.setHandle, false);
    if (action && action.setDragging !== void 0) return new ResizeState2(state.activeHandle, action.setDragging);
    if (state.activeHandle > -1 && tr.docChanged) {
      let handle = tr.mapping.map(state.activeHandle, -1);
      if (!pointsAtCell(tr.doc.resolve(handle))) handle = -1;
      return new ResizeState2(handle, state.dragging);
    }
    return state;
  }
};
function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
  if (!view.editable) return;
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState) return;
  if (!pluginState.dragging) {
    const target = domCellAround(event.target);
    let cell = -1;
    if (target) {
      const { left, right } = target.getBoundingClientRect();
      if (event.clientX - left <= handleWidth) cell = edgeCell(view, event, "left", handleWidth);
      else if (right - event.clientX <= handleWidth) cell = edgeCell(view, event, "right", handleWidth);
    }
    if (cell != pluginState.activeHandle) {
      if (!lastColumnResizable && cell !== -1) {
        const $cell = view.state.doc.resolve(cell);
        const table = $cell.node(-1);
        const map = TableMap.get(table);
        const tableStart = $cell.start(-1);
        if (map.colCount($cell.pos - tableStart) + $cell.nodeAfter.attrs.colspan - 1 == map.width - 1) return;
      }
      updateHandle(view, cell);
    }
  }
}
function handleMouseLeave(view) {
  if (!view.editable) return;
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (pluginState && pluginState.activeHandle > -1 && !pluginState.dragging) updateHandle(view, -1);
}
function handleMouseDown(view, event, cellMinWidth, defaultCellMinWidth) {
  var _view$dom$ownerDocume;
  if (!view.editable) return false;
  const win = (_view$dom$ownerDocume = view.dom.ownerDocument.defaultView) !== null && _view$dom$ownerDocume !== void 0 ? _view$dom$ownerDocume : window;
  const pluginState = columnResizingPluginKey.getState(view.state);
  if (!pluginState || pluginState.activeHandle == -1 || pluginState.dragging) return false;
  const cell = view.state.doc.nodeAt(pluginState.activeHandle);
  const width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
  view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setDragging: {
    startX: event.clientX,
    startWidth: width
  } }));
  function finish(event$1) {
    win.removeEventListener("mouseup", finish);
    win.removeEventListener("mousemove", move);
    const pluginState$1 = columnResizingPluginKey.getState(view.state);
    if (pluginState$1 === null || pluginState$1 === void 0 ? void 0 : pluginState$1.dragging) {
      updateColumnWidth(view, pluginState$1.activeHandle, draggedWidth(pluginState$1.dragging, event$1, cellMinWidth));
      view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null }));
    }
  }
  function move(event$1) {
    if (!event$1.which) return finish(event$1);
    const pluginState$1 = columnResizingPluginKey.getState(view.state);
    if (!pluginState$1) return;
    if (pluginState$1.dragging) {
      const dragged = draggedWidth(pluginState$1.dragging, event$1, cellMinWidth);
      displayColumnWidth(view, pluginState$1.activeHandle, dragged, defaultCellMinWidth);
    }
  }
  displayColumnWidth(view, pluginState.activeHandle, width, defaultCellMinWidth);
  win.addEventListener("mouseup", finish);
  win.addEventListener("mousemove", move);
  event.preventDefault();
  return true;
}
function currentColWidth(view, cellPos, { colspan, colwidth }) {
  const width = colwidth && colwidth[colwidth.length - 1];
  if (width) return width;
  const dom = view.domAtPos(cellPos);
  let domWidth = dom.node.childNodes[dom.offset].offsetWidth, parts = colspan;
  if (colwidth) {
    for (let i = 0; i < colspan; i++) if (colwidth[i]) {
      domWidth -= colwidth[i];
      parts--;
    }
  }
  return domWidth / parts;
}
function domCellAround(target) {
  while (target && target.nodeName != "TD" && target.nodeName != "TH") target = target.classList && target.classList.contains("ProseMirror") ? null : target.parentNode;
  return target;
}
function edgeCell(view, event, side, handleWidth) {
  const offset = side == "right" ? -handleWidth : handleWidth;
  const found = view.posAtCoords({
    left: event.clientX + offset,
    top: event.clientY
  });
  if (!found) return -1;
  const { pos } = found;
  const $cell = cellAround(view.state.doc.resolve(pos));
  if (!$cell) return -1;
  if (side == "right") return $cell.pos;
  const map = TableMap.get($cell.node(-1)), start = $cell.start(-1);
  const index = map.map.indexOf($cell.pos - start);
  return index % map.width == 0 ? -1 : start + map.map[index - 1];
}
function draggedWidth(dragging, event, resizeMinWidth) {
  const offset = event.clientX - dragging.startX;
  return Math.max(resizeMinWidth, dragging.startWidth + offset);
}
function updateHandle(view, value) {
  view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setHandle: value }));
}
function updateColumnWidth(view, cell, width) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
  const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  const tr = view.state.tr;
  for (let row = 0; row < map.height; row++) {
    const mapIndex = row * map.width + col;
    if (row && map.map[mapIndex] == map.map[mapIndex - map.width]) continue;
    const pos = map.map[mapIndex];
    const attrs = table.nodeAt(pos).attrs;
    const index = attrs.colspan == 1 ? 0 : col - map.colCount(pos);
    if (attrs.colwidth && attrs.colwidth[index] == width) continue;
    const colwidth = attrs.colwidth ? attrs.colwidth.slice() : zeroes(attrs.colspan);
    colwidth[index] = width;
    tr.setNodeMarkup(start + pos, null, {
      ...attrs,
      colwidth
    });
  }
  if (tr.docChanged) view.dispatch(tr);
}
function displayColumnWidth(view, cell, width, defaultCellMinWidth) {
  const $cell = view.state.doc.resolve(cell);
  const table = $cell.node(-1), start = $cell.start(-1);
  const col = TableMap.get(table).colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  let dom = view.domAtPos($cell.start(-1)).node;
  while (dom && dom.nodeName != "TABLE") dom = dom.parentNode;
  if (!dom) return;
  updateColumnsOnResize(table, dom.firstChild, dom, defaultCellMinWidth, col, width);
}
function zeroes(n) {
  return Array(n).fill(0);
}
function handleDecorations(state, cell) {
  const decorations = [];
  const $cell = state.doc.resolve(cell);
  const table = $cell.node(-1);
  if (!table) return DecorationSet.empty;
  const map = TableMap.get(table);
  const start = $cell.start(-1);
  const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
  for (let row = 0; row < map.height; row++) {
    const index = col + row * map.width;
    if ((col == map.width - 1 || map.map[index] != map.map[index + 1]) && (row == 0 || map.map[index] != map.map[index - map.width])) {
      var _columnResizingPlugin;
      const cellPos = map.map[index];
      const pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
      const dom = document.createElement("div");
      dom.className = "column-resize-handle";
      if ((_columnResizingPlugin = columnResizingPluginKey.getState(state)) === null || _columnResizingPlugin === void 0 ? void 0 : _columnResizingPlugin.dragging) decorations.push(Decoration.node(start + cellPos, start + cellPos + table.nodeAt(cellPos).nodeSize, { class: "column-resize-dragging" }));
      decorations.push(Decoration.widget(pos, dom));
    }
  }
  return DecorationSet.create(state.doc, decorations);
}
function tableEditing({ allowTableNodeSelection = false } = {}) {
  return new Plugin({
    key: tableEditingKey,
    state: {
      init() {
        return null;
      },
      apply(tr, cur) {
        const set = tr.getMeta(tableEditingKey);
        if (set != null) return set == -1 ? null : set;
        if (cur == null || !tr.docChanged) return cur;
        const { deleted, pos } = tr.mapping.mapResult(cur);
        return deleted ? null : pos;
      }
    },
    props: {
      decorations: drawCellSelection,
      handleDOMEvents: { mousedown: handleMouseDown$1 },
      createSelectionBetween(view) {
        return tableEditingKey.getState(view.state) != null ? view.state.selection : null;
      },
      handleTripleClick,
      handleKeyDown,
      handlePaste
    },
    appendTransaction(_, oldState, state) {
      return normalizeSelection(state, fixTables(state, oldState), allowTableNodeSelection);
    }
  });
}
function normalizeTableCellAlign(value) {
  if (value === "left" || value === "right" || value === "center") {
    return value;
  }
  return null;
}
function parseAlign(element) {
  const styleAlign = (element.style.textAlign || "").trim().toLowerCase();
  const attrAlign = (element.getAttribute("align") || "").trim().toLowerCase();
  const align = styleAlign || attrAlign;
  return normalizeTableCellAlign(align);
}
function normalizeTableCellAlignFromAttributes(attributes) {
  return normalizeTableCellAlign(attributes == null ? void 0 : attributes.align);
}
function createAlignAttribute() {
  return {
    default: null,
    parseHTML: (element) => parseAlign(element),
    renderHTML: (attributes) => {
      if (!attributes.align) {
        return {};
      }
      return {
        style: `text-align: ${attributes.align}`
      };
    }
  };
}
var TableCell = Node3.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          var _a, _b;
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
          if (!value) {
            const cols = (_a = element.closest("table")) == null ? void 0 : _a.querySelectorAll("colgroup > col");
            const cellIndex = Array.from(((_b = element.parentElement) == null ? void 0 : _b.children) || []).indexOf(element);
            if (cellIndex && cellIndex > -1 && cols && cols[cellIndex]) {
              const colWidth = cols[cellIndex].getAttribute("width");
              return colWidth ? [parseInt(colWidth, 10)] : null;
            }
          }
          return value;
        }
      },
      align: createAlignAttribute()
    };
  },
  tableRole: "cell",
  isolating: true,
  parseHTML() {
    return [{ tag: "td" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["td", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
var TableHeader = Node3.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
          return value;
        }
      },
      align: createAlignAttribute()
    };
  },
  tableRole: "header_cell",
  isolating: true,
  parseHTML() {
    return [{ tag: "th" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["th", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
var TableRow = Node3.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [{ tag: "tr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["tr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
function getColStyleDeclaration(minWidth, width) {
  if (width) {
    return ["width", `${Math.max(width, minWidth)}px`];
  }
  return ["min-width", `${minWidth}px`];
}
function updateColumns(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
  var _a;
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild;
  const row = node.firstChild;
  if (row !== null) {
    for (let i = 0, col = 0; i < row.childCount; i += 1) {
      const { colspan, colwidth } = row.child(i).attrs;
      for (let j = 0; j < colspan; j += 1, col += 1) {
        const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
        const cssWidth = hasWidth ? `${hasWidth}px` : "";
        totalWidth += hasWidth || cellMinWidth;
        if (!hasWidth) {
          fixedWidth = false;
        }
        if (!nextDOM) {
          const colElement = document.createElement("col");
          const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
          colElement.style.setProperty(propertyKey, propertyValue);
          colgroup.appendChild(colElement);
        } else {
          if (nextDOM.style.width !== cssWidth) {
            const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
            nextDOM.style.setProperty(propertyKey, propertyValue);
          }
          nextDOM = nextDOM.nextSibling;
        }
      }
    }
  }
  while (nextDOM) {
    const after = nextDOM.nextSibling;
    (_a = nextDOM.parentNode) == null ? void 0 : _a.removeChild(nextDOM);
    nextDOM = after;
  }
  const hasUserWidth = node.attrs.style && typeof node.attrs.style === "string" && /\bwidth\s*:/i.test(node.attrs.style);
  if (fixedWidth && !hasUserWidth) {
    table.style.width = `${totalWidth}px`;
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = `${totalWidth}px`;
  }
}
var TableView2 = class {
  constructor(node, cellMinWidth) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    if (node.attrs.style) {
      this.table.style.cssText = node.attrs.style;
    }
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    updateColumns(node, this.colgroup, this.table, cellMinWidth);
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
    return true;
  }
  ignoreMutation(mutation) {
    const target = mutation.target;
    const isInsideWrapper = this.dom.contains(target);
    const isInsideContent = this.contentDOM.contains(target);
    if (isInsideWrapper && !isInsideContent) {
      if (mutation.type === "attributes" || mutation.type === "childList" || mutation.type === "characterData") {
        return true;
      }
    }
    return false;
  }
};
function createColGroup(node, cellMinWidth, overrideCol, overrideValue) {
  let totalWidth = 0;
  let fixedWidth = true;
  const cols = [];
  const row = node.firstChild;
  if (!row) {
    return {};
  }
  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) {
        fixedWidth = false;
      }
      const [property, value] = getColStyleDeclaration(cellMinWidth, hasWidth);
      cols.push(["col", { style: `${property}: ${value}` }]);
    }
  }
  const tableWidth = fixedWidth ? `${totalWidth}px` : "";
  const tableMinWidth = fixedWidth ? "" : `${totalWidth}px`;
  const colgroup = ["colgroup", {}, ...cols];
  return { colgroup, tableWidth, tableMinWidth };
}
function createCell(cellType, cellContent) {
  return cellType.createAndFill();
}
function getTableNodeTypes(schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes;
  }
  const roles = {};
  Object.keys(schema.nodes).forEach((type) => {
    const nodeType = schema.nodes[type];
    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType;
    }
  });
  schema.cached.tableNodeTypes = roles;
  return roles;
}
function createTable(schema, rowsCount, colsCount, withHeaderRow, cellContent) {
  const types = getTableNodeTypes(schema);
  const headerCells = [];
  const cells = [];
  for (let index = 0; index < colsCount; index += 1) {
    const cell = createCell(types.cell);
    if (cell) {
      cells.push(cell);
    }
    if (withHeaderRow) {
      const headerCell = createCell(types.header_cell);
      if (headerCell) {
        headerCells.push(headerCell);
      }
    }
  }
  const rows = [];
  for (let index = 0; index < rowsCount; index += 1) {
    rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
  }
  return types.table.createChecked(null, rows);
}
function isCellSelection(value) {
  return value instanceof CellSelection;
}
var deleteTableWhenAllCellsSelected = ({ editor }) => {
  const { selection } = editor.state;
  if (!isCellSelection(selection)) {
    return false;
  }
  let cellCount = 0;
  const table = findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
    return node.type.name === "table";
  });
  table == null ? void 0 : table.node.descendants((node) => {
    if (node.type.name === "table") {
      return false;
    }
    if (["tableCell", "tableHeader"].includes(node.type.name)) {
      cellCount += 1;
    }
  });
  const allCellsSelected = cellCount === selection.ranges.length;
  if (!allCellsSelected) {
    return false;
  }
  editor.commands.deleteTable();
  return true;
};
var DEFAULT_CELL_LINE_SEPARATOR = "";
function collapseWhitespace(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
function renderTableToMarkdown(node, h, options = {}) {
  var _a;
  const cellSep = (_a = options.cellLineSeparator) != null ? _a : DEFAULT_CELL_LINE_SEPARATOR;
  if (!node || !node.content || node.content.length === 0) {
    return "";
  }
  const rows = [];
  node.content.forEach((rowNode) => {
    const cells = [];
    if (rowNode.content) {
      rowNode.content.forEach((cellNode) => {
        let raw = "";
        if (cellNode.content && Array.isArray(cellNode.content) && cellNode.content.length > 1) {
          const parts = cellNode.content.map(
            (child) => h.renderChildren(child)
          );
          raw = parts.join(cellSep);
        } else {
          raw = cellNode.content ? h.renderChildren(cellNode.content) : "";
        }
        const text = collapseWhitespace(raw);
        const isHeader = cellNode.type === "tableHeader";
        const align = normalizeTableCellAlignFromAttributes(cellNode.attrs);
        cells.push({ text, isHeader, align });
      });
    }
    rows.push(cells);
  });
  const columnCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
  if (columnCount === 0) {
    return "";
  }
  const colWidths = Array.from({ length: columnCount }).fill(0);
  rows.forEach((r) => {
    var _a2;
    for (let i = 0; i < columnCount; i += 1) {
      const cell = ((_a2 = r[i]) == null ? void 0 : _a2.text) || "";
      const len = cell.length;
      if (len > colWidths[i]) {
        colWidths[i] = len;
      }
      if (colWidths[i] < 3) {
        colWidths[i] = 3;
      }
    }
  });
  const pad = (s, width) => s + " ".repeat(Math.max(0, width - s.length));
  const headerRow = rows[0];
  const hasHeader = headerRow.some((c) => c.isHeader);
  const colAlignments = Array.from({
    length: columnCount
  }).fill(null);
  rows.forEach((r) => {
    var _a2;
    for (let i = 0; i < columnCount; i += 1) {
      if (!colAlignments[i] && ((_a2 = r[i]) == null ? void 0 : _a2.align)) {
        colAlignments[i] = r[i].align;
      }
    }
  });
  let out = "\n";
  const headerTexts = Array.from({ length: columnCount }).map(
    (_, i) => hasHeader ? headerRow[i] && headerRow[i].text || "" : ""
  );
  out += `| ${headerTexts.map((t, i) => pad(t, colWidths[i])).join(" | ")} |
`;
  out += `| ${colWidths.map((w, index) => {
    const dashCount = Math.max(3, w);
    const alignment = colAlignments[index];
    if (alignment === "left") {
      return `:${"-".repeat(dashCount)}`;
    }
    if (alignment === "right") {
      return `${"-".repeat(dashCount)}:`;
    }
    if (alignment === "center") {
      return `:${"-".repeat(dashCount)}:`;
    }
    return "-".repeat(dashCount);
  }).join(" | ")} |
`;
  const body = hasHeader ? rows.slice(1) : rows;
  body.forEach((r) => {
    out += `| ${Array.from({ length: columnCount }).fill(0).map((_, i) => pad(r[i] && r[i].text || "", colWidths[i])).join(" | ")} |
`;
  });
  return out;
}
var markdown_default = renderTableToMarkdown;
var Table = Node3.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: false,
      renderWrapper: false,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: TableView2,
      lastColumnResizable: true,
      allowTableNodeSelection: false
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: true,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);
    const userStyles = HTMLAttributes.style;
    function getTableStyle() {
      if (userStyles) {
        return userStyles;
      }
      return tableWidth ? `width: ${tableWidth}` : `min-width: ${tableMinWidth}`;
    }
    const table = [
      "table",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: getTableStyle()
      }),
      colgroup,
      ["tbody", 0]
    ];
    return this.options.renderWrapper ? ["div", { class: "tableWrapper" }, table] : table;
  },
  parseMarkdown: (token, h) => {
    const rows = [];
    const alignments = Array.isArray(token.align) ? token.align : [];
    if (token.header) {
      const headerCells = [];
      token.header.forEach((cell, index) => {
        var _a;
        const align = normalizeTableCellAlign((_a = alignments[index]) != null ? _a : cell.align);
        const attrs = align ? { align } : {};
        headerCells.push(
          h.createNode("tableHeader", attrs, [
            { type: "paragraph", content: h.parseInline(cell.tokens) }
          ])
        );
      });
      rows.push(h.createNode("tableRow", {}, headerCells));
    }
    if (token.rows) {
      token.rows.forEach((row) => {
        const bodyCells = [];
        row.forEach((cell, index) => {
          var _a;
          const align = normalizeTableCellAlign((_a = alignments[index]) != null ? _a : cell.align);
          const attrs = align ? { align } : {};
          bodyCells.push(
            h.createNode("tableCell", attrs, [
              { type: "paragraph", content: h.parseInline(cell.tokens) }
            ])
          );
        });
        rows.push(h.createNode("tableRow", {}, bodyCells));
      });
    }
    return h.createNode("table", void 0, rows);
  },
  renderMarkdown: (node, h) => {
    return markdown_default(node, h);
  },
  addCommands() {
    return {
      insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ tr, dispatch, editor }) => {
        const node = createTable(editor.schema, rows, cols, withHeaderRow);
        if (dispatch) {
          const offset = tr.selection.from + 1;
          tr.replaceSelectionWith(node).scrollIntoView().setSelection(TextSelection.near(tr.doc.resolve(offset)));
        }
        return true;
      },
      addColumnBefore: () => ({ state, dispatch }) => {
        return addColumnBefore(state, dispatch);
      },
      addColumnAfter: () => ({ state, dispatch }) => {
        return addColumnAfter(state, dispatch);
      },
      deleteColumn: () => ({ state, dispatch }) => {
        return deleteColumn(state, dispatch);
      },
      addRowBefore: () => ({ state, dispatch }) => {
        return addRowBefore(state, dispatch);
      },
      addRowAfter: () => ({ state, dispatch }) => {
        return addRowAfter(state, dispatch);
      },
      deleteRow: () => ({ state, dispatch }) => {
        return deleteRow(state, dispatch);
      },
      deleteTable: () => ({ state, dispatch }) => {
        return deleteTable(state, dispatch);
      },
      mergeCells: () => ({ state, dispatch }) => {
        return mergeCells(state, dispatch);
      },
      splitCell: () => ({ state, dispatch }) => {
        return splitCell(state, dispatch);
      },
      toggleHeaderColumn: () => ({ state, dispatch }) => {
        return toggleHeader("column")(state, dispatch);
      },
      toggleHeaderRow: () => ({ state, dispatch }) => {
        return toggleHeader("row")(state, dispatch);
      },
      toggleHeaderCell: () => ({ state, dispatch }) => {
        return toggleHeaderCell(state, dispatch);
      },
      mergeOrSplit: () => ({ state, dispatch }) => {
        if (mergeCells(state, dispatch)) {
          return true;
        }
        return splitCell(state, dispatch);
      },
      setCellAttribute: (name, value) => ({ state, dispatch }) => {
        return setCellAttr(name, value)(state, dispatch);
      },
      goToNextCell: () => ({ state, dispatch }) => {
        return goToNextCell(1)(state, dispatch);
      },
      goToPreviousCell: () => ({ state, dispatch }) => {
        return goToNextCell(-1)(state, dispatch);
      },
      fixTables: () => ({ state, dispatch }) => {
        if (dispatch) {
          fixTables(state);
        }
        return true;
      },
      setCellSelection: (position) => ({ tr, dispatch }) => {
        if (dispatch) {
          const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell);
          tr.setSelection(selection);
        }
        return true;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.commands.goToNextCell()) {
          return true;
        }
        if (!this.editor.can().addRowAfter()) {
          return false;
        }
        return this.editor.chain().addRowAfter().goToNextCell().run();
      },
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: deleteTableWhenAllCellsSelected,
      "Mod-Backspace": deleteTableWhenAllCellsSelected,
      Delete: deleteTableWhenAllCellsSelected,
      "Mod-Delete": deleteTableWhenAllCellsSelected
    };
  },
  addProseMirrorPlugins() {
    const isResizable = this.options.resizable && this.editor.isEditable;
    return [
      ...isResizable ? [
        columnResizing({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          defaultCellMinWidth: this.options.cellMinWidth,
          View: this.options.View,
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      tableEditing({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  addNodeView() {
    const isResizable = this.options.resizable && this.editor.isEditable;
    const View = this.options.View;
    if (isResizable || !View) {
      return null;
    }
    return ({ node, view }) => new View(node, this.options.cellMinWidth, view);
  },
  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      tableRole: callOrReturn(getExtensionField(extension, "tableRole", context))
    };
  }
});
Extension.create({
  name: "tableKit",
  addExtensions() {
    const extensions = [];
    if (this.options.table !== false) {
      extensions.push(Table.configure(this.options.table));
    }
    if (this.options.tableCell !== false) {
      extensions.push(TableCell.configure(this.options.tableCell));
    }
    if (this.options.tableHeader !== false) {
      extensions.push(TableHeader.configure(this.options.tableHeader));
    }
    if (this.options.tableRow !== false) {
      extensions.push(TableRow.configure(this.options.tableRow));
    }
    return extensions;
  }
});
var index_default$4 = TableRow;
var index_default$3 = TableCell;
var index_default$2 = TableHeader;
var index_default$1 = CharacterCount;
var index_default = Placeholder;
function TiptapEditor({ value, onChange }) {
  const [fullscreen, setFullscreen] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const editor = useEditor({
    extensions: [
      index_default$7,
      index_default$8,
      TextStyle,
      Color,
      index_default$5.configure({ multicolor: true }),
      index_default$9.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      index_default$6.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } }),
      Table.configure({ resizable: true }),
      index_default$4,
      index_default$2,
      index_default$3,
      index_default$1,
      index_default.configure({ placeholder: "Write your post content…" })
    ],
    content: value || "",
    onUpdate: ({ editor: editor2 }) => {
      const html = editor2.getHTML();
      const words2 = editor2.storage.characterCount.words();
      const chars2 = editor2.storage.characterCount.characters();
      onChange(html, words2, chars2);
    },
    immediatelyRender: false
  });
  reactExports.useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value]);
  if (!editor) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border rounded-lg p-4 bg-white text-sm text-muted-foreground", children: "Loading editor…" });
  const words = editor.storage.characterCount.words();
  const chars = editor.storage.characterCount.characters();
  const reading = Math.max(1, Math.round(words / 200));
  const addLink = () => {
    const url = window.prompt("URL");
    if (!url) return;
    const open = window.confirm("Open in new tab?");
    editor.chain().focus().extendMarkRange("link").setLink({ href: url, target: open ? "_blank" : null }).run();
  };
  const onUpload = async (original) => {
    const alt = window.prompt("Image alt text (for accessibility & SEO)") || "";
    const { convertImageToWebp } = await import("./image-to-webp-BeTkcpEw.js");
    const file = await convertImageToWebp(original);
    const ext = file.name.split(".").pop();
    const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { contentType: file.type });
    if (error) {
      ue.error(error.message);
      return;
    }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    editor.chain().focus().setImage({ src: data.publicUrl, alt }).run();
  };
  const Btn = ({ active, onClick, title, children }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onMouseDown: (e) => e.preventDefault(),
      onClick,
      title,
      className: "p-1.5 rounded hover:bg-pink-50 transition-colors",
      style: { background: active ? "#FFE4EF" : "transparent", color: active ? "#E6007E" : "#374151" },
      children
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: fullscreen ? "fixed inset-0 z-[1000] bg-white p-4 overflow-auto" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 p-2 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "H1", active: editor.isActive("heading", { level: 1 }), onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading1, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "H2", active: editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "H3", active: editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading3, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-5 bg-gray-200 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Bold", active: editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Italic", active: editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Underline", active: editor.isActive("underline"), onClick: () => editor.chain().focus().toggleUnderline().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Strikethrough", active: editor.isActive("strike"), onClick: () => editor.chain().focus().toggleStrike().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Strikethrough, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", title: "Text color", onChange: (e) => editor.chain().focus().setColor(e.target.value).run(), className: "w-7 h-7 rounded cursor-pointer border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", title: "Highlight", onChange: (e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run(), className: "w-7 h-7 rounded cursor-pointer border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-5 bg-gray-200 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Bullet List", active: editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Numbered List", active: editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Quote", active: editor.isActive("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Inline Code", active: editor.isActive("code"), onClick: () => editor.chain().focus().toggleCode().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Code Block", active: editor.isActive("codeBlock"), onClick: () => editor.chain().focus().toggleCodeBlock().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-5 bg-gray-200 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Link", onClick: addLink, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Image", onClick: () => fileRef.current?.click(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
        const f = e.target.files?.[0];
        if (f) onUpload(f);
        e.target.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Table", onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table$1, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Divider", onClick: () => editor.chain().focus().setHorizontalRule().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-px h-5 bg-gray-200 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Undo", onClick: () => editor.chain().focus().undo().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Btn, { title: "Redo", onClick: () => editor.chain().focus().redo().run(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo, { className: "w-4 h-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3 text-xs text-muted-foreground pr-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          words,
          " words"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          chars,
          " chars"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          reading,
          " min read"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFullscreen((v) => !v), title: "Fullscreen", className: "p-1 hover:text-pink-600", children: fullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor, className: "prose prose-sm max-w-none p-4 min-h-[400px] focus:outline-none [&_*:focus]:outline-none" })
  ] }) });
}
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
const PROJECT_URL = "https://subhashree-ui.lovable.app";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link$1, { to: "/admin/blog", className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-pink-600", children: [
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(TiptapEditor, { value: form.content, onChange: onContent })
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
          !isNew && form.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "/blog/$slug", params: {
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[#202124] text-xs mb-0.5", children: "Subhashree IVF" }),
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
