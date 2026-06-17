## Remove hero/banner from Why Families Trust Us detail pages

### Goal
On `/why-us/:slug` pages, remove the top hero banner section (page heading + breadcrumb) so the page starts directly with the icon circle after the navbar.

### Approach
1. **In `src/routes/why-us.$slug.tsx`** — stop using the shared `PageLayout` component, which unconditionally renders `PageHero`.
2. **Compose the page directly** using:
   - `<Navbar />`
   - `<ClientOnly>` and `<main>` wrapper (matching `PageLayout` behavior)
   - The existing `<motion.div>` fade-in wrapper
   - The existing content sections: icon circle, heading, subtext, full content, CTA banner
   - `<Footer />`
3. **Preserve all existing behavior**: loading state, not-found state, SEO head, animations, colors, and layout.
4. **No changes** to `src/components/page-layout.tsx` or any other file.

### What the page will look like after
```
Navbar
├── Icon circle
├── Page heading (e.g. "Advanced Lab Technology...")
├── Subtext
├── Full content
├── CTA banner
Footer
```

The large gradient hero section with the duplicate title and breadcrumb is removed entirely.