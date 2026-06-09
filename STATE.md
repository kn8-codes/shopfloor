# Current State — ShopFloor

_Last updated: 2026-06-09_

## Active Goal

Push ShopFloor Sprint 1 to a visible, useful alpha state.

Current focus:

1. Keep GitHub `main` as the clean morning recovery source for all agents.
2. Make the Markdown knowledge base visible and editable.
3. Turn ShopFloor philosophy into public/about-page copy.
4. Continue practical alpha work without letting infrastructure spikes eat the day.

## Right Now

ShopFloor is a SvelteKit app with Supabase-backed prototype flows and a newly added Markdown knowledge base MVP.

Current verified technical state:

- Repo: `https://github.com/kn8-codes/shopfloor`
- Canonical branch: `main`
- Latest pushed HEAD: `8a6d550 fix: run shopfloor route loads on server`
- KB MVP commit: `b8ab43c feat: add markdown knowledge base MVP`
- Build-fix commit: `8a6d550 fix: run shopfloor route loads on server`
- `npm ci`, `npm run check`, and `npm run build` passed on M1 before push on 2026-06-09.
- `svelte-check` passed with 0 errors and 0 warnings.
- Venkman, Janine, and Winston have pulled or cloned GitHub `main` at `8a6d550`.

## What Seems Done

- Concept and product direction documented.
- First prototype routes exist.
- Supabase client/auth/request/shop-card wiring exists.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card.
- Feed, shop detail, and request detail try live Supabase first, then sample fallback.
- Request responses, request completion, and simple time ledger/history are implemented at MWP level.
- Markdown knowledge base MVP exists and renders through `/knowledge` routes.
- KB implementation guide exists at `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`.
- Starter KB content exists for repair tools, triage guides, and safety/privacy concepts.

## Known Gaps / Open Work

1. Live Supabase/browser verification of completion → ledger remains incomplete.
2. Completion plus ledger insert is not atomic and should become a Postgres RPC before broader alpha.
3. Structured tools/resources are still not persisted as first-class schema objects.
4. Field note creation flow is missing.
5. Auth/testing path needs hardening before broader alpha.
6. Public mission/about page is not implemented in the app yet.
7. User support/feedback intake is missing.
8. Knowledge base starter entries need Nate edit/review before being treated as authoritative.

## Next Best Action

Recommended next slice:

1. Preview or deploy the KB MVP so Nate can see and edit against the real surface.
2. Add/update public ShopFloor About/mission page copy from the relationships draft.
3. Create a bounded next implementation task for field-note creation or structured tools/resources, but do not start both at once.

## Blockers

- Need Nate approval before publishing/deploying public-facing copy.
- Need live Supabase env/schema verification for true end-to-end testing.
- Need a decision on whether structured tools/resources wait until after public alpha surface is visible.

## Open Questions for Nate

- Should the next visible public page be the ShopFloor About/mission page or the KB index polish?
- Should field-note creation or structured tools/resources be the next app feature after KB?
- Should KB starter entries be marked public-alpha/starter visibly until Nate reviews them?

## Last Verified

2026-06-09
