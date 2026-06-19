# Make the TipTap editing view WYSIWYG

## Diagnosis (confirmed)

The shared `RichTextEditor` (`src/components/admin/rich-text-editor.tsx`) renders `<EditorContent className="prose prose-sm ...">`. Tailwind v4 in this project does NOT have `@tailwindcss/typography` enabled, so the `prose` class is a no-op. Combined with Preflight resetting `ul/ol` (no bullets, no padding) and `h1–h4` (no size/weight), the inside of the editor looks like flat text even though the saved HTML is correct. The public `/blog/$slug` page works because it uses the hand-written `.blog-content` block in `src/styles.css`.

## Fix — one scoped CSS block, applied to every editor instance

1. Add a `.tiptap-content .ProseMirror { ... }` rule set in `src/styles.css` that restores: 
   - `h1`-`h4` sizes/weights (matching `.blog-content` look — Playfair Display, plum color, real margins)
   - `p` margin + line-height
   - `ul { list-style: disc }`, `ol { list-style: decimal }`, both with `padding-left: 1.5rem` and proper `li` spacing
   - `blockquote` with left border `#E6007E`, italic, indent
   - `a` colored `#E6007E` + underlined
   - `strong`, `em`, `u`, `s` visible
   - `code` inline pill + `pre code` (code block) dark background
   - `img` rounded, max-width
   - `hr` visible divider
   - `table`, `th`, `td` with borders + padding (so inserted tables look real)
   - `mark` (highlight) keeps its inline background-color (Preflight strips it otherwise — `mark { background-color: inherit }` reset → restore to `background-color: yellow` fallback, but allow inline `style` to win)
   - TextAlign: rules already work because TipTap writes `style="text-align: ..."` inline
   - `.ProseMirror:focus { outline: none }` and `min-height` honored

2. Update `src/components/admin/rich-text-editor.tsx`: change `EditorContent` wrapper class from `prose prose-sm max-w-none ...` to `tiptap-content` (keep `min-height` style). No other code changes — toolbar, extensions, save format untouched.

Because the shared component is used in all four editors (Blog, Service Details, FAQ, Why-Choose-Us via the `tiptap-editor` shim), all of them get the styling at once.

## Out of scope

No changes to: saved HTML, extension set, toolbar commands, public frontend rendering (`.blog-content`, service detail page, FAQ accordion), or any DB field.

## Verification I will run

In the Blog editor, type a paragraph and apply each tool; confirm visible: H1/H2/H3 sizes, bullet list bullets, ordered list numbers, blockquote bar, bold/italic/underline/strike, inline code pill, code block, link color+underline, text color, highlight, left/center/right align, image, table, HR. Then spot-check Service Details, FAQ, Why-Choose-Us. Report a pass/fail checklist.
