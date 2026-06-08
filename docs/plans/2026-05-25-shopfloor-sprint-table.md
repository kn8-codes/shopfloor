# ShopFloor Sprint Table — post-MWP breakdown

Created: 2026-05-25
Owner: Nate + Egon
Mode: co-working / live test-along preferred

## Purpose

Break the remaining ShopFloor work into small sprint-type sessions Nate can run when time is available. These are not calendar promises. They are work packets: pick one, do it, verify it, update evidence.

Current state: the core two-user loop is mostly proven through live Supabase until final completion/ledger verification, which is blocked by Supabase Magic Link rate limits after both test sessions were signed out.

## Operating pattern for each session

1. Start with `STATE.md` and this sprint table.
2. Choose one sprint only.
3. Keep Nate in the visible loop: explain the next click/check before moving.
4. Implement the smallest useful slice.
5. Run `npm run check` from `app/`.
6. Record receipts in `docs/EVIDENCE.md`.
7. Update `STATE.md` and this file if scope changes.

## Sprint 0 — finish live loop verification

- Time box: 30–60 minutes
- Goal: Complete the current request as User A and verify ledger history appears.
- Prerequisite: Magic Link rate limit has cooled down, or User A session is restored.
- Work:
  - Sign in as User A in one browser.
  - Open existing request `7fc7d8ba-9cb4-4791-9d11-1d1a18ee2f50`.
  - Select Helper Test B response `5116cfdd-e0c7-48ff-ad94-49032854e09c`.
  - Mark resolved with `1` hour.
  - Verify request status, request-local time history, User A profile hours received, User B profile hours helped.
- Acceptance:
  - Request is `resolved`.
  - One ledger receipt exists.
  - Profile totals render correctly.
- Nate tests:
  - Browser flow from request detail.
  - Profile pages for both users.
- Notes:
  - Future multi-user tests should use separate browsers to preserve sessions.

## Sprint 1 — auth/testing hardening plan

- Time box: 45–90 minutes
- Goal: Decide the next auth path without derailing product work.
- Work:
  - Document current Magic Link limits and testing pain.
  - Choose whether V2 auth means email/password, custom SMTP, or both.
  - Add explicit dev/test-session strategy for E2E tests.
- Acceptance:
  - `docs/DECISIONS.md` has auth roadmap decision.
  - `STATE.md` names the chosen next auth hardening step.
- Nate tests:
  - Review decision for plain-language trust and usability.
- Notes:
  - Recommendation: keep Magic Link for MWP; add email/password before broader alpha; consider custom SMTP if Magic Link remains enabled.

## Sprint 2 — structured neighborhoods

- Time box: 90–150 minutes
- Goal: Replace single free-text neighborhood with structured Akron neighborhood selection.
- Work:
  - Create canonical Akron neighborhood list.
  - Decide whether data model is `neighborhoods text[]` on profile/request or normalized table.
  - Update shop card form to support multi-select neighborhoods.
  - Keep request neighborhood simple if needed, but align naming.
- Acceptance:
  - User can select multiple service neighborhoods on shop card.
  - Rendered profile shows selected neighborhoods clearly.
  - `npm run check` passes.
- Nate tests:
  - Create/edit a shop card and select multiple Akron neighborhoods.
- Notes:
  - Do not turn this into geospatial search yet.

## Sprint 3 — structured tools/resources MVP

- Time box: 2–3 hours
- Goal: Stop treating tools as a free-text afterthought.
- Work:
  - Add minimal `tools` or `resources` table tied to shop cards.
  - Support name, category, owner/user, availability note, and optional visibility.
  - Update shop profile to display structured resources.
  - Decide whether request creation can reference needed tools later; likely defer linking.
- Acceptance:
  - User can add at least one structured tool/resource.
  - Tool/resource appears on profile.
  - RLS prevents editing another user’s resources.
- Nate tests:
  - Add OBD-II scanner / multimeter / hand tools and confirm display.
- Notes:
  - Tools are first-class because “who has the damn tool” is first-class.

## Sprint 4 — UI readability pass

- Time box: 60–120 minutes
- Goal: Make the existing prototype scan better without doing a full brand system.
- Work:
  - Fix typography hierarchy on profile/detail pages.
  - Tighten header nav spacing so “How it works” does not wrap at normal desktop widths.
  - Audit duplicate/weak CTA text.
  - Preserve dark baseline: `#0d0f12`, Inter/system sans, light text.
- Acceptance:
  - Pages have clear hierarchy between headings, labels, metadata, body, and actions.
  - Header nav stays one line on Nate’s current desktop view.
  - No route regresses visually into browser default styling.
- Nate tests:
  - Visual walkthrough of home, feed, request detail, shop profile, login.
- Notes:
  - This is not the logo/identity sprint.

## Sprint 5 — identity / treatment pass

- Time box: 90–180 minutes
- Goal: Give ShopFloor a recognizable visual treatment and rough logo/mark direction.
- Work:
  - Draft 2–3 visual directions.
  - Pick one rough treatment.
  - Add lightweight logo/wordmark placeholder to app shell/home.
  - Keep it practical; do not make a design system cathedral.
- Acceptance:
  - App has a recognizable ShopFloor mark/treatment.
  - Treatment supports the Akron repair/time-bank identity.
- Nate tests:
  - Choose or reject direction based on feel.
