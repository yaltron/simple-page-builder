## Goal

Replace the hardcoded floating image collage on the left side of the "Moments That Matter" section with a CMS-driven CSS grid that reads from a new `moments_gallery` table. Add a full admin manager (upload/edit/delete/reorder) inside the existing Homepage CMS. Right-side text and section background stay untouched.

Note on current state: the existing left side uses an absolute-positioned floating slot layout, not a CSS grid. Per the spec ("update the grid gallery to be fully dynamic"), the left column will be rebuilt as a true CSS grid driven by `span_class`. Section wrapper, right-side text, blobs, scroll animations, and surrounding sections are untouched.

---

## 1. Database (migration)

New table `public.moments_gallery`:

- `id` uuid pk default `gen_random_uuid()`
- `image_url` text not null
- `image_alt` text
- `span_class` text not null default `'normal'` with CHECK in (`'normal'`,`'wide'`,`'wider'`,`'high'`)
- `order_index` integer not null default 0
- `is_active` boolean not null default true
- `created_at` timestamptz not null default `now()`
- `updated_at` timestamptz not null default `now()` + `touch_updated_at` trigger
- Index on `(is_active, order_index)`

RLS:
- Public SELECT where `is_active = true`
- Authenticated admin SELECT/INSERT/UPDATE/DELETE via `has_role(auth.uid(),'admin')`

Storage: reuse existing public `site-media` bucket, folder `moments-gallery/` (consistent with current image uploads — no new bucket needed).

## 2. Frontend — `src/components/who-we-are.tsx`

Replace the left-column floating collage (the `<motion.div>` containing the absolute-positioned hero + `SlotCard` map at lines ~334–415) with a CSS grid component that fetches from `moments_gallery`.

- New hook `src/lib/use-moments-gallery.ts`: subscribes via `supabase.from('moments_gallery').select().eq('is_active', true).order('order_index')`. Returns `{ items, loading }`.
- New sub-component `MomentsGrid` rendered inside the left column:
  - `display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-rows: minmax(110px, auto); gap: 12px;`
  - Each item maps `span_class` → inline style:
    - `normal` → no extra
    - `wide` → `gridColumn: 'span 2'`
    - `wider` → `gridColumn: 'span 3'`
    - `high` → `gridRow: 'span 2'`
  - Items render `<img>` with existing hover-zoom and rounded styling reused from `CardMedia` (preserve hover effect / radius / shadow tokens).
- Zero items → return `null` for the whole left column; right text stays full width naturally via the existing flex layout (the right column's `md:w-[40%]` will stretch since flex justify-between with one child just left-aligns; we'll wrap the grid render in a conditional so the wrapper `motion.div` is hidden too).
- Fewer than 10 → grid simply fills with what exists, no placeholders.
- Remove all references to `SLOT_CONFIG`, `DEFAULT_SLOTS`, `SlotCard`, hero CMS slots — they're no longer used by this section. Keep `MorphingBlob`, headings style, section wrapper, right-side text exactly as-is.

## 3. Admin CMS — `src/routes/admin.homepage.index.tsx`

Add a new tab `"Moments Gallery"` alongside Hero / Section Content / About. Tab renders a new `<MomentsGalleryEditor />` component (kept in the same file for consistency with other editors).

Editor layout:
- Header row: title "Moments That Matter — Gallery Images", subtext, and `+ Add Image` button (pink `#E6007E`) on the right.
- Card grid of current images (style matches existing `admin.gallery.index.tsx` cards): image preview top, drag handle (⠿) top-left, Edit / Delete action bar bottom.
- Drag-and-drop reorder using `@dnd-kit/core` + `@dnd-kit/sortable` (already common; install if missing). On drop, batch-update `order_index` for affected rows.

Add/Edit modal (single component, mode `add | edit`):
- Drag-drop upload zone styled per spec (dashed pink border, `#FFF1F7` bg, camera icon, "Browse Files" outlined pill, hint "JPG, PNG, WEBP • Max 5MB"). Reject >5MB / wrong mime client-side with toast.
- After file picked: preview shown.
- Alt text input.
- Grid Size — 4 visual cards (Normal 1×1, Wide 2×1, Wider 3×1, Tall 1×2) drawn as small SVG/CSS rectangles. Selected gets `border:2px solid #E6007E; background:#FFF1F7`. Helper text below.
- "Show on website" toggle (default on). Edit modal also shows an `order` number input.
- Footer: Cancel (outlined) + Upload & Add / Save Changes (`#E6007E`).
- On save: upload file to `site-media/moments-gallery/<ts>-<name>`, get public URL, insert/update row. On edit with replaced image: upload new, then `storage.remove` the old path. Toast success, refresh list.

Delete: shadcn `AlertDialog` confirm → delete row + storage object → toast "Image removed".

## 4. Files

New:
- `supabase` migration for `moments_gallery` + RLS + trigger
- `src/lib/use-moments-gallery.ts`
- (optional) `src/components/admin/moments-gallery-editor.tsx` — extracted from the admin route to keep file size manageable

Edited:
- `src/components/who-we-are.tsx` — swap left column for `MomentsGrid`, drop unused slot code paths in this section (kept exported types since they may be used elsewhere — will verify)
- `src/routes/admin.homepage.index.tsx` — add 4th tab + editor

Dependencies: install `@dnd-kit/core` and `@dnd-kit/sortable` if not present.

## 5. Out of scope (do not touch)

Right-side quote text, section background/blobs, scroll animations on the section wrapper, lightbox (none currently on this collage — none added), hover effects on individual images (preserved from existing `CardMedia` styling), any other homepage section.
