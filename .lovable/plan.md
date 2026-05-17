## Goal
Make the Code button in the blog content editor (admin CMS) work correctly.

## Findings
`src/components/admin/tiptap-editor.tsx` has a single "Code Block" button (line 112) calling `toggleCodeBlock()`. StarterKit ships both `codeBlock` (block) and `code` (inline mark), but:
- There is no inline-code button, so users pressing the "Code" icon expecting inline code get a full block instead (or nothing visible if the toolbar click loses selection focus).
- The toolbar `<button>`s have no `onMouseDown` preventDefault, so clicking the toolbar blurs the editor selection — `toggleCodeBlock()` then runs against an empty selection and appears to do nothing on first click.

## Fix (single file: `src/components/admin/tiptap-editor.tsx`)
1. Split into two buttons:
   - **Inline Code** (`</>` icon) → `editor.chain().focus().toggleCode().run()`, active state `editor.isActive("code")`.
   - **Code Block** (existing) → keep `toggleCodeBlock()`.
2. Add `onMouseDown={(e) => e.preventDefault()}` to the `Btn` wrapper so toolbar clicks don't steal selection from the editor. This is the standard TipTap toolbar pattern and fixes the "click does nothing" case.
3. No other changes — leave layout, styles, and all other buttons untouched.

## Verification
- Open `/admin/blog/<id>` in the browser tool, type some text, select it, click the new Inline Code button → confirm `<code>` wraps the selection in the rendered editor. Click again → toggles off.
- With cursor on an empty line, click Code Block → confirm a `<pre><code>` block appears. Type, then click again to exit.
- Confirm Save/Draft still works (no regressions on other toolbar buttons).
