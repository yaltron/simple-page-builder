## Goal
Add springy hover interactions to each step in the "How It Works" section (`src/components/process-steps.tsx`). Hovering anywhere on a step (circle + title + description) triggers coordinated animations on the circle, icon, badge, title, and the whole group.

## Note on existing state
The continuous "glow pulse" animation on circles was removed in a previous turn (per your request). The plan below adds the hover effects only — I will not re-add the always-on pulse unless you tell me to.

## Changes

### 1. `src/components/process-steps.tsx`
- Wrap each step's inner container as the hover trigger by adding `group` to the outer `<motion.div>` (the one keyed by `step.number`).
- Apply group-hover utility classes to children:
  - **Step container** (inner div): `transition-transform duration-400 group-hover:-translate-y-2` with spring easing.
  - **Circle** (`.step-circle` div): inline transition + group-hover scale to 1.10 with the double-ring + deep glow box-shadow.
  - **Icon** (`<Icon />`): wrap in a span with `transition-transform group-hover:scale-115 group-hover:-rotate-[8deg]`.
  - **Badge** (number `<motion.span>`): on group-hover swap bg → `#E6007E`, text → white, scale 1.2.
  - **Title** (`<motion.h3>`): on group-hover color → `#E6007E`.

### 2. `src/styles.css` — `.step-circle` rule
- Replace the current `:hover` rule with a `.group:hover .step-circle` rule (so the whole step area triggers it, not just direct circle hover).
- Hover state:
  - `transform: scale(1.10)`
  - `box-shadow: 0 0 0 10px rgba(230,0,126,0.12), 0 0 0 20px rgba(230,0,126,0.06), 0 16px 50px rgba(230,0,126,0.35)`
- Transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)` on hover-in, `all 0.3s ease-out` on hover-out (handled by setting transition on default state to ease-out and overriding on hover).

## Technical details

### Easing
- Spring/bounce on enter: `cubic-bezier(0.34, 1.56, 0.64, 1)` for circle scale + container lift + icon scale.
- Smooth ease for title color and badge color: `0.3s ease`.

### Badge color swap conflict
The badge is a `motion.span` whose `animate` prop sets `backgroundColor`/`color`. Framer Motion's inline styles will override CSS hover. To make hover work, I'll use Tailwind `group-hover:` classes that set inline styles via a `whileHover` prop on the parent group is not viable (group is not a motion component). Instead I'll switch the badge's hover styling to a plain conditional via CSS custom properties OR add `data-hover` styling. Simplest: add a sibling CSS rule `.group:hover .step-badge { background: #E6007E !important; color: #fff !important; transform: scale(1.2); }` and add `step-badge` class + transition to the span. The `!important` is needed because framer-motion writes inline styles after mount.

### Files touched
- `src/components/process-steps.tsx` — add `group` class, add `step-badge` class, wrap icon in animatable span, add group-hover utility classes.
- `src/styles.css` — update `.step-circle` block; add `.step-badge` hover rule.

## Out of scope (untouched)
Wave/dot (already removed), section heading, descriptions copy, background, on-scroll arrival animations, all other sections.