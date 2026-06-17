The user wants the navbar logo rendered at exactly 150 × 60 px on desktop, without increasing the navbar height.

Current state
- Logo file: 781 × 312 px (2.5:1 aspect ratio)
- Navbar logo inline style: height: 52, maxWidth: 160
- Navbar row 1: min-h-[64px] with pt-2 (8 px) + pb-1 (4 px) = 12 px vertical padding
- Current computed row height: 52 px logo + 12 px padding = 64 px (exactly at min-height)

Planned change
1. In `src/components/navbar.tsx`, update the logo `<img>` inline style:
   - height: 52 → 60
   - maxWidth: 160 → 150
   This yields exactly 150 × 60 px because the logo’s native 2.5:1 ratio (60 × 2.5 = 150).

2. In the same file, reduce the navbar row 1 vertical padding by 8 px to compensate for the 8 px taller logo:
   - Change `pt-1.5 md:pt-2 pb-1` → `pt-1 md:pt-1 pb-0`
   New computed row height: 60 px logo + 4 px padding = 64 px (unchanged).

No other attributes, classes, or components are touched.