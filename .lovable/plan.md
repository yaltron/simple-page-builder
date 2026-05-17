The button text "Book Free Consultation" is stored in the CMS (homepage_content.hero.cta_primary_text), which overrides the code default. The current solid pink (#E6007E) replaced the earlier rose gradient.

## Changes

1. **Update CMS hero text** — run a migration to change `cta_primary_text` from "Book Free Consultation" to "Book Consultation" in the `homepage_content` table's `hero` row.

2. **Restore previous button color** in `src/components/hero.tsx` — change the primary button className from:
   ```
   text-white rounded-full px-8 text-base bg-[#E6007E] hover:bg-[#C4006A] transition-colors duration-[250ms] ease-[ease]
   ```
   back to the previous rose gradient:
   ```
   bg-gradient-to-r from-rose to-rose-dark hover:from-rose-dark hover:to-rose text-white rounded-full px-8 text-base
   ```

Nothing else changes — secondary "Watch Our Story" button, layout, animations, and hero content stay as they are.
