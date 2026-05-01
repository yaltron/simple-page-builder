## Goal

Force a new commit so that clicking Publish → Update on https://mini-site-shine.lovable.app deploys a fresh build that includes the SSR fix (`vite.environments.ssr` with `noDiscovery: false` + React/framer-motion in `noExternal` and `optimizeDeps.include`).

## Verified current state

`vite.config.ts` already contains the correct fix:
- `SSR_BUNDLE` lists `react`, `react-dom`, `react/jsx-runtime`, `react/jsx-dev-runtime`, `react-dom/server`, `framer-motion`
- `environments.ssr.resolve.noExternal = SSR_BUNDLE`
- `environments.ssr.optimizeDeps.noDiscovery = false`
- `environments.ssr.optimizeDeps.include = SSR_BUNDLE`

No logic change is needed — only a no-op edit to produce a new commit.

## Changes

1. `vite.config.ts` — append a single trailing comment line at the very bottom of the file:
   ```
   // Republish trigger: force fresh build for SSR fix deployment.
   ```
   This is a pure no-op (a comment after the default export). It will not affect runtime, types, or build output, but it produces a new commit hash so Publish → Update generates a brand-new build artifact instead of reusing a cached/stale one.

2. Nothing else is touched. No dependency changes, no source edits, no route changes.

## After the commit lands

I will tell you explicitly: "Commit pushed — click Publish → Update now." Then:
- Open the project, click **Publish** (top-right on desktop, or `…` → Publish on mobile).
- Click **Update** in the dialog.
- Wait for the build to finish, then hard-refresh https://mini-site-shine.lovable.app.

## If the published site still 500s after the fresh deploy

That would mean the production Worker build is failing on something the dev SSR runner tolerates. Next step in that case (not part of this plan unless needed): inspect the production build output for the actual error and adjust the Worker SSR bundling rules accordingly.
