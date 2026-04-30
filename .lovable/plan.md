## Problem

The site renders on the server (you see the pink gradient SSR background), but client-side JavaScript crashes with:

```
ReferenceError: React is not defined
  at virtual:tanstack-start-client-entry:7:21
```

This stops React from hydrating, leaving the page blank/inert. The Lovable preview shell shows "Internal server error" because the client app never mounts.

## Root cause

The default TanStack Start client entry lives inside `node_modules/@tanstack/react-start/dist/plugin/default-entry/client.tsx`. Because that file is outside our `src/` directory, our `tsconfig.json`'s `"jsx": "react-jsx"` setting doesn't apply to it. Vite's esbuild falls back to the **classic JSX transform**, which compiles `<StrictMode>` into `React.createElement(...)` — but the file never imports `React`, so the browser throws `ReferenceError`.

I already created `src/client.tsx` (a project-local copy of that entry) but my attempt to point the plugin at it via `tanstackStart({ client: { entry: "./src/client.tsx" } })` used a wrong path (the plugin resolves entries relative to `src/`, not the project root). I need to fix the wiring in plan mode.

## Fix

1. **Update `vite.config.ts`** — remove the broken `client.entry` override. The plugin auto-detects `src/client.tsx` as the client entry when present, which means it'll be transformed by Vite using the project's `react-jsx` setting and the bug goes away.

   ```ts
   plugins: [tailwindcss(), tanstackStart()],
   ```

2. **Keep `src/client.tsx`** as-is:

   ```tsx
   import { StrictMode, startTransition } from "react";
   import { hydrateRoot } from "react-dom/client";
   import { StartClient } from "@tanstack/react-start/client";

   startTransition(() => {
     hydrateRoot(
       document,
       <StrictMode>
         <StartClient />
       </StrictMode>,
     );
   });
   ```

3. **Verify** — reload the preview, confirm the IVF landing page mounts (nav, hero, sections all interactive), and check console is clean.

If the modern JSX transform still doesn't apply for some reason, fallback is to add `import * as React from "react"` to `src/client.tsx` so the classic transform's `React.createElement` reference resolves.

## Why this works

Files inside `src/` go through Vite's normal TypeScript pipeline, which honors `tsconfig.json`'s `"jsx": "react-jsx"` and compiles JSX to `_jsx(...)` calls from `react/jsx-runtime` — no global `React` reference needed. The plugin's auto-discovery picks up `src/client.tsx` automatically, so no extra config is required.