- Notes:
  - This can be done as a creative co-working session.

## Sprint 6 — field notes creation flow

- Time box: 90–150 minutes
- Goal: Let users create field notes from completed help.
- Work:
  - Add route/form for field note creation.
  - Decide whether field notes can attach to a completed request.
  - Keep safety/privacy defaults conservative.
- Acceptance:
  - Signed-in user can create a visible field note.
  - Field note appears on relevant profile/feed route or field notes page.
  - `npm run check` passes.
- Nate tests:
  - Create a field note from the porch-light test story.

## Sprint 7 — feed/filter usefulness pass

- Time box: 90–150 minutes
- Goal: Make `/feed` useful once real data exists.
- Work:
  - Add simple filters for status, category, neighborhood.
  - Improve empty states.
  - Ensure live feed and sample fallback stay aligned.
- Acceptance:
  - Feed can narrow open requests by practical criteria.
  - Empty state tells users what to do next.
- Nate tests:
  - Use feed to find the test request and verify status changes after completion.

## Sprint 8 — user support / feedback intake

- Time box: 90–150 minutes
- Goal: Add a clear way for users to contact Nate/Belt.works about bugs, support needs, feature requests, and general feedback.
- Work:
  - Decide first-pass channel: simple contact link, mailto, embedded form, or Supabase-backed feedback table.
  - Add a visible support/feedback entry point in the app shell or footer.
  - If building a form, capture category, message, optional contact info, current route/context, and timestamp.
  - Decide where submissions go for Nate to act on them: email, database admin view, GitHub issue draft, or simple export.
  - Add abuse/privacy guardrails: do not ask for passwords, payment details, or sensitive personal data.
- Acceptance:
  - A user can report a bug, ask for support, or suggest a feature from the site.
  - Nate has a reliable place to receive/review submissions.
  - The support path is distinct from the financial “support Belt.works” ask.
  - Language is plain and does not promise instant response.
- Nate tests:
  - Submit a test bug report and confirm where it lands.
- Notes:
  - Do not ship a broader alpha without an intake path. Without feedback intake, user problems become ghosts in the walls.
  - Default recommendation: start with a simple Supabase-backed feedback form plus optional contact email; add admin tooling later.

## Sprint 9 — Belt.works attribution and sustainability support path

- Time box: 45–90 minutes
- Goal: Add a clear, dignified path from ShopFloor to Belt.works attribution/support.
- Work:
  - Decide whether the app footer should make a direct support ask or simply link to a Belt.works page where the ask lives.
  - Add lightweight footer/attribution language such as “Built by Belt.works” without making the app feel extractive.
  - Add support link placement that does not interrupt people trying to get help.
  - Draft support copy around sustaining local mutual-aid software, not charging for access to help.
  - Update or plan an update to Belt.works so ShopFloor is listed prominently as the current flagship/main project.
- Acceptance:
  - App visibly credits Belt.works.
  - Belt.works visibly features ShopFloor as a current main project.
  - There is a clear way for people to support Belt.works.
  - Language preserves ShopFloor’s dignity/mutual-aid stance and avoids financial judgment.
- Nate tests:
  - Read the support language aloud and reject anything that feels manipulative, nonprofit cosplay, or startup-bro.
- Notes:
  - This matters because Belt.works has to become sustainable if this work is going to continue.
  - ShopFloor is currently the main project and should be prominent on Belt.works so visitors can understand what is active and why support matters.
  - Default recommendation: link to Belt.works for the full ask; keep ShopFloor’s in-app footer short and unobtrusive.

## Sprint 10 — deploy/shareable alpha

- Time box: 2–4 hours
- Goal: Get a stable shareable alpha environment after core loop and auth decisions settle.
- Work:
  - Confirm Supabase project of record.
  - Apply schema cleanly.
  - Configure production env and redirect URLs.
  - Deploy app.
  - Run smoke tests.
- Acceptance:
  - Public/staging URL loads.
  - Auth redirect works.
  - Core routes return 200.
  - One test user can complete at least the shop-card/request path.
- Nate tests:
  - Open URL outside local machine and walk through first-user flow.

## Suggested order

1. Sprint 0 — finish live loop verification.
2. Sprint 4 — UI readability pass, because Nate is already catching obvious friction.
3. Sprint 2 — structured neighborhoods.
4. Sprint 3 — structured tools/resources MVP.
5. Sprint 1 — auth/testing hardening decision, unless auth blocks more testing sooner.
6. Sprint 6 — field notes creation.
7. Sprint 7 — feed/filter usefulness.
8. Sprint 5 — identity/treatment, either before or after Sprint 7 depending on energy.
9. Sprint 8 — user support / feedback intake.
10. Sprint 9 — Belt.works attribution and sustainability support path.
11. Sprint 10 — deploy/shareable alpha.

## Open decisions

- Whether standard email/password auth belongs before or after structured tools.
- Whether tools are called “tools,” “resources,” or both in the UI/schema.
- Whether neighborhoods should be profile service areas only, request location only, or both.
- Whether time history should remain separate helped/received totals or eventually expose a spendable balance.
- Whether ShopFloor should make a direct support ask in-app or keep the app footer minimal and route the full sustainability ask through Belt.works.
- Whether user support/feedback intake starts as mailto/contact link or a Supabase-backed form with review workflow.
