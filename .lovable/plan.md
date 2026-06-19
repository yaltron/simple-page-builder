I’ll keep this dependency-only, with no application code/component changes.

Plan:
1. Keep `@lovable.dev/vite-tanstack-config` declared at `2.3.2` in `package.json`.
2. Ensure `nitro` is not pinned as a direct app dependency unless npm requires it explicitly; the current conflict points to stale or mismatched install state rather than app code.
3. Remove stale install artifacts: `node_modules` and any npm lockfile generated from the bad tree.
4. Run a clean `npm install` with no `--force` and no `--legacy-peer-deps` so npm resolves from the corrected `package.json`.
5. Commit the resulting lockfile changes only if npm creates/updates `package-lock.json`; do not touch app source files.
6. Verify `npm install` completes without ERESOLVE, then verify the production build still succeeds.

Expected version outcome:
- `@lovable.dev/vite-tanstack-config`: `2.3.2`
- `nitro`: resolved by npm to a version satisfying `>=3.0.260603-beta`, not forced through a conflicting stale tree.