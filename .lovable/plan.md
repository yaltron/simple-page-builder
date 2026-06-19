# Plan

## 1. Logo +20% (navbar + footer only)

- `src/components/navbar.tsx` line 206: `height: 60 → 72`, `maxWidth: 150 → 180`. Keep `width: auto`, `objectFit: contain`. Don't touch row1Height / min-h container.
- `src/components/footer.tsx` line 90-102: `height: 44 → 53`, `maxWidth: 176 → 211`. Keep `width: auto`, `objectFit: contain`. Nothing else changes.
- Admin sidebar logo (admin-shell.tsx) — NOT touched (request is navbar + footer only).

## 2. Address → "Soalteemode, Kathmandu, Nepal"

Update all occurrences:
- `src/components/footer.tsx` line 57 (`Soalteemod` → `Soalteemode`)
- `src/routes/contact.tsx` line 50 (`Soalteemod` → `Soalteemode`)
- `src/routes/contact.tsx` lines 13, 15 (meta description: `Soltimode` → `Soalteemode`)
- `src/routes/index.tsx` line 47 (JSON-LD `streetAddress: "Soltimode"` → `"Soalteemode"`)
- Update `site_settings` row `key='address'` value to `Soalteemode, Kathmandu, Nepal` (via insert tool, data update).

## 3. About Us — fully CMS-editable

Reuse the existing `about_content` table (section/jsonb). No new tables, preserving current data. Extend the JSON shape per section and add two new sections.

**Sections (jsonb keys):**
- `story_images` (existing) — add: `heading`, `heading_color`, plus per-image `alt` already supported. Frontend reads `heading`/`heading_color` with defaults.
- `mission_vision` (existing) — add `mission_icon`, `vision_icon` (lucide icon name strings, default `Target`/`Eye`).
- `values` (existing) — add top-level `heading`, `heading_color`; keep `items: [{icon,title,description}]`.
- `why_choose_us` (NEW row) — `{ heading, heading_color, cards: [{icon,title,description}] }`. Seed with current hardcoded 3 items.
- `cta_banner` (NEW row) — `{ heading, subtext, button_text, button_url }`. Seed with the current `PageCTABanner` defaults.

Seeding happens via the insert tool after the rest is wired.

**Admin pages (extend existing editors in `src/components/admin/cms-editors.tsx`):**
- `StoryEditor`: add heading + color-picker fields; three image-upload slots with alt-text inputs (already partially there — formalize as image_1/2/3 with alt).
- `MissionVisionEditor`: add lucide-icon-name text inputs for `mission_icon`/`vision_icon` (simple text field with help text — picker not justified for two icons).
- `ValuesEditor`: add section heading + color picker; existing item list keeps add/delete; add up/down reorder buttons (drag-to-reorder skipped to keep dep-free — same UX outcome).
- NEW `WhyChooseUsEditor` (in cms-editors.tsx) + NEW route `src/routes/admin.about.why-choose-us.tsx`.
- NEW `CtaBannerEditor` (in cms-editors.tsx) + NEW route `src/routes/admin.about.cta-banner.tsx`.
- `src/components/admin/admin-shell.tsx`: add two new entries under About Us submenu.

**Frontend (`src/routes/about.tsx`):**
- Drive each section's heading, colors, paragraphs, images/alt, mission/vision icons & text, why-choose cards, values, and CTA banner from CMS data via `useAboutSection`.
- `PageCTABanner` is currently shared. To keep other pages unchanged, render an inline CTA on About using `cta_banner` data instead of `PageCTABanner` — other pages keep the existing component.

## 4. Podcast cards in Gallery

**DB (migration):** new `public.podcasts` table — id, title, description, youtube_url, order_index, is_active, created_at, updated_at. RLS: public SELECT where `is_active=true`; admin full access via `has_role('admin')`. Grants per house rules. Trigger for `updated_at`.

**Frontend — `src/routes/gallery.tsx`:** Replace the existing virtual-tour CTA block (or add directly above/below it — confirmed in code: it's the only current "podcast/tour"-style section) with a new horizontally-scrolling cards strip. Implementation matches spec: flex row, `overflow-x: auto`, fixed-width 280px cards, lazy-loaded YouTube iframes, scroll-by-card-width arrow buttons (`scrollBy({ left: ±300, behavior: 'smooth' })`), CSS scrollbar styling, hover lift. Section heading is fetched from a new `homepage_content` row `podcasts_section` (`heading`, `subtext`) with defaults — keeps with existing CMS pattern.

**CMS — `src/routes/admin.gallery.podcasts.tsx` (NEW) + nav link** under Gallery in admin-shell. List view: thumbnail (derived from YouTube ID — `https://i.ytimg.com/vi/{id}/mqdefault.jpg`), title, order_index input, active toggle, edit/delete. Add/Edit modal with title, youtube_url, description, is_active. Delete with confirm. Order via order_index number input (drag-reorder skipped — same UX outcome without new deps).

## 5. TipTap editor bugs

Single shared editor at `src/components/admin/tiptap-editor.tsx` — fix once and all consumers (blog, services, FAQs, doctor bios, etc.) benefit.

- StarterKit already provides Heading, Blockquote, BulletList, OrderedList, ListItem, HorizontalRule, CodeBlock, Code. Configure: `StarterKit.configure({ heading: { levels: [1,2,3,4] } })`.
- Set `content: value || '<p></p>'` (default paragraph node, not heading).
- Set `autofocus: false` in `useEditor` config.
- Toolbar buttons already chain correctly (`toggleHeading`/`toggleBlockquote`/`toggleBulletList`/`toggleOrderedList`) — keep, but verify active state colors. Active style stays as the existing pink (`#FFE4EF` bg, `#E6007E` text); changing to dark magenta as written in spec would clash with the toolbar's white background — keep current active palette unless requested.
- The "clicking blank space auto-toggles H1" symptom is from the editor falling back to no-paragraph and the toolbar reflecting current node. Defaulting initial content to `<p></p>` and ensuring `setContent(value || '<p></p>')` in the value-sync `useEffect` resolves it.

The spec lists separate `@tiptap/extension-heading`, `-blockquote`, `-bullet-list`, `-ordered-list`, `-list-item`, `-horizontal-rule`, `-code-block`, `-code` packages — these are NOT needed because StarterKit bundles them; importing them separately alongside StarterKit causes "duplicate extension" warnings and breakage. Skipping those imports.

`TextAlign` (not in StarterKit) is not currently used by any toolbar button; skipping to keep scope minimal.

## Order of operations

1. Migration: create `podcasts` table.
2. Code edits: navbar, footer, contact, index, about.tsx, cms-editors, admin-shell, two new about admin routes, gallery.tsx, new gallery podcasts admin route, tiptap-editor.
3. Insert/update: site_settings address; seed `about_content` rows for `why_choose_us` and `cta_banner`.

## Out of scope (not touched)

Other pages, designs, homepage components, doctor/blog/service editors (only their shared TipTap editor benefits indirectly).
