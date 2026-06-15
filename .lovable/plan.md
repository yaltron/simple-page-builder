## Plan: Remove hero banner from doctor profile page

### Scope
- Remove the full-width dark hero banner section from `src/routes/team.$doctorSlug.tsx`.
- The banner shows the doctor's photo as a background image with overlaid name and specialty.

### What to change
- Delete the `<section>` block labeled `{/* Hero banner */}` (lines 67–87 in `src/routes/team.$doctorSlug.tsx`).
- Everything below it remains untouched:
  - Breadcrumb (Home > Our Team > Dr. Name)
  - Main two-column content (left photo + right details)
  - Book Consultation button
  - All doctor information
  - Navbar and footer

### Result
The page will start directly with the breadcrumb after the navbar, then flow straight into the main content section. No other pages or components are affected.