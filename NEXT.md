# NEXT.md — ShopFloor

_Last updated: 2026-05-24_

## What this project is

ShopFloor is a **neighborhood repair time bank** for Akron, Ohio.

Core pitch:

> When something breaks, start with the neighborhood.

Working product sentence:

> Trade time, tools, and know-how with people nearby.

## Current status

Frontend prototype exists in SvelteKit and is partially wired to real app behavior.
Repo: `https://github.com/kn8-codes/shopfloor`
Local branch: `chore/stack-os-shopfloor-audit`

The project now has MWP / Stack OS files for disciplined agent/human work:

- `PROJECT_CHARTER.md`
- `AGENTS.md`
- `STATE.md`
- `NEXT.md`
- `docs/DECISIONS.md`
- `docs/EVIDENCE.md`
- `work/`

## Current product decisions

- ShopFloor centers on **neighborhood repair time banking**.
- Tools/resources and field notes support the time-bank loop.
- Time credits start as **history/trust signal**, designed to become spendable later.
- One hour equals one credit by default.
- Negative balances should not block people from receiving help in MVP.
- Completion/hours should eventually be confirmed by both sides; MVP may start with request-author confirmation.
- Tool loans do not earn credits in the first pass unless explicitly added later.
- No cash conversion, hour bidding, skill-based rates, public leaderboards, escrow, or ratings-as-punishment.

## What is done

- SvelteKit app scaffold exists under `app/`.
- Prototype routes exist and render:
  - `/`
  - `/feed`
  - `/field-notes`
  - `/how-it-works`
  - `/new-request`
  - `/login`
  - `/shop/new`
  - `/shop/[handle]`
  - `/request/[id]`
- Shared sample data includes profiles, tools, help requests, request responses, and field notes.
- Shared app shell/nav exists.
- Supabase client setup exists:
  - `app/src/lib/supabase.js`
  - `app/.env.example`
- Magic Link auth scaffold exists.
- Request submission flow is wired.
- Shop card creation flow is wired.
- Supabase schema file exists:
  - `supabase/schema.sql`
- Shop detail and request detail try live Supabase first, then seed fallback.

## Current gaps / blockers

1. **No request response table/live flow**
   - Sample data has responses.
   - `docs/mvp-schema.md` mentions responses.
   - `supabase/schema.sql` does not yet define `request_responses`.
   - UI does not write/read live responses.

2. **No completion flow**
   - Requests can be created, but not completed through the app.
   - Completion is required before time history/ledger can mean anything.

3. **No time-bank model yet**
   - Decision is locked conceptually.
   - Schema/UI are not implemented.
   - MVP should begin with completion-linked time history, not a full financialized ledger.

4. **Structured tools mismatch**
   - Product direction and sample data treat tools/resources as important.
   - `supabase/schema.sql` does not yet include a `tools` table.
   - `/shop/new` captures tools as free text, parses them, then does not persist them as structured inventory.

5. **Live feed missing**
   - `/feed` renders sample requests only.
   - Existing Supabase view `help_requests_with_author` could support live feed.

6. **No live Supabase/Vercel verification yet**
   - Need env keys and applied schema for true end-to-end verification.

## Highest-priority next move

Run a time-boxed MWP test sprint from **8:00pm–midnight**.

Goal:

> Prove the operating workflow while implementing the smallest useful slice of the time-bank loop.

Tonight should prioritize the path:

```text
request response → completion → time history/ledger stub → structured tools as support
```

Do not start with polished dashboards.
Do not build full time-bank accounting.
Do not build reservations, ratings, payments, or disputes.

## Active plan

Use:

```text
docs/plans/2026-05-24-2000-0000-mwp-time-bank-test-run.md
```

For the post-MWP work breakdown, use:

```text
docs/plans/2026-05-25-shopfloor-sprint-table.md
```

The sprint table breaks remaining work into small co-working/test-along sessions Nate can run when time is available.

## If another agent picks this up

Follow the MWP / Stack OS rail:

1. Read `PROJECT_CHARTER.md`, `AGENTS.md`, `STATE.md`, `NEXT.md`, and `docs/DECISIONS.md`.
2. Pick exactly one task card.
3. Update evidence as work is verified.
4. Keep implementation small.
5. Do not redesign the concept.
6. Do not route work to retired Peter/OpenClaw.
7. Use Winston/Jeep only as fallback/diagnostic.
8. Prefer deterministic scripts for checks and reports.

## Working rule

This file should be updated whenever a meaningful milestone lands or the next highest-priority move changes.
