## Use uploaded silhouette PNG as a CSS mask

Replace the hand-drawn SVG `clipPath` with a CSS `mask-image` driven by the uploaded pregnant-woman silhouette. The PNG already has a clean alpha channel, so the photo grid will be cropped exactly to the figure.

### Changes to `src/components/miracles-gallery.tsx`

1. Save the uploaded image to `src/assets/pregnant-silhouette.png` and import it.
2. Remove the inline `<svg><clipPath>` block and the `clipPath` style.
3. On the gallery container apply:
   - `mask-image: url(silhouette)` + `-webkit-mask-image`
   - `mask-repeat: no-repeat`, `mask-position: center`, `mask-size: contain`
   - Container size `480 × 620`, background `#FFF1F7` (fills gaps inside the shape).
   - Keep `filter: drop-shadow(0 0 40px rgba(230,0,126,0.15))` for the soft glow.
4. Inside the masked container, keep the 2-column × 3-row grid of the 6 photos with `object-fit: cover`, no individual border-radius.
5. Keep the existing scroll fade-in for the container and staggered scale-in for each photo.

### Untouched

Left column (5,000+, heading, description, button), section background/padding, and every other section on the page.
