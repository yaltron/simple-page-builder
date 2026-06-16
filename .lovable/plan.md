# Update "Our Story" image layout on About page

## Scope
Only `src/routes/about.tsx` — the right-side image collage in the Our Story section. No text, no other sections, no other pages.

## CMS
The Story CMS editor (`src/components/admin/cms-editors.tsx` → `StoryEditor`) already supports up to 3 images with URL + alt text and add/remove/reorder. No changes needed there — admin can already upload Image 1, 2, and 3.

## Layout change in `src/routes/about.tsx`

Replace the current right-column block (lines ~92–118) with a new flex layout:

- Outer container: `display:flex; flex-direction:row; gap:16px; align-items:stretch; width:100%` (it already sits in the right grid column, so it fills that column).
- Left side (`width:45%`, flex column, gap 16px):
  - Image 1 (`images[0]`): 100% × 220px, object-cover, radius 16px, shadow `0 8px 30px rgba(0,0,0,0.10)`
  - Image 2 (`images[1]`): same styling
- Right side (`width:52%`):
  - Image 3 (`images[2]`): 100% × 460px, object-cover, object-position top center, radius 16px, same shadow

## Responsive (<768px)
Use a media query (inline `<style>` block scoped via a unique class, e.g. `story-collage`) to switch the outer flex to `flex-direction:column`, make both sides `width:100%`, and force the tall right image to `height:220px`.

## Preserved
- `motion.div` wrapper + animation
- Left column text (Our Story heading + paragraphs)
- Grid `lg:grid-cols-2` parent
- Image source resolution via `resolveImage()` and CMS data via `useAboutSection`
- All other sections (Mission/Vision, Why Choose Us, Values, CTA)
