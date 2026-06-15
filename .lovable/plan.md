## Goal
Replace the current logo with the newly uploaded `logo.png` everywhere it appears, without changing any displayed sizes.

## Changes
1. Upload `user-uploads://logo.png` to the CDN via `lovable-assets`, producing `src/assets/logo.png.asset.json`.
2. Update the two imports that currently point at `@/assets/logo-trimmed.png` to use the new asset URL:
   - `src/components/navbar.tsx` (desktop header logo + mobile drawer logo)
   - `src/components/footer.tsx` (footer logo)
3. Leave the old `logo-trimmed.png` asset file in place (no deletion) to avoid breaking any other reference.

## Sizes preserved exactly (unchanged)
- Navbar `<img>`: `className="nav-logo h-[52px] sm:h-[64px] md:h-[75px] w-auto object-contain block"` + scroll scale 0.88.
- Mobile drawer `<img>`: inline `width: 130`.
- Footer `<img>`: `className="footer-logo"`.
- CSS overrides in `src/styles.css` (`.nav-logo` 140px/120px, `.footer-root .footer-logo` 160px) remain untouched.

No other files, components, layout, spacing, or styling change.