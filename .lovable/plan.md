# Site Update Plan — 12 Changes

A mix of new features (doctor profile pages, trust-feature pages + CMS), database additions, and visual polish. Grouped by area below.

---

## 1. Database migrations

**New table `trust_features`** (Change 2):
- Columns: id, title, slug (unique), short_description, full_content, icon, icon_bg_color, page_heading, page_subtext, meta_title, meta_description, order_index, is_active, created_at, updated_at
- GRANTs: anon SELECT (active rows), authenticated full, service_role all
- RLS: public read where `is_active = true`; admin full via `has_role(auth.uid(),'admin')`
- Seed with the 3 existing cards (Personalised Plans, Emotional Support, Affordable Care)

**`doctors` table** (Change 1):
- Add `slug text unique` if missing
- Backfill slugs from existing names

**`homepage_content`** (Change 3):
- Add rows `faq_section.heading_color` and `testimonials.heading_color` (default `#C2185B`) — fits existing key/value content schema

---

## 2. New routes

- `src/routes/team.$doctorSlug.tsx` — doctor profile page (hero, breadcrumb, 2-col layout, chips, bio, expertise list, qualifications, book CTA). SEO meta from doctor record.
- `src/routes/why-us.$slug.tsx` — trust feature detail page (gradient hero, icon, breadcrumb, rich-text content, bottom CTA). SEO meta from feature.

Both: standard navbar + footer, loader fetches via public server fn using `supabaseAdmin`, with `errorComponent` + `notFoundComponent`.

---

## 3. CMS additions (admin)

- `src/routes/admin.homepage.why-choose-us.tsx` — list/create/edit/delete/reorder trust features with TipTap rich text for `full_content`, color picker for `icon_bg_color`, slug auto-gen, active toggle.
- Add nav link "Why Choose Us" under Homepage submenu in `admin-shell.tsx`.
- Add **Heading Color** picker to FAQ editor (`admin.faqs.index.tsx` or new homepage FAQ editor) and Testimonials editor (`admin.testimonials.index.tsx`) — stored in `homepage_content`.

---

## 4. Frontend component changes

**Navbar** (Change 5, 7): both pill buttons → `#8B0F50` bg / `#6D0A3E` hover; replace logo src + sharp-rendering CSS.

**Footer** (Change 4, 7, 8):
- Replace hardcoded services list with live fetch from `services` table (active, ordered) — all link to `/services`.
- Replace logo + sharp rendering.
- Change tagline paragraph from `justify` → `left`.

**Who We Are** (Change 6): quote text → solid `#8B0F50`, drop gradient/clip styles.

**Why Us cards** (Change 2 frontend): wrap each in `<Link to="/why-us/$slug">`, hover arrow, cursor-pointer. Fetch from `trust_features`.

**Doctors carousel + Team page** (Change 12, 1):
- Label "Meet our specialist" → "Meet our team" on homepage + `/team`.
- Specialty text color → `#8B0F50` on homepage cards, team grid, profile page.
- Add "View Profile" button → `/team/$doctorSlug` on each card.

**Process steps** (Change 11): step badge hover → bg `#8B0F50`, white text, border `#8B0F50`.

**Section headings + buttons** (Change 9): targeted swap of `#C2185B`/`#E6007E` → `#8B0F50` on the headings/buttons listed. Add a `--brand-deep: #8B0F50` token to `src/styles.css` and update components.

**Admin shell + admin login** (Change 7): logo swap + sharp rendering.

---

## 5. Cursor cleanup (Change 10)

- Delete `src/components/custom-cursor.tsx`.
- Remove its import/usage from `__root.tsx` (or wherever mounted).
- In `src/styles.css`: remove any `cursor: none` rules; add the default/pointer/text cursor rule blocks specified.

---

## 6. Logo upload (Change 7)

Logo file was not attached in this message. **I'll need the logo file before implementing Change 7.** Once provided, I'll upload via `lovable-assets create` and update navbar, footer, admin shell, admin login.

---

## Technical notes

- Trust-features detail page loader: public server fn using `supabaseAdmin` (public route, no bearer during SSR).
- Doctor detail page: same pattern.
- Slug generation: lowercase, hyphenate, strip "Dr." prefix; SQL `regexp_replace` for backfill.
- TipTap editor already exists (`src/components/admin/tiptap-editor.tsx`) — reuse for `full_content`.
- Color picker reuses `src/components/admin/color-picker.tsx`.
- All new public tables get GRANTs in same migration.

---

## Open question

Please attach the new logo file so I can complete Change 7. I'll proceed with all other 11 changes regardless — should I hold the whole batch until the logo is provided, or ship the other changes first and add the logo in a follow-up?
