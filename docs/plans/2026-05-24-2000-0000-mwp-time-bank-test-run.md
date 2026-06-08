# Plan — MWP Time-Bank Test Run, 2026-05-24 20:00–00:00

**Status:** draft for tonight  
**Owner:** Nate + Egon  
**Project:** ShopFloor  
**Branch:** `chore/stack-os-shopfloor-audit` unless Nate chooses a new implementation branch  
**Purpose:** prove the MWP / Stack OS workflow while building the smallest useful time-bank implementation slice.

---

## 0. Principle for tonight

Tonight is not just a coding sprint.

Tonight is a **workflow proof**:

> Can Nate speak intent, can agents turn it into task cards, can the code change stay scoped, can evidence be captured, and can the next step remain obvious after fatigue?

If yes, this structure is worth keeping.

If no, we simplify it until it survives real life.

---

## 1. Product stance locked before start

ShopFloor is a **neighborhood repair time bank**.

Time-bank MVP stance:

- Time credits start as history/trust signal, designed to become spendable later.
- One hour equals one credit by default.
- Negative balances do not block help in MVP.
- Completion/hours should eventually be confirmed by both sides.
- MVP can start with request-author confirmation.
- Tool loans do not earn credits in first pass.
- Tools/resources support the help loop; they are not a rental marketplace.

Out of scope tonight:

- cash conversion
- hourly rates by skill
- bidding
- escrow
- dispute resolution
- public leaderboards
- ratings-as-punishment
- reservation logistics
- polished dashboard work

---

## 2. Lane map for tonight

### Nate

- Makes judgment calls.
- Codes along locally if desired.
- Reads files and gets familiar with MWP structure.
- Approves any schema/product scope expansion.

### Egon

- Holds the MWP rail.
- Keeps task cards/docs/state/evidence updated.
- Implements or reviews narrow code changes.
- Runs checks and records receipts.
- Stops scope creep.

### Janine

- Not needed unless Nate wants coordination/reporting.

### Winston / Peter / OpenClaw

- Not used tonight.

### Scripts

- Used for deterministic checks where possible.

---

## 3. Session structure

## 20:00–20:20 — Recovery and setup

Goal: enter the project cleanly.

Steps:

1. Nate opens project at:

   ```text
   /Users/kn8/projects/shopfloor
   ```

2. Read in this order:

   ```text
   NEXT.md
   STATE.md
   docs/DECISIONS.md
   work/inbox/2026-05-24-time-bank-mvp.md
   docs/DIRECTION_AND_AGENT_OPERATING_MODEL_2026-05-24.md
   ```

3. Egon runs:

   ```bash
   git status --short --branch
   npm run check
   ```

4. Decide whether to create a fresh implementation branch.

Recommended branch:

```bash
git switch -c feat/time-bank-loop-mvp
```

Only do this if Nate wants the work isolated from the audit branch.

Deliverable:

- Working tree understood.
- One active task card chosen.
- Evidence started.

---

## 20:20–20:45 — Task card selection and scope lock

Goal: move from broad idea to one buildable slice.

Active task card should be either:

```text
work/inbox/2026-05-24-time-bank-mvp.md
```

or a new implementation card:

```text
work/active/2026-05-24-time-bank-loop-mvp.md
```

Recommended implementation slice:

1. Add `request_responses` schema/table.
2. Show/create responses on request detail page.
3. Add minimal request completion state/action.
4. Add `time_ledger_entries` or `time_entries` for completed help history.
5. Display simple time totals on shop cards or profile bundle.
6. Keep tools as next support table unless time remains.

Decision to make at 20:45:

> Do we implement a real ledger table tonight, or soft history fields only?

Recommendation:

Implement a ledger table, but use it only as non-blocking history.

---

## 20:45–21:30 — Schema pass

Goal: define the database objects cleanly before UI work.

Candidate additions to `supabase/schema.sql`:

### `request_responses`

Purpose: offers/advice on a request.

Fields:

