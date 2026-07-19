# Receipt — ShopFloor pre-alpha RLS hardening migration ready

**Date:** 2026-07-19
**Owner:** Egon/default
**Status:** `MIGRATION_READY_LIVE_APPLY_BLOCKED`

## Completed source slice

Added `supabase/migrations/20260719000000_prealpha_privacy_hardening.sql` and aligned the canonical schema and field-note app copy/insert behavior.

The migration:

- defaults `help_requests.safe_to_share` to `false`;
- lets an author read their own private request and hidden shop card;
- adds `visibility`, `published_at`, `withdrawn_at`, and `privacy_acknowledged_at` to field notes;
- replaces universal anonymous field-note reads with published-and-not-withdrawn reads only;
- permits new field-note inserts only for the author, with `visibility = restricted`, no publication/withdrawal timestamp, and a persisted privacy acknowledgement;
- preserves `security_invoker = true` on `help_requests_with_author`.

The app now inserts `visibility: 'restricted'` and `privacy_acknowledged_at`, and copy makes clear that saving does not publish a note.

## Verification actually run

```text
app/npm run check: PASS — 0 errors / 0 warnings
app/npm run build: PASS — production build completed
static schema/migration/app contract checks: PASS
node --check app/src/lib/api.js: PASS
git diff --check: PASS
```

## Live-apply blocker

This checkout has no `supabase` CLI, no `psql`, no `supabase/config.toml`, no existing migrations directory before this slice, and no verified authenticated project link. No credential was read or printed. No SQL was applied live.

Do not use an improvised SQL-console session as a substitute. Apply only after a verified Supabase CLI/project-link or separately approved authenticated migration path is available; then run the named anon/author/unrelated-user RLS checks.

## Deliberate non-goals

- No public release-gate change, deployment, or data creation.
- No field-note publication UI/workflow.
- No broad owner-update/counter-spoofing fix; that needs a separate RPC/trigger design.
