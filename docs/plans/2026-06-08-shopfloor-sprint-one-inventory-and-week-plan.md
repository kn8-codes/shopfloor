# ShopFloor Sprint One Inventory + One-Week Execution Plan

Created: 2026-06-08 08:36 EDT  
Owner: Nate + Egon  
Mode: sprint-one planning / live test-along  
Repo: `/Users/kn8/projects/shopfloor`  
Branch: `feat/time-bank-loop-mvp`  
Starting commit: `3094e63a3817f39e9959bba0ca703a0a7b2035d0` — `feat: add ShopFloor time-bank loop slice`

## Sprint one purpose

Get a grounded inventory of ShopFloor and define one week of executable work packets. Do not start with new implementation until the current live loop and blockers are understood.

The current center of gravity remains:

> ShopFloor is a neighborhood repair time bank for Akron. Tools/resources and field notes support the help loop; they are not a separate marketplace or content dump.

## Current technical state verified 2026-06-08

Commands run:

```bash
git status --short --branch
git log -1 --oneline --decorate
npm run check
```

Results:

```text
## feat/time-bank-loop-mvp
3094e63 (HEAD -> feat/time-bank-loop-mvp) feat: add ShopFloor time-bank loop slice
svelte-check found 0 errors and 0 warnings
```

Live route smoke with local Vite and existing Supabase env returned HTTP 200:

```text
/feed                                                                  200 ShopFloor — Neighborhood feed
/shop/natetesta                                                        200 ShopFloor — Nate Test A
/shop/helpertestb                                                      200 ShopFloor — Helper Test B
/request/7fc7d8ba-9cb4-4791-9d11-1d1a18ee2f50                          200 ShopFloor — Need help diagnosing a porch light that stopped working
/field-notes                                                           200 ShopFloor — Field notes
/new-request                                                           200 ShopFloor — New request
/shop/new                                                              200 ShopFloor — New shop card
/login                                                                 200 ShopFloor — Login
```

## Live Supabase state verified safely

`app/.env` exists and points to Supabase host:

```text
shvnvnutdjmkgbcwedge.supabase.co
```

The anon key was read only inside probe scripts and not printed.

Tables/views probed with anon key:

```text
shop_cards: status=206 rows_returned=1 content_range=0-0/2
help_requests: status=200 rows_returned=1 content_range=0-0/1
help_requests_with_author: status=200 rows_returned=1 content_range=0-0/1
request_responses: status=200 rows_returned=1 content_range=0-0/1
request_responses_with_author: status=200 rows_returned=1 content_range=0-0/1
time_ledger_entries: status=200 rows_returned=0 content_range=*/0
time_ledger_entries_with_people: status=200 rows_returned=0 content_range=*/0
field_notes: status=200 rows_returned=0 content_range=*/0
```

Current live test data:

- User A shop card: `natetesta` / `Nate Test A`
- Helper B shop card: `helpertestb` / `Helper Test B`
- Open request: `7fc7d8ba-9cb4-4791-9d11-1d1a18ee2f50`
  - title: `Need help diagnosing a porch light that stopped working`
  - status: `open`
  - author: `natetesta`
- Existing response: `5116cfdd-e0c7-48ff-ad94-49032854e09c`
  - type: `can_help`
  - author: `helpertestb`
- Ledger entries: none yet.

## What is actually built

### App routes

- `/` — home.
- `/feed` — live Supabase loader via `help_requests_with_author`, sample fallback.
- `/field-notes` — static/sample field notes page; no creation flow yet.
- `/how-it-works` — explanatory page.
- `/login` — Magic Link auth scaffold.
- `/new-request` — signed-in request creation flow, requires shop card.
- `/shop/new` — shop card creation/upsert flow.
- `/shop/[handle]` — live profile loader with field notes and time history, sample fallback.
- `/request/[id]` — live request detail loader with responses and ledger entries, sample fallback; response form; completion form for request author.

### Schema objects

- `shop_cards`
- `help_requests`
- `request_responses`
- `time_ledger_entries`
- `field_notes`
- `users`
- `help_requests_with_author`
- `request_responses_with_author`
- `time_ledger_entries_with_people`

### Core user loop status

- create/update shop card: built, needs current live walkthrough refresh.
- create request: built, needs current live walkthrough refresh.
- offer help: built, one live response exists.
- complete request: built, not yet live-verified end to end.
- ledger entry: built, not yet populated live.
- profile helped/received totals: built, but currently empty because ledger is empty.

## Known gaps and risks

### Blocker class A — live verification gap

The core time-bank loop exists in code and schema, but the final completion/ledger/profile-history path is not verified live.

Current best first test:

- sign in as `natetesta` / User A session
- open request `7fc7d8ba-9cb4-4791-9d11-1d1a18ee2f50`
- select response `5116cfdd-e0c7-48ff-ad94-49032854e09c`
- mark resolved with `1` hour
- verify one `time_ledger_entries` row appears
- verify request status becomes `resolved`
- verify `natetesta` shows hours received
- verify `helpertestb` shows hours helped

