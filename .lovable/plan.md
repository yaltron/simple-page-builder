## Goal

The Subhashree IVF site currently runs on Next.js, which Lovable's preview and publish pipeline does not support. Port the entire site to TanStack Start + Vite (Lovable's native stack) while preserving all visuals, content, components, and animations. After this, the Lovable preview will display the site and the Publish button will work.

## What changes (high level)

- **Framework swap**: Next.js → TanStack Start + Vite. Remove `app/`, `next.config.mjs`, `next-env.d.ts`, Next-specific deps; add Vite + TanStack Start scaffold under `src/`.
- **Move every component** from `components/` → `src/components/` with the same filenames and shadcn/ui set under `src/components/ui/`. Move `hooks/` → `src/hooks/` and `lib/` → `src/lib/`.
- **Replace Next-only APIs** in component files:
  - `import Link from "next/link"` → `import { Link } from "@tanstack/react-router"`, with `href` → `to` for in-app links and plain `<a>` for hash anchors and `tel:` / `mailto:` links.
  - Remove all `"use client"` directives (no-op in Vite, but would clutter files).
  - Remove `next/font` (Playfair Display, Nunito) and load the same fonts via Google Fonts `<link>` in the root document head.
  - Replace `@vercel/analytics` import (drop it; not needed for Lovable).
- **Routing**: Single landing page (`/`) plus a 404. Internal nav uses hash anchors (`#about`, `#services`, etc.) since the existing site is intentionally a one-page scrolling layout — the navbar and footer already use that pattern, so this is the appropriate exception to the "separate routes" rule. Hash anchors stay as plain `<a href="#...">`.
- **Styling**: Port `app/globals.css` to `src/styles.css`. Tailwind v4 already used; keep the same `@theme inline` token block, brand colors (rose/teal/gold/plum/cream), font variables, marquee animation, and custom scrollbar. Wire the Google Font CSS variables (`--font-playfair`, `--font-nunito`) into `:root` instead of via `next/font`.
- **Root layout**: Create `src/routes/__root.tsx` that renders the html shell with `<head>` containing title, description, theme-color, viewport, and the Google Fonts links. Body renders `<Outlet />` plus the global `FloatingButtons` component.
- **Home page**: Create `src/routes/index.tsx` that mirrors `app/page.tsx` — composing Navbar, Hero, WhoWeAre, Services, ProcessSteps, WhenToVisit, PartnerLogos, DoctorsCarousel, Stats, MiraclesGallery, Testimonials, FAQ, CTABanner, Footer in order.
- **404**: Add `notFoundComponent` on the root route (simple "page not found" panel linking back home).

## Files removed / replaced

```text
DELETE: app/, next.config.mjs, next-env.d.ts, styles/ (duplicate),
        tsconfig.tsbuildinfo, .next/
MOVE:   components/* → src/components/*
        hooks/*      → src/hooks/*
        lib/*        → src/lib/*
        public/*     → public/* (kept)
NEW:    src/router.tsx
        src/routes/__root.tsx
        src/routes/index.tsx
        src/styles.css
        vite.config.ts
        tsconfig.json (TanStack flavor with @/* path alias to ./src/*)
EDIT:   package.json — swap next/@vercel/analytics deps for
        @tanstack/react-start, @tanstack/react-router, vite,
        @vitejs/plugin-react, vinxi/start plugin
```

## Per-component edits

For every file under `components/` (15 components + ~60 ui components), the only edits are:
1. Strip `"use client"`.
2. Replace `next/link` Link with `@tanstack/react-router` Link, converting `href="..."` to `to="..."` for in-app routes; keep `<a>` for hash and external links.
3. Drop any `next/image` usage (Hero etc. already use plain `<img>` — confirmed).
4. Update `@/components/...` import paths (work as-is once `@/*` alias points to `./src/*`).

`ui/` shadcn files are framework-agnostic and need no changes beyond the path alias.

## Fonts

Replace `next/font/google` with two `<link rel="stylesheet">` tags in `__root.tsx` head:
- Playfair Display (400/600/700) bound to `--font-playfair`
- Nunito (400/500/600/700) bound to `--font-nunito`

`src/styles.css` keeps `--font-sans: var(--font-nunito)` and `--font-serif: var(--font-playfair)` so all `font-serif` / `font-sans` Tailwind utilities continue to work.

## Verification after porting

- Build succeeds with no missing imports.
- Lovable preview at `/` shows the IVF homepage instead of the "Publish or update" placeholder.
- Navbar scroll spy, mobile menu, hero animations, animated counters in Stats, doctors carousel, FAQ accordion, marquee partner logos, and floating buttons all work.
- Publish button becomes usable.

## Out of scope

- No content rewriting; copy stays as-is.
- No new pages or features.
- No backend / Lovable Cloud changes.
- Existing GitHub repo will receive these changes via Lovable's two-way sync — that's expected.

Approve this and I'll execute the port end-to-end.
