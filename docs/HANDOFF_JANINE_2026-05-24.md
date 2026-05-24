# ShopFloor Handoff for Janine — 2026-05-24

## Purpose of this handoff

Nate asked for a thorough state document so this project can be handed to Janine without relying on memory, vibes, or whichever agent last wandered through the repo with a hammer.

This document summarizes what ShopFloor is, what exists, what has been verified, what is incomplete, and what decisions need Nate/Janine attention next.

---

## Executive summary

ShopFloor is a real project, not just a placeholder.

Repo: `https://github.com/kn8-codes/shopfloor`  
Local path inspected: `/Users/kn8/projects/shopfloor`  
Default branch: `main`  
Audit branch created locally: `chore/stack-os-shopfloor-audit`

GitHub description:

> Neighborhood repair and survival network for working people. Akron-first.

The current project shape is a SvelteKit prototype with Supabase integration partially wired. Product direction, first screens, trust/safety posture, MVP schema, sample data, and several prototype routes already exist.

The strongest next product issue is not “what is this?” anymore. The repo already answers that.

The strongest next issue is:

> Does ShopFloor’s MVP treat structured tool/resource inventory as core now, or does it finish the live request loop first and defer structured tools one sprint?

Given Nate’s latest community signal — people welcomed the idea — and prior product insight that “who has the damn tool” is first-class, the recommended next move is to restore/add structured tools as a real persisted object instead of leaving tools as free text captured and discarded.

---

## What ShopFloor is

The repo’s own README defines it this way:

> ShopFloor is a neighborhood repair and survival network for working people in mid-size cities, starting in Akron.

It is designed to help people:

- find someone local who can actually help fix something
- trade tools, labor, and practical knowledge
- document what worked through structured field notes
- build trust through usefulness instead of polish

It explicitly says:

- not a gig app
- not another social platform
- city-level repair infrastructure for normal people

Current core pitch from `NEXT.md`:

> When something breaks, start with the neighborhood.

Current product direction from `docs/prototype-decisions-2026-04-19.md`:

- ShopFloor should do all three:
  - help people find local practical help
  - show what people can do
  - share tools/resources
- The first job is led by finding local practical help.
- Public-facing copy should lead with **local repair network**.
- Shop cards should show **skills + tools + field notes + neighborhood** by default.
- Tool inventory in MVP should be **structured list + lendable + availability**.

---

## Current technical state

### Stack

- SvelteKit app in `app/`
- Supabase client/auth/database integration
- Supabase SQL schema in `supabase/schema.sql`
- Static/prototype sample data in `app/src/lib/data/sample.js`

### Verification performed

Command run from `app/`:

```bash
npm ci && npm run check
```

Result:

```text
svelte-check found 0 errors and 0 warnings
```

NPM audit reported dependency vulnerabilities:

```text
5 vulnerabilities (1 low, 3 moderate, 1 high)
```

No audit fix was run. That should be handled deliberately later because automated dependency mutation is how simple afternoons become incident response cosplay.

### Repo size snapshot, excluding `.git`, `node_modules`, `.svelte-kit`, `build`, `dist`

- Total inspected files: 54
- `.svelte`: 14
- `.js`: 12
- `.md`: 12
- `.html`: 4
- `.json`: 4
- `.sql`: 1
- `.yaml`: 1
- other/small support files: remaining

---

## Existing routes/screens

Per `NEXT.md`, current prototype routes exist and render:

- `/`
- `/feed`
- `/field-notes`
- `/how-it-works`
- `/new-request`
- `/login`
- `/shop/new`
- `/shop/[handle]`
- `/request/[id]`

These map well to the first five screen plan in `docs/first-five-screens.md`:

1. Neighborhood feed
2. Request detail
3. Shop card profile
4. New request flow
5. Field note creation/archive

Important caveat: some screens are prototype/sample-data driven rather than fully live-backed.

---

## What appears complete or mostly complete

### Product/design docs

These exist and are useful:

- `README.md`
- `NEXT.md`
- `docs/prototype-decisions-2026-04-19.md`
- `docs/mvp-schema.md`
- `docs/first-five-screens.md`
- `docs/trust-and-safety-v1.md`

### UI/prototype

The app has a coherent prototype and visual direction. It is dark, utility-first, local, plain-language, and practical. Tone matches the product: not investor polish, not app-store confetti.

### Auth scaffold

Magic Link auth scaffold exists:

- `app/src/lib/stores/auth.js`
- `app/src/routes/login/+page.svelte`

### Supabase client setup

Supabase setup exists:

- `app/src/lib/supabase.js`
- `app/.env.example`

Required env keys:

```env
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

The home page checks connection health by querying `shop_cards` head/count.

### Shop card flow

Shop card creation/upsert flow exists:

- UI: `app/src/routes/shop/new/+page.svelte`
- API helper: `upsertMyShopCard()` in `app/src/lib/api.js`
- Database table: `shop_cards` in `supabase/schema.sql`

It captures:

- handle
- display name
- neighborhood
- bio
- skill categories
- tools as free text

Caveat: free-text tools are parsed and shown in success message, but are not persisted as structured rows.

### Help request flow

Help request creation flow exists:

- UI: `app/src/routes/new-request/+page.svelte`
- API helper: `createHelpRequest()` in `app/src/lib/api.js`
- Database table: `help_requests` in `supabase/schema.sql`

The flow requires:

- signed-in user
- existing shop card

On success, it routes to:

```text
/request/{created.id}
```

### Live-backed detail pages, partially

Server helpers exist in:

`app/src/lib/server/shopfloor.js`

- `loadShopCard(handle)` tries Supabase `shop_cards`, then falls back to sample profile bundle.
- `loadRequestDetail(id)` tries Supabase view `help_requests_with_author`, then falls back to sample request.

Caveats:

- live shop detail returns `tools: []`
- live request detail returns `responses: []`
- feed page still uses sample data directly

---

## Current database/schema state

Actual SQL file:

`supabase/schema.sql`

Tables currently defined:

- `shop_cards`
- `help_requests`
- `field_notes`
- `users`

Also defined:

- updated-at trigger helper
- auth user mirror trigger into `public.users`
- RLS policies for tables above
- view: `help_requests_with_author`

Not currently defined in SQL, despite appearing in docs/sample data:

- `tools`
- `request_responses`
- `request_images`

This mismatch is the main architectural drift.

---

## Product/data mismatches

### 1. Tools are core in docs but not persisted in SQL

Docs say:

- tools/resources are a core object
- tool inventory in MVP should be structured list + lendable + availability
- shop cards should show skills + tools + field notes + neighborhood

Sample data includes structured tools with:

- name
- category
- description
- condition
- lendable
- availability_status
- neighborhood
- notes

But current SQL has no `tools` table.

Current UI captures tools as free text in `/shop/new`, parses them, and returns them in the success message. That is useful as a placeholder but wrong as a long-term MVP shape.

### 2. Request responses exist in docs/sample data but not SQL/live UI

Docs/sample data expect responses/offers/advice.

SQL currently lacks `request_responses`.

Live request detail returns `responses: []`.

### 3. Feed is not live-backed

`/feed` imports `getRequestsForFeed()` from sample data.

Existing SQL view `help_requests_with_author` could support a live feed, but route/page wiring has not been implemented.

### 4. Field notes exist as model/sample/archive but creation flow is incomplete

Field notes are a defining product object: they are how solved problems become reusable neighborhood memory.

SQL has `field_notes`.

Sample data has field notes.

There is a `/field-notes` route, but no obvious live field-note creation/close-request workflow yet.

---

## Trust and safety posture

The current trust/safety doc is sane and should be preserved.

Core rules:

- no exact addresses in public posts
- no money transfer system in MVP
- no child-care matching as headline use case yet
- no crisis/emergency promise language
- allow flagging unsafe/scammy/abusive behavior
- allow request deletion/closure by author
- keep moderation manual/lightweight at first

Trust should come from visible usefulness:

- completed help count
- field notes contributed
- neighborhood consistency
- response history

Not from:

- star ratings
- follower counts
- fake reputation theater

This is aligned with Nate’s general dignity/no-bureaucracy direction.

---

## Recommended next decision

Janine should help Nate resolve this first:

> Should the next sprint prioritize structured tools, or live feed/request completion?

### Option A — Structured tools first

Add `tools` table and wire shop card tools as structured inventory.

Pros:

- Matches strongest community signal: people care who has useful tools/resources.
- Aligns with existing product docs.
- Makes ShopFloor more distinct from generic help-board sludge.
- Converts “who has the damn tool” into first-class data.

Cons:

- Adds schema/UI work before the basic live request loop is fully verified.
- Requires care not to overbuild lending/reservation logistics.

### Option B — Live request loop first

Wire live feed, verify auth → shop card → request → request detail against Supabase.

Pros:

- Gets one complete app loop working.
- Easier to test end-to-end.
- Reduces backend uncertainty before adding another table.

Cons:

- Leaves tools as a weird half-feature.
- Risks turning ShopFloor into a generic local request board.

### Recommendation

Choose **Option A-lite**:

Add structured tools now, but only the boring version:

- `tools` table
- simple create/update during shop card edit
- display on shop profile
- no reservations
- no lending workflow
- no availability calendar
- no logistics system

Then wire live feed/request loop immediately after.

This preserves the distinctive community value without building a marketplace monster. The monster can stay in the basement. It knows what it did.

---

## Proposed immediate task for next agent

Task title:

> Add structured tools table and persist shop-card tool inventory

Acceptance criteria:

- Add `public.tools` table to `supabase/schema.sql` using the shape already documented in `docs/mvp-schema.md`.
- Add RLS:
  - visible tools readable when owner shop card is visible
  - authenticated owner can insert/update/delete own tools
- Update shop card save flow so free-text tool entries become structured tool rows with safe defaults.
- Update live shop profile loading so tools are returned from Supabase instead of `[]`.
- Preserve prototype fallback behavior.
- Run `npm run check`.
- Update `NEXT.md`, `STATE.md`, and `docs/EVIDENCE.md`.

Do not add:

- reservations
- lending requests
- payment
- ratings
- image upload
- logistics/calendar system

---

## Questions for Nate / Janine

1. Is the first public framing still **local repair network**, or should it shift toward **tool/resource network for local repair**?
2. Does Nate have or want a live Supabase project for this now?
3. Should Janine coordinate live deployment verification after structured tools, or before?
4. Are there known community people who should be represented as seed personas/use cases, sanitized and fictionalized if needed?
5. Should ShopFloor live standalone, or eventually become a lane inside broader `belt.works`?

---

## Important files for Janine to read first

In order:

1. `NEXT.md`
2. `STATE.md`
3. `docs/HANDOFF_JANINE_2026-05-24.md` — this file
4. `docs/prototype-decisions-2026-04-19.md`
5. `docs/mvp-schema.md`
6. `supabase/schema.sql`
7. `app/src/lib/api.js`
8. `app/src/lib/server/shopfloor.js`

---

## Commands useful for Janine

From repo root:

```bash
git status --short --branch
```

From app directory:

```bash
cd app
npm ci
npm run check
npm run dev
```

Stack OS audit:

```bash
stackctl audit /Users/kn8/projects/shopfloor
stackctl recover /Users/kn8/projects/shopfloor
```

---

## Current branch/worktree state at handoff creation

Branch:

```text
chore/stack-os-shopfloor-audit
```

New Stack OS/audit files created locally:

- `.stack/manifest.yaml`
- `AGENTS.md`
- `PROJECT_CHARTER.md`
- `STATE.md`
- `docs/DECISIONS.md`
- `docs/EVIDENCE.md`
- `docs/HANDOFF_JANINE_2026-05-24.md`

No feature code has been changed in this audit pass.
