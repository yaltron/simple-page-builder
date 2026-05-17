## Why the gap won't go away

The remaining "top gap" above the logo is not navbar padding. The logo asset (`src/assets/logo.png`, 800×800) has roughly 30% transparent space baked in at the top and another 33% at the bottom. The visible artwork only occupies the middle ~37% of the image, so no matter how small navbar padding gets, the image reserves empty space above and below the artwork.

## Fix (CSS-only, asset untouched)

In `src/components/navbar.tsx`, change only the logo `<img>` rendering:

- Wrap the `<img>` in a fixed-size box that visually crops the transparent margins:
  - Wrapper: `width: 180px`, `height: 44px`, `overflow: hidden`, `display: flex`, `alignItems: center`.
  - Image: `width: 180px`, `height: auto` (≈180px tall at native ratio), `marginTop: -68px` (shifts the artwork up so the top transparent strip is clipped), `display: block`.
- Keep navbar Row 1 at the existing `minHeight: 64`, `paddingTop: 4`, `paddingBottom: 4`.
- Fallback (`logoFailed`) branch stays unchanged.

Result: artwork sits centered in the navbar with small equal breathing room above and below, no large empty gap. No other files, components, or styles change.
