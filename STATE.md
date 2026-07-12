# Current State — ShopFloor

_Last updated: 2026-07-12_

## Active Goal

Advance ShopFloor toward a visible, useful public-alpha mutual-aid loop while preserving the release/privacy gates.

Current focus:

1. Keep GitHub `main` as the clean recovery source for all agents.
2. Keep state docs truthful enough that agents do not plan from historical drift.
3. Preserve the public release gate until Nate approves public copy, live privacy checks, and local-trust readiness.
4. Prepare one bounded mission-facing slice at a time: field-note creation, support/feedback intake, or public-copy audit.
5. Avoid infrastructure theater when the next user-facing loop is still unfinished.

## Right Now

ShopFloor is a SvelteKit app under `app/` with Supabase-backed prototype wiring, a file-backed Markdown knowledge base MVP, public-alpha orientation surfaces, and an explicit launch gate.

Current verified technical state for this reconciliation:

- Repo: `https://github.com/kn8-codes/shopfloor`
- Canonical branch: `main`
- Current HEAD: `11a6371 Document ShopFloor home deployment procedure`
- Tracking state: `main...origin/main`
- App root: `app/`
- Verification timestamp: 2026-07-12 14:08 EDT
- Verification commands include `git status --short --branch`, `git log --oneline -10`, code/file reads, filtered grep, `npm run check`, and `npm run build`.

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
- Field-notes archive page exists at `/field-notes` and renders sample field notes.
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
- Field-note creation route/form is not present; `/field-notes` is an archive/sample display route.
- Structured tools/resources persistence is not complete as a first-class live product surface.
- Live Supabase/privacy verification for public alpha is still required before external tester data is entered.
- README status still says `No app code yet`; this was not edited during this sprint because it is public-facing repo copy and should be approved separately.

## Important Drift Notes

Historical evidence from 2026-05-25 describes request responses, completion, and ledger work, but later review corrected that as stranded/historical drift. Current code reads during this sprint found:

- `request_responses` only in sample data/planning/evidence text, not live route/form/schema implementation.
- `time_ledger_entries` only in docs/evidence/planning text, not current app/schema code.
- Field notes table and RLS policies exist in `supabase/schema.sql`, but there is no current field-note creation route/form.
- Local support options are sample fixtures and must remain clearly labeled as unverified, non-endorsement support data.

## Current Alpha Gates

1. **Public release gate**
   - `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false` or unset keeps the public app closed.
   - Do not set true without explicit Nate approval.

2. **Privacy / RLS gate**
   - `help_requests_with_author` is defined with `security_invoker = true` in local schema.
   - Live Supabase must still be verified with anon-key checks before true public alpha.

3. **Public copy gate**
   - `/about`, README status, starter KB language, and release-facing copy require Nate review before treating them as public-approved.

4. **Support / safety gate**
   - `/support` now gives controlled testers a no-send copyable feedback path.
   - Real support-ticket persistence, escalation ownership, and external tester data entry still require later privacy/support decisions.

## Recommended Next Slice

With the tester support path now present, prepare **field-note creation v0** as the next mission-facing app slice, while keeping live Supabase/privacy verification as the gate before external tester data is entered.

Why field notes first:

- Field notes are the memory/flywheel of the mutual-aid loop.
- `/field-notes` already exists as an archive surface.
- `supabase/schema.sql` already includes field-note RLS policies.
- Request detail already states that resolved requests should produce a field note.
- A creation card can be scoped without deploying, migrating live Supabase, or changing public copy.

## Blockers

- Need Nate approval before opening public release gate or changing public-facing promises.
- Need live Supabase env/schema verification for true end-to-end privacy testing.
- Need field-note creation v0 before the tester loop has a memory/flywheel path.
- Need README status correction approval if editing public repo copy is in scope.

## Last Verified

2026-07-12 — `npm run check` and `npm run build` passed from `app/`; support/feedback intake route added at `/support`; tester-loop script added at `docs/plans/2026-07-12-shopfloor-tester-loop-script.md`; public release gate unchanged; no deploy/commit/push/contact performed.
