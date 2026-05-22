## Goal
Restructure the desktop layout of the "Moments That Matter" section (`src/components/who-we-are.tsx`) into a two-column split: image collage on the left (55%), text content on the right (45%). Keep the image collage internals, mobile layout, CMS data, and section background untouched.

## Changes (single file: `src/components/who-we-are.tsx`)

### 1. Desktop layout wrapper
Replace the current centered header + full-width collage block with a flex row (desktop only, `hidden md:flex`):

```text
[section bg unchanged]
  [inner container]
    [DESKTOP two-column flex]
      [LEFT 55%] ── existing floating collage (cluster + hero + SlotCards)
      [RIGHT 45%] ── new text column (title, quote, CTA)
    [MOBILE stack] ── unchanged masonry block, but reorder so text comes first then images
```

Wrapper styling on desktop column:
- `display:flex; flex-direction:row; align-items:center; justify-content:space-between; min-height:540px; padding:70px 8%; gap:60px`
- Keep section background and morphing blobs as-is.

### 2. Left column (55%) — collage
- Move the existing `<div className="relative w-full mx-auto hidden md:block" style={{ height: "clamp(480px, 44vw, 540px)" }}>` (lines 357–432) inside a new wrapper `<div style={{ width: '55%', position: 'relative' }}>`.
- Do NOT change the inner cluster: hero card, SlotCard positions (`SLOT_CONFIG` percentages), sizes, radii, shadows, floating animations all preserved.
- Wrap with a Framer Motion div: `initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: 'easeOut' }}`.

### 3. Right column (45%) — text
New motion column: `initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}`, flex column, justify-center, items-start.

Contents:
1. **Title** — `cms.heading` wrapped in curly quotes `“…”`. Playfair italic, weight 700, `fontSize: clamp(1.8rem, 3vw, 2.6rem)`, line-height 1.3, margin-bottom 20px. Apply existing `headingStyle` (gradient text fill) untouched.
2. **Quote** — `cms.subtitle` (defaults to "Where hope quietly becomes reality."). Playfair italic, 17px, color `#7A2050`, line-height 1.7, padding-left 18px, border-left `3px solid #E6007E`, margin-bottom 32px.
3. **CTA** — Reuse the existing pill anchor (`cms.cta_text` → `cms.cta_url`), same gradient bg, same arrow, same hover motion. Remove its centered wrapper here; render inline-flex left-aligned.

The original centered header block (lines 331–354) and bottom CTA block (lines 493–515) are removed from the desktop flow — they now live in the right column. Mobile keeps them as-is (see below).

### 4. Mobile (< 768px)
- Keep the existing mobile masonry block (lines 435–491) and the centered CTA (lines 493–515) intact, but reorder so the text (heading + subtitle + CTA) renders FIRST, then images, per spec. Wrap text in a `md:hidden` block at top; keep image masonry `md:hidden` below; CTA stays at bottom of mobile stack. Gap 40px between text and images.

### 5. Untouched
- `SLOT_CONFIG`, `DEFAULT_SLOTS`, `DEFAULTS`, `CardMedia`, `SlotCard`, `BG_MAP`, morphing blobs, section padding background, fade gradients, hero parallax (`heroY`, `heroScale`), CMS hook.

## Technical notes
- Use Tailwind arbitrary values + inline styles for the precise spec numbers (`min-h-[540px]`, `px-[8%] py-[70px]`, `gap-[60px]`, `w-[55%]`, `w-[45%]`).
- All animations remain Framer Motion; no new deps.
- Single-file edit, no schema/CMS changes.