## Plan

I inspected the current bootstrap and the recurring failure is not coming from missing routes or a broken app wrapper.

What I found:
- The app is already using the correct TanStack Start file layout:
  - `src/client.tsx` is the client entry
  - `src/router.tsx` creates the router
  - `src/routes/__root.tsx` and `src/routes/index.tsx` are the route shell and home route
- There is no `App.tsx` or `main.tsx` in this codebase now, which is normal for this stack.
- I did not find any `React.lazy(...)` or dynamic `import(...)` route code that would explain the refresh crash.
- The page currently renders in the live preview browser session, which means the failure is intermittent rather than a permanent route-definition bug.
- The published site is still returning `Internal server error`.

The likely root cause is the server-side Vite/TanStack Start config, not the router tree itself:
- React 19 still ships through a CommonJS entry (`module.exports = ...`).
- If TanStack Start’s server runtime does not prebundle that dependency into ESM for the actual server environment, SSR refreshes can fail with `module is not defined`, which shows up as a 500/internal server error.
- The current `vite.config.ts` is trying to force SSR bundling under `vite.environments.ssr`, but TanStack Start’s plugin uses its own server environment handling. That means the current fix is likely being applied to the wrong config layer or wrong environment name, which explains why it seems to work briefly and then breaks again on refresh/redeploy.

## What I will change

### 1) Replace the current Vite SSR patching with a canonical TanStack Start server config
- Remove the fragile `vite.environments.ssr` workaround.
- Move the React/Router server-bundling rules into the TanStack Start plugin config path that the framework actually reads.
- Keep only stable Vite basics under `vite`:
  - alias
  - dedupe
  - sandbox port/host
- Ensure the actual server runtime always bundles/pre-optimizes the packages that can crash SSR refreshes:
  - `react`
  - `react-dom`
  - `react/jsx-runtime`
  - `react/jsx-dev-runtime`
  - `react-dom/server`
  - `@tanstack/react-router`
  - `@tanstack/react-router-devtools`
  - `framer-motion` if needed

### 2) Keep the router/bootstrap structure intact unless a true mismatch is found during implementation
- Do not rewrite page content or UI.
- Keep `src/client.tsx`, `src/router.tsx`, `src/routes/__root.tsx`, and `src/routes/index.tsx` in the TanStack Start pattern.
- Only make bootstrap changes if validation shows a real framework mismatch.

### 3) Normalize framework dependency state
- Check the installed TanStack package set and lockfile for version drift.
- If needed, align the TanStack Start / Router packages to a compatible set and refresh the lockfile so preview and publish use the same stable dependency graph.
- This is important because the installed versions are not fully aligned right now, which can contribute to unstable runtime behavior.

### 4) Validate as a cold-start stability fix, not a hot-patch
After the config change I will verify the failure mode directly:
- restart against a cold dev session
- inspect `/tmp/dev-server-logs/dev-server.log`
- confirm the React CJS/SSR error is gone
- load the preview
- refresh the preview multiple times
- confirm it stays up instead of only working once after a code edit
- check browser console/network for any remaining runtime failures

### 5) Republish and verify the live URL
- Push the same fix through publish/update
- verify the published site responds successfully instead of returning `Internal server error`

## Expected files to change
- `vite.config.ts`
- possibly `package.json`
- possibly `bun.lock`
- only if required by validation: minimal bootstrap files, but not page/UI components

## Technical details

Why I do **not** think the route files are the real issue:
- `src/client.tsx` uses `StartClient`, which matches the installed TanStack Start package.
- `src/router.tsx` creates a router from `routeTree.gen.ts` correctly.
- `src/routes/index.tsx` defines `/` with a component.
- `src/routes/__root.tsx` provides the required shell and not-found handler.
- There are no lazy route imports in the app code that would explain a reload-only crash.

Why I think the SSR config is the real root cause:
- The recurring symptom happens on refresh / server render, not just client navigation.
- The published site also fails, which points to server/runtime bundling rather than a browser-only bug.
- React’s CommonJS entry is a known failure point when Vite’s server runtime evaluates it without proper prebundling.
- The current fix is aimed at `environments.ssr`, but TanStack Start’s plugin wiring suggests the stable fix should be applied through the framework’s own server/plugin config path instead of this patchy environment override.

## Result after implementation
A stable preview that survives refreshes, plus the same fix propagated to the published site, without changing any content or UI.