I’ll make only the routing/detail-page fix.

Plan:
1. Convert `src/routes/services.tsx` into the parent route for `/services` that renders an `<Outlet />`, so `/services/$slug` can mount instead of being swallowed by the parent page.
2. Move the current general Services page content into a new `src/routes/services.index.tsx` route for `/services`, keeping its design and behavior unchanged.
3. Keep `src/routes/services.$slug.tsx` as the detail route, with `createFileRoute('/services/$slug')`, so URLs like `/services/fertility-assessment-diagnosis` render `ServiceDetailPage`.
4. Do not edit navbar, footer, homepage service cards, or unrelated page design.

Technical note: this project uses TanStack Start file-based routing, not React Router. The generated route tree already shows `/services/$slug` as a child of `/services`; the missing piece is that the `/services` parent currently renders the full Services page instead of an `<Outlet />`, preventing the child route content from displaying.