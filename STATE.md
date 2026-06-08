# Current State — ShopFloor

## Active Goal

Run a time-boxed MWP / Stack OS test sprint that proves both the workflow and the smallest useful ShopFloor time-bank loop:

1. sign in with Magic Link,
2. create/update a shop card,
3. post a help request,
4. offer help through a request response,
5. mark help completed,
6. record simple time history/ledger entry,
7. keep structured tools/resources as support data for the help loop.

## Right Now

ShopFloor is not just an idea. It has a SvelteKit prototype under `app/`, Supabase schema under `supabase/schema.sql`, product docs under `docs/`, and a handoff file in `NEXT.md`.

Current verified technical state:

- Repo cloned from `https://github.com/kn8-codes/shopfloor`.
- Default branch: `main`.
- Local work branch: `feat/time-bank-loop-mvp`.
- `npm run check` passes with `0 errors and 0 warnings` as of 2026-06-08 04:36 EDT.
- `npm run build` completed successfully as of 2026-06-08 04:36 EDT.
- Local Vite route probes returned HTTP 200 for `/`, `/feed`, `/how-it-works`, `/login`, `/shop/nate-test-a`, and `/request/not-a-real-id` as of 2026-06-08 04:36 EDT.
- App has prototype routes for home, feed, field notes, how it works, login, new request, shop card creation, shop detail, and request detail.
- Supabase client/auth/request/shop-card wiring exists.
- Live data support is partial: shop detail, request detail, and feed try Supabase first, then fall back to sample data.
- Request responses now have schema/RLS, live read support, and a request-detail response creation form/action.
- Request authors can mark requests resolved, optionally selecting a helper response.
- Completed helper responses can create a simple `time_ledger_entries` history record with hours helped/received.
- Shop profiles show profile-level hours helped, hours received, and raw time receipts.
- `/feed` now loads live requests through `help_requests_with_author` when Supabase is configured.
- Feed falls back to sample data when Supabase is unavailable or returns an error.
- Structured tools are not live-backed yet.

## What Seems Done

- Concept and product direction documented.
- First five screen plan documented.
- Trust/safety v1 documented.
- SvelteKit scaffold and UI prototype exist.
- Magic Link auth scaffold exists.
- Shop card creation/upsert flow exists.
- Help request creation flow exists and requires a shop card.
- Supabase schema exists with RLS for shop cards, help requests, request responses, field notes, and users.
- Request detail can load live request responses when Supabase is configured.
- Feed can load live help requests when Supabase is configured.
- Signed-in users with shop cards can submit request responses from the request detail page.
- Request authors can mark requests resolved from the request detail page.
- Request authors can record simple helper hours on completion when selecting a helper response.
- Shop profiles render simple time history: hours helped, hours received, and raw receipts.

## Known Gaps / Open Work

1. **Structured tools mismatch**
   - Product docs say tools are core.
   - Sample data has structured tools.
   - Current SQL schema does not include a `tools` table.
   - Shop card form captures tools as free text, parses it, then returns it in the success message without persisting structured inventory.

2. **Live feed still needs browser verification**
   - `/feed` has live Supabase loader wiring.
   - No evidence yet that it has been tested against applied live Supabase schema in browser.

3. **Time history / ledger still needs live verification**
   - Completed helper responses can create one ledger entry per request.
   - Request detail shows request-local time history.
   - Shop profiles show profile-level hours helped, hours received, and raw receipts.
   - No live Supabase/browser end-to-end verification yet.

4. **Field note creation flow missing**
   - Field notes are modeled and sampled, but there does not appear to be a live creation route yet.

5. **Deferred UX/product notes captured from User A walkthrough**
   - Future identity pass: visual treatment and logo/mark.
   - Header nav should remain one line on desktop; tighten nav spacing/sizing instead of wrapping “How it works.”
   - Neighborhood should become a structured multi-select using Akron neighborhood options.
   - Tools should eventually become structured resource/inventory data; exact model is undecided.
   - Profile/detail typography needs stronger hierarchy; current fonts/weights/sizes blend together.
   - Home page duplicate CTA fixed: secondary hero action now points to “How it works” instead of duplicating the feed button.
   - Magic Link rate limits blocked final same-browser two-user completion testing after both sessions were signed out; future E2E should use separate browsers/sessions or dev auth support.
   - Auth roadmap: Magic Link can remain MWP-only, but standard email/password or another durable sign-in option should be planned before broader testing.
   - Roadmap: add Belt.works attribution/support path. Decide whether ShopFloor gets a short footer/support link or routes the full ask through Belt.works.
   - Roadmap: update Belt.works so ShopFloor is featured prominently as the current main/flagship project.
   - Roadmap: add user support/feedback intake before broader alpha so bugs, support inquiries, and feature requests have somewhere reliable to land.
   - Detailed notes live in `work/active/2026-05-24-time-bank-mvp.md`.

6. **End-to-end deployment/live Supabase verification missing**
   - No evidence yet that schema has been applied to a live Supabase project and tested through the browser.

## Next Best Action

Follow the active time-boxed plan and the post-MWP sprint table:

```text
docs/plans/2026-05-24-2000-0000-mwp-time-bank-test-run.md
docs/plans/2026-05-25-shopfloor-sprint-table.md
```

Recommended next implementation slice:

1. decide where local resource-directory information belongs as ShopFloor support data, using `work/inbox/2026-06-04-local-resource-directory-support-data.md`,
2. add structured tools/resources only as support data, not as a separate marketplace,
3. or apply schema/env and run live browser verification of the full time-bank loop.

## Blockers

- Need access to live Supabase project/env keys for true end-to-end verification.
- Need Nate decision: structured tools/resources now vs defer one sprint.
- Need Nate review after Peter/M4 recommends whether local resource-directory data shares the structured tools model or needs a separate resource model.

## Open Questions for Nate

- For tonight's test sprint, will Nate drive one coding lane locally while Egon holds the MWP rail and implements/reviews alongside him?
- Are live Supabase env keys available locally, or should tonight stop at local schema/app checks?
- Profile-level history: raw receipts first implemented; decide later whether to show net summary or keep helped/received separate.

## Last Verified

2026-06-08 04:36 EDT