Risk: Magic Link rate limits or missing session may block browser completion.

### Blocker class B — non-atomic completion

`completeHelpRequest()` updates `help_requests` first and inserts `time_ledger_entries` second. If ledger insert fails after request update, the request can become resolved without a receipt.

This is acceptable for MWP but should become a Postgres RPC before broader alpha.

### Blocker class C — structured tools/resources mismatch

`/shop/new` accepts `toolsText`, parses it, and returns parsed tools in the success payload, but no structured tools/resources table persists them.

This is product-visible debt because tools/resources are central to the help loop.

### Blocker class D — local resources placement

There is an inbox card:

```text
work/inbox/2026-06-04-local-resource-directory-support-data.md
```

M4/Peter recommended:

- request-detail `Local support options` first;
- separate `local_resources` model sharing taxonomy with structured tools/resources;
- code only after Nate reviews scope.

### Blocker class E — user feedback/support intake missing

Before broader alpha, users need a place to report bugs, request support, and send feedback.

### Blocker class F — stale docs

`NEXT.md` still has stale branch/gap language from before commit `3094e63`. It says request responses/completion/time-bank/live feed are missing even though they now exist.

## One-week execution plan

This is ordered for headway, not polish. Each packet should be small enough to complete in one focused session or carry forward with an evidence note.

### Packet 1 — Finish live time-bank loop verification

Time box: 30–75 minutes  
Owner: Nate + Egon  
Decision required: whether Nate has an active User A session or wants to try Magic Link again.

Goal:

> Prove that the committed time-bank slice works against live Supabase.

Steps:

1. Start local app.
2. Confirm `natetesta`, `helpertestb`, request, and response still exist.
3. Open `/request/7fc7d8ba-9cb4-4791-9d11-1d1a18ee2f50` as User A.
4. Select Helper Test B response.
5. Mark resolved with `1` hour.
6. Probe Supabase for:
   - request status `resolved`
   - `completed_at` set
   - `completed_helper_id` set to Helper B
   - one ledger row
7. Open `/shop/natetesta` and `/shop/helpertestb`.
8. Verify helped/received totals render.
9. Record evidence in `docs/EVIDENCE.md`.
10. Update `STATE.md`.

Acceptance:

- one live ledger receipt exists;
- request detail shows time history;
- profile totals show separate hours helped/received;
- `npm run check` passes after any fix.

If blocked:

- write exact Magic Link/session blocker;
- move to Packet 2.

### Packet 2 — Auth/testing hardening decision

Time box: 45–90 minutes  
Owner: Nate + Egon  
Decision required: choose auth/testing path.

Goal:

> Stop Magic Link limits from blocking every two-user test.

Options to evaluate:

1. keep Magic Link for MWP, add separate browser/session discipline;
2. add email/password before broader alpha;
3. configure custom SMTP to reduce Magic Link provider limits;
4. add dev-only seeded test auth path if Supabase supports it safely.

Acceptance:

- `docs/DECISIONS.md` has a dated auth/testing decision;
- `STATE.md` names next auth hardening step;
- future E2E tests have a written session strategy.

Recommended default:

- keep Magic Link for now;
- add standard email/password before broader alpha;
- for immediate tests, preserve two browser profiles/sessions.

### Packet 3 — Fix stale docs and handoff accuracy

Time box: 30–45 minutes  
Owner: Egon  
Decision required: none unless product direction changes.

Goal:

> Make `NEXT.md` and sprint docs match the current code.

Steps:

1. Update `NEXT.md` branch and current status.
2. Remove stale claims that request responses/completion/time-bank/live feed are missing.
3. Add current live verification gap.
4. Point to this plan and current evidence.
5. Run `npm run check` if code untouched? not required, but run if any app file changes.
6. Commit docs-only update if clean and Nate approves or standing doc-maintenance boundary is accepted.

Acceptance:

- next agent does not re-implement completed work because handoff lied.

### Packet 4 — Completion + ledger RPC hardening

Time box: 90–150 minutes  
Owner: Egon  
Prerequisite: Packet 1 live verification or exact failure understood.

Goal:

> Move request completion and ledger insert into one database transaction.

Steps:

1. Design Postgres RPC: `complete_help_request_with_time(...)`.
2. Enforce:
   - caller is request author;
   - request is not already resolved;
   - selected response belongs to request;
   - helper is not requester;
   - hours between 0.25 and 24;
   - one ledger entry per request.
3. Update client helper to call RPC.
4. Keep UI language unchanged.
5. Verify with live or local Supabase if available.
6. Record evidence.

Acceptance:

- request cannot resolve with missing ledger when helper/hours selected;
- `npm run check` passes;
- live or SQL-level verification recorded.

### Packet 5 — Structured tools/resources MVP design decision

Time box: 45–75 minutes  
Owner: Nate + Egon  
Decision required: “tools,” “resources,” or split model.

Goal:

> Decide the minimal data model before coding.

