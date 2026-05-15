# Plan — 22 changes

I'll apply each change exactly as specified, touching only the files listed.

## Quick fixes (frontend only)

1. **Service field optional** — `src/components/navbar.tsx`: remove `required` from the Service select in the appointment dropdown.
2. **Genetic Testing card color** — `src/components/services.tsx`: replace per-index gradient cycling with a fixed map so the "Genetic Testing (PGT)" card uses `linear-gradient(135deg, #FFF1F7 0%, #fcd4e8 100%)` (same as Embryo Freezing).
3. **Doctors heading** — `src/components/doctors-carousel.tsx` and `src/routes/team.tsx`: update heading text to "Experienced IVF Specialists Providing Compassionate Fertility Care".
4. **Remove Miracles section** — delete `src/components/miracles-gallery.tsx` and remove its import/usage from `src/routes/index.tsx`. Also remove the Miracles tab from `src/routes/admin.homepage.index.tsx` (per "delete the component"). Hook in `use-cms-content.ts` left in place (harmless).
5. **Remove stats from Success Stories** — `src/routes/success-stories.tsx`: delete the 5,000+ Happy Families stats block.
6. **Team page 4 cols** — `src/routes/team.tsx`: grid `repeat(4, 1fr)`, photo 180px, padding 16px, name 16px, specialty 12px.
7. **Clickable How It Works steps** — `src/components/process-steps.tsx`: wrap each step in `<Link>` with mapped routes, add hover "Visit page →" link in #E6007E with opacity 0→1.
8. **Logo sizes** — navbar logo width 180px, footer logo width 200px.
9. **Call Us button color** — `src/components/navbar.tsx`: bg #E6007E, hover #C4006A.
10. **Confirm Appointment button** — `src/components/navbar.tsx`: bg #B5005F, hover #8C0049.
11. **Footer heading color** — `src/components/footer.tsx`: change `headingStyle.color` to `#8B0F50`.

14+15. **Hero/CTA buttons** — `src/components/hero.tsx` and `src/components/cta-banner.tsx`: strip motion entrance animations on the four buttons (replace `motion.div` wrapper with plain div / drop initial+animate); add `transition-transform duration-[250ms] hover:scale-[1.03] hover:shadow-lg`. Rename "Book Free Consultation" → "Book Consultation" everywhere it appears.
16. **Remove gradient lines** — `src/components/navbar.tsx` (bottom border of row 2) and `src/components/footer.tsx` (top border-image): remove `borderImage` + border declarations.
17. **Quote text** — `src/components/who-we-are.tsx`: replace italic quote text.
18. **Hide WhatsApp on /admin** — `src/components/floating-buttons.tsx`: read `useLocation().pathname`, return null if it starts with `/admin`.
20. **Unified CTA banner bg** — `src/components/cta-banner.tsx` and `src/components/page-layout.tsx` (PageCTABanner): replace background with `linear-gradient(135deg, #E6007E 0%, #B5005F 100%)`. Remove the rose/cream/gold gradient + MorphingBlobs (or recolor blobs to white-low-opacity to keep depth — confirm if you want them gone).
21. **Remove "We'll respond within 24 hours"** — `src/routes/contact.tsx` (will be removed via Change 22 anyway, but safe in interim).
22. **Contact page redesign** — `src/routes/contact.tsx`: Do NOT remove the current "Get In Touch" section layout or design on the contact page. Keep the contact page EXACTLY as it is — same layout, same left/right split, same right side cards, same map, same CTA banner, everything. ONLY replace the form fields on the LEFT side with the Book Appointment form fields from the navbar dropdown. Replace current form fields with: - Full Name (required) - Phone (required) - Email (optional) - Preferred Date (date picker, min: tomorrow, max: 3 months ahead, Sundays disabled) - Preferred Time (select dropdown: Morning 8am-11am | Afternoon 11am-2pm | Evening 2pm-5pm) - Service Interested In (optional select: IVF Treatment | ICSI Procedure | Embryo Freezing | Genetic Testing (PGT) | Donor Egg Programme | Infertility Diagnosis | General Consultation | Other) - Message (textarea, optional) Submit button: Text: "Confirm" Background: #B5005F Hover: #8C0049 Full width, pill shape, white text On submit: Insert into appointments table Show success message: "Thank you! Your appointment request has been received. We will confirm via phone within 24 hours." Clear the form Keep everything else on the contact page exactly as it currently is: - Same section heading style - Same left panel layout and width - Same right side contact info cards - Same map section - Same CTA banner - Same page hero banner - Same background colors - Same spacing and padding Do not change any other page or any other part of the contact page.

## CMS / data changes

12. **FAQ categories** — add Gynecology, Fertility, Radiology to:
  - `src/routes/faqs.tsx` filter pills list
  - `src/routes/admin.faqs.index.tsx` category dropdown
   No DB change needed (category is free text).
13. **Gallery photo/video** — migration: add `media_type text default 'photo'`, `video_url text` to `gallery_items` (already has `thumbnail`).
  - `src/routes/admin.gallery.index.tsx`: add Media Type toggle, Video URL field, thumbnail upload when video.
  - `src/routes/gallery.tsx`: render thumbnail with centered white play button overlay for videos; clicking opens modal with embedded YouTube/Vimeo iframe or HTML5 `<video>` (reuse `video-modal.tsx` pattern, extend to accept mp4).

## Change 6 — Careers system (largest piece)

**Migration** (`supabase/migrations/...careers.sql`):

- Create `career_listings` and `career_applications` tables with the columns specified.
- Enable RLS:
  - `career_listings`: public SELECT where `is_active = true`; admin all CRUD.
  - `career_applications`: anyone INSERT; admin SELECT/UPDATE/DELETE.
- Validation trigger for `career_applications.status` ∈ allowed set.
- Create private storage bucket `resumes`. Policies: anon INSERT into `resumes` (size/type checked client-side); admin SELECT.
- Add `updated_at` trigger reusing `touch_updated_at`.

**Frontend route** `src/routes/careers.tsx`:

- PageLayout with hero "Join Our Team" + breadcrumb.
- Section 1: 3 "Why Work With Us" cards on `#FFF1F7`.
- Section 2: fetch active listings (server fn) → cards with chips, Apply Now button. Empty state shows general application CTA.
- Section 3: Application modal (Dialog) with form, drag-and-drop resume upload (5 MB cap, pdf/doc/docx) → upload to `resumes` bucket with random path → insert row.
- Standard CTA banner at bottom.

**Footer link** — add Careers between Blog and Contact in `quickLinks`.

**Admin** `src/routes/admin.careers.index.tsx`:

- Tabs: Listings | Applications.
- Listings: table + editor dialog (TipTap for description/requirements, date picker for deadline, active toggle).
- Applications: filterable table, inline status dropdown with color badges, View Resume (signed URL via server fn since bucket is private), mailto link, side panel with full details. Realtime subscribe to `career_applications` for new-application badge.

**Sidebar** — add "💼 Careers" item to `src/components/admin/admin-shell.tsx`.

## Order of operations

1. Run careers + gallery migration (one combined migration).
2. Apply all frontend file edits in parallel.
3. Create new files: `src/routes/careers.tsx`, `src/routes/admin.careers.index.tsx`.
4. Verify build.

## Open questions

- **Change 20**: should the morphing rose/gold blobs in the CTA banner be removed entirely, or kept as soft white blobs over the new pink gradient? I'll default to removing them for a clean solid gradient unless you say otherwise.
- **Change 4**: confirm removing the Miracles tab from the admin homepage editor is OK (since the component is deleted). I'll remove it.