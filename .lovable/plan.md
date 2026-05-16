## Changes

### 1. Update quote text in `src/components/who-we-are.tsx`
Replace the blockquote text (keep gradient, italic, font, size, position unchanged):
- From: "Every couple is unique, and so is their journey to parenthood. At Shubhashree IVF, we transform hope into life."
- To: "The trust you have shown in us over the years is our greatest inspiration to turn hope into reality."

### 2. "Book Free Consultation" → "Book Consultation"
A repo-wide search (`rg "Book Free Consultation" src/`) returns **zero matches** — all CTAs already read "Book Consultation". No files need editing for this change. I'll confirm this in the result rather than touching anything.

### 3. Hero buttons — remove entrance animations, add simple hover
In `src/components/hero.tsx`, the two hero CTAs ("Book Consultation" and "Watch Our Story") are currently wrapped in:
- A `motion.div` with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5, delay: 0.3 }}`
- Each individual button is wrapped in `<Magnetic>` (adds magnetic hover follow effect)

Edits:
- Replace the outer `motion.div` wrapping the button row with a plain `<div className="flex flex-wrap gap-4">` — no initial/animate/transition.
- Remove the `<Magnetic>` wrapper around each button so buttons appear instantly and do not move on hover.
- Replace button 1 ("Book Consultation") classes so it uses solid `#E6007E` background with hover `#C4006A`, transitioning only `background-color 0.25s ease`. No scale, no gradient, no shadow change. Keep `asChild`, `size="lg"`, rounded-full, padding, text size, and the existing `Link`/`<a>` child unchanged.
- Replace button 2 ("Watch Our Story") classes so the outlined button gets hover background `rgba(255,255,255,0.15)` and a slightly brighter border on hover, transitioning `background 0.25s ease`. No scale change. Keep `Play` icon, label, size, shape, and click handler (`setVideoOpen(true)`) unchanged.

Nothing else on the hero (headline, subheadline, slideshow, paddings, layout) is touched. No other page or component is modified.

### Files changed
- `src/components/who-we-are.tsx` — quote text only
- `src/components/hero.tsx` — button row animation + hover styles only
