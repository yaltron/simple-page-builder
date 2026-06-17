# Plan: 5 site updates

## 1. Logo update
- Upload `user-uploads://shubhashreelogo_1.png` to the `site-media` storage bucket as `branding/shubhashree-logo.png` (public URL).
- Save the same file as a CDN asset at `src/assets/shubhashree-logo.png` via `lovable-assets create` and import the pointer JSON.
- Replace the `logo-trimmed.png` import in:
  - `src/components/navbar.tsx` → `<img>` with `height:52px; width:auto; max-width:200px; object-fit:contain; object-position:left center`.
  - `src/components/footer.tsx` → `height:56px; max-width:220px; object-position:center`.
  - `src/components/admin/admin-shell.tsx` (sidebar) → `height:44px; max-width:160px; margin:0 auto`.
  - `src/routes/admin.login.tsx` → `height:60px; max-width:200px; margin:0 auto`.
- Add a shared `.crisp-logo` class in `src/styles.css` with `image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; -webkit-backface-visibility: hidden;` and apply to all four logos.
- No cropping/distortion — `object-fit:contain` everywhere.

## 2. Virtual Tour CMS (Gallery)
- DB migration: insert a `site_settings` row with `key='virtual_tour'`, value:
  ```json
  { "heading": "Take a Virtual Tour of Our Clinic",
    "subtext": "Explore our facilities from the comfort of your home.",
    "button_text": "Watch Tour Video",
    "video_url": "",
    "autoplay": false,
    "is_active": true }
  ```
- New admin route `src/routes/admin.gallery.virtual-tour.tsx` with a `VirtualTourEditor` (added to `src/components/admin/cms-editors.tsx`): heading, subtext, button text, video URL (helper text), autoplay toggle, active toggle, Save button + success toast. Link from gallery admin nav.
- `src/routes/gallery.tsx`: replace hardcoded section with CMS-driven heading/subtext/button (hide section if `is_active === false`). On click open `VideoModal` with src built from `toYouTubeEmbed(video_url)` + `autoplay=1&mute=1` or `autoplay=0`.

## 3. When To Visit CMS
- DB migration:
  - Create `when_to_visit_items` table (`id`, `text`, `order_index`, `is_active`, timestamps) with public-read RLS + admin-write policies and GRANTs. Seed with the 6 current reasons.
  - Insert a `homepage_content` row `section_key='when_to_visit'` carrying heading, heading_color, subtext, button_text, button_url, image_{1-4}_url/alt, video_url, video_autoplay (extends the existing DEFAULTS shape).
- Replace the current `WhenToVisitEditor` in `src/components/admin/cms-editors.tsx` with 4 panels:
  1. Section settings (heading, color picker, subtext, button text, button URL).
  2. Checklist items: list of rows (text input, active toggle, delete, drag-reorder using existing pattern), "Add New Item" button, "Save Checklist".
  3. 4 image upload slots + alt text (reuse `ImageUpload`).
  4. Video URL + autoplay toggle, "Save Section".
- `src/components/when-to-visit.tsx`: drop hardcoded `reasons` array; load items via new `useWhenToVisitItems` hook (active only, ordered). Read button text/URL, subtext and all images from CMS. Wire autoplay flag into the existing iframe URL builder.

## 4. Individual service pages
- DB migration adds to `services`: `full_content text`, `page_heading text`, `page_subtext text`, `meta_title text`, `meta_description text`, `hero_image_url text`, `hero_image_alt text`, `key_points text[] default '{}'`. Backfill `slug` for any blank rows from `title`.
- New route `src/routes/services.$slug.tsx`:
  - Loader fetches the published service by slug; `notFoundComponent` if missing.
  - `head()` sets `<title>{meta_title || title} - Shubhashree IVF</title>`, description, og:title, og:description, og:url, canonical.
  - Layout: hero band (gradient `#FFF1F7 → #fff → #EAF7FD`, 240px, centered icon + name, breadcrumb `Home > Services > Name`); two-column body — left 60% (page_heading, page_subtext, divider, "What to Expect" bullet list from `key_points` with check icons, TipTap HTML render of `full_content`, CTA button → `/contact`); right 40% (hero image card if set, quick info card with phone/WhatsApp/Book buttons).
- Homepage `src/components/services.tsx`: each card gets a "Learn More ▾" toggle that expands (animated max-height) to show short description, first 3 key points, and "View Full Details →" `<Link to="/services/$slug" params={{ slug }}>`.
- `src/routes/services.tsx`: remove the accordion expand; each card shows title + short description + icon + "Learn More →" link going to `/services/$slug`.
- `src/components/footer.tsx`: change each footer service link to `<Link to="/services/$slug" params={{ slug: s.slug }}>`; fetch slug alongside title.
- Admin `src/routes/admin.services.index.tsx`: extend the editor drawer with fields for slug (editable, auto-suggest from title), page heading, page subtext, key points (repeatable text input add/remove/reorder), hero image upload + alt, meta title, meta description, and a TipTap rich-text editor (reuse `src/components/admin/tiptap-editor.tsx`) bound to `full_content`.

## 5. Address update
- Change footer contact address in `src/components/footer.tsx` value to `Soalteemod, Kathmandu, Nepal` (keep existing map href).
- Update `src/routes/contact.tsx` info cards anywhere the address appears.
- DB migration: upsert/update `site_settings` row with `key='address'` (or the contact key the contact page reads) to `Soalteemod, Kathmandu, Nepal`.
- Search the repo for "Kathmandu, Nepal" / "Address" strings and update any remaining hardcoded occurrences.

## Technical notes
- All new public tables get `GRANT SELECT` to `anon`+`authenticated`, write GRANTs to `authenticated`+`service_role`, RLS enabled, admin-only write policies using `has_role(auth.uid(),'admin')`.
- New CMS sections plug into existing `useHomepageSection` / `site_settings` hooks; no new fetch infrastructure.
- TipTap content rendered with `dangerouslySetInnerHTML` inside a styled prose wrapper (same pattern as `src/routes/blog.$slug.tsx`).
- Route tree regeneration is automatic via the TanStack plugin.
