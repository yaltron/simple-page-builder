Change the mobile "Book Appointment" button in the navbar mobile drawer to use the existing CTA color token (#8B0F50). This will make it consistent with the desktop navbar buttons and match the requested color.

### Implementation
- File: `src/components/navbar.tsx`
- Target: The mobile drawer "Book Appointment" button at the bottom of the mobile menu (currently `background: COLORS.magenta`).
- Change: Replace `background: COLORS.magenta` with `background: COLORS.cta` on that button.

No other files or UI components will be touched.