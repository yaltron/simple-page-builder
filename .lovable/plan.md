# Update nav CTA color and reduce doctors section gap

## Changes

### 1. Navbar CTA color → `#B5005F`
File: `src/components/navbar.tsx`
- Update `COLORS.cta` from `#8B0F50` to `#B5005F`
- Update `COLORS.ctaDark` from `#6E0B40` to `#8C0049` (matching darker hover)

Affects both desktop "Book Appointment" button and "Call Us" anchor.

### 2. Reduce gap above doctor cards
File: `src/components/doctors-carousel.tsx`

The visible empty space comes from the centered card container — it's 460–560px tall with `items-center`, leaving large empty space above the photo when the actual content is shorter.

- Change card stage container (line ~135) from `items-center` to `items-start` so cards sit at the top instead of centered.
- Reduce its height: `h-[380px] sm:h-[440px] lg:h-[480px]` (was `460/520/560`).
- Reduce heading block bottom margin from `mb-8` to `mb-4` (line ~114).

No other section/page changes.
