## Fix 1 — Service detail page routing

The route file `src/routes/services.$slug.tsx` already exists, so TanStack Router handles `/services/:slug` automatically (no manual router registration is needed — this is TanStack Start, not react-router-dom).

The actual issues:
- `src/components/services.tsx` (homepage) uses an accordion `<button>` instead of navigating — clicking opens an inline panel rather than going to the detail page.
- Verify the slug-detail route correctly fetches by `slug` and redirects to `/services` if not found; adjust if needed.
- Backfill any missing `slug` values in the `services` table from `title` using the standard slugifier (`lowercase`, strip non-alphanumerics, hyphenate spaces). Run a migration `UPDATE services SET slug = ... WHERE slug IS NULL OR slug = ''`.
- Audit `src/routes/services.tsx`, `src/components/footer.tsx`, and any other "Learn More" buttons to ensure they use `<Link to="/services/$slug" params={{ slug: service.slug }}>` (TanStack syntax — NOT `react-router-dom` and NOT string interpolation).

## Fix 2 — Logo size +8px

- `src/components/navbar.tsx`: logo height 52 → 60, keep `width: auto`, add `maxWidth: 220`, keep `object-fit: contain`.
- `src/components/footer.tsx`: logo height 56 → 64, keep `width: auto`, add `maxWidth: 240`, keep `object-fit: contain`.
- No change to admin shell / login logos (not requested).

## Fix 3 — Homepage hero service cards become links

In `src/components/services.tsx`:
- Remove the accordion expand-on-click behavior (drop `openId` state, the toggle button, and the `AnimatePresence` expanded panel).
- Wrap each card with `<Link to="/services/$slug" params={{ slug: service.slug }} className="block group">` so the whole card navigates.
- Keep all existing card visuals (gradient bg, icon, title, short description, key-point pills, hover lift) exactly as-is.
- Add a "Learn More →" cue at the bottom of each card in `#8B0F50`, `opacity: 0` by default, `group-hover:opacity-100`, `transition: opacity 0.2s`.

## Notes

- Stack is TanStack Start. All `<Link>` usage stays on `@tanstack/react-router` with `to="/services/$slug"` + `params={{ slug }}`. The user's example uses `react-router-dom` syntax, which does not apply here — same behavior, correct API.
- No other pages, sections, or styles will be touched.
