## Goal
Move the standalone Moments Gallery editor into the existing "Storytelling Gallery – Moments That Matter" section on the Who We Are admin page (`/admin/homepage/who-we-are`). Remove the standalone Moments Gallery page and its sidebar item. No other CMS page, frontend page, or unrelated Who We Are field is touched.

## Files changed

### 1. `src/components/admin/cms-editors.tsx`
- In `WhoWeAreEditor` (`SectionCard title="Storytelling Gallery - Moments That Matter"`):
  - Keep **all existing settings fields** as-is and in the same order: Section enabled, Main heading, Subtitle/tagline, Use-gradient toggle, Gradient from/to, Subtitle color, CTA text, CTA URL, Background glow color, Glow intensity slider, Section background style, Section spacing slider, Card radius slider, Animation speed slider, Hover style, Enable floating animation.
  - **Replace** the existing `Gallery Slots` subsection (current lines 575–682 — the fixed `SLOT_LIST` grid with center_hero / left_card_* / right_card_* / floating slots) with:
    - A horizontal rule (`<hr/>`) and a sub-label `Storytelling Gallery - Moments That Matter`.
    - `<MomentsGalleryEditor />` rendered inline (imported from `@/components/admin/moments-gallery-editor`). This brings in the full functionality from the current Moments Gallery CMS page exactly as it exists today: add slot button, drag-to-reorder grid, span-size selector per slot, edit/remove per slot, all wired to the `moments_gallery` table and `site-media` storage. No changes to that component or its Supabase calls.
  - Pass `saveLabel="Save Gallery Settings"` to `SectionCard` (add a small optional prop — see Technical Notes) so the single button at the bottom reads **Save Gallery Settings** and triggers `who.save` (saves only the styling/settings fields, same as today).
  - Remove the now-unused `SLOT_LIST`, `SlotKey` type, `slots` / `patchSlot` / `clearSlot` helpers from `WhoWeAreEditor` (only if no other editor uses them — they live in this file and are only referenced here).
  - Leave the rest of `WhoWeAreEditor` (everything above the Gallery Slots subsection) untouched.

### 2. `src/components/admin/cms-editors.tsx` – `SectionCard`
- Add an optional `saveLabel?: string` prop, defaulting to `"Save Section"`. Use it in the button label. No other call sites change behavior.

### 3. `src/components/admin/admin-shell.tsx`
- Remove the `Moments Gallery` leaf from the `homepage` group in `navItems`:
  - Delete `{ to: "/admin/homepage/moments-gallery", label: "Moments Gallery" }`.
- Leave every other menu item, ordering, and submenu behavior unchanged.

### 4. `src/routes/admin.homepage.moments-gallery.tsx`
- Delete the file. The route disappears from `routeTree.gen.ts` automatically on the next build.

## Files NOT changed
- `src/components/admin/moments-gallery-editor.tsx` — kept as-is, now consumed only by `WhoWeAreEditor`. All Supabase queries (`moments_gallery` table, `site-media` bucket, add/edit/delete/reorder logic) stay identical.
- Database schema, RLS, storage buckets — no migration.
- `src/components/who-we-are.tsx` and the rest of the frontend.
- All other CMS editors and routes.
- Other fields in `WhoWeAreEditor` and its `who.save` flow.

## Technical Notes
- `SectionCard` signature becomes `{ title, onSave, saving, saveLabel?, children }`; render `saveLabel ?? "Save Section"`.
- `WHO_DEFAULTS.slots` and the `GalleryItem`/`SlotKey` typings become unused inside `WhoWeAreEditor`. Leaving `slots: {}` in `WHO_DEFAULTS` is safe (it just sits in the JSON payload unused); remove only the now-orphaned local consts (`SLOT_LIST`, `slots`, `patchSlot`, `clearSlot`) to keep TypeScript happy under `strict`.
- The single Save button at the bottom of the section saves the Who We Are settings (`homepage_content.who_we_are`). The Moments Gallery items continue to save themselves per-item via their existing modal flow inside `MomentsGalleryEditor` — exactly as on the standalone page today.
- No route registration to edit manually — `routeTree.gen.ts` regenerates on build.
