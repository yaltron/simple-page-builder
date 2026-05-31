## Plan

I’ll resolve the mismatch between the homepage preview and the current doctor card code.

1. Refresh the preview/runtime so the homepage picks up the latest `DoctorsCarousel` component state.
2. Verify the homepage doctor cards show only these two actions:
   - `Consult Now`
   - `View Profile`
3. If `Request Callback` still appears after refresh, trace any duplicate or stale render path for the doctor card and remove it from the active homepage component.

## Technical details

- Homepage route: `src/routes/index.tsx`
- Active component: `src/components/doctors-carousel.tsx`
- Current source already contains only two buttons, so this is most likely a stale preview/render issue unless another render path is still active.