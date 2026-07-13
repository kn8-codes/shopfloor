# Current State — ShopFloor

_Last updated: 2026-07-13_

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

- Live Supabase/privacy verification against production or preview credentials.
- Public release approval and gate opening.
- Nate review/approval of `/about` public voice, risk, and promises.
- Nate review of starter KB entries before treating them as authoritative.
- Live request response form/action is not present in current app code.
- Request completion flow is not present in current app code.
- Time ledger/history UI is not present in current app code.
- Atomic completion-to-ledger RPC is not present in current app code.
- Structured tools/resources persistence is not complete as a first-class live product surface.
- Live Supabase/privacy verification for public alpha is still required before external tester data is entered.
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
   - `help_requests_with_author` is defined with `security_invoker = true` in local schema.
   - Live Supabase must still be verified with anon-key checks before true public alpha.
   - Field notes currently have public read policy in schema; this is acceptable for the prototype archive but must be reviewed before external tester data.

3. **Public copy gate**
   - `/about`, starter KB language, and release-facing copy require Nate review before treating them as public-approved.

4. **Support / safety gate**
   - `/support` gives controlled testers a no-send copyable feedback path.
   - Real support-ticket persistence, escalation ownership, and external tester data entry still require later privacy/support decisions.

## Recommended Next Slice

Latest completed slice: **live read-only privacy probe blocked before RLS by Supabase project DNS**.

```text
LIVE_PRIVACY_VERIFY_READONLY_BLOCKED_DNS
```

Nate approved read-only anon live verification. The probe used local `app/.env` without printing secrets, did not run write-denial probes, and failed before reaching Supabase because the configured project host returned `ENOTFOUND`. Public `supabase.co` resolves from this machine.

Previous completed slice: **dry private-proof pivot**.

```text
DRY_PRIVATE_PROOF_PASSED_LIVE_PRIVACY_VERIFY_GATED
```

What changed:

- privacy probe now refuses live Supabase access unless `--confirm-live` is passed;
- anon insert-denial probes require the additional `--include-write-denial` flag;
- `npm run check` and `npm run build` passed from `app/`;
- local dry route smoke passed for `/support`, `/field-notes`, and `/field-notes/new`.

Next useful slice is **live Supabase/privacy verification** after explicit approval.

Recommended next actions:

1. Approve and run read-only live anon checks with `APPROVE SHOPFLOOR LIVE PRIVACY VERIFY`.
2. Only after read-only live behavior is understood, decide whether to run write-denial probes.
3. Then run a private internal walkthrough: request -> support path -> field note draft.
4. Only then decide whether to design support-ticket persistence or request-response/completion.

## Blockers

- Need Nate approval before opening public release gate or changing public-facing promises.
- Need live Supabase env/schema verification for true end-to-end privacy testing.
- Need private proof before external tester data is entered.
- Need support ownership design before persistent support intake.

## Last Verified

2026-07-13 — Dry private-proof pivot implementation committed as `f606516 Harden ShopFloor private proof gate`, with state refresh committed after it. The privacy probe now requires explicit `--confirm-live` before any Supabase network access, `--include-write-denial` before anon insert-denial probes, `npm run check` passed with 0 errors / 0 warnings, `npm run build` passed, and local dry route smoke passed for `/support`, `/field-notes`, and `/field-notes/new`. Live privacy verification remains gated behind `APPROVE SHOPFLOOR LIVE PRIVACY VERIFY`.
