## Overview

This is a large scope. I'll deliver it in **4 sequential chunks** so each one stays reviewable and we don't ship 5,000 lines in one untested blob. After each chunk you confirm it works, then I move to the next.

All existing design, fonts, colors, navbar, footer, and Supabase setup stay untouched.

---

## CHUNK A — Popup Banners + FAQs (Parts 2 & 4)

Two self-contained features that reuse existing patterns (TipTap + admin shell + storage).

### Database
- `popup_banners` table — exactly the schema you specified. Validation trigger ensures only one row has `is_active = true` (toggling activates it and deactivates others atomically). End-date auto-deactivation handled at read time on the frontend (cheap and reliable).
- `faqs` table — id, question, answer (HTML from TipTap), category, order_index, is_active, timestamps.
- RLS: public SELECT for active rows; admin full access.
- Reuse existing `site-media` storage bucket for popup images.

### Frontend
- `<PopupBanner />` mounted in root layout. Reads active banner, checks `show_on_pages` against current path, respects `show_after_seconds`, sessionStorage de-dupe, framer-motion spring animation matching your spec, closes on ✕/overlay/Escape.
- `/faqs` route — category pill filter, accordion list (existing FAQ component animation reused), JSON-LD FAQPage schema in `head()`, full SEO meta. Footer Quick Links gets an "FAQs" entry.

### Admin
- `/admin/popup` — list + create/edit form (image upload, page multiselect, dates, color picker, show-after seconds, once-per-session toggle), live preview button, active badge. Toggling active deactivates others.
- `/admin/faqs` — list with drag-to-reorder (dnd-kit), inline status toggle, bulk-select delete. Edit form uses the existing TipTap editor with a stripped toolbar (Bold, Italic, Lists, Link only).
- Both added to admin sidebar.

---

## CHUNK B — Homepage + About dynamic content (Parts 3 & 5)

### Database
- `homepage_content` table — `(section text unique, content jsonb)`. Sections: `hero`, `miracles`. Same shape used for `about_content` (`story_images`, `mission_vision`, `values`).
- Seed both tables with the current hardcoded copy/images so the site looks identical immediately after migration.

### Frontend
- `Hero` reads from `homepage_content.hero` (headline, subheadline, CTA primary text+url, CTA secondary text, story video URL+thumbnail+alt). Existing markup/animation untouched.
- New `<StoryVideoModal />` — centered lightbox, dark overlay, 16:9 iframe, autoplay, ✕/overlay/Escape close. Supports YouTube and Vimeo URLs (auto-converts to embed form).
- `MiraclesGallery` reads number/heading/description/CTA from `homepage_content.miracles`.
- About page collage, mission/vision, values — read from `about_content`.

### Admin
- New `/admin/homepage` route with tabs: **Hero** | **Miracles** | **About**.
  - Hero tab: text inputs + image uploads + live preview pane on the right.
  - Miracles tab: 4 fields.
  - About tab: 3 image uploads with alt text and reorder, mission/vision text fields, repeating values list (icon name from lucide + title + description).
- Sidebar gets a "Homepage" group containing this single page (the spec lists sub-items like "Services / Doctors / Testimonials" under Homepage, but those already have their own admin pages — I'll keep them as siblings rather than duplicate them, and add a note in the sidebar grouping them visually).

---

## CHUNK C — Sidebar reorg + Dashboard widgets + small Part 7 wins (Features 5, 6, 7, 10)

### Sidebar
- Reorder per your spec, group homepage-related entries visually under a "Homepage" label, add icons for Popup Banners and FAQs (already added in Chunk A).

### Dashboard (`/admin`)
- Add three appointment cards: **🔴 X new** (link to `/admin/appointments?filter=new`), **Today's appointments**, **This week's appointments**.

### Quick frontend wins
- **Custom 404** (Feature 10) — shared navbar+footer, sad lotus SVG, two CTAs. Wired into `__root` notFoundComponent.
- **Blog category page** `/blog/category/$category` (Feature 5) — reuses blog grid card.
- **Related posts** on each blog post (Feature 6) — 3 posts matching category or tags, "You might also like" heading, same card style.
- **Social share buttons** (Feature 7) — Facebook, X, WhatsApp, LinkedIn, Copy Link below each post. WhatsApp prominent.

---

## CHUNK D — Site-wide extras (Features 1, 2, 8, 9 + Patient Portal teaser)

### Database
- `announcement_bar` table per spec.
- Add seed rows to `site_settings` for keys: `tawkto_id`, `ga4_id`, `cookie_consent_enabled`, `success_calculator_enabled`. All empty/false by default — admin enables in Settings UI.

### Frontend
- **Announcement bar** above navbar (Feature 2) — sessionStorage dismiss, configurable text/link/bg from CMS.
- **Tawk.to** auto-injection (Feature 1) — only if `tawkto_id` is set.
- **Google Analytics 4** auto-injection + event tracking on Book/Call/WhatsApp clicks (Feature 9) — only if `ga4_id` is set.
- **Cookie consent banner** (Feature 8) — slide-up bottom, Accept/Reject/Manage, localStorage. GA4 respects consent.
- **Patient Portal teaser** on Contact page + `/patient-portal` "Coming Soon" page with email signup (stored in a new `patient_portal_signups` table).

### Admin
- New `/admin/settings` page — toggles for Tawk.to ID, GA4 ID, cookie banner, success calculator, plus announcement bar editor (text/link/bg/active toggle).

---

## Out of scope for this round (recommend skipping or doing later)

- **Feature 3 — Success Rate Calculator**: this needs real medical input on the formula/ranges. I'd rather not invent fertility statistics. Suggest doing this in a follow-up once you provide the rate brackets, or skip it.

If you want it included anyway, I'll build the UI with placeholder ranges and a strong "estimate only" disclaimer — say the word.

---

## Technical notes

- All new tables get RLS: public SELECT on active/published rows only, admin full access. Validation via triggers (no CHECK constraints — keeps mutability).
- Storage: reuse existing public `site-media` bucket for popup, hero, about, announcement images.
- TipTap reused with a `simple` toolbar variant for FAQs (no images/headings/etc).
- Drag-reorder uses `@dnd-kit/core` + `@dnd-kit/sortable` (small, already commonly used).
- YouTube/Vimeo URL parser handles `watch?v=`, `youtu.be/`, `vimeo.com/ID` forms.
- All new admin routes follow the existing `admin.<name>.index.tsx` flat naming.

---

## Suggested order

1. Approve this plan → I build **Chunk A** (Popup + FAQs).
2. You verify in preview → I build **Chunk B** (Homepage + About dynamic).
3. You verify → **Chunk C** (sidebar/dashboard + 404/categories/related/share).
4. You verify → **Chunk D** (announcement bar + Tawk + GA4 + cookies + patient portal).

If you'd rather collapse chunks, say which to merge. If you want Feature 3 in scope, confirm whether placeholder ranges are OK.