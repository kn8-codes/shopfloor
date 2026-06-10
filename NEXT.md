# NEXT.md — ShopFloor

_Last updated: 2026-06-10_

## What this project is

ShopFloor is a neighborhood repair and mutual-aid network for Akron, Ohio.

Core pitch: **When something breaks, start with the neighborhood.**

Current mission frame: **Aid is the visible action. Relationship is the infrastructure.**

## Current status

Repo: `https://github.com/kn8-codes/shopfloor`  
Canonical branch: `main`  
Current verified HEAD before this review-fix branch: `2db884f docs: update shopfloor sprint state`

ShopFloor has a SvelteKit app under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, and a file-backed Markdown knowledge base under `app/src/lib/content/kb/`.

## What is done at current HEAD

Prototype routes exist and render:

- `/`
- `/about`
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
- Feed currently renders sample requests.
- Shop detail and request detail load live Supabase records when available.
- Sample fallback exists only for demo/no-Supabase mode and should be visibly labeled.
- Markdown knowledge base MVP exists with wiki-style links and starter tool/guide/concept content.
- Public About/mission page exists at `/about` and is linked from the app shell.

## What is not implemented yet

The following are **open work**, not current code:

- `request_responses` table and RLS policies.
- Live request response form/action.
- Request completion flow.
- `time_ledger_entries` table/history.
- Atomic completion-to-ledger RPC.
- Shop profile time history.
- Field note creation route/form.
- Structured tools/resources persistence.

If another agent sees older evidence claiming those exist, treat that as historical drift until a commit containing the code is found.

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

1. **Truth integrity after review**
   - State docs have been corrected so they no longer describe response/completion/ledger code as present.
   - Peer machines were checked; no stranded implementation was found outside `main`.

2. **Live database privacy verification**
   - `supabase/schema.sql` should set `help_requests_with_author` to `security_invoker = true` so RLS applies through the view.
   - Live Supabase must still be migrated/verified with anon-key checks.

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

1. Review/edit the `/about` mission page copy for Nate voice, risk, and public promises.
2. Preview/deploy the Knowledge Base MVP plus About page so Nate can edit against the real surface.
3. Add a simple field-note creation path or prepare the next bounded task card for it.
4. Decide whether structured tools/resources wait until after the public alpha surface is visible.

## If another agent picks this up

Do not redesign the concept.

Start from `main`, read:

1. `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`
2. this `NEXT.md`
3. `STATE.md`
4. `README.md`
5. relevant route/content files under `app/src/`

Then make the smallest useful improvement and record evidence.
