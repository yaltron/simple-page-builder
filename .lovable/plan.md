The navbar logo on desktop is currently rendered at 40px tall (inline style in `navbar.tsx`), making the clinic name text too small to read clearly. The navbar row has a fixed `min-h-[64px]` on desktop with 12px total vertical padding, leaving ~52px of content height — so the logo can grow without increasing the navbar height.

### Change
- In `src/components/navbar.tsx`, update the logo `<img>` inline style: change `height: 40` → `height: 52`.
- At the logo’s ~2.5∶1 aspect ratio (781×312px file), the width becomes ~130px, so the existing `maxWidth: 160` does not constrain it — no change needed there.
- Leave the `logoScale` transform, navbar `min-height`, padding, CTA buttons, row 2 height, and all other styles untouched.

### Verification
- Desktop (>1024px): logo renders at 52px tall, clearly readable, navbar row stays at 64px minimum.
- Scrolled desktop: visual height is 52 × 0.88 ≈ 46px, still readable.
- Tablet CSS overrides remain unchanged — tablet already renders the logo larger via `width: 120–140px` rules.