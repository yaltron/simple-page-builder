## Goal

Update the "Moments That Matter" split section in `src/components/who-we-are.tsx`:

- Change desktop column widths from 55/45 to 60/40 (left images / right text).
- Replace right-column content with a single styled quote.

## Changes (single file: `src/components/who-we-are.tsx`)

### 1. Column widths

- Left collage wrapper: `w-[55%]` → `w-[60%]`.
- Right text column wrapper: `w-[45%]` → `w-[40%]`.
- Mobile stack untouched.

### 2. Right column content

Remove:

- Title `"Moments That Matter"` (curly-quoted heading using `cms.heading`).
- Subtitle `"Where hope quietly becomes reality."` (the bordered quote line).

Replace with a single text element:

> "The trust you have shown in us over the years is our greatest inspiration to turn hope into reality."

Styled identically to the previous "Moments That Matter" title:

- Playfair Display, italic, weight 700
- `fontSize: clamp(1.8rem, 3vw, 2.6rem)`, line-height 1.3
- Same gradient text fill (existing `headingStyle`)
- Wrapped in curly quotes `“…”`
- Keep the right-column Framer Motion slide-in (`x: 40 → 0`, 0.7s, delay 0.2s)

### 3. Mobile block

Apply the same content replacement in the mobile (`flex-col-reverse`) text block: remove title, subtitle, CTA; render only the new quote with the matching gradient-italic heading style (responsive size `clamp(1.6rem, 6vw, 2.2rem)`).

### Untouched

Image collage, animations, section background, blobs, CMS hook, all other sections.