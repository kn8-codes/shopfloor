# NEXT.md — ShopFloor

_Last updated: 2026-06-09_

## What this project is

ShopFloor is a neighborhood repair and mutual-aid network for Akron, Ohio.

Core pitch: **When something breaks, start with the neighborhood.**

Current mission frame: **Aid is the visible action. Relationship is the infrastructure.**

## Current status

Repo: `https://github.com/kn8-codes/shopfloor`  
Canonical branch: `main`  
Current Sprint 1 main HEAD after KB MVP push: `8a6d550 fix: run shopfloor route loads on server`

ShopFloor has a SvelteKit app under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, and a file-backed Markdown knowledge base under `app/src/lib/content/kb/`.

## What is done

Prototype routes exist and render:

- `/`
- `/feed`
- `/field-notes`
- `/how-it-works`
- `/new-request`
- `/login`
- `/shop/new`
- `/shop/[handle]`
- `/request/[id]`
- `/knowledge`
- `/knowledge/[...slug]`

Current app capabilities:

- Shared app shell/nav exists.
- Supabase client setup exists.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card.
- Feed, shop detail, and request detail try live Supabase first, then sample fallback.
- Request responses have schema/RLS, live read support, and a request-detail response form/action.
- Request authors can mark requests resolved, optionally selecting a helper response.
- Completed helper responses can create a simple `time_ledger_entries` history record with hours helped/received.
- Shop profiles render simple time history: hours helped, hours received, and raw receipts.
- Markdown knowledge base MVP exists with wiki-style links and starter tool/guide/concept content.

## Knowledge base MVP

Sprint 1 added a curated, file-backed Markdown knowledge base.

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

Implementation files:

- `app/src/lib/content/kb.js`
- `app/src/routes/knowledge/+page.server.js`
- `app/src/routes/knowledge/+page.svelte`
- `app/src/routes/knowledge/[...slug]/+page.server.js`
- `app/src/routes/knowledge/[...slug]/+page.svelte`

## Current product decisions

- ShopFloor centers on practical local help and durable local relationship, not gig-style task extraction.
- The knowledge base starts as curated Markdown, not a database table or CMS.
- Tools/resources are core support data, but should not become a standalone rental marketplace before the help loop is useful.
- Field notes are what happened; knowledge base entries are what we learned.
- Time credits/history can support trust later, but should not block people from receiving help in the MVP.
- No cash conversion, hour bidding, skill-based rates, public leaderboards, escrow, or ratings-as-punishment.
- Low/no-data access belongs on the roadmap for early beta/release-candidate readiness; it is not an alpha blocker.

## Current gaps / blockers

1. **Live completion → ledger verification still needed**
   - Code exists for completion and helper-hours ledger creation.
   - Live Supabase/browser end-to-end verification is not complete.

2. **Completion + ledger insert is not atomic yet**
   - Current client helper updates `help_requests` first and inserts `time_ledger_entries` second.
   - This is acceptable for MWP, but should become a Postgres RPC before broader alpha.

3. **Structured tools/resources mismatch**
   - Product docs say tools are core.
   - Sample data has structured tools.
   - Current SQL schema does not include a structured tools/resources table.
   - `/shop/new` captures tools as free text, parses it, then returns parsed tools in the success payload without persisting structured inventory.

4. **Field note creation flow missing**
   - Field notes are modeled and sampled, but there is not yet a live creation route.

5. **Auth/testing friction**
   - Magic Link is acceptable for MWP but broader testing may need email/password, custom SMTP, or a safe dev-only session strategy.

6. **Public mission/about page still needed**
   - The Belt/ShopFloor public philosophy draft exists outside the app, but it still needs to become public site copy/page work.

7. **User support / feedback intake missing**
   - Before broader alpha, users need a way to report bugs, support issues, and feature requests.

## Highest-priority next move

Use GitHub `main` as the morning truth.

Next good work slices:

1. Preview/deploy the Knowledge Base MVP so Nate can edit against the real surface.
2. Turn the ShopFloor relationships/public-statement draft into About/mission page copy.
3. Add a simple field-note creation path or prepare the next bounded task card for it.
4. Decide whether structured tools/resources wait until after the public alpha surface is visible.

## If another agent picks this up

Do not redesign the concept.

Start from `main`, read:

1. `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`
2. this `NEXT.md`
3. `README.md`
4. relevant route/content files under `app/src/`

Then make the smallest useful improvement and record evidence.
