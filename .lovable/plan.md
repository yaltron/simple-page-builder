# Plan: 4 site updates

## 1. Floating decorative elements in Hero

**File:** `src/components/hero.tsx`

- Add 8 absolutely-positioned decorative elements inside the `<section>` (before the inner `max-w-7xl` container), each with `z-index: 0`, `pointer-events: none`, opacity 0.04–0.10.
  1. Large hollow circle 300px — top:-60 left:-80, rotate 30s
  2. Medium hollow circle 180px — bottom:20% right:10%, float 8s
  3. Small filled dot 12px — top:30% left:12%, float 6s (delay 1s)
  4. Tiny blue dot 7px — top:60% left:35%, float 9s (delay 2s)
  5. Rotated 14px square — top:20% right:35%, float 7s (delay .5s)
  6. Plus/cross (two crossed rects) — top:75% left:18%, rotate 20s
  7. Dashed ring 120px blue — top:15% right:8%, rotate 25s reverse
  8. Soft radial blob 400px — bottom:-100 left:-100, pulse 4s
- Wrap inner content container with `position: relative; z-index: 1`.
- Add keyframes `float`, `rotate`, `softPulse` to `src/styles.css` (scoped, only if not already present).

## 2. Gallery CMS — Edit & Delete overlay

**File:** `src/routes/admin.gallery.index.tsx`

Currently uses a small top-right hover button pair. Replace with the requested full-card hover overlay:
- Add hover overlay (`absolute inset-0`, `bg-black/55`, opacity 0 → 100 on group-hover) with two pill buttons: **Edit** (white bg, pencil icon) and **Delete** (#E6007E, trash icon).
- **Edit** opens the existing side-panel editor (already implemented) — keep its fields (media type, url, thumbnail, title, caption, category, display_order, status). No schema change.
- **Delete** triggers a `confirm()` → existing remove() handler. Also delete the underlying object from the `site-media` storage bucket when `media_type === 'image'` and the URL points to that bucket (parse path from public URL).
- Toasts: "Media updated!" / "Item deleted."

Note: the table is `gallery_items` (not `gallery_images`); using existing schema. No `is_active` field exists — will keep existing `status` (published/draft) toggle in editor.

## 3. Blog post page + working navigation

**Files:**
- New: `src/routes/blog.$slug.tsx`
- Edit: `src/routes/blog.tsx` (already uses `<Link to="/blog/$slug" params={{slug}}>` — verify it works once the route file exists; the reason clicks don't navigate today is the missing route).

**Route file `blog.$slug.tsx`:**
- `createFileRoute("/blog/$slug")` with `loader` that fetches the post by slug from `blogs` (status=published). If not found → `throw notFound()`, render `notFoundComponent` (custom 404).
- `head()` builds title/description/og tags + canonical from loader data, plus JSON-LD BlogPosting script (per `head-meta` guidance — no react-helmet-async).
- Layout: Navbar → hero banner (featured_image, 320px, dark gradient overlay, title overlay in Playfair white) → breadcrumb (Home > Blog > Title) → meta row (category chip, author, formatted date, reading time, word count) → optional focus keyword chip → TipTap HTML content rendered via `dangerouslySetInnerHTML` inside a `.prose-blog` wrapper with the specified prose styles (added to `src/styles.css`) → tags row → share row (WhatsApp/Facebook/Twitter/Copy Link with 1.5s "Copied!" state) → divider → Related Posts (3 from same category, compact cards) → Footer.

**Routing:** TanStack auto-registers from the file — no manual router edit needed. routeTree.gen.ts regenerates.

## 4. Homepage fully dynamic from CMS

**Scope decision:** The existing `homepage_content` table (jsonb per section) already powers Hero via `useHomepageSection`. Rather than introducing a parallel `homepage_sections` table that would duplicate state, extend the existing pattern. The 6 brand color swatches and color-picker UX are still delivered.

**Schema (migration):** Seed/upsert rows in `homepage_content` for keys: `who_we_are`, `when_to_visit`, `process`, `services_heading`, `doctors_heading`, `cta_banner`. (Hero already exists.) Each row's `content` jsonb holds the section's fields (heading, heading_color, subheading, body_text, images[] with alt, video_url, video_thumbnail, button_text, button_url, button_color, is_active).

**Frontend — make these components read from `useHomepageSection(key, defaults)`:**
- `who-we-are.tsx` — heading + color, quote, description, 3 images w/ alt
- `when-to-visit.tsx` — heading + color, 4 images
- `process-steps.tsx` — heading + color (step icons already in DB)
- `services.tsx` — section heading + color only
- `doctors-carousel.tsx` — section heading + color only
- `cta-banner.tsx` — heading + color, subtext, button text/url/color

Inline `style={{ color: heading_color }}` on heading; image src/alt from CMS with current defaults preserved.

**Admin — `admin.homepage.index.tsx`:** Add a "Section Content" tab. For each of the 7 section keys render an editor card with the requested fields, image uploaders (reuse `ImageUpload`), and a reusable `<ColorPicker>` component (`src/components/admin/color-picker.tsx`) showing 6 brand swatches (#C2185B, #E6007E, #2D0A1E, #1BA0DC, #8B0F50, #FFFFFF) + hex input + live preview. Per-card "Save Section" upserts the row, shows toast, displays "Last updated: …" from `updated_at`.

## Technical notes

- Hero floats: pure CSS, no new deps. Keyframes added to `src/styles.css` so they're tree-shakeable globally.
- Gallery storage cleanup: derive path via `url.split('/site-media/')[1]` and call `supabase.storage.from('site-media').remove([path])` best-effort.
- Blog post SEO: use TanStack `head()` not react-helmet-async (project convention; see head-meta knowledge).
- Homepage dynamic: no new table — reuse `homepage_content` jsonb to avoid migration complexity and double-source-of-truth. If you'd prefer the new dedicated table, say so before I implement.

## What I will NOT touch
Navbar, footer, fonts, other admin pages, appointments flow, existing animations, or any page besides the ones listed.

---

**One open question before I build:** for Update 4, OK with reusing the existing `homepage_content` jsonb table (cleaner, no migration of existing hero data), or do you want me to create the new `homepage_sections` table as written and migrate hero into it?