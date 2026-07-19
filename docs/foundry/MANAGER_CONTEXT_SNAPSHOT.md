# ShopFloor Manager Context Snapshot

**Updated:** 2026-07-19
**Owner:** ShopFloor Manager / Egon reconciliation
**Status:** `CURRENT_MANAGER_SNAPSHOT`

## Executive state

ShopFloor is an Akron-first neighborhood repair and mutual-aid network. Its SvelteKit app lives under `app/`; GitHub `main` is the recovery source. The public release gate remains closed.

The active safety package is now source-complete and committed-state-ready:

- field-note acknowledgement UI and helper validation;
- clearer public-copy boundaries for support, field notes, requests, and knowledge;
- read-only anon Supabase verification receipt;
- migration-ready RLS hardening under `supabase/migrations/20260719000000_prealpha_privacy_hardening.sql`.

## Current privacy/RLS state

- Read-only anon Supabase checks passed on 2026-07-15; they did **not** include writes or schema inspection.
- The RLS migration source is ready but **not applied live**. This checkout has no Supabase CLI, `config.toml`, `psql`, or verified authenticated migration target.
- When applied, it defaults new help requests private, adds owner-read coverage, makes new field notes restricted, requires persisted privacy acknowledgement, and makes anonymous field-note reads publication-only.
- No publication workflow exists. Do not interpret a restricted field-note save as public release.

## Required manager order

1. Keep `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE` closed.
2. Do not create external tester data before the RLS migration is applied through a verified route and anon/author/unrelated-user checks pass.
3. Do not use an improvised SQL console or unverified credential path.
4. Treat `NEXT.md`, `STATE.md`, `worklist.json`, dated receipts, and current Git status as stronger than historical summaries.
5. Do not add request-response, completion, support persistence, or resource persistence before the data/privacy gate is closed.

## Current open/blocked work

- **Blocked:** apply and verify `20260719000000_prealpha_privacy_hardening.sql` against the verified Supabase project.
- **Approval-gated:** public release/deploy/publishing and any external tester-data intake.
- **Later:** request response/completion, time ledger, support persistence, structured resources, and public copy review for `/about`/README/KB content.

## Commands

```bash
cd /Users/kn8/projects/shopfloor/app
npm run check
npm run build
```

## Evidence

- `docs/receipts/2026-07-19__prealpha-rls-hardening-migration-ready.md`
- `docs/receipts/2026-07-15__shopfloor-supabase-readonly-live-verify.md`
- `docs/receipts/2026-07-15__field-note-public-ack-guard.md`
- `docs/receipts/2026-07-15__public-copy-safety-boundary-pass.md`
