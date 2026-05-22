# Changes

## 1. "Book Consultation" CTA bg → `#B5005F`
File: `src/components/cta-banner.tsx`

The "Ready to Start Your Journey to Parenthood?" section's primary button currently uses `bg-rose hover:bg-rose-dark`. Replace those Tailwind classes with inline style `background: "#B5005F"` and a hover handler swapping to `#8C0049` (matching the navbar CTA palette). This component is shared across all pages, so the change applies everywhere.

## 2. Add "Online Consultation" tile to navbar Book popover
File: `src/components/navbar.tsx` (~lines 300–311)

The popover that opens from the "Book Appointment" button currently shows a single full-width "Visit In-Clinic" tile. Change that block to a 2-column grid (`grid grid-cols-2 gap-2`) with two tiles on the same row:

- **Visit In-Clinic** — existing tile, unchanged behavior (closes popover, navigates to `/contact`), `Hospital` icon, "Available Today" green badge.
- **Online Consultation** — new tile with the same styling (`bg: COLORS.pinkSoft`, rounded-xl, hover scale), `Video` icon (from lucide-react, already imported elsewhere — add to the navbar import), label "Online Consultation", and a small badge "Video Call". On click: close popover and navigate to `/contact` (same destination as the in-clinic tile, since the contact page hosts the full appointment form).

No DB schema change — the inline form below still submits `consultation_type: "In-Clinic"`; this tile pair is presentational, matching the existing in-clinic tile's behavior.

## 3. Footer description text
File: `src/components/footer.tsx` (line ~111)

Replace the `<p>` content under the logo from "Nepal's leading fertility centre, transforming dreams of parenthood into reality for over 12 years." with:

> "Supporting your journey to parenthood with advanced fertility treatments and customized care plans, ensuring dignity, comfort, confidentiality, and the hope of bringing happiness into your life."

## 4. Reduce gap between footer link items
File: `src/components/footer.tsx`

The Quick Links / Our Services lists feel too airy because `linkStyle.lineHeight` is `2.2`. Reduce to `1.8` so consecutive items sit closer together (matches the tighter spacing in the Contact Us column). No other footer spacing changes.

# Out of scope
No changes to doctors section, hero, other pages, DB, or routing.
