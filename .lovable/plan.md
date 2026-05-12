## Plan

1. Restore a worker-safe root route shape
- Refactor `src/routes/__root.tsx` to follow the TanStack Start root-route pattern that is safe for preview SSR.
- Replace the current root export shape with an explicit root component/shell structure and add a proper root `errorComponent` so SSR failures do not collapse into a generic internal server error.
- Keep the existing UI behavior, but remove the export/config pattern that is causing the worker log error: `Exported value's prototype chain does not end in Object.`

2. Harden every Chunk D `site_settings` consumer
- Add a shared safe parser/helper for `site_settings` values so `null`, empty rows, malformed JSON, wrong types, or missing keys always fall back to defaults.
- Update these components to use defensive defaults and no-op safely when data is absent:
  - `src/components/announcement-bar.tsx`
  - `src/components/analytics-scripts.tsx`
  - `src/components/cookie-consent.tsx`
  - `src/components/patient-portal-teaser.tsx`
- Ensure browser-only APIs (`window`, `document`, `localStorage`, `sessionStorage`, clipboard) are only touched inside safe client-side effects/handlers.

3. Make third-party script loading idempotent and failure-safe
- Guard GA4 and Tawk.to injection against duplicate inserts, bad IDs, missing DOM targets, and rejected network/script loads.
- Prevent script setup failures from bubbling into app render.
- Ensure analytics/chat are skipped cleanly when settings are blank.

4. Stabilize admin settings behavior
- Review `src/routes/admin.settings.index.tsx` and related admin auth/layout code for null access, missing rows, and update failure cases.
- Make settings save/load resilient when one or more `site_settings` rows are missing by merging fetched rows onto defaults instead of assuming the full set exists.
- Keep the route rendering even when backend data is incomplete.

5. Validate route/module exports introduced around Chunks C/D
- Re-check newly added routes/components for invalid export shapes or route config values that break preview SSR serialization.
- Specifically validate:
  - `src/routes/__root.tsx`
  - `src/routes/admin.index.tsx`
  - `src/routes/admin.settings.index.tsx`
  - `src/routes/blog.$slug.tsx`
  - `src/components/not-found-page.tsx`
- Preserve working behavior while removing anything that can produce the preview worker 502.

6. Verify after the fix
- Re-test the real preview/runtime path, not just local 200 responses.
- Verify these pages render successfully in preview:
  - `/`
  - `/admin`
  - `/admin/settings`
  - `/blog`
  - one blog post route if data exists
- Re-check browser console, network, and server logs to confirm the SSR error signature is gone.

## Expected root cause to fix
- The concrete preview-side failure is the SSR worker error:
  - `Error: Exported value's prototype chain does not end in Object.`
- Based on the timing and code changes, the highest-probability direct trigger is the new root-route/export configuration introduced around Chunk D, not the `site_settings` fetches themselves.
- The `site_settings` components still need hardening because they currently assume valid data and can regress later even if they are not the direct cause of the 502.

## Files likely to change
- `src/routes/__root.tsx`
- `src/router.tsx`
- `src/components/announcement-bar.tsx`
- `src/components/analytics-scripts.tsx`
- `src/components/cookie-consent.tsx`
- `src/components/patient-portal-teaser.tsx`
- `src/routes/admin.settings.index.tsx`
- one small shared helper file for safe settings parsing

## Technical notes
- No schema migration is planned unless a real schema mismatch is found during implementation.
- Current backend data exists and `site_settings` rows are present, so this is not a missing-seed problem.
- The fix will target both:
  - the actual SSR crash source
  - permanent defensive coding so future settings/layout updates do not bring the preview down again.