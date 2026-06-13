## Scope
Update only `GalleryCarousel` in `src/components/who-we-are.tsx`. Nothing else on the page changes — card sizes, images, radius, layout, right-side text, button, blobs, and surrounding markup stay as-is.

## Changes to GalleryCarousel

### Track (slides container)
- `display: flex`, `will-change: transform`, `backface-visibility: hidden` (+ `-webkit-`), `perspective: 1000px` (+ `-webkit-`)
- `transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)` on the track
- Keep current `translateX(-index * slidePct%)` math

### Each card
- Add per-card wrapper styles: `transform: translateZ(0)` (+ `-webkit-`), `transition: opacity 0.4s ease, transform 0.4s ease`
- Active (visible) cards: `opacity: 1`, `scale(1)`
- Non-active cards (outside the current window of `perView`): `opacity: 0.6`, `scale(0.97)`
- Keep existing image, border, shadow, aspect ratio, radius, hover zoom

### Auto-advance
- Replace `setInterval` with a `requestAnimationFrame` loop driven by `performance.now()`, advancing every 4000 ms
- Pause flag toggled by `onMouseEnter` / `onMouseLeave` on the carousel wrapper
- On mouse leave, wait 1 s before resuming (setTimeout cleared on re-enter / unmount)
- Cancel rAF and clear timeout on unmount

### Navigation dots
- Container: `display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 20px`
- Each dot: 8×8, `border-radius: 50%`, background `rgba(230,0,126,0.25)`, `transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`
- Active dot: `width: 28px`, `border-radius: 4px`, background `#E6007E`, `box-shadow: 0 2px 8px rgba(230,0,126,0.4)`
- Inactive returns to base via the same transition

## Not touched
Right-side quote, Explore Stories button, section background, blobs, framer-motion wrappers, CMS logic, perView responsive logic, image markup, card aspect/shadow/radius, or any other section/page.
