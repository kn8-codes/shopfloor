# NEXT.md — ShopFloor

_Last updated: 2026-07-13_

## What this project is

ShopFloor is a neighborhood repair and mutual-aid network for Akron, Ohio.

Core pitch: **When something breaks, start with the neighborhood.**

Current mission frame: **Aid is the visible action. Relationship is the infrastructure.**

## Current status

Repo: `https://github.com/kn8-codes/shopfloor`  
Canonical branch: `main`  
Current HEAD: `57aa70b Refresh ShopFloor dry proof state`  
Current verified implementation commit: `f606516 Harden ShopFloor private proof gate`

ShopFloor has a SvelteKit app under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, a file-backed Markdown knowledge base under `app/src/lib/content/kb/`, an explicit public release gate, tester support intake, field-note creation v0, and AgentsRoom team scaffolding under `AGENTSROOM_TEAM/`.

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
- Live Supabase/privacy verification for public alpha.
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

1. **Public release approval**
   - Release gate exists and must stay closed until Nate approves opening it.

2. **Live database privacy verification**
   - Local schema defines `help_requests_with_author` with `security_invoker = true`.
   - Live Supabase must still be migrated/verified with anon-key checks.
   - Field notes are public-readable in the current schema and need privacy review before external tester data.

3. **Request response / completion missing**
   - Help request creation exists.
   - Response, completion, and time-history loops are not current code.

4. **Tester support intake is first-pass only**
   - `/support` exists as a no-send, copyable feedback packet for controlled alpha walkthroughs.
   - Backend persistence, routing, and support ownership still need a later design before broader public alpha.

5. **Structured tools/resources mismatch**
   - Product docs and sample data show tools/resources as core.
   - Current live persistence is not yet a reviewed first-class resource surface.

6. **Public copy review**
   - `/about`, README status, and starter KB copy still require Nate review before public approval.

## Highest-priority next move

Dry private-proof pivot has passed:

```text
DRY_PRIVATE_PROOF_PASSED_LIVE_PRIVACY_VERIFY_GATED
```

Verified locally:

- `scripts/shopfloor_privacy_probe.mjs` refuses live Supabase unless `--confirm-live` is passed;
- write-denial probes require `--include-write-denial`;
- `npm run check` passed;
- `npm run build` passed;
- local route smoke passed for `/support`, `/field-notes`, and `/field-notes/new`.

Next live gate:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
```

After approval, run one bounded proof slice:

1. read-only live anon checks with `node scripts/shopfloor_privacy_probe.mjs --confirm-live`;
2. if read-only behavior is understood, decide whether to run `--include-write-denial`;
3. private internal walkthrough: request -> support path -> field note draft;
4. only then consider support-ticket persistence or request-response/completion.

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
