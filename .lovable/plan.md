Plan:

1. Update `package.json` dependency versions only:
   - Change `@lovable.dev/vite-tanstack-config` from `2.3.2` to `1.8.0`.
   - Add the requested `engines` field:
     - `node`: `>=18.0.0`
     - `npm`: `>=8.0.0`

2. Add npm peer-resolution config:
   - Create `.npmrc` in the project root with:
     - `legacy-peer-deps=true`

3. Lockfile handling:
   - There is no `package-lock.json` currently in the project root, so there is nothing to delete.
   - Leave `bun.lock` untouched unless a later install step updates it automatically.

4. Build/deploy command handling:
   - Do not change application source files, routes, components, or styles.
   - I will not add a root `install` script that runs `npm install`, because npm treats `install` as a lifecycle script and that can recursively trigger installs.
   - Keep the app build script focused on building the app unless you explicitly want the recursive-risk script added.
   - The `.npmrc` setting will make normal `npm install` use legacy peer dependency resolution automatically.

5. Custom deploy platform files:
   - No `netlify.toml` or `vercel.json` exists right now.
   - I will not create platform-specific deploy files unless you confirm which platform you use.

6. Verification after approval:
   - Verify dependency install behavior with npm using legacy peer deps.
   - Verify the build still completes.
   - Report exactly which dependency/config versions changed.