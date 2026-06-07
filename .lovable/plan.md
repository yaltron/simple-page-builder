## Issue
On mobile, the doctor card in `src/components/doctors-carousel.tsx` (lines 117–203) is rendered as a `motion.div` with `width: 85vw` + `margin: 0 auto`. Because the parent `<section>` has padding and the draggable `motion.div` carries inline transforms, it visually anchors to the left instead of centering.

## Fix
Only the mobile branch (`if (isMobile)`) of `src/components/doctors-carousel.tsx`:

1. Wrap the draggable card in a centering flex container: `display: flex; justifyContent: center; width: 100%`.
2. Change the card itself from `width: 85vw; margin: 0 auto` to `width: 100%; maxWidth: 360px` so it stretches up to a comfortable max and always centers within the viewport regardless of section padding or framer-motion transforms.
3. Also center the arrows row and dots row (already centered) — leave as-is.

No other changes — no design tokens, colors, sizes, or animations touched.