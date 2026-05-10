## Plan — Fix hidden/cut-off text in "How It Works"

Scope: only `src/components/process-steps.tsx` and the `.step-circle` rules in `src/styles.css`. No other sections touched.

### 1. Section overflow + bottom padding
In `src/components/process-steps.tsx`, update the `<section id="process">`:
- Remove `overflow-hidden`
- Add explicit `overflow-visible`
- Add `pb-20` (80px bottom padding) on top of existing `py-20` (use `pt-20 pb-[80px] overflow-visible`)

### 2. Step container — fixed height, overflow visible
On the inner step content `<div>` (currently the one with `flex flex-col items-center transition-transform ...`):
- Add `min-h-[320px] relative overflow-visible w-full`
- Remove the group-hover lift (`group-hover:-translate-y-2`) from this container so text never moves
- Keep the desktop `translateY(lgOffset)` style

The outer `motion.div` keeps `group relative z-10` and gets `overflow-visible`.

### 3. Move hover lift to the circle only
Currently `.group:hover .step-circle` only does scale+shadow. Update so only the circle shifts up:
- In `src/styles.css`, change `.group:hover .step-circle` transform to `translateY(-8px) scale(1.10)` (keep double-ring + deep glow shadow, keep springy easing)
- Idle `.step-circle` keeps `transition: transform .3s, box-shadow .3s`
- Remove `group-hover:-translate-y-2` from the inner container (done in step 2) so title/description stay put

### 4. Keep title/description anchored
- Title `<motion.h3>` and description `<p>` stay where they are; no group-hover transforms on them besides the existing color change on title.
- Remove icon's `group-hover:-rotate-[8deg]` rotation? Keep — it stays inside the circle and doesn't affect layout. Keep icon scale/rotate as-is.

### 5. Verify
Re-read both files after edit to confirm: section has `overflow-visible pb-20`, inner step container has `min-h-[320px]` and no hover translate, and `.step-circle` hover applies `translateY(-8px) scale(1.10)`.

Out of scope: heading, background color, badges, icons, gradients, colors, arrival pulse animation, all other page sections.