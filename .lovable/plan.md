## Fixes

### 1. Moments gallery — seamless infinite loop
`src/components/who-we-are.tsx` `GalleryCarousel`: switch from `index % pages` (which visibly rewinds from last→first) to the clone-slides technique.
- Render `items.concat(items.slice(0, perView))` as the track (append `perView` clones of the first items to the end).
- Track index goes 0 → `items.length` (one past the real end). At the boundary, after the transition ends, disable transition and instantly reset index to 0, then re-enable — invisible seam.
- Autoplay keeps ticking `index + 1` unconditionally; dots keep `pages` count but visually map `index % items.length`.

### 2. NMC number on doctor cards
- **DB migration** on `doctors`: add `nmc_number text`, `nmc_color text default '#8B0F50'`.
- **Admin editor** (`src/routes/admin.team.tsx`): add "NMC Registration Number" text input + "NMC Number Color" `<ColorPicker/>` field, default `#8B0F50`. Persist both.
- **Types** (`src/lib/use-doctors.ts` `CMSDoctor`): add `nmc_number` and `nmc_color`.
- **Display** on homepage carousel active card + mobile card + team grid + doctor profile page: below qualifications, when `nmc_number` set render `NMC No: {nmc_number}` at 12px / 600 / `color: nmc_color || '#8B0F50'`, mt 4px.

### 3. Remove "Meet our team" chip
`src/components/doctors-carousel.tsx` (desktop section only): delete the pink pill `<div className="inline-flex ... uppercase text-rose-600"><Sparkles/> Meet our team</div>`. Keep the H2 heading. Remove now-unused `Sparkles` import.

### 4. Email lowercase
Replace `Shubhashreeivf@gmail.com` → `shubhashreeivf@gmail.com` in `src/routes/contact.tsx` (value string) and `src/routes/careers.tsx` (href + text). The footer already uses `subhashreeivfclinic@gmail.com` — untouched (not the target string).

### 5. Doctor cards fully clickable
- **Homepage carousel** (`doctors-carousel.tsx`): wrap the active card body (desktop + mobile) in `<Link to="/team/$doctorSlug" params={{doctorSlug: current.slug || ''}}>` with `cursor:pointer`. Keep existing "View Profile" button working; use `e.stopPropagation()` on the inner action buttons (Consult Now / View Profile) so their own nav still functions.
- **Team page** (`src/routes/team.index.tsx`): wrap each grid card in the same `<Link>`. Inner "View Profile" and "Book" links stay; add `onClick={(e)=>e.stopPropagation()}` on the inner Booking link to avoid double nav.

### 6. Logo crispness
Current `public/logo.png` is 781×312 — already ≥2× retina for our display width, so no re-upload needed.
- Add sibling `srcSet="/logo.png 2x"` on the img in `src/components/navbar.tsx` and `src/components/footer.tsx`.
- Navbar: `height: 44px, width:auto, objectFit:contain`. Footer: `height: 48px, width:auto, objectFit:contain`. Update the responsive overrides in `src/styles.css` (`.nav-logo`, `.footer-logo`) so `width:auto` isn't forced to a fixed px (keeps aspect ratio).
- Ensure `.crisp-logo` in `src/styles.css` contains: `image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges; -webkit-font-smoothing: antialiased; transform: translateZ(0); backface-visibility: hidden;`.

### 7. Doctor specialty text color → #8B0F50
Everywhere a doctor card renders specialty / qualifications / NMC:
- `doctors-carousel.tsx` desktop label (`.text-rose-600` → inline `#8B0F50`) and mobile label (already `#8B0F50` — verify).
- `src/routes/team.index.tsx` grid: title, qualifications, and years text → `#8B0F50`.
- `src/routes/team.$doctorSlug.tsx` profile: matching text set to `#8B0F50`.

### 8. Gallery WebP + lazy loading + skeleton
`src/routes/gallery.tsx`:
- Helper `getOptimizedUrl(url)` — for Supabase Storage URLs, rewrite `/storage/v1/object/public/` → `/storage/v1/render/image/public/` and append `?width=800&quality=75&format=webp` (this is the correct Supabase image-transform path). Apply to every gallery `<img src>` including lightbox thumbnails (keep full-res original in the open lightbox).
- Add `loading="lazy" decoding="async"` on all grid `<img>`.
- Grid container: `contentVisibility: 'auto', containIntrinsicSize: '300px'`.
- Skeleton: while `items` is loading OR per-image `onLoad` not fired, render a shimmer placeholder with the pink shimmer gradient + `@keyframes shimmer` (inject once via a `<style>` tag).

Gallery CMS uploader already runs `convertImageToWebp` (via `ImageUpload` component) so new uploads are already WebP — no change needed there.

### Not changing
Design, colors, layout, other components, other functionality. Domain/URL placeholders (`n.com`) already in code are out of scope for this request.
