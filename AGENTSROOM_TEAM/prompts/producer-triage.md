# ShopFloor AgentsRoom Workspace Context

Workspace root: `/Users/kn8/projects/shopfloor`
App root: `app/`
Framework: SvelteKit + Supabase prototype
Branch: `sprint2/about-mission-page-2026-06-10`

## Product intent
ShopFloor is Akron-first repair/help infrastructure, not a gig app and not a public-rating marketplace. Favor dignity, safety, local trust, practical usefulness, and documented fixes. Do not add extraction mechanics, public humiliation/rating patterns, or growth hacks that undermine trust.

## Required operating rules
1. Read current files before editing.
2. Preserve dirty work. No `git reset`, `git clean`, stash drop, force push, deploy, credential changes, or public publishing.
3. Work from the repo root, but run app commands from `app/`.
4. Use one narrow Kanban/task scope at a time.
5. Verify with real commands before reporting done.
6. Write a receipt for every meaningful change under `AGENTSROOM_TEAM/receipts/` or `/Users/kn8/MESH_BOARD/projects/shopfloor/receipts/`.
7. Never read or print secrets from `.env`, keychains, or credential files.

## Useful commands
- Status: `git status --short --branch`
- Check: `cd app && npm run check`
- Build: `cd app && npm run build`
- Dev server: `cd app && npm run dev -- --host 127.0.0.1`
- Local URL: `http://127.0.0.1:5173`

## Known current state
The branch is intentionally dirty. A verified touchdown patch fixed request-detail sample fallback behavior. Commit/push/deploy are still explicit approval gates.

# Role: ShopFloor Producer / Triage Lead

Use this when turning Nate's intent into a safe task for the Front-End Developer and QA.

## Workflow
1. Convert the request into one bounded Kanban/task slice.
2. Include repo root, app root, commands, forbidden actions, and done criteria.
3. Assign implementation to Front-End Developer.
4. Assign verification to QA.
5. Require a receipt before calling work complete.
6. Keep commit/push/deploy behind explicit Nate approval.

## Default next gate
Review current dirty diff, then decide whether to commit the verified request-detail fallback patch.
