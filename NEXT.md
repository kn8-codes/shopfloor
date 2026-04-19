# NEXT.md — ShopFloor

_Last updated: 2026-04-19_

## What this project is
ShopFloor is a neighborhood repair and mutual-aid network for Akron, Ohio.
Core pitch: **When something breaks, start with the neighborhood.**

## Current status
Frontend prototype exists in SvelteKit and is now partially wired to real app behavior.
Repo: `https://github.com/kn8-codes/shopfloor`

## What is done
- SvelteKit app scaffold exists under `app/`
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
- Shared sample data was reshaped closer to eventual schema direction
- Shared app shell/nav exists
- Supabase client setup exists:
  - `app/src/lib/supabase.js`
  - `app/.env.example`
- Magic Link auth scaffold exists:
  - `app/src/lib/stores/auth.js`
  - `app/src/routes/login/+page.svelte`
- Request submission flow is wired:
  - `app/src/lib/api.js`
  - `app/src/routes/new-request/+page.svelte`
- Shop card creation flow is wired:
  - `app/src/routes/shop/new/+page.svelte`
- Supabase schema file exists:
  - `supabase/schema.sql`

## Most recent key commits
- `b41a365` — Add ShopFloor shop card creation flow
- `fdc26bd` — Wire ShopFloor request submission flow
- `5f905cb` — Add ShopFloor Magic Link auth scaffold
- `7a48a41` — Wire ShopFloor Supabase client setup
- `4ae9a51` — Align ShopFloor prototype with MVP decisions
- `392f0dc` — Add ShopFloor multi-route prototype screens
- `d302693` — Scaffold ShopFloor SvelteKit app shell

## Current product decisions
- Primary first job: all three, led by **finding local practical help**
- Trust should lean first on **mutual connections / neighborhood proximity**
- Shop cards should show **skills + tools + field notes + neighborhood** by default
- Request matching should optimize first for **nearby helper**
- Tool inventory in MVP should be **structured list + lendable + availability**
- Request categories should be **tight core plus other**
- Resolved requests should require a **field note before close**
- MVP tone should be **utility-first + blue-collar competent**
- Identity can stay light: **handles are fine**

## What is working right now
If Supabase env keys are present and schema is applied:
- user can hit Magic Link login flow
- user can create/update a shop card
- user can attempt to create a help request
- request posting is correctly gated behind shop card existence

## Current gaps / blockers
1. **Schema and frontend mismatch on tools**
   - `/shop/new` captures tools as free text for now
   - `supabase/schema.sql` does not yet persist a dedicated tools table in this sprint version
   - structured tool inventory still needs to be reintroduced cleanly or explicitly deferred

2. **Shop page still leans on prototype sample data**
   - `/shop/[handle]` is still rendering from seed-oriented route assumptions
   - needs a real Supabase-backed load path for newly created shop cards

3. **Request detail page is not yet fully real-data safe**
   - request creation redirects to `/request/:id`
   - page exists, but the real-data load path needs verification against Supabase ids, not just seed data

4. **No onboarding polish / recovery path yet**
   - after login, users still need a clearer path: create shop card → post request

5. **No deploy verification yet**
   - app behavior has not been tested end-to-end against a live Supabase project and Vercel deployment

## Highest-priority next moves
1. Make `/shop/[handle]` load real shop cards from Supabase
2. Make `/request/[id]` load real requests from Supabase
3. Verify end-to-end flow with actual env keys and live schema:
   - Magic Link sign-in
   - create shop card
   - create request
   - redirect to real request detail page
4. Decide whether to:
   - add `tools` table now, or
   - explicitly defer structured tools to next sprint and stop pretending they are live
5. Add a simple post-login routing rule:
   - no shop card → `/shop/new`
   - has shop card → `/new-request` or `/feed`

## If another agent picks this up
Do not waste time redesigning the concept.
The right move is to finish the first real user loop:
1. auth
2. shop card
3. request posting
4. real request page

Keep it lean.
Do not add image upload, ratings, reservations, or logistics systems.
Do not over-engineer trust systems.
Do not drift from the current MVP decisions unless Nate explicitly changes direction.

## Working rule
This file should be updated whenever a meaningful milestone lands or the next highest-priority move changes.
