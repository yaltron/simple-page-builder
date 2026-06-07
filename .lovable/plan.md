
## Fix 1 — Footer social links

`src/components/footer.tsx` already renders proper `<a>` tags with `target="_blank"`, `rel="noopener noreferrer"`, and full `https://` URLs (specific brand pages on facebook/instagram/youtube/tiktok). Audit pass only — confirm each entry has all three attributes; no functional change expected unless something is missing on re-read.

## Fix 2 — Display rename "Careers" → "Career"

Change display text only; keep the URL `/careers` and route file names untouched.

- `src/routes/careers.tsx`: `head.meta` title + og:title → "Career — Subhashree IVF"; `<PageLayout title="Careers" breadcrumb="Careers">` → `title="Career" breadcrumb="Career"`.
- `src/components/footer.tsx`: `quickLinks` entry `{ name: "Careers", to: "/careers" }` → `name: "Career"`.
- `src/components/admin/admin-shell.tsx`: navItems entry label `"Careers"` → `"Career"`.
- `src/routes/admin.careers.index.tsx`: any `title=`/`breadcrumb=`/heading text "Careers" → "Career" (verify on edit).
- Leave route paths, file names, table names, and the `/admin/careers` URL unchanged.

## Fix 3 — Hero image flash

Edit `src/components/hero.tsx`:

1. Remove hardcoded `DEFAULT_HERO.slides` Unsplash array (use `[]`); keep other DEFAULT_HERO text fields as fallbacks.
2. Pass actual CMS slides only: `<HeroSlideshow slides={hero.slides || []} />` — no fallback to defaults.
3. Rewrite `HeroSlideshow`:
   - While `slides.length === 0`: render the framed container with the same hero gradient (`linear-gradient(135deg, #FFE4EF 0%, #FFF5F9 50%, #EAF7FD 100%)`) and no `<img>`.
   - Preload each slide via `new Image()` + `onload`; track ready URLs in state. Only render an `<img>` once its URL is preloaded; fade in with `opacity 0 → 1, transition: opacity 0.5s ease`.
   - If `slides.length === 1`: render a single static `<img>`, disable the `setInterval`, and hide the dot indicators.
   - Keep dots only when `slides.length > 1`.

## Fix 4 — Auto-convert all CMS image uploads to WebP

The helper already exists at `src/lib/image-to-webp.ts` (`convertImageToWebp`) and is already used by `src/components/admin/image-upload.tsx` and `src/components/admin/moments-gallery-editor.tsx`. Extend coverage to the remaining upload paths:

- `src/routes/admin.blog.$id.tsx` (featured image upload at line ~77): convert file → webp before `storage.from('blog-images').upload(...)`; use the webp file's name and `contentType: 'image/webp'`.
- `src/components/admin/tiptap-editor.tsx` (inline blog image upload at line ~80): same conversion before upload.
- Audit `src/routes/admin.gallery.index.tsx` upload UI; if it uses `ImageUpload` it is already covered, otherwise apply the same conversion before `storage.from('site-media').upload(...)`.
- Skip non-image uploads (CV/resume PDFs in `careers.tsx`).

Helper text: in `src/components/admin/image-upload.tsx` and any other upload dropzones, append "(auto-converted to WebP)" to the accepted-formats hint where such hint text exists. (`ImageUpload` currently has no visible accepted-formats hint — add a small line under the dropzone reading "JPG, PNG, WEBP (auto-converted to WebP)".)

Note on the requested `?format=webp&quality=80` URL transform: Lovable Cloud's public storage URLs don't honor that query string, so appending it would have no effect. Conversion at upload time (above) gives the same outcome (every new asset is served as WebP). Existing non-WebP assets stay as-is unless re-uploaded.

## Out of scope

No design/layout changes, no route URL changes, no edits to `src/integrations/supabase/*` or `src/routeTree.gen.ts`.
