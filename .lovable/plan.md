# Three targeted fixes

## Fix 1 — Remove the appointment auto-popup

- `src/routes/__root.tsx`: drop the `AppointmentAutoPopup` import (line 12) and its `<AppointmentAutoPopup />` render (line 90).
- Delete the file `src/components/appointment-auto-popup.tsx` entirely (contains the 5s `setTimeout`, the `appointment_popup_shown` sessionStorage check, the overlay markup, and all related `useEffect`s).
- Leave the navbar "Book Appointment" dropdown and the Contact page form untouched.
- Leave `src/components/popup-banner.tsx` (CMS-driven banner) and its `__root.tsx` render untouched — it is a different feature.

## Fix 2 — Normalize em/en dashes in page titles

Source audit shows no `—`, `–`, `&mdash;` or `&ndash;` in `src/` today; all hard-coded route titles already use `-`. The em dashes the user sees come from DB-stored CMS values (blog `meta_title`, gallery item `title`, popup banner `title`, etc.) that the route's `head()` injects into `<title>`/og:title/twitter:title.

Add a tiny sanitizer and apply it everywhere a dynamic string is injected into a title-style meta tag:

- New helper `dashesToHyphen(s: string)` in `src/lib/blog-utils.ts` (or a new `src/lib/title-utils.ts`) that replaces `\u2014`, `\u2013`, `&mdash;`, `&ndash;` with `-`, collapsing surrounding spaces.
- Apply in `head()` of:
  - `src/routes/blog.$slug.tsx` — `title`, `og:title`, `twitter:title`, JSON-LD `headline`, and `meta_description`/`og:description`/`twitter:description` (so the share preview is also clean).
  - `src/routes/blog.index.tsx`, `src/routes/services.tsx`, `src/routes/about.tsx`, `src/routes/team.tsx`, `src/routes/success-stories.tsx`, `src/routes/gallery.tsx`, `src/routes/contact.tsx`, `src/routes/careers.tsx`, `src/routes/faqs.tsx`, `src/routes/index.tsx` — wrap the title string just in case (cheap, defensive).
  - `src/routes/__root.tsx` defaults.
- No DB writes; this is purely render-time normalization so existing admin content is displayed with `-` without forcing the admin to re-edit.

## Fix 3 — YouTube embed URL handling

Replace the ad-hoc URL handling at every public embed site with a single shared helper.

- New helper `src/lib/youtube.ts` exporting `toYouTubeEmbed(url: string | null | undefined): string | null` that supports:
  - `youtube.com/watch?v=ID`
  - `youtu.be/ID`
  - `youtube.com/embed/ID`
  - `youtube.com/v/ID`
  - `youtube.com/shorts/ID`
  Returns `https://www.youtube.com/embed/<ID>?rel=0&modestbranding=1` (passes through any already-embed URL).

- `src/components/video-modal.tsx`: run `src` through `toYouTubeEmbed` (fallback to the original `src` for non-YouTube sources like Vimeo). Update the iframe to include the attributes the user listed: `width="100%"`, `height="100%"`, `frameBorder="0"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"`, `allowFullScreen`, `referrerPolicy="strict-origin-when-cross-origin"`, `loading="lazy"`. This is what Success Stories and Hero "Watch Our Story" use, so both are fixed in one place.
- `src/routes/gallery.tsx`: replace the inline regex (`getEmbedUrl`) with `toYouTubeEmbed` so gallery lightbox handles `watch?v=` URLs entered in the CMS.
- `src/lib/use-cms-content.ts` (`toEmbedUrl` used by `when-to-visit` / hero data path): keep Vimeo branch, route YouTube branch through `toYouTubeEmbed` for consistency.
- `src/components/when-to-visit.tsx`: leaves its own extractor in place but its iframe `src` building now goes via the shared helper for safety.

No CSP / meta tag exists in the project today, so nothing to allowlist.

## Out of scope (explicitly not changed)

- Navbar "Book Appointment" dropdown and Contact form.
- CMS-driven `popup_banners` feature.
- Admin UI, DB schema, RLS, storage.
- Any styling, colors, or layout.
- Other CMS pages and frontend pages.
