# NEXT.md — ShopFloor

_Last updated: 2026-07-22_

## What this project is

ShopFloor is a neighborhood repair and mutual-aid network for Akron, Ohio.

Core pitch: **When something breaks, start with the neighborhood.**

Current mission frame: **Aid is the visible action. Relationship is the infrastructure.**

## Current status

Repo: `https://github.com/kn8-codes/shopfloor`  
Canonical branch: `main`  
Current HEAD: see `git log --oneline -1` locally; this file avoids self-referential commit churn.  
Current verified implementation commit: `303fde1` or later local `main`; check `git log --oneline -1` before implementation.

ShopFloor has a SvelteKit app under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, a file-backed Markdown knowledge base under `app/src/lib/content/kb/`, an explicit public release gate, tester support intake, field-note creation v0, AgentsRoom team scaffolding under `AGENTSROOM_TEAM/`, and a local-only alpha readiness/orientation packet at `docs/plans/2026-07-22-shopfloor-alpha-readiness-orientation-packet.md`.

## Current verified app shape

Prototype routes exist and render/build:

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

Current app capabilities:

- Shared app shell/nav exists.
- Public release gate exists in `app/src/routes/+layout.svelte`.
- Supabase client setup exists.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card when Supabase/auth are enabled.
- Feed can load live safe-to-share requests from `help_requests_with_author` when configured.
- Feed and request detail have visibly labeled sample fallback behavior.
- Request detail has sample-only `Local support options`, explicitly not endorsements, eligibility decisions, or a complete directory.
- Shop detail can show live profile/tools/field notes when configured.
- Markdown knowledge base MVP exists with wiki-style links and starter tool/guide/concept content.
- Support/feedback intake route exists at `/support` as a no-send, copyable tester note for controlled alpha walkthroughs.
- Public About/mission page exists at `/about` and is linked from app shell.
- Field-notes archive route exists and can load live notes or sample fallback.
- Field-note creation v0 exists at `/field-notes/new`, with validation, preview, and gated save behavior.

## What is not implemented yet

The following are **open work**, not current code:

- Live request response form/action.
- Request completion flow.
- Time ledger/history UI.
- Atomic completion-to-ledger RPC.
- Structured tools/resources persistence as a reviewed live product surface.
- Persistent/routed support-ticket intake.
- Live write-denial and management/schema metadata verification for public alpha.
- Public copy approval and release-gate opening.

If another agent sees older evidence claiming responses/completion/ledger exist, treat that as historical drift until a commit containing current code is found and verified by file reads.

## Release gate

Public release is intentionally gated:

```text
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false
```

or unset means closed.

Do not set:

```text
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true
```

without explicit Nate approval after data, privacy, and local-trust checks.

Deployment notes:

```text
docs/deployment/shopfloor-belt-works-launch.md
```

## Knowledge base MVP

Canonical implementation guide:

```text
docs/KNOWLEDGE_BASE_IMPLEMENTATION.md
```

Source content root:

```text
app/src/lib/content/kb/
```

Starter entries include:

- `tools/multimeter.md`
- `tools/usb-c-receptacle.md`
- `tools/heat-gun.md`
- `guides/no-charge-first-checks.md`
- `guides/usb-c-port-failure.md`
- `guides/data-retrieval-triage.md`
- `concepts/stop-conditions.md`
- `concepts/privacy-first-handling.md`
- `templates/kb-entry-template.md`

Caveat: starter KB entries still need Nate review before being treated as authoritative public material.

## Current product decisions

- ShopFloor centers on practical local help and durable local relationship, not gig-style task extraction.
- The knowledge base starts as curated Markdown, not a database table or CMS.
- Tools/resources are core support data, but should not become a standalone rental marketplace before the help loop is useful.
- Field notes are what happened; knowledge base entries are what we learned.
- Time credits/history can support trust later, but should not block people from receiving help in the MVP.
- No cash conversion, hour bidding, skill-based rates, public leaderboards, escrow, or ratings-as-punishment.
- Low/no-data access belongs on the roadmap for early beta/release-candidate readiness; it is not an alpha blocker.
- Sample support panels must stay clearly labeled as unverified, non-endorsement support data.

## Current gaps / blockers

1. **Private walkthrough still gated**
   - Migration `20260719000000_prealpha_privacy_hardening.sql` is applied to the verified linked Supabase project.
   - Anonymous proof passed.
   - Controlled authenticated author/unrelated-user proof passed on 2026-07-22 with synthetic data and cleanup.
   - Do not use real neighbor/tester data until Nate approves the private walkthrough/support handling.

2. **Request response / completion missing**
   - Help request creation exists.
   - Response, completion, and time-history loops are not current code.

3. **Tester support intake is first-pass only**
   - `/support` exists as a no-send, copyable feedback packet for controlled alpha walkthroughs.
   - Backend persistence, routing, and support ownership still need a later design before broader public alpha.

4. **Structured tools/resources mismatch**
   - Product docs and sample data show tools/resources as core.
   - Current live persistence is not yet a reviewed first-class resource surface.

5. **Public copy review**
   - `/support`, `/field-notes`, `/new-request`, and `/knowledge` received a local safety-boundary pass on 2026-07-15.
   - `/about`, README status, and release-facing copy still require Nate review before public approval.

## Highest-priority next move

The pre-alpha RLS hardening migration and proofs are complete:

```text
RLS_HARDENING_APPLIED_AUTHENTICATED_PROOF_PASSED
```

- Remote migration history records `20260719000000_prealpha_privacy_hardening.sql`; it restricts new field notes by default, makes public reads publication-only, persists acknowledgements, and closes owner-read gaps.
- Post-apply anonymous proof passed: protected-row inserts were denied with RLS `42501`; no probe data was created; public field-note count remains zero.
- Controlled authenticated-role proof passed on 2026-07-22 with synthetic data and cleanup: author could create/read own private request, restricted Field Note, and hidden shop card; unrelated user and anonymous reads were denied; unrelated author-spoof insert was denied; `help_requests_with_author` preserved RLS; cleanup left zero synthetic rows/users.
- Local-only Alpha Readiness + Orientation packet exists at `docs/plans/2026-07-22-shopfloor-alpha-readiness-orientation-packet.md`.

Next useful gate options:

1. Review the Alpha Readiness + Orientation packet.
2. Approve a controlled private walkthrough plan with synthetic data only.
3. Keep the public release gate closed and external tester data out until that walkthrough/support handling is explicitly approved.
4. Only then consider support-ticket persistence or request-response/completion.

## If another agent picks this up

Do not redesign the concept.

Start from `main`, read:

1. `STATE.md`
2. this `NEXT.md`
3. `docs/EVIDENCE.md`
4. `docs/foundry/MANAGER_CONTEXT_SNAPSHOT.md`
5. `docs/deployment/shopfloor-belt-works-launch.md`
6. `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`
7. relevant route/content files under `app/src/`

Then make the smallest useful improvement and record evidence.
