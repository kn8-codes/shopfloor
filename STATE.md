# Current State — ShopFloor

_Last updated: 2026-06-09_

## Active Goal

Push ShopFloor Sprint 1 to a visible, useful alpha state.

Current focus:

1. Keep GitHub `main` as the clean morning recovery source for all agents.
2. Make the Markdown knowledge base visible and editable.
3. Close the small truth/privacy/demo risks found in the 2026-06-09 code review.
4. Turn ShopFloor philosophy into public/about-page copy.
5. Continue practical alpha work without letting infrastructure spikes eat the day.

## Right Now

ShopFloor is a SvelteKit app with Supabase-backed prototype flows and a Markdown knowledge base MVP.

Current verified technical state before this review-fix branch:

- Repo: `https://github.com/kn8-codes/shopfloor`
- Canonical branch: `main`
- Latest pushed HEAD: `2db884f docs: update shopfloor sprint state`
- KB MVP commit: `b8ab43c feat: add markdown knowledge base MVP`
- Build-fix commit: `8a6d550 fix: run shopfloor route loads on server`
- Docs/state commit: `2db884f docs: update shopfloor sprint state`
- `npm ci`, `npm run check`, and `npm run build` passed on M1 before the KB MVP push on 2026-06-09.
- `svelte-check` passed with 0 errors and 0 warnings before the docs/state commit.
- Venkman, Janine, and Winston have pulled or cloned GitHub `main` at `2db884f`.

## What Seems Done

- Concept and product direction documented.
- First prototype routes exist.
- Supabase client/auth/request/shop-card wiring exists.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card.
- Feed currently renders sample requests.
- Shop detail and request detail try live Supabase data when configured.
- Markdown knowledge base MVP exists and renders through `/knowledge` routes.
- KB implementation guide exists at `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`.
- Starter KB content exists for repair tools, triage guides, and safety/privacy concepts.

## Explicitly Not Done Yet

These are open work, not current implementation:

- Request responses schema/RLS and live response form.
- Request completion flow.
- Time ledger/history tables and UI.
- Atomic completion-to-ledger RPC.
- Field note creation route/form.
- Structured tools/resources persistence.
- Public About/mission page in the app.
- User support/feedback intake.

## Known Gaps / Open Work

1. Live Supabase/database privacy verification remains incomplete.
2. `help_requests_with_author` must use `security_invoker = true` in live Supabase and be verified with an anon-key test.
3. Structured tools/resources are still not persisted as first-class schema objects.
4. Field note creation flow is missing.
5. Auth/testing path needs hardening before broader alpha.
6. Public mission/about page is not implemented in the app yet.
7. User support/feedback intake is missing.
8. Knowledge base starter entries need Nate edit/review before being treated as authoritative.
9. Server-side Supabase loader currently uses the shared anon client only for public reads; do not add authenticated server behavior there without a per-request server client.

## Next Best Action

Recommended next slice:

1. Finish and verify the code-review fixes: truth docs, privacy view setting, honest demo fallback.
2. Preview or deploy the KB MVP so Nate can see and edit against the real surface.
3. Add/update public ShopFloor About/mission page copy from the relationships draft.
4. Create a bounded next implementation task for field-note creation or structured tools/resources, but do not start both at once.

## Blockers

- Need Nate approval before publishing/deploying public-facing copy.
- Need live Supabase env/schema verification for true end-to-end privacy testing.
- Need a decision on whether structured tools/resources wait until after public alpha surface is visible.

## Open Questions for Nate

- Should the next visible public page be the ShopFloor About/mission page or KB index polish?
- Should field-note creation or structured tools/resources be the next app feature after KB?
- Should KB starter entries be marked public-alpha/starter visibly until Nate reviews them?

## Last Verified

2026-06-09
