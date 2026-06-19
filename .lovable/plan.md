# TipTap Rich Text Editor — Full Audit & Rebuild

## Step 1 — Inventory (complete)

TipTap is used in 4 places, via 2 different implementations:

| # | Location | File | DB field saved | Implementation |
|---|---|---|---|---|
| 1 | Blog post editor | `src/routes/admin.blog.$id.tsx` (L156) | `blog_posts.content` | `TiptapEditor` (full toolbar) |
| 2 | Service Details editor | `src/routes/admin.services.index.tsx` (L195) | `services.full_content` | `TiptapEditor` (full toolbar) |
| 3 | Why-Choose-Us "full_content" | `src/routes/admin.homepage.why-choose-us.tsx` (L148) | `why_choose_us_features.full_content` | `TiptapEditor` (full toolbar) |
| 4 | FAQ answer editor | `src/routes/admin.faqs.index.tsx` (L31–90) | `faqs.answer` | Inline `SimpleEditor` (Bold/Italic/Lists/Link only) |

Shared component today: `src/components/admin/tiptap-editor.tsx`. FAQ uses its own duplicated `SimpleEditor` in the route file. No Doctor bio TipTap editor exists (doctor bios use plain inputs).

## Step 2 — Root cause (confirmed)

The shared `TiptapEditor` toolbar exposes: H1/H2/H3, Bold, Italic, **Underline**, Strike, **Text color**, **Highlight**, Bullet/Ordered list, Quote, Inline code, Code block, **Link**, **Image**, **Table**, HR, Undo, Redo.

Extensions actually registered: `StarterKit` (with inline `link:` config), `TextStyle`, `Color`, `Highlight`, `Image`, `Table` + row/header/cell, `CharacterCount`, `Placeholder`.

What's broken and why:

1. **Underline button does nothing** — `Underline` extension is NOT registered. In TipTap v3 it is NOT bundled in StarterKit (despite the previous turn's claim). `toggleUnderline()` silently no-ops.
2. **Link button does nothing reliably** — `StarterKit.configure({ link: {...} })` is not a valid v3 StarterKit option; Link in v3 is a separate extension that must be added to the array. `setLink()`/`extendMarkRange("link")` no-op.
3. **Text color does nothing** — In TipTap v3, `Color` was moved into `@tiptap/extension-text-style` (`import { Color } from "@tiptap/extension-text-style"`). The standalone `@tiptap/extension-color` package is empty/legacy → `setColor` is a no-op.
4. **Text align (not in current toolbar, but in your spec)** — `@tiptap/extension-text-align` is not installed.
5. **FAQ editor is missing nearly every tool** by design — only 5 buttons exist.
6. **Active state never updates live in FAQ's SimpleEditor** — no `shouldRerenderOnTransaction`. (Shared `TiptapEditor` already has this from the previous turn.)

Not a cause (verified OK in current code): buttons already use `type="button"`, `onMouseDown` preventDefault, and `.chain().focus().X().run()`.

Working tools today = exactly the ones backed by StarterKit + the correctly-registered Image/Highlight/Table/CharacterCount. Broken tools = Underline, Link, Color — matching your hypothesis.

## Step 3 — Build ONE shared `RichTextEditor`

Create `src/components/admin/rich-text-editor.tsx` (new) — props: `value: string`, `onChange: (html: string, words?: number, chars?: number) => void`, `placeholder?: string`, `minHeight?: number`.

Extensions registered (every toolbar button has a matching extension):

- `StarterKit.configure({ heading: { levels: [1,2,3,4] } })`
- `Underline` (from `@tiptap/extension-underline`)
- `Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } })` (from `@tiptap/extension-link`)
- `Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } })`
- `Table.configure({ resizable: true })`, `TableRow`, `TableHeader`, `TableCell`
- `TextStyle`, `Color` — both imported from `@tiptap/extension-text-style` (v3 location)
- `Highlight.configure({ multicolor: true })`
- `TextAlign.configure({ types: ["heading", "paragraph"] })` (from `@tiptap/extension-text-align` — needs install)
- `CharacterCount`, `Placeholder.configure({ placeholder })`

Editor config:
- `content: value || "<p></p>"`
- `autofocus: false`
- `immediatelyRender: false`
- `shouldRerenderOnTransaction: true` (so `isActive` highlighting updates live)
- `onUpdate` → `onChange(html, words, chars)`
- `useEffect` syncs external `value` changes when not focused (v3 signature: `setContent(value, { emitUpdate: false })`)
- Guard `if (!editor) return null` (with a small loading placeholder)

Toolbar:
- Buttons: H1, H2, H3, Bold, Italic, Underline, Strike, Text color, Highlight, Bullet list, Ordered list, Blockquote, Inline code, Code block, Link, Image, Table, HR, Align L/C/R/Justify, Undo, Redo
- Every button: `type="button"`, `onMouseDown={(e) => e.preventDefault()}`, `onClick={() => editor.chain().focus().X().run()}`
- Active style: `background: #8B0F50; color: white; border-radius: 6px` driven from `editor.isActive(...)`
- Keep existing image upload (Supabase `blog-images` bucket) and fullscreen / word-count UI from current `TiptapEditor`

Install one package: `@tiptap/extension-text-align`. Remove the now-unused `@tiptap/extension-color` package import (use `Color` from `@tiptap/extension-text-style`).

## Step 4 — Swap in everywhere, preserve data

Replace in all four locations. No schema changes, no field renames, no form changes around it.

| Location | Change |
|---|---|
| `admin.blog.$id.tsx` | Swap `TiptapEditor` → `RichTextEditor`. Keep `value={form.content}` / `onChange={onContent}` and existing save path writing `blog_posts.content`. |
| `admin.services.index.tsx` | Swap component; keep `value={editing.full_content}` and existing update to `services.full_content`. |
| `admin.homepage.why-choose-us.tsx` | Swap component; keep `value={editing.full_content}` and existing save. |
| `admin.faqs.index.tsx` | Delete inline `SimpleEditor` + its TipTap imports; render `<RichTextEditor value={editing.answer} onChange={(html) => setEditing({...editing, answer: html})} />`. Saves to `faqs.answer` unchanged. |

Delete the old `src/components/admin/tiptap-editor.tsx` after all four call sites are switched (or keep as a thin re-export to avoid stale imports — will delete since rg confirms only the four sites import it).

## Step 5 — Verification (manual checklist I will run before reporting done)

For each of the 4 editors, run through every tool: H1, H2, H3, Bold, Italic, Underline, Strike, Text color, Highlight, Bullet list, Ordered list, Blockquote, Inline code, Code block, Link, Image, Table, HR, Align L/C/R/Justify, Undo, Redo. For each: (a) click applies format, (b) active state toggles, (c) save + reload round-trips the HTML. Also verify: clicking empty space does NOT auto-insert a heading, and existing saved content loads correctly.

## Out of scope

No changes to public frontend pages, prose rendering, DB schema, surrounding forms, or save buttons.
