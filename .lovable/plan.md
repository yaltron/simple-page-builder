## Problem

`src/routes/team.tsx` (the team listing page) is treated by TanStack Router as the **parent layout** for `src/routes/team.$doctorSlug.tsx` because they share the `team` segment. Since `team.tsx` renders the listing UI and has no `<Outlet />`, navigating to `/team/<slug>` matches the child route but renders the parent's listing — exactly the symptom described.

Everything else the spec asks for already exists:
- Route file `src/routes/team.$doctorSlug.tsx` is present and registered in `routeTree.gen.ts`.
- `doctors.slug` column exists and all 5 doctors have valid slugs.
- "View Profile" links already use TanStack `<Link to="/team/$doctorSlug" params={{ doctorSlug }}>` in both the homepage carousel and the team grid.
- A global ScrollToTop is already wired in `__root.tsx`.

So this is a single structural fix.

## Fix

Convert the `/team` route to a proper leaf so it stops shadowing the dynamic child:

1. Rename `src/routes/team.tsx` → `src/routes/team.index.tsx`.
2. Update its `createFileRoute("/team")` call to `createFileRoute("/team/")` (the index path expected by the generator). Leave the component, head, and JSX untouched.
3. Let the Vite plugin regenerate `routeTree.gen.ts` on the next build.

After this:
- `/team` → `team.index.tsx` (listing, unchanged visuals)
- `/team/<slug>` → `team.$doctorSlug.tsx` (existing profile page renders correctly)

No other files, styles, data, links, or behavior change.

## Out of scope (per the request)

- Doctor profile page UI / styling — already implemented to spec.
- Slug column migration — already in place and populated.
- View Profile links — already using `<Link>`.
- ScrollToTop — already mounted.