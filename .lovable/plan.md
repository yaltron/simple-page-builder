## Mobile Doctor Card Redesign

Update only the mobile branch in `src/components/doctors-carousel.tsx` (the `if (isMobile)` block, ~lines 88-237). Desktop view, carousel logic, swipe, autoplay, arrows, and dots remain unchanged.

### Changes to the mobile card

1. **Image**
   - Full card width, taller aspect ratio (4:5).
   - Replace fixed `height: 200` with `aspectRatio: "4/5"`, `width: "100%"`, `objectFit: "cover"`, `objectPosition: "top center"`.

2. **Name + designation overlay (laptop-style glass label)**
   - Remove the separate text block currently below the image.
   - Position an absolute overlay inside the image container at the bottom (`inset-x` with small inset, `bottom: 12px`).
   - Semi-transparent white background (`rgba(255,255,255,0.55)`), `backdropFilter: blur(12px)`, rounded `16px`, subtle border `1px solid rgba(255,255,255,0.6)`, soft shadow.
   - Name: bold, ~16–17px, color `#2D0A1E` (plum), truncated.
   - Designation: ~11px, uppercase, letter-spacing, color `#C2185B` (brand magenta), `fontWeight: 600`, truncated.

3. **Buttons row**
   - Move outside the image, directly below it with minimal gap (~10–12px).
   - `display: flex`, `gap: 10px`, both buttons `flex: 1` for equal width.
   - "Consult Now": keep filled gradient pink/magenta style.
   - "View Profile": keep white background + outlined style.
   - Reduce padding slightly so both fit comfortably on small screens.

4. **Card container**
   - Keep rounded `16px`, white background, existing shadow.
   - Remove inner `padding: 16` block that wrapped name/designation/buttons — buttons now sit just below the card image with no extra whitespace. The buttons row sits outside the white card (or in a tight `padding: 10px 10px 12px` strip) so the image goes edge-to-edge.

### Preserved (no changes)

- Drag/swipe handler (`onDragEnd`, `drag="x"`, `dragConstraints`, `dragElastic`).
- `AnimatePresence` slide transition between doctors.
- Prev/Next arrow buttons and dot indicators below the card.
- Autoplay, pause-on-hover, keyboard nav, CMS heading.
- Desktop layout (entire non-mobile JSX) untouched.
- No changes to data fetching, routes, or other components.

### Files touched
- `src/components/doctors-carousel.tsx` (mobile branch only)
