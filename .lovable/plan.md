# Requested tweaks

1. **Navbar CTAs** (`src/components/navbar.tsx`) — change "Book Appointment" and "Call Us" button background to `#8B0F50` (hover `#6E0B40`). No other magenta usage touched.

2. **Doctors section** (`src/components/doctors-carousel.tsx`):
   - Reduce top padding: `pt-8` → `pt-2 lg:pt-4` on the section.
   - Remove the thin progress bar block below the cards (the `mt-3 h-0.5 ...` div with the animated `motion.div`). Autoplay keeps working.

3. **Footer** (`src/components/footer.tsx`):
   - Bump link font-size from `14` to `15` (matches navbar nav links). Headings stay as-is.
   - Swap footer logo to the same file the header uses: replace `import logo from "@/assets/logo.png"` with `import logo from "@/assets/logo-trimmed.png"`.

Nothing else changes.
