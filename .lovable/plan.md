## Goal
Fix the floating buttons scroll behaviour on mobile and tablet so only one button is visible at a time, toggling based on scroll direction.

## Scope
- Only `src/components/floating-buttons.tsx`
- No changes to button colours, sizes, positions, icons, links, animation styles, or any other part of the site.

## Changes
1. Track scroll direction using `useRef` for `lastScrollY` (avoid stale closure issues).
2. At `max-width: 1024px`:
   - Scroll DOWN → show WhatsApp button, hide Book Now button.
   - Scroll UP → show Book Now button, hide WhatsApp button.
3. Replace `framer-motion` (`AnimatePresence`, `motion.div`, `motion.a`) with CSS transitions (`opacity 0.3s ease, transform 0.3s ease`) for the toggle.
4. Both buttons use `z-50` so neither appears behind the other.
5. Visible state: `opacity: 1`, `transform: scale(1)`, `pointer-events: auto`.
6. Hidden state: `opacity: 0`, `transform: scale(0.8)`, `pointer-events: none`.
7. On desktop (`min-width: 1025px`): keep current behaviour unchanged — both buttons visible simultaneously (WhatsApp always shown, Book Now remains `lg:hidden`).