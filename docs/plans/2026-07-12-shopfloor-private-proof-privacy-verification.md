# ShopFloor Private Proof + Privacy Verification Packet

Date: 2026-07-12
Owner: Egon
Kanban: `t_2ac068b7`
Status: READY_FOR_DRY_REVIEW_LIVE_CREDS_GATED

## Purpose

Move ShopFloor from local prototype confidence to private-proof readiness without opening the public release gate or entering external tester data too early.

This packet covers the next concrete work after:

- `/support` tester feedback intake exists;
- `/field-notes` archive exists;
- `/field-notes/new` creation v0 exists;
- state/manager docs were refreshed on `main`.

## Gate

Two modes exist.

### Mode A — dry/static proof

Allowed now:

- inspect committed schema/code/docs;
- write test matrix;
- prepare scripts that require env later;
- run app check/build;
- run local sample-mode route smoke.

Forbidden in dry mode:

- reading/printing live secrets;
- using Supabase credentials;
- Magic Link/auth account actions;
- entering real external tester data;
- deploy/public release/contact.

### Mode B — live verification

Requires explicit Nate approval because it uses live-ish auth/data reality:

- read local `app/.env` without printing values;
- use `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`;
- probe Supabase tables/views through anon key;
- optionally sign in requester/helper test users via Magic Link;
- write temporary consented/internal test records.

## Current static privacy model

From `supabase/schema.sql`:

### `shop_cards`

- Public can read visible shop cards:
  - `is_visible = true`
- Users can insert/update only their own card:
  - `auth.uid() = id`

### `help_requests`

- Public can read only open-ish safe requests:
  - `safe_to_share = true`
  - `status in ('open', 'in_progress', 'resolved')`
- Users with visible shop card can create own requests.
- Authors can update own requests.

### `help_requests_with_author`

- View joins help requests to visible author data.
- `security_invoker = true` is set, so underlying RLS should apply to view reads.
- Must be live-verified; docs/code claims are not enough.

### `field_notes`

- Public can read all field notes:
  - `using (true)`
- Authenticated users can create/update their own notes:
  - `auth.uid() = author_id`
- `request_id` can link to `help_requests`, but the field note row itself does not expose request title/description.

## Static risk notes

1. **Field notes are public-readable by design in current schema.**
   - This supports the repair-memory loop.
   - It also means any real field note text must be treated as public content.

2. **Linked request privacy needs live proof.**
   - A note can store `request_id` for a private/closed request if the signed-in author knows the UUID and FK allows it.
   - Public readers would see the UUID but not the hidden request title/description through current field-note queries.
   - Still worth verifying and possibly hardening later.

3. **Client-side `createFieldNote()` checks shop-card presence, but RLS/FK is the real boundary.**
   - `author_id` references `shop_cards(id)`, so users without shop cards should fail insert even if client checks are bypassed.
   - Live verification should prove that.

4. **Support route is no-send/copyable only.**
   - No persistence risk yet.
   - The risk is human workflow: copied notes must not include secrets, exact addresses, or sensitive details.

## Dry verification checklist

- [x] Confirm repo clean on `main`.
- [x] Confirm field-note v0 is present.
- [x] Confirm `.env.example` has placeholders only.
- [x] Confirm `.gitignore` ignores `.env` and `.env.*` while allowing `.env.example`.
- [x] Confirm schema policies are readable and summarized above.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
- [ ] Run local sample-mode route smoke for:
  - `/support`
  - `/field-notes`
  - `/field-notes/new`

## Live verification checklist

Only after explicit approval.

### Environment preflight

- [ ] Confirm `app/.env` exists.
- [ ] Confirm required keys are set without printing values:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
  - `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE`
- [ ] Confirm `.env.example` still contains placeholders.

### Anonymous RLS probes

With anon key, verify:

- [ ] `shop_cards` select succeeds and returns only visible cards.
- [ ] `help_requests` select succeeds and returns only `safe_to_share=true` and open/in_progress/resolved.
- [ ] `help_requests_with_author` select obeys the same safe/open-ish boundary.
- [ ] `field_notes` select succeeds and returns public notes.
- [ ] anon insert into `shop_cards` fails.
- [ ] anon insert into `help_requests` fails.
- [ ] anon insert into `field_notes` fails.

### Authenticated single-user probes

With one internal/consented test user:

- [ ] Magic Link sign-in works.
- [ ] user can create/update their own shop card.
- [ ] user can create own help request after shop card exists.
- [ ] user can create field note after shop card exists.
- [ ] user cannot create field note as another `author_id`.
- [ ] user cannot update another user's shop card/request/note.

### Two-user private proof

With two internal/consented accounts or aliases:

- [ ] requester creates shop card.
- [ ] requester creates safe request.
- [ ] helper can view safe request.
- [ ] helper writes field note with honest safety label.
- [ ] public/anon reader can see field note.
- [ ] public/anon reader cannot see unsafe/closed request details.

## Local route smoke commands

From `app/`:

```bash
npm run check
npm run build
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true npm run preview -- --host 127.0.0.1 --port 4188
```

Probe:

```bash
curl -fsS http://127.0.0.1:4188/support >/tmp/shopfloor-support.html
curl -fsS http://127.0.0.1:4188/field-notes >/tmp/shopfloor-field-notes.html
curl -fsS http://127.0.0.1:4188/field-notes/new >/tmp/shopfloor-field-notes-new.html
```

Required markers:

- `/support`: `Tester support`, `Nothing is sent automatically`, `No emergency dispatch`
- `/field-notes`: `Keep the fix`, `not ratings`, `Write a field note`
- `/field-notes/new`: `Capture what worked`, `Safety / honesty label`, `Public release stays gated`

## Recommended next action

Run dry/sample route smoke now. Then, if Nate approves live credential use, run the anon-key RLS probes before any browser Magic Link walkthrough.

## Approval text for live mode

Nate can approve live mode with:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
```

That authorizes reading local `app/.env` without printing secrets, using the anon key for RLS probes, and using explicitly named internal test accounts if provided or already configured locally.