- `id`
- `request_id`
- `author_id`
- `response_type`
- `message`
- `created_at`

Response types:

- `can_help`
- `have_tool`
- `advice`
- `know_someone`

### Completion support on `help_requests`

Potential fields:

- `completed_at timestamptz`
- `completed_by uuid references shop_cards(id)`
- `completed_helper_id uuid references shop_cards(id)`

Alternative: create completion table instead. For MVP, adding fields is probably enough.

### `time_ledger_entries`

Purpose: completed-help time history.

Fields:

- `id`
- `request_id`
- `giver_id`
- `receiver_id`
- `hours numeric(5,2)`
- `note`
- `status`
- `created_at`

Status values:

- `pending`
- `confirmed`
- `void`

MVP rule:

- Entries do not block receiving help.
- Balance is derived, not manually edited.

Evidence:

- Schema diff recorded.
- Any SQL syntax check available should be run.

---

## 21:30–22:20 — API/server helpers

Goal: create narrow functions that match the schema.

Likely files:

```text
app/src/lib/api.js
app/src/lib/server/shopfloor.js
```

Candidate functions:

- `createRequestResponse(requestId, payload)`
- `completeHelpRequest(requestId, payload)`
- `getTimeSummaryForProfile(profileId)`
- `loadRequestDetail(id)` updated to include live responses
- `loadShopCard(handle)` updated to include time summary

Rules:

- Keep auth checks simple.
- Let RLS do real permission enforcement where possible.
- Do not add admin/moderation complexity tonight.

Evidence:

- Code compiles.
- `npm run check` after helper pass.

---

## 22:20–23:05 — UI pass

Goal: expose the loop without polishing it to death.

Likely file:

```text
app/src/routes/request/[id]/+page.svelte
```

Add:

1. response list
2. simple response form
3. minimal completion form/action if current user is request author
4. optional hours input on completion

Potential shop card display:

```text
app/src/routes/shop/[handle]/+page.svelte
```

Add:

- hours helped
- hours received
- net time balance as non-blocking signal

Copy should avoid financial language.

Use words like:

- hours helped
- hours received
- time bank history
- give an hour, bank an hour

Avoid:

- debt
- owed
- payment
- currency
- marketplace

Evidence:

- `npm run check`.
- Screenshot or local route note if browser testing happens.

---

## 23:05–23:35 — Structured tools support pass, only if time remains

Goal: do not let tools swallow the time-bank loop.

If core loop is done, add minimal `tools` table/schema or update plan only.

Preferred if time remains:

- add `tools` table to schema
- wire `loadShopCard` to read tools live
- leave creation flow for next sprint if necessary

If tired:

- update task card and stop.

No heroic coding after 23:35. Heroic coding produces archaeology.

---

## 23:35–00:00 — Closeout

Goal: make tomorrow easy.

Steps:

1. Run:

   ```bash
   npm run check
   git status --short
   git diff --stat
   ```

2. Update:

   ```text
   docs/EVIDENCE.md
   STATE.md
   NEXT.md
   active task card
   ```

3. Commit only if Nate approves.

Suggested commit message if code lands:

```text
feat: add shopfloor time-bank loop foundation
```

If only docs/plans land:

```text
docs: lock shopfloor time-bank mvp plan
```

4. End with:

- what changed
- what passed
- what failed
- next safest action

---

## 4. Success criteria for tonight

Minimum success:

- MWP flow is followed.
- Decisions are recorded.
- One implementation card is active.
- No scope explosion.
- `npm run check` still passes.

Good success:

- `request_responses` implemented live.
- request detail page can show/respond.
- completion/time model is at least schema-level ready.

Excellent success:

- response + completion + time ledger/history work locally.
- shop card shows simple time-bank summary.
- structured tools are either minimally wired or cleanly deferred with task card updated.

Failure that still counts:

- We discover the schema/app shape is messier than expected, document it, and stop with a precise next action.

That is not failure. That is refusing to generate rubble.