Inputs:

- `STATE.md` structured tools mismatch.
- `work/inbox/2026-06-04-local-resource-directory-support-data.md`.
- M4/Peter recommendation receipt in Board inbox.

Decision questions:

1. Are member-owned items called `tools`, `resources`, or `shop_resources`?
2. Are local/community support listings a separate `local_resources` table?
3. Does request detail show “Local support options” before profile inventory exists?
4. What categories are first-class: tools, transport, childcare, food, legal, recovery, repair, other?

Acceptance:

- `docs/DECISIONS.md` records schema/UI naming;
- one implementation task card exists for the chosen first slice.

### Packet 6 — Structured tools/resources implementation slice

Time box: 2–3 hours  
Owner: Egon, with Nate test  
Prerequisite: Packet 5 decision.

Goal:

> Stop treating tools/resources as a free-text success-message side effect.

Likely first slice:

- create table tied to `shop_cards`;
- fields: name, category, availability note, visibility, created_at;
- RLS: owner can insert/update/delete own resources; public can read visible resources for visible profiles;
- update `/shop/new` to persist simple resources from existing comma-separated input or add a separate resource form;
- show resources on `/shop/[handle]`.

Acceptance:

- user can add one OBD-II scanner / multimeter / hand tool;
- resource appears on profile;
- another user cannot edit it;
- `npm run check` passes;
- evidence recorded.

### Packet 7 — User support / feedback intake

Time box: 90–150 minutes  
Owner: Egon + Nate language review

Goal:

> Before alpha, users need a reliable way to report problems.

Default recommended first slice:

- Supabase-backed `feedback_messages` table;
- public or signed-in form with category, message, optional contact, route context;
- plain abuse/privacy warning: do not send passwords, payment info, or sensitive personal data;
- no admin dashboard yet; start with DB review/export.

Acceptance:

- user can submit feedback;
- Nate knows where it lands;
- language does not promise instant support;
- support path is distinct from Belt.works funding/support ask.

### Packet 8 — UI readability pass

Time box: 60–120 minutes  
Owner: Egon + Nate visual review

Goal:

> Make current app scan better without identity cathedral work.

Scope:

- request detail hierarchy;
- shop profile hierarchy;
- header nav one-line behavior;
- form readability;
- empty states.

Acceptance:

- home/feed/request/shop/login visually smoke-tested;
- no route regresses to browser-default styling;
- `npm run check` passes.

### Packet 9 — Field note creation flow

Time box: 90–150 minutes  
Owner: Egon + Nate test story

Goal:

> Let completed work become reusable local knowledge.

Scope:

- create field note form;
- optionally attach to completed request;
- conservative privacy defaults;
- render in field notes page/profile/request if applicable.

Acceptance:

- signed-in user creates visible field note;
- porch-light test story can be recorded;
- `npm run check` passes.

### Packet 10 — Deploy/shareable alpha readiness

Time box: 2–4 hours  
Owner: Egon + Nate approval gates

Prerequisites:

- Packet 1 complete or blocker documented.
- Packet 2 auth plan chosen.
- Packet 7 feedback intake exists or Nate explicitly defers.

Goal:

> Get to a stable shareable alpha environment.

Scope:

- confirm Supabase project of record;
- apply current schema cleanly;
- configure production env/redirect URLs;
- deploy app;
- smoke test public URL;
- verify first-user path.

Acceptance:

- public/staging URL loads;
- auth redirect works;
- core routes return 200;
- one test user can create shop card/request;
- public sharing approved by Nate.

## Recommended week order

### Today / Sprint 1

1. Packet 1 — finish live time-bank loop verification.
2. If blocked by auth: Packet 2.
3. If verification succeeds quickly: Packet 3 docs accuracy.

### Between shifts / Sprint 2

Pick based on Sprint 1 result:

- If core loop works: Packet 5 structured tools/resources decision.
- If auth blocks: Packet 2 auth/testing hardening.
- If Nate wants public/revenue surface: Belt.works lane, not in this repo.

### Evening / Sprint 3 tie-off

- Update `STATE.md` and evidence.
- Commit any clean unit.
- Update Board/TODAY.
- Decide next day’s first packet.

### This week sequence

1. Finish live loop verification.
2. Harden auth/testing enough to avoid Magic Link blocking.
3. Fix stale docs.
4. Harden completion+ledger transaction.
5. Decide and implement structured tools/resources first slice.
6. Add feedback/support intake.
7. Add field note creation or UI readability pass, depending on Nate’s energy and live tester feedback.
8. Prepare deploy/shareable alpha only after support/auth/core loop are not embarrassing.

## Decisions for Nate

Only three decisions matter immediately:

1. Can we complete the existing live request as User A today, or is Magic Link/session blocked?
2. If auth blocks again, should we add email/password before any more product work?
3. For resources, do you prefer the first schema language to be `tools`, `resources`, or `shop_resources`?

Everything else can wait. The machine has enough problems without us feeding it a buffet.
