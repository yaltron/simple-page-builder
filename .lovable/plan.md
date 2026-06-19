# Fix TipTap toolbar (Service Details + all CMS editors)

## Root cause

Project uses **TipTap v3.23.1**. In v3 `useEditor` no longer re-renders the React component on every transaction (breaking change from v2). The toolbar's `editor.isActive(...)` checks and command-driven UI feedback therefore never update — the commands DO run and DO mutate the document, but the UI looks completely dead, which matches the reported symptom.

Existing code already has the right defenses (`type="button"`, `onMouseDown` preventDefault, `editor.chain().focus().toggleX().run()`, `if (!editor)` guard, extensions registered). Those are NOT the bug.

Secondary issues found in `src/components/admin/tiptap-editor.tsx`:
- `@tiptap/extension-underline` separately imported, but StarterKit v3 bundles Underline → duplicate-extension conflict.
- `@tiptap/extension-link` likewise bundled by StarterKit v3.
- `editor.commands.setContent(value, { emitUpdate: false })` uses v2 options-object signature; v3 takes a boolean.

## Files to change

Only one file — every CMS editor already shares it:
- `src/components/admin/tiptap-editor.tsx`

No other files need editing. No frontend pages touched. No schema changes.

## Changes

1. **Force re-render on transaction** — add `shouldRerenderOnTransaction: true` to the `useEditor({...})` config.
2. **Remove duplicate extensions** now bundled by StarterKit v3:
   - Drop `import Underline from "@tiptap/extension-underline"` and remove `Underline` from the `extensions` array (StarterKit's bundled one is used; underline button keeps working via `toggleUnderline()`).
   - Drop `import Link from "@tiptap/extension-link"` and configure via `StarterKit.configure({ link: { openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }, heading: { levels: [1,2,3,4] } })`.
3. **Fix v3 `setContent` call** — change `editor.commands.setContent(value || "<p></p>", { emitUpdate: false })` to `editor.commands.setContent(value || "<p></p>", false)`.
4. Leave everything else (toolbar markup, button handlers, `onMouseDown` preventDefault, `type="button"`, color pickers, image upload, fullscreen, character count) untouched.

## Verification checklist (Self-QA)

After the change I'll click through each toolbar control on the Service Details editor and report pass/fail for:

H1, H2, H3, Bold, Italic, Underline, Strikethrough, Text color, Highlight, Bullet list, Ordered list, Blockquote, Inline code, Code block, Link, Image, Table, Divider, Undo, Redo.

For each I will confirm:
- click applies/removes formatting on selected text
- active button highlight (`#FFE4EF` bg / `#E6007E` fg) toggles when cursor enters/leaves the formatted range
- clicking blank space does NOT auto-insert H1 (already guarded by `content: '<p></p>'` and `autofocus: false`)
- Undo / Redo traverse history

Because all four CMS editors (Service, Blog, FAQ, Why-choose-us) import the same `TiptapEditor` component, the fix applies to all of them automatically — no duplicated edits needed.
