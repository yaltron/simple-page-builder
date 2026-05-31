## Plan

1. Repair the homepage runtime error that is causing the preview 500 so the current UI can render again.
2. Re-check the active homepage doctor card component in the rendered app and confirm it shows only **Consult Now** and **View Profile**.
3. If any old button still appears after the runtime is fixed, trace the actual rendered doctor-card path and remove the stale button from that active component only.
4. Clean up any leftover unused doctor-card code related to the removed callback action so the homepage stays consistent.

## Expected outcome

- The homepage preview loads normally.
- Doctor cards show exactly two actions: **Consult Now** and **View Profile**.
- No stale **Request Callback** button remains anywhere on the active homepage card UI.

## Technical details

- The current `src/components/doctors-carousel.tsx` already contains only the two requested buttons.
- `src/routes/index.tsx` is rendering `DoctorsCarousel`, so the main blocker appears to be the preview/runtime failure rather than the card markup itself.
- I’ll validate the live rendered result after fixing the runtime before considering the change complete.