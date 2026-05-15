## Remaining Changes (Chunk 2 of 2)

Continuing the 22-change batch. Navbar + DB migration are already done. This plan covers the remaining 17 items.

### Visual / branding tweaks
1. **Footer** (`src/components/footer.tsx`) — logo to 200px, headings to `#8B0F50`, remove pink gradient line.
2. **Hero** (`src/components/hero.tsx`) — rename CTA "Book Free Consultation" → "Book Consultation", remove entrance motion, add subtle hover scale only.
3. **CTA Banner** (`src/components/cta-banner.tsx`) — replace gradient bg with solid pink gradient `#E6007E → #B5005F`, remove morphing blobs entirely (per default), rename button to "Book Consultation", remove entrance animations.
4. **PageCTABanner** (`src/components/page-layout.tsx`) — same pink gradient, "Book Consultation" rename.
5. **Services** (`src/components/services.tsx`) — update Genetic Testing card color per spec.
6. **Doctors** headings on `/team` and homepage carousel — color update.
7. **Who We Are** (`src/components/who-we-are.tsx`) — quote styling tweak.

### Section removals / restructures
8. **Remove Miracles Gallery** — drop import/render from homepage; remove Miracles tab from `admin.homepage.index.tsx`.
9. **Success Stories** (`src/routes/success-stories.tsx`) — remove metrics block.
10. **Team** (`src/routes/team.tsx`) — switch to 4-column smaller cards.
11. **Process Steps** (`src/components/process-steps.tsx`) — make each step a Link to `/services`, `/team`, `/contact` with hover "Visit page →".

### Page rebuilds
12. **Contact** (`src/routes/contact.tsx`) — replace existing form (left 55%) with full appointment form mirroring navbar dropdown (name, phone, email optional, date, time slots, consultation type, service optional, message). Submit to `appointments` table. Keep right-side info cards + map intact.

### Careers (Part 6)
13. **Careers public page** (`src/routes/careers.tsx`) — "Why Work With Us" cards, list active `career_listings`, application modal with resume upload to `resumes` bucket → insert `career_applications`.
14. **Admin careers** (`src/routes/admin.careers.index.tsx`) — tabs for Job Listings (CRUD with TipTap) and Applications (status badges, resume view via signed URL).
15. **Sidebar + footer link** — add Careers entry in `admin-shell.tsx` and `footer.tsx`.

### Gallery / FAQ / Floating
16. **Gallery** (`src/routes/gallery.tsx` + `admin.gallery.index.tsx`) — show play overlay for `media_type='video'`, lightbox plays `video_url`; admin form supports video type + URL.
17. **FAQs** — add Gynecology, Fertility, Radiology categories in `faqs.tsx` and `admin.faqs.index.tsx`.
18. **Floating WhatsApp** (`src/components/floating-buttons.tsx`) — hide on `/admin/*` via `useRouterState`.

### Files to create
- `src/routes/careers.tsx`
- `src/routes/admin.careers.index.tsx`

### Files to edit
- `src/components/footer.tsx`, `hero.tsx`, `cta-banner.tsx`, `page-layout.tsx`, `services.tsx`, `who-we-are.tsx`, `process-steps.tsx`, `floating-buttons.tsx`, `doctors-carousel.tsx`, `miracles-gallery.tsx` (remove usage), `admin/admin-shell.tsx`
- `src/routes/index.tsx`, `team.tsx`, `success-stories.tsx`, `contact.tsx`, `gallery.tsx`, `faqs.tsx`, `admin.homepage.index.tsx`, `admin.gallery.index.tsx`, `admin.faqs.index.tsx`

### Confirmations needed
- CTA banner morphing blobs: **remove entirely** (default).
- Miracles tab in admin homepage editor: **remove** (component is being deleted).

Reply **approve** to execute.
