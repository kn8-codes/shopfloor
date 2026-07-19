# Current State — ShopFloor

_Last updated: 2026-07-19_

## Active Goal

Advance ShopFloor toward a visible, useful public-alpha mutual-aid loop while preserving the release/privacy gates.

Current focus:

1. Keep GitHub `main` as the clean recovery source for all agents.
2. Keep state docs truthful enough that agents do not plan from historical drift.
3. Preserve the public release gate until Nate approves public copy, live privacy checks, and local-trust readiness.
4. Build one bounded mission-facing slice at a time.
5. Avoid infrastructure theater when the next user-facing loop is still unfinished.

## Right Now

ShopFloor is a SvelteKit app under `app/` with Supabase-backed prototype wiring, a file-backed Markdown knowledge base MVP, public-alpha orientation surfaces, explicit launch gate, tester support intake, and field-note creation v0.

Current verified technical state:

- Repo: `https://github.com/kn8-codes/shopfloor`
- Canonical branch: `main`
- Current HEAD: see `git log --oneline -1` locally; this state file intentionally avoids self-referential commit churn.
- Current verified implementation commit: `f606516 Harden ShopFloor private proof gate`
- Tracking state: `main...origin/main`
- App root: `app/`
- Verification timestamp: 2026-07-13 05:49 EDT
- Latest verification commands include `node --check scripts/shopfloor_privacy_probe.mjs`, probe explicit-gate smoke, `npm run check`, `npm run build`, and local dry route smoke for `/support`, `/field-notes`, and `/field-notes/new`.

## What Seems Done

- Concept and product direction documented.
- SvelteKit app exists under `app/`.
- Shared shell/nav exists.
- Supabase client/auth/request/shop-card wiring exists.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card when Supabase/auth are enabled.
- Public release gate exists in `app/src/routes/+layout.svelte` using `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE`.
- Home deployment procedure exists at `docs/deployment/shopfloor-belt-works-launch.md`.
- Feed loads live safe-to-share requests from `help_requests_with_author` when Supabase is configured and otherwise shows a visibly labeled sample fallback.
- Request detail attempts live Supabase data and has sample fallback behavior for known sample requests.
- Request detail has a sample-data-only `Local support options` panel with non-endorsement labeling.
- Shop detail loads live profile/tools/field-note data when configured and otherwise uses sample fallback behavior.
- Markdown knowledge base MVP exists and renders through `/knowledge` routes.
- KB implementation guide exists at `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`.
- Starter KB content exists for repair tools, triage guides, and safety/privacy concepts.
- Public About/mission page exists at `/about` and is linked from the app shell navigation.
- Field-notes archive exists at `/field-notes` with sample fallback and live-capable loader.
- Field-note creation v0 exists at `/field-notes/new` with request context loader, validation, preview, and gated save behavior.
- Support/feedback intake route exists at `/support` as a no-send, copyable tester note for controlled alpha walkthroughs.
- Tester-loop script exists at `docs/plans/2026-07-12-shopfloor-tester-loop-script.md`.
- AgentsRoom team packet exists under `AGENTSROOM_TEAM/`.

## Explicitly Not Done Yet

These remain open work unless a future code read proves otherwise:

- Live Supabase write-denial and management/schema metadata verification against production or preview credentials.
- Public release approval and gate opening.
- Nate review/approval of `/about` public voice, risk, and promises.
- Nate review of starter KB entries before treating them as authoritative.
- Live request response form/action is not present in current app code.
- Request completion flow is not present in current app code.
- Time ledger/history UI is not present in current app code.
- Atomic completion-to-ledger RPC is not present in current app code.
- Structured tools/resources persistence is not complete as a first-class live product surface.
- Live write-denial probes, deeper schema/privacy hardening, and final public-copy approval are still required before external tester data is entered. The field-note creation UI/helper now requires an explicit public-read acknowledgement before saving, and alpha-facing copy now carries clearer support/privacy/endorsement boundaries.
- Support/feedback intake is copyable/no-send only; real persistence/routing is not designed yet.

## Important Drift Notes

Historical evidence from 2026-05-25 describes request responses, completion, and ledger work, but later review corrected that as stranded/historical drift. Current code reads during this sprint found:

- `request_responses` only in sample data/planning/evidence text, not live route/form/schema implementation.
- `time_ledger_entries` only in docs/evidence/planning text, not current app/schema code.
- Field notes table and RLS policies exist in `supabase/schema.sql`; field-note creation v0 now exists in the app.
- Local support options are sample fixtures and must remain clearly labeled as unverified, non-endorsement support data.

## Current Alpha Gates

1. **Public release gate**
   - `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false` or unset keeps the public app closed.
   - Do not set true without explicit Nate approval.

2. **Privacy / RLS gate**
   - Migration `20260719000000_prealpha_privacy_hardening.sql` is applied to the verified linked Supabase project.
   - Post-apply anonymous proof passed: protected-row inserts were denied with RLS `42501`; public field-note count remains 0.
   - Do not accept external tester data until separately approved controlled author/unrelated-user proof passes with test-data cleanup/retention decided.

3. **Public copy gate**
   - `/support`, `/field-notes`, `/new-request`, and `/knowledge` received a local safety-boundary pass on 2026-07-15.
   - Nate still needs to review release-facing copy before treating it as public-approved.

4. **Support / safety gate**
   - `/support` gives controlled testers a no-send copyable feedback path.
   - Real support-ticket persistence, escalation ownership, and external tester data entry still require later privacy/support decisions.

## Recommended Next Slice

Latest completed live slice: **pre-alpha RLS hardening applied; anonymous proof passed**.

```text
RLS_HARDENING_APPLIED_ANON_PROOF_PASSED
```

What changed:

- remote migration history records `20260719000000_prealpha_privacy_hardening.sql`;
- new help requests default private; field notes are restricted by default and publication-only for anonymous reads; the app persists a privacy acknowledgement;
- post-apply anonymous proof passed: attempts to insert shop cards, help requests, and field notes were denied by RLS `42501`, and no probe data was created.

Remaining state:

- no public release/deploy/GitHub push/service-role access occurred;
- controlled authenticated author/unrelated-user proof still needs separate approval because it requires test accounts/data and a cleanup or retention decision.

Recommended next actions:

1. Approve a bounded authenticated-role RLS proof using controlled non-neighbor test accounts/data and explicit cleanup.
2. Keep the public release gate closed and external tester data out until that proof passes.
3. Then run the private walkthrough and decide whether to design support persistence or request-response/completion.

## Blockers

- Authenticated-role RLS proof needs an explicit controlled-test-data and cleanup/retention authorization.
- Need Nate approval before opening public release gate or changing public-facing promises.
- Need support ownership design before persistent support intake.

## Last Verified

2026-07-19 — Applied `20260719000000_prealpha_privacy_hardening.sql` through the verified linked Supabase CLI after a clean dry-run and Nate’s explicit approval. Remote migration history matches. Post-apply anonymous read/write-denial proof passed; no secrets printed and no probe data persisted.
