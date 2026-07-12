# ShopFloor Manager Context Snapshot

Date: 2026-07-12
Owner: ShopFloor Manager
Source assignment: `docs/foundry/assignments/2026-07-12__manager-context-review.md`
Status: CURRENT_MANAGER_SNAPSHOT

## Executive state

ShopFloor is an Akron-first neighborhood repair and mutual-aid network. The current repo state is a SvelteKit app under `app/` with Supabase-backed prototype wiring, a Markdown knowledge base MVP, a public `/about` mission page, sample/live feed handling, sample-only local support options on request detail, tester support intake, and field-note creation v0.

GitHub `main` is the current truth source. Older summaries that say "No app code yet" or "field-note creation missing" are stale unless they have been updated after commit `f1bea0e`.

## Current verified repo facts

- Project path: `/Users/kn8/projects/shopfloor`
- Remote: `https://github.com/kn8-codes/shopfloor`
- Branch: `main`
- Remote tracking: `main...origin/main`
- Current verified HEAD: `f1bea0e Add ShopFloor field note creation v0`
- Recent commits:
  - `f1bea0e Add ShopFloor field note creation v0`
  - `d9ca12a Add ShopFloor tester support intake`
  - `11a6371 Document ShopFloor home deployment procedure`
  - `1dd1df3 Gate ShopFloor public release`
  - `6b3a6f7 Clarify ShopFloor request gate copy`
- Required app checks from `app/`: `npm run check` and `npm run build` passed on 2026-07-12.

## Implemented surfaces

Prototype routes named by current state docs:

- `/`
- `/about`
- `/feed`
- `/field-notes`
- `/field-notes/new`
- `/how-it-works`
- `/new-request`
- `/login`
- `/shop/new`
- `/shop/[handle]`
- `/request/[id]`
- `/knowledge`
- `/knowledge/[...slug]`
- `/support`

Current implemented/product slices:

- Shared SvelteKit app shell/navigation.
- Supabase client setup and Magic Link scaffold.
- Shop card creation/upsert flow.
- Help request creation flow requiring a shop card.
- Feed route with live safe-to-share loader plus visible sample fallback.
- Live-capable shop detail and request detail routes with sample fallback.
- Markdown knowledge base MVP under `app/src/lib/content/kb/` with `/knowledge` routes.
- Public `/about` page linked from app shell.
- Sample-data-only `Local support options` panel on request detail.
- `/support` tester feedback route as no-send, copyable intake.
- `/field-notes` archive with live-capable loader and sample fallback.
- `/field-notes/new` field-note creation v0 with request context, validation, preview, and gated save behavior.

## Explicitly not done / open work

Treat these as open unless a later code review proves otherwise:

- Live Supabase/privacy verification against production/preview credentials.
- Public release approval and gate opening.
- Live request response form/action.
- Request completion flow.
- `time_ledger_entries` table/history in current schema/app.
- Atomic completion-to-ledger RPC.
- Structured tools/resources persistence as first-class live product surface.
- Persistent/routed support-ticket intake.
- Nate review/edit of `/about`, README, and KB starter entries before treating them as public-approved copy.

## Mission guardrails

Preserve these as release gates and worker constraints:

- Akron-first mutual aid.
- Relationship as infrastructure.
- Dignity, consent, accountability, and local trust.
- No public ratings/humiliation mechanics.
- No gig-economy extraction disguised as help.
- Barriers to help are bugs.
- Safety and human judgment over speed.

## Known blockers / gates

- Public release/deploy/publishing remains approval-gated.
- Live Supabase privacy/RLS verification is still incomplete and credential-gated.
- `help_requests_with_author` must be verified live as `security_invoker = true` with anon-key checks before trusting privacy behavior.
- Current field-note schema has public read policy; acceptable for prototype archive but must be reviewed before external tester data.
- Structured tools/resources remain a product/schema mismatch: core in docs/sample data, not persisted as first-class schema objects.
- `/support` is no-send/copyable only; persistence and escalation ownership are not designed.

## Recommended first manager task

Create a bounded **private proof and privacy verification packet** for Egon/Nate:

1. Verify live Supabase env/schema/RLS behavior using anon-key and authenticated test-user checks.
2. Walk through the private product loop: create/request review -> support path -> field-note draft.
3. Document exactly what would leak, what stays gated, and what copy needs Nate review before external tester data.
4. Recommend one next implementation card only after the proof: request-response/completion v0, support-ticket persistence, or resource persistence.

Default recommendation: do not add another major feature until live privacy and private proof are verified.

## Manager operating notes

- Do not edit app/source without explicit assignment.
- Run app checks from `app/`, not repo root.
- Do not deploy, install dependencies, change Supabase/Vercel/DNS, touch secrets/sessions, or publish public copy without approval.
- Treat receipts and current git as source of truth when older summary docs conflict.
