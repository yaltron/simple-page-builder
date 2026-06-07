# Tablet Responsive Pass (641px–1024px)

Scope: only the `641px ≤ width ≤ 1024px` range. Desktop (>1024px) and mobile (<641px) styles stay exactly as they are today.

## Approach

To keep the change surgical and reversible, I'll do almost all of this in **one place** — a new `@media (min-width: 641px) and (max-width: 1024px)` block appended to `src/styles.css`. This gives us:

- Zero risk to existing desktop/mobile rules (the media query is purely additive).
- A single audit point for the entire tablet pass.
- No need to refactor component internals or rewrite Tailwind class lists across ~30 files.

Where a component currently hardcodes inline styles that would beat a CSS class (e.g. `style={{ padding: "60px 8%" }}` in `footer.tsx`, fixed `width: 200` on the footer logo, hero inline padding), I'll add a stable hook class (e.g. `data-tablet="footer"` or a className like `footer-root`) on that element and target it from the same media block using attribute/class selectors. No layout/JS logic changes.

## What I'll touch

### 1. `src/styles.css` — add one tablet media block (the bulk of the work)

Inside `@media (min-width: 641px) and (max-width: 1024px) { … }`:

**Global**
- `html, body { overflow-x: hidden; }`
- `section { padding-left: 5%; padding-right: 5%; }` scoped via a `.section-tablet-pad` helper applied where needed (avoid hitting `<section>` inside admin/editor surfaces).
- Buttons (`.btn, [data-slot="button"]`) get `min-width: 130px; font-size: 13px; padding: 10px 20px;` — scoped so it doesn't hit icon-only buttons (`[data-icon-only]` opt-out).
- Inner-page hero banners: target `.page-hero` (already used in page-layout) → `height: 160px`, heading `1.8rem`.

**Navbar** (`src/components/navbar.tsx`)
- Row 1: logo `width: 140px`; CTA buttons padding `9px 16px`, font-size `13px`, gap `8px`.
- Row 2: nav links `font-size: 13px; padding: 0 8px;` container `padding: 0 3%; justify-content: space-evenly;`. Drop to `12px` via a second nested rule at ≤880px.

**Hero** (`src/components/hero.tsx`)
- Force side-by-side: left/right both `width: 50%`, container `padding: 40px 5%`.
- Heading `clamp(1.6rem, 3vw, 2.2rem)`, subtext + buttons `14px`.

**Who We Are** (`src/components/who-we-are.tsx`)
- Left `45%`, right `55%`, padding `50px 5%`, heading scaled `0.85`.

**Services / Why Us / Blog / Team / Success Stories / Gallery grids**
- 1024px = keep; at ≤900px switch the listed grids to `repeat(2, 1fr)`, gap `16px`, padding `50px 5%`.
- Team specifically: 3 cols at 1024, 2 cols at 768.
- Success Stories: 2 cols at 1024, 1 col at 768.
- Blog page: featured post height `240px`; preview section hides 3rd card at 768 OR enables horizontal scroll (I'll go with horizontal scroll so no content is lost).

**Process Steps / How It Works** (`src/components/process-steps.tsx`)
- Circles `90×90`, title `13px`, description `12px`, padding `50px 4%`.
- ≤820px: switch to `2×2` grid, hide the wave SVG, show simple dot connectors.

**When To Visit / Testimonials / Stories / Moments / Contact**
- Each gets its split ratios and padding per spec via the section's existing wrapper class.
- Moments: set CSS var `--numcolumns: 3`.

**Doctors Carousel** (`src/components/doctors-carousel.tsx`)
- Card width `calc(50% - 12px)`, photo `160px`, name `15px`, padding `50px 5%`. Carousel JS already drives `perView` — I'll add a tablet breakpoint to its existing responsive hook (small JS tweak, see below).

**FAQ / Filter tabs**
- `overflow-x: auto` on the tabs strip; padding `50px 5%`.

**CTA Banner** (`src/components/cta-banner.tsx`)
- Heading scaled `0.85`, padding `50px 5%`, buttons `flex-wrap` so they stack only if they don't fit.

**Footer** (`src/components/footer.tsx`)
- Override the inline `padding: 60px 8%` by adding a `.footer-root` class with `!important` for tablet only: `padding: 40px 5%`.
- Grid → `repeat(2, 1fr)`, brand column `grid-column: 1 / -1`, contact column `grid-column: 1 / -1`, `gap: 30px`.

**About / Services / Team / Success Stories / Blog / Gallery / Contact / Careers pages**
- Each route's main wrappers get `padding: 50px 5%`; per-section grid overrides as listed in the spec.
- About: Mission & Vision cards stack (full width each); values grid 2 cols.
- Services page: 2 col grid; "Which Stage" → 2+2+1 centered.
- Contact: left 55% / right 45%, info cards stack, map full width 280px.
- Career: Why Work With Us 2+1, job listings single column.

### 2. Minimal component touch-ups (only where CSS alone can't reach)

- `src/components/navbar.tsx` — add stable hook classes (`navbar-row1`, `navbar-row2`, `navbar-cta`) if not already present. No structural change.
- `src/components/hero.tsx` — add `hero-root`, `hero-left`, `hero-right` classes on the existing wrappers.
- `src/components/footer.tsx` — add `footer-root` class on the outer footer + `footer-grid` on the columns grid.
- `src/components/doctors-carousel.tsx` — extend the existing `perView` resize hook with `else if (w <= 1024) setPerView(2)` so the carousel actually shows 2 cards on tablet (CSS alone can't change the JS-driven slide width).
- `src/components/process-steps.tsx` — add a `process-grid` class on the steps container and a `process-wave` class on the SVG so the media block can hide it and re-grid at ≤820px.
- `src/components/cta-banner.tsx` — add `cta-root` and `cta-buttons` classes.

No prop changes, no logic changes, no copy changes, no design-token changes.

### 3. Out of scope (will not touch)

- Any code path above 1024px or below 641px.
- Admin routes (`/admin/*`) — tablet rules will be scoped to public-site wrappers only.
- Supabase, routing, server functions, content, design tokens.

## Verification

After the edits:
1. Resize the preview to 1024, 900, 820, and 768 and walk through each page listed in the spec.
2. Confirm no horizontal scrollbar appears at any of those widths.
3. Confirm desktop (1280) and mobile (390) screenshots are pixel-identical to current state for the homepage, About, Services, Team, Contact, and Footer.

## Open question

The spec lists a fallback for two sections ("at 768px if too cramped, switch to 2×2 / hide wave" for How It Works, and "hide 3rd card OR horizontal scroll" for Blog preview). I'll go with **2×2 grid + hidden wave** for How It Works and **horizontal scroll** for Blog preview unless you'd rather I pick the other option for either.
