# ShopFloor Manager Context Snapshot

**Updated:** 2026-07-19
**Owner:** ShopFloor Manager / Egon reconciliation
**Status:** `CURRENT_MANAGER_SNAPSHOT`

## Executive state

ShopFloor is an Akron-first neighborhood repair and mutual-aid network. Its SvelteKit app lives under `app/`; GitHub `main` is the recovery source. The public release gate remains closed.

The pre-alpha privacy/RLS package is applied to the linked Supabase project:

- field-note acknowledgement UI/helper and safer public-copy boundaries;
- migration `20260719000000_prealpha_privacy_hardening.sql` applied remotely;
- new field notes restricted by default; anonymous field-note reads require explicit later publication;
- post-apply anonymous reads and protected-row write denials verified.

## Current privacy/RLS state

- CLI v2.109.1 is installed, authenticated through Nate’s local credential flow, and linked. The DB password is held in local native credential storage, not the repository.
- Remote migration history matches local version `20260719000000`.
- Anonymous inserts into shop cards, help requests, and field notes were denied with Postgres RLS error `42501`; public field-note count is 0.
- No publication workflow exists. A restricted field-note save is not public release.
- No controlled authenticated author/unrelated-user proof has been run. It needs separate authorization to create non-neighbor test accounts/data plus a cleanup/retention plan.

## Required manager order

1. Keep `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE` closed.
2. Do not accept external tester data before the controlled authenticated-role proof passes.
3. Do not use an improvised SQL console or print/move credentials.
4. Treat `NEXT.md`, `STATE.md`, `worklist.json`, dated receipts, and current Git status as stronger than historical summaries.
5. Do not add request-response, completion, support persistence, or resource persistence before the data/privacy gate is closed.

## Current open/approval-gated work

- **Needs approval:** bounded author/unrelated-user RLS proof with test-account/data cleanup plan.
- **Approval-gated:** public release/deploy/publishing and any external tester-data intake.
- **Later:** request response/completion, time ledger, support persistence, structured resources, and public copy review for `/about`/README/KB content.

## Evidence

- `docs/receipts/2026-07-19__prealpha-rls-hardening-applied.md`
- `docs/receipts/2026-07-19__prealpha-rls-hardening-migration-ready.md`
- `docs/receipts/2026-07-15__shopfloor-supabase-readonly-live-verify.md`
- `docs/receipts/2026-07-15__field-note-public-ack-guard.md`
