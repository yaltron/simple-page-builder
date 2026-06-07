## Goal
In `src/components/admin/admin-shell.tsx`, fix the layout so the sidebar and the main content area scroll independently. Nothing else changes (no colors, fonts, menu items, submenu logic, active states, or content layout).

## Changes (single file: `src/components/admin/admin-shell.tsx`)

1. **Outer wrapper `<div className="min-h-screen flex" ...>`**
   - Change to `className="flex"` with inline style `height: 100vh, overflow: hidden, background: #f8f9fa`.

2. **`<aside>` sidebar**
   - Keep current width (`w-64`) and dark background.
   - Add inline style: `height: 100vh, overflowY: auto, overflowX: hidden, position: sticky, top: 0, left: 0`.
   - Add `className="admin-sidebar-scroll"` so we can target webkit/Firefox scrollbar styles.
   - Keep `flex-shrink-0` (already implied by `w-64 flex-shrink-0`).

3. **`<main>` content**
   - Change to `className="flex-1 min-w-0 flex flex-col admin-main-scroll"` with inline style `height: 100vh, overflowY: auto, overflowX: hidden`.
   - Remove `overflow-auto` from the inner content `<div>` (now redundant) — keep the rest of its classes as-is.

4. **Scrollbar styling**
   - Inject a small `<style>` block at the top of the component's returned JSX with the exact rules requested:

```css
.admin-sidebar-scroll::-webkit-scrollbar { width: 4px; }
.admin-sidebar-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 4px; }
.admin-sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
.admin-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
.admin-sidebar-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }

.admin-main-scroll::-webkit-scrollbar { width: 6px; }
.admin-main-scroll::-webkit-scrollbar-track { background: #f8f9fa; }
.admin-main-scroll::-webkit-scrollbar-thumb { background: rgba(230,0,126,0.2); border-radius: 4px; }
.admin-main-scroll::-webkit-scrollbar-thumb:hover { background: rgba(230,0,126,0.4); }
```

## Result
- Sidebar nav scrolls on its own; right content stays fixed.
- Main content scrolls on its own; sidebar stays fixed.
- No visual or functional changes to anything else.
