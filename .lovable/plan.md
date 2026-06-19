## Diagnosis

The error happens on your local machine running `npm i`. Two things are going on:

1. **Stale `node_modules`**: npm shows `@lovable.dev/vite-tanstack-config@1.8.0` is already installed, but `package.json` declares `2.3.2`. That's left over from an earlier install — npm refuses to reconcile it.
2. **`nitro` as a direct dependency**: `package.json` lists `"nitro": "3.0.260603-beta"` in `dependencies`. This package shouldn't be a direct dependency — it's only a `peerOptional` of `@lovable.dev/vite-tanstack-config@2.3.2`, declared as `>=3.0.260603-beta`. Because it's a *peer*, npm's resolver compares it against the rest of the tree and flags any mismatch as `ERESOLVE`. It's never imported by app code, so pinning it in `dependencies` only creates conflicts on every config bump.
3. **Lockfile mismatch**: the repo ships a `bun.lock` (this project uses **bun**, not npm). There is no `package-lock.json` in the repo, so your local `npm i` is generating one from scratch against a stale `node_modules`, which is what produces the ERESOLVE.

## Fix (dependency-only, no app code changes)

### 1. Edit `package.json`
- Remove the line `"nitro": "3.0.260603-beta",` from `dependencies`. The build config will pull the right nitro version transitively via its own peer/optional resolution.

That is the only `package.json` change required. `@lovable.dev/vite-tanstack-config@2.3.2` stays as-is.

### 2. Local steps you run after I push the change
On your machine:

```bash
rm -rf node_modules package-lock.json
npm install
```

(or `bun install` if you prefer to match the committed `bun.lock`).

After this, `npm install` completes with no `--force` / `--legacy-peer-deps`, and the build runs as before.

### Why this works
- The 1.8.0 vs 2.3.2 mismatch is purely a stale-tree artifact — removing `node_modules` clears it.
- Dropping the explicit `nitro` entry lets npm satisfy the `peerOptional` from the config package's own resolution instead of pinning a conflicting top-level version.
- No app, component, or runtime code is touched. Only the `nitro` line in `dependencies` is removed.

## Files changed
- `package.json` — remove the `nitro` dependency line (1 line deleted).
- No lockfile committed change needed; your local `npm install` will regenerate `package-lock.json` cleanly.
