# Current State — ShopFloor

## Active Goal

Finish and verify the first real user loop:

1. sign in with Magic Link,
2. create/update a shop card,
3. post a help request,
4. land on a real request detail page,
5. decide whether structured tool inventory is in this sprint or explicitly deferred.

## Right Now

ShopFloor is not just an idea. It has a SvelteKit prototype under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, and a handoff file in `NEXT.md`.

Current verified technical state:

- Repo cloned from `https://github.com/kn8-codes/shopfloor`.
- Default branch: `main`.
- Local work branch: `chore/stack-os-shopfloor-audit`.
- `npm ci && npm run check` passes with `0 errors and 0 warnings`.
- App has prototype routes for home, feed, field notes, how it works, login, new request, shop card creation, shop detail, and request detail.
- Supabase client/auth/request/shop-card wiring exists.
- Live data support is partial: shop detail and request detail try Supabase first, then fall back to sample data.
- Feed still uses sample data.
- Request responses and tools are not live-backed yet.

## What Seems Done

- Concept and product direction documented.
- First five screen plan documented.
- Trust/safety v1 documented.
- SvelteKit scaffold and UI prototype exist.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card.
- Supabase schema exists with RLS for shop cards, help requests, field notes, and users.

## Known Gaps / Open Work

1. **Structured tools mismatch**
   - Product docs say tools are core.
   - Sample data has structured tools.
   - Current SQL schema does not include a `tools` table.
   - Shop card form captures tools as free text, parses it, then returns it in the success message without persisting structured inventory.

2. **Live feed missing**
   - `/feed` renders sample requests only.
   - Existing Supabase view `help_requests_with_author` could support live feed, but route/page wiring is not there yet.

3. **Request responses missing live flow**
   - Schema docs mention `request_responses`, sample data has responses, but SQL schema does not define the table and UI does not write/read live responses.

4. **Field note creation flow missing**
   - Field notes are modeled and sampled, but there does not appear to be a live creation route yet.

5. **End-to-end deployment/live Supabase verification missing**
   - No evidence yet that schema has been applied to a live Supabase project and tested through the browser.

## Next Best Action

Do one audit-to-execution step:

- Decide whether the next task is **live feed wiring** or **structured tools table**.

Recommended default: **structured tools table**, because the community value signal Nate reported is about concrete local assets and practical help. If “who has the damn tool” is first-class, the database should stop pretending tools are a success-message side effect.

## Blockers

- Need access to live Supabase project/env keys for true end-to-end verification.
- Need Nate decision: structured tools now vs defer one sprint.

## Open Questions for Nate

- Is ShopFloor’s first external promise “find local practical help” or “find tools/practical help nearby”? The docs currently lead with local repair network, while the strongest community signal may be tool/resource inventory.
- Should structured tools be added now as core MVP, or should we first finish live feed/request loop without tools?
- Is there already a live Supabase project for this, and are env keys available locally somewhere safe?

## Last Verified

2026-05-24
