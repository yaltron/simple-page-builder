## Plan

Add an "Explore Stories" button under the italic quote on the right side of the Gallery / Who-We-Are section.

### Implementation
1. In `src/components/who-we-are.tsx`:
   - Import `Link` from `@tanstack/react-router`.
   - Add a `<Link to="/success-stories">` button as a child of the right-side `motion.div`, placed below the `<h2>` quote block.
   - Style it with a pink-to-purple gradient (`from-rose to-rose-dark`), white text, rounded-full, with padding and a subtle hover state — matching existing button patterns in the codebase.
   - Keep the vertical centering behavior of the right-side block intact.

### Notes
- No new routes or dependencies needed.
- The section already exists; this is a single-component addition.