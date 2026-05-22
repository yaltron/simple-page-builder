# Small UI tweaks

## 1. Navbar CTAs — change color
File: `src/components/navbar.tsx`

- Change `COLORS.magenta` usage on "Book Appointment" and "Call Us" buttons to `#8B0F50` (both background and hover-out state). Update hover state to a slightly darker shade (`#6E0B40`) for the magentaDark equivalent.
- Scope: only the two desktop CTA buttons (and mobile equivalents if present). All other magenta usage (logo fallback, form focus, popovers) stays as-is.

## 2. Doctors section — reduce top padding & remove progress bar
File: `src/components/doctors-carousel.tsx`

- Section currently uses `pt-8 pb-16 lg:pb-24`. Reduce top padding to `pt-2 lg:pt-4` for a tighter top.
- Remove the progress bar block (lines ~242–249, the `<div className="mt-3 h-0.5 ...">` containing the gradient `motion.div`).
- Keep the autoplay logic intact (it still drives slide changes); just stop rendering the bar. Optionally drop the unused `progress` state to keep things tidy.

## 3. Footer — bigger link font + reuse header logo
File: `src/components/footer.tsx`

- Change `linkStyle.fontSize` from `14` to `15` (matching the navbar nav-link size, which renders at ~15px). Also bump `ColumnHeading` `fontSize` from `15` to `17` so headings remain visibly larger than links.
- Replace the import `import logo from "@/assets/logo.png"` with `import logo from "@/assets/logo-trimmed.png"` (the same file used in the header). Keep the `<img>` width 200 so footer layout doesn't shift.

## Out of scope
No other styling, copy, or layout changes.
