Plan to equalize the footer logo with the header logo.

Current sizes:
- Header logo (src/components/navbar.tsx): `height: 72`, `maxWidth: 180`, `objectFit: "contain"`, `objectPosition: "left center"`
- Footer logo (src/components/footer.tsx): `height: 53`, `maxWidth: 211`, `objectFit: "contain"`, `objectPosition: "center"`

Change the footer logo inline style to match the header logo dimensions: set `height: 72`, `maxWidth: 180`, and keep `objectFit: "contain"`. The footer logo will remain centered in its column by its parent container, so the object position can stay centered to look balanced in the footer layout, while the rendered pixel height matches the header.

Only file touched: src/components/footer.tsx. No public pages, layouts, or unrelated functionality changed.