## Goal
Create a second admin account (`admin@shubhashreeivf.com`) with full admin access to the CMS.

## Important: RLS is role-based, not user-ID-based
Every admin RLS policy already uses `has_role(auth.uid(), 'admin')`, which reads from the `public.user_roles` table. So **no RLS policies need editing**. The new user simply needs:
1. An entry in `auth.users` (created via the admin API).
2. A row in `public.user_roles` with `role = 'admin'`.

The suggested switch to `auth.role() = 'authenticated'` is explicitly **not** done — it would grant admin access to every signed-in user (including any future patient/applicant accounts). Reusing the existing `has_role` check is the safe path and gives the new account the same access as the current admin.

## Steps (build mode)
1. **Create the auth user** via a one-off Bun script that calls `supabaseAdmin.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { role: 'admin', name: 'Shubhashree Admin' } })` using `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` from the sandbox env. Capture the returned `user.id`.
   - If the email already exists, fetch the existing user via `listUsers` and continue.
2. **Grant admin role** by inserting into `public.user_roles (user_id, role)` with `role = 'admin'` (idempotent via `ON CONFLICT DO NOTHING` — the table already has `UNIQUE (user_id, role)`).
3. **Verify** by re-reading `user_roles` for the new `user_id` and confirming the row exists.
4. **Delete the one-off script** so no credentials linger in the repo.

## Verification of login at `/admin/login`
The script runs server-side and cannot drive a browser login. I'll confirm:
- The auth user exists and is email-confirmed.
- A `user_roles` row with `role='admin'` exists for that user.

Together these are exactly what `has_role(auth.uid(), 'admin')` checks, so the login + admin access will work. The user can then sign in at `/admin/login` to confirm end-to-end.

## What does NOT change
- No RLS policy edits.
- No schema migration.
- No code, UI, route, or design changes.
- The existing admin account is untouched.