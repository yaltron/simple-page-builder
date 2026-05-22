## Change

In `src/components/page-layout.tsx`, update the `PageCTABanner` component's "Book Consultation" button:
- Change `style={{ background: BRAND.pink, color: "white" }}` to `style={{ background: "#B5005F", color: "white" }}`
- Optionally add `onMouseEnter`/`onMouseLeave` hover state to `#8C0049` (matching the navbar CTA hover pattern)

This component is used by multiple page routes, so the change applies to every page automatically.

No other changes.