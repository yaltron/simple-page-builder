## Issue

The fixed navbar is built as two stacked rows (Row 1: logo + CTAs, Row 2: nav links). Each row sets its **own** translucent pink background + `backdrop-filter: blur(16px)` independently. When the page scrolls and content passes behind the navbar, each row blurs the pixels behind it separately, producing a visible horizontal seam between the two rows — the "cut in the middle" you're seeing.

## Fix

Move the background color and `backdrop-filter` from the two inner row `<div>`s up to the parent `motion.header` so the whole navbar is a single translucent blurred surface with no internal seam.

### Changes in `src/components/navbar.tsx`

1. **`motion.header` style** (around line 218): add `background` and `backdropFilter` that switch on `isScrolled` (same values currently used by the rows), and include them in the `transition` string.

2. **Row 1 wrapper `<div>`** (around line 228): remove `background`, `backdropFilter`, `WebkitBackdropFilter`. Keep `height` and its transition.

3. **Row 2 wrapper `<div>`** (around line 435): remove `background`, `backdropFilter`, `WebkitBackdropFilter`. Keep `height` / `paddingBottom`.

No changes to layout, colors, link styles, buttons, spacer, mobile drawer, or anything else.
