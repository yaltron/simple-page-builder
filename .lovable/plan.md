## Scope

Rebuild the admin sidebar with expandable groups + nested routes, applying your design rules. Editor forms, fields, save logic, and Supabase queries are untouched — I only extract them into reusable components and wrap them in new route files. Submenu items with no existing editor are omitted entirely (per your answer).

## Sidebar (rewrite `src/components/admin/admin-shell.tsx`)

Replace the flat `navItems` list with a nested model:

```
Dashboard            → /admin
Homepage (expand)
  Hero Section       → /admin/homepage/hero
  Who We Are         → /admin/homepage/who-we-are
  Services           → /admin/homepage/services
  How It Works       → /admin/homepage/how-it-works
  When To Visit      → /admin/homepage/when-to-visit
  Our Doctors        → /admin/homepage/doctors-heading
  Moments Gallery    → /admin/homepage/moments-gallery
  CTA Banner         → /admin/homepage/cta-banner
About Us (expand)
  Our Story          → /admin/about/our-story
  Mission & Vision   → /admin/about/mission-vision
  Our Values         → /admin/about/values
Appointments         → /admin/appointments  (red badge preserved)
Blog Posts (expand)
  All Posts          → /admin/blog
  Add New Post       → /admin/blog/new
Our Team             → /admin/team
Services             → /admin/services
FAQs                 → /admin/faqs
Gallery              → /admin/gallery
Testimonials         → /admin/testimonials
Popup Banners        → /admin/popup-banners
Career (expand)
  Job Listings       → /admin/career/listings
  Applications       → /admin/career/applications
Logout               (action)
```

Omitted (no existing editor, per your choice): Why Choose Us, Testimonials heading, Blog Section heading, FAQ Section heading, About CTA Banner, all Site Settings sub-pages, Blog Categories.

Sidebar behavior + visuals exactly per your spec:
- Parent: 12/16 padding, 14px/600, white@85%, flex-between, 10px radius, hover bg `rgba(255,255,255,0.08)`, expanded bg `rgba(230,0,126,0.15)` + white + 3px left border `#E6007E`. Right chevron 12px, rotates 180° on expand (0.25s).
- Submenu container: `overflow:hidden`, `max-height` 0→500px with 0.3s transition, 4px bottom margin when open.
- Submenu item: 9/16/9/44 padding, 13px/500, white@60%, 8px radius. Hover → white + bg @6%. Active (current route) → `#F48FB1`, weight 600, bg `rgba(230,0,126,0.10)`.
- Divider: 1px `rgba(255,255,255,0.06)` with 8/12 margin between groups.
- Behavior: only one parent open at a time; on mount, auto-expand the parent containing the active route; persist the open key in `sessionStorage` under `admin-sidebar-open`. Active detection uses `useRouterState` pathname matching (longest prefix for nested routes).

## Editor extraction (no logic changes)

Pull editors out of `src/routes/admin.homepage.index.tsx` (884 lines) into a new file `src/components/admin/homepage-editors.tsx` exporting each as a standalone component. The existing helpers (`useSection`, `SectionCard`, `Field`, `*_DEFAULTS`, slot helpers) move with them. Each component renders only one `<SectionCard>` (or the existing multi-card group for that section). New exports:

- `HeroEditor` (existing)
- `WhoWeAreEditor` (the Storytelling Gallery card from SectionsEditor)
- `ServicesHeadingEditor` (services_heading card)
- `ProcessStepsEditor` (process card)
- `WhenToVisitEditor` (when_to_visit card)
- `DoctorsHeadingEditor` (doctors_heading card)
- `CTABannerEditor` (cta_banner card)
- `MomentsGalleryEditor` (already its own component — re-export)

About editors extracted to `src/components/admin/about-editors.tsx`:
- `StoryEditor`, `MissionVisionEditor`, `ValuesEditor` (split from current `AboutEditor`).

Careers split: extract `JobListings` and `Applications` from `src/routes/admin.careers.index.tsx` into `src/components/admin/career/{job-listings,applications}.tsx`.

## New route files (thin wrappers)

Each new route is ~12 lines: auth check + `AdminShell` with section-specific title/breadcrumb + the extracted editor.

Homepage (8 files): `src/routes/admin.homepage.{hero,who-we-are,services,how-it-works,when-to-visit,doctors-heading,moments-gallery,cta-banner}.tsx`

About (3 files): `src/routes/admin.about.{our-story,mission-vision,values}.tsx`

Career (2 files): `src/routes/admin.career.{listings,applications}.tsx`

Blog: `src/routes/admin.blog.new.tsx` → renders the existing `admin.blog.$id.tsx` editor component with `id="new"`.

Team: `src/routes/admin.team.tsx` → renders the existing doctors page component.
Popup Banners: `src/routes/admin.popup-banners.tsx` → renders the existing popup page component.

## Deletions / replacements

- Delete `src/routes/admin.homepage.index.tsx` (replaced by 8 split routes).
- Delete `src/routes/admin.careers.index.tsx` (replaced by 2 split routes).
- Delete `src/routes/admin.doctors.index.tsx` after its component is moved/imported into `admin.team.tsx`. Equivalent for `admin.popup.index.tsx` → `admin.popup-banners.tsx`.
- `src/routes/admin.index.tsx` (Dashboard) untouched.

`src/routeTree.gen.ts` regenerates automatically.

## What is NOT changing

Editor JSX, form fields, validation, image upload, Supabase tables/queries, frontend pages, design tokens, or any non-admin route. Appointment-badge realtime stays as-is.

## Open assumption

"Add New Post" → `/admin/blog/new` reuses the existing `admin.blog.$id.tsx` editor (it already handles the `id === "new"` case). If you'd rather keep the current `/admin/blog/$id` route only, I'll skip the `/admin/blog/new` file and have the sidebar link directly to `/admin/blog/$id` with `params={{ id: "new" }}`.
