## Fix 1 — Date placeholder in appointment popup (mobile)

Edit `src/components/appointment-auto-popup.tsx`:

- Wrap each form field in a `<div>` with a small label above; specifically add a visible `<label>` "Preferred Date" above the date input (font 13px / weight 700 / color #2D0A1E / mb 6px / block). Also add labels for the other required fields ("Full Name", "Phone", "Preferred Time") for consistency — minimal additions, no layout shake.
- On the date `<input type="date">` add inline styles: `WebkitAppearance: "none"`, `appearance: "none"`, `minHeight: 44`, `display: "block"`, `width: "100%"`, `position: "relative"`, `cursor: "pointer"` (keep existing fieldStyle: padding, border, radius, font, color, background).
- Ensure the modal scroll container keeps `maxHeight: "90vh"`, `overflowY: "auto"`, plus add `WebkitOverflowScrolling: "touch"`.

Add one small global CSS rule in `src/styles.css` (cannot inline pseudo-element styles):

```css
input[type="date"]::-webkit-date-and-time-value {
  text-align: left;
  padding-left: 4px;
}
input[type="date"]:focus { border-color: #E6007E; outline: none; }
```

## Fix 2 — Doctors section on mobile (≤640px)

Edit `src/components/doctors-carousel.tsx` + `src/styles.css`. Desktop layout untouched; add a dedicated mobile branch using a `useEffect` width check (`isMobile = window.innerWidth <= 640`).

- Section: padding `30px 16px 50px` on mobile (override the current `pt-2 pb-16`). Heading 1.4rem / center / px 16 / mb 24.
- When `isMobile`, render a simplified single-card carousel instead of the 2-column grid:
  - Card width `85vw`, centered, border-radius 16, overflow hidden, shadow `0 4px 20px rgba(230,0,126,0.10)`.
  - Photo 200px tall, full width, `object-fit: cover`, `object-position: top center`.
  - Card body padding 16: name 16px/700, specialty 12px, two CTA buttons stacked full-width (font 13 / padding 10) — "Consult Now" and "View Profile".
  - Hide the right details panel and the SideCard peeks on mobile.
- Navigation arrows below card: two 44×44 white circles with 1.5px `rgba(230,0,126,0.2)` border, color `#E6007E`, gap 16, mt 20, centered.
- Dot indicators below arrows: 8px circles, gap 8, active `#E6007E`, inactive `rgba(230,0,126,0.25)`, mt 12.
- Autoplay/keyboard/swipe behavior is preserved.

## Fix 3 — Replace em/en dash with hyphen

Run a project-wide replace across `src/**` (and the two SQL files under `supabase/migrations/` that contain them) of:
- `—` (U+2014) → `-`
- `–` (U+2013) → `-`
- `&mdash;` → `-`
- `&ndash;` → `-`

Implementation: a single `bun`/`node` script that walks the files listed by `rg -l` (already enumerated: ~32 files including `hero.tsx`, `footer.tsx`, `stories-testimonials.tsx`, `doctors-carousel.tsx`, route files, CMS defaults in `use-cms-content.ts`, migration seed SQL, and `styles.css` comments). Excludes `node_modules`, `routeTree.gen.ts`, `package-lock`/`bun.lock`. After replacement, spot-check changed files for syntax integrity (the dashes only appear in string literals, JSX text, and comments — safe to bulk replace).

## Out of scope

Desktop / tablet doctors layout, any other section, design tokens, business logic, server functions, schema changes.
