## Root cause

The logo looks small and blurry because:
1. `srcSet={`${logo} 2x`}` tells the browser the file is a 2× asset, so it renders at half its intrinsic pixel size (softens the image).
2. `transform: scale(0.88)` on the navbar wrapper when scrolled shrinks it further.
3. `.crisp-logo` uses `image-rendering: crisp-edges`, which produces a pixelated/blurry result on anti-aliased PNG artwork.
4. Displayed height is only 44px (navbar) / 48px (footer) — user wants 56 / 60.

The file at `public/logo.png` (56 KB, original) is already the correct source — no re-upload or storage move needed. Keep `src="/logo.png"` with no query params.

## Changes

**`src/components/navbar.tsx`** (Logo block, ~lines 199–217)
- Remove `transform: scale(${logoScale})` from the `<Link>` wrapper style (keep the rest of the flex/alignment styles). Drop the now-unused `logoScale` variable.
- On the `<img>`:
  - Remove `srcSet`.
  - Replace inline style with: `{ height: 56, width: 'auto', maxWidth: 220, objectFit: 'contain', objectPosition: 'left center', display: 'block', imageRendering: 'auto', WebkitFontSmoothing: 'antialiased', transform: 'translateZ(0)', willChange: 'transform' }`.
  - Add `fetchPriority="high"` and `loading="eager"`.
  - Remove the `crisp-logo` class (keep `nav-logo` for CSS hook).

**`src/components/footer.tsx`** (~lines 91–103)
- On the `<img>`:
  - Remove `srcSet`.
  - Style: `{ height: 60, width: 'auto', maxWidth: 240, objectFit: 'contain', objectPosition: 'center', display: 'block', imageRendering: 'auto', WebkitFontSmoothing: 'antialiased', transform: 'translateZ(0)', willChange: 'transform' }`.
  - Add `fetchPriority="high"` and `loading="eager"`.
  - Remove the `crisp-logo` class.

**`src/styles.css`**
- Update `.nav-logo` rules (lines 421 and 553 in the responsive blocks) from `height: 44px` / `40px` to `height: 56px !important; width: auto !important; max-width: 220px !important;`.
- Update `.footer-root .footer-logo` (line 500) to `height: 60px !important; width: auto !important; max-width: 240px !important;`.
- Delete the `.crisp-logo` block (lines 606–613) — inline styles now handle rendering hints, and `crisp-edges` was the primary source of blur.

**No other files touched.** Navbar height, padding, layout, colors, and every other element stay exactly as they are. `public/logo.png` is left in place unchanged.
