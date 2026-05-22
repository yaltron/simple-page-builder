Apply the two requested changes to the "Moments That Matter" section. Reuse the existing `homepage_content` row with `section = 'who_we_are'` (this is the project's equivalent of the `homepage_sections` table you described). No DB migration is required — the row stores its content as JSON and gains a few new keys.

### Change 1 — Quote styling on the homepage

`src/components/who-we-are.tsx`, right column only:

- Replace the current `<h2>` quote with this stack, top-to-bottom:
  1. `Section Title` heading (h3, existing gradient heading style — pink→violet gradient text, same look as the page's other section titles).
  2. `Quote Text` paragraph styled exactly as specified:
     - `font-family: 'Playfair Display', serif`
     - `font-style: italic`
     - `font-weight: 400`
     - `font-size: 17px`
     - `line-height: 1.75`
     - Wrapped in curly quotes `"…"`
     - No `border-left` (there isn't one today; will stay removed).
     - Color follows the selected `quote_style`:
       - `gradient` (default) → `background-image: linear-gradient(135deg, #E6007E 0%, #C2006A 40%, #1BA0DC 100%)` + `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent` + `background-clip: text`
       - `pink` → solid `#E6007E`
       - `plum` → solid `#2D0A1E`
       - `rose` → solid `#C2185B`
  3. A pill `Button` rendered with `cta_text` and `cta_url` (pink background `#E6007E`, white text). Hidden if `cta_text` is empty.

- All other right-column behavior (framer motion entrance, width 40%, layout collapse when no images) stays exactly as it is.
- The left-side `MomentsGrid` and everything else in the file is untouched.

### Change 2 — CMS editing

Extend the existing `who_we_are` CMS section. No schema change; just additional JSON keys.

`src/components/who-we-are.tsx` `DEFAULTS`:
- Add `quote_text: "The trust you have shown in us over the years is our greatest inspiration to turn hope into reality."`
- Add `quote_style: "gradient"`
- `heading` already defaults to `"Moments That Matter"`; `cta_text` already defaults to `"Explore Stories"` (will append `" →"` only if missing? — no, leave the value verbatim and let the editor own it; default stays `"Explore Stories"`).
- `cta_url` already defaults to `/success-stories`.

`src/routes/admin.homepage.index.tsx`:
- Add the same two fields to `WHO_DEFAULTS` (`quote_text`, `quote_style`).
- Inside `SectionsEditor`, add a new dedicated card titled **"Moments That Matter — Right Side Content"** at the very top of the sections list (above the existing big "Storytelling Gallery — Moments That Matter" card). It writes back to the same `who_we_are` row via the same `who` `useSection` hook, so the existing big card and the new card share state and the new card's Save button persists both via `who.save`.
- The new card contains exactly five fields, in this order:
  1. **Section Title** — text input bound to `heading`.
  2. **Quote Text** — `<textarea rows={3}>` bound to `quote_text`.
  3. **Quote Text Style** — `<select>` bound to `quote_style` with four options, each rendered with a small inline color swatch on the left of the label:
     - `gradient` → "Pink → Blue Gradient" (swatch = the linear-gradient itself)
     - `pink` → "Solid Pink" (`#E6007E`)
     - `plum` → "Solid Dark Plum" (`#2D0A1E`)
     - `rose` → "Solid Rose" (`#C2185B`)
     Native `<option>` can't render swatches, so render a small swatch row above the select that previews the currently selected style; the `<select>` itself uses plain labels.
  4. **Button Text** — text input bound to `cta_text`.
  5. **Button URL** — text input bound to `cta_url`.
- Save button uses the card's pink background `#E6007E` and toasts `"✅ Moments section updated"` on success (override the generic "Saved" toast for this card only by calling `who.save` then `toast.success` on resolution — implemented by wrapping the save handler locally inside the card).

Nothing else in the admin (other section cards, Moments Gallery tab, Hero, About) or on the frontend changes.

### Files touched

- `src/components/who-we-are.tsx` — type + defaults + right-column JSX.
- `src/routes/admin.homepage.index.tsx` — `WHO_DEFAULTS` keys + one new `SectionCard` at the top of `SectionsEditor`.

No migrations, no new packages, no other component edits.
