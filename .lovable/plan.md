## Scope
Apply two targeted fixes to the right-side testimonial cards in `src/components/stories-testimonials.tsx` ("Stories of Hope & Happiness" section). No other files or sections change.

## Fix 1 — Remove unwanted gap between quote text and patient name
- Update the testimonial card container inside the `motion.div`:
  - Remove `h-full` (the card itself has no fixed/min-height)
  - Change to `flex flex-col gap-3 p-6 sm:p-8` (gap = 12px, padding = 24px)
- Stars row (`flex gap-1`): remove `mb-3`
- Quote text (`<p>`): keep `flex-1`, remove `mb-3`
- Patient name (`<p>`): add `mt-3 pt-3 border-t border-[rgba(230,0,126,0.10)]`
- Also remove the fixed-height `h-[340px] sm:h-[300px]` from the outer wrapper so the card sizes to its content and the `flex-1` text does not force a huge gap.

## Fix 2 — Fill star color
- Replace the current star rendering for the 5 rating stars with explicit solid pink fill.
- Pass inline styles `color: "#E6007E", fill: "#E6007E"` (or equivalent Tailwind `text-[#E6007E] fill-[#E6007E]`) so all 5 stars are fully filled pink, matching the brand.
- Keep star size, card border, background, quote icon, text content, and name styling exactly as-is.

## Not touched
Left-side image container, section background, heading, auto-advance timing, CMS data logic, or any other component/page.