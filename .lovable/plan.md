## What’s actually broken

I found the production root cause in the published server logs:

```text
Error: No such module "h3-v2".
imported from "server.js"
```

That means the live deployment is not failing because of the React hydration warning or the homepage code. It is failing because the published SSR Worker is trying to import a bare server dependency at runtime instead of having it bundled into the server build.

The current `vite.config.ts` fix solved the preview refresh loop by forcing React 19 / Framer Motion to be pre-bundled for SSR, but the current setting is still too narrow for production:

- `environments.ssr.optimizeDeps.noDiscovery = false` helped dev SSR stability
- `environments.ssr.resolve.noExternal = SSR_BUNDLE` only bundles the React/framer-motion allowlist
- the published Worker still leaves TanStack server runtime deps like `h3-v2` outside the bundle
- Cloudflare Worker runtime cannot resolve that bare module at runtime, so the live site returns `Internal server error`

The hydration mismatch in the browser console is unrelated noise from a browser extension (`data-gr-ext-installed`, Grammarly-style attributes). It is not the reason the published site is 500ing.

## Plan

1. Update `vite.config.ts` so the SSR/server environment uses a Worker-safe bundling strategy instead of the current narrow allowlist.
   - Replace the fragile `environments.ssr.resolve.noExternal = SSR_BUNDLE` approach with full SSR dependency bundling for production Worker SSR.
   - Keep the React/Framer Motion `optimizeDeps` settings needed for stable preview refreshes.
   - Result: both the dev SSR runner and the published Worker use a consistent, fully bundled server graph.

2. Preserve the preview stability fix while removing the production regression.
   - Keep `noDiscovery: false` in `environments.ssr.optimizeDeps`
   - Keep the React runtime includes that fixed `module is not defined`
   - Ensure the revised config does not reintroduce the refresh-loop issue in preview

3. Make a fresh code change commit and trigger a clean publishable build state.
   - This will ensure the next Publish → Update uses the corrected Worker SSR bundling config, not the current broken artifact

4. Verify both environments after the fix.
   - Refresh preview multiple times to confirm it stays stable
   - Check the published URL directly and confirm it returns the working homepage instead of `Internal server error`
   - Re-check published server logs to confirm the `h3-v2` runtime import error is gone

## Files to change

- `vite.config.ts` — primary fix
- possibly `.lovable/plan.md` only if the system updates plan tracking automatically

## Technical details

Current risky config:

```ts
environments: {
  ssr: {
    resolve: {
      noExternal: SSR_BUNDLE,
    },
    optimizeDeps: {
      noDiscovery: false,
      include: SSR_BUNDLE,
    },
  },
}
```

Why this is unstable:

- It bundles only the manually listed React-side packages
- It does not guarantee bundling of TanStack Start server runtime dependencies
- The published Worker then tries to import `h3-v2` from `server.js`
- Worker runtime has no Node-style runtime module resolution for that bare module

Target direction:

```ts
environments: {
  ssr: {
    resolve: {
      noExternal: true,
    },
    optimizeDeps: {
      noDiscovery: false,
      include: SSR_BUNDLE,
    },
  },
}
```

If the wrapper/plugin needs a narrower matcher than `true`, I’ll use a comprehensive server-safe matcher instead, but the goal is the same: fully bundle the SSR Worker dependency graph, not just React.

## Expected outcome

After approval and implementation:

- preview remains stable across refreshes
- published site loads successfully
- published logs no longer show `No such module "h3-v2"`
- you’ll have a final working live site instead of a preview-only fix