# Plan — ShopFloor private proof pivot

Date: 2026-07-13
Owner: Egon
Status: ACTIVE

## Trigger

Nate accepted the belt.loop UI hardening slice and said we can pivot.

## Scope

Advance ShopFloor one bounded step toward private alpha proof without opening the public release gate.

## Mode

Start in **dry/static proof mode**.

Live Supabase verification still requires Nate's explicit approval phrase before using anon credentials against live data:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
```

Reason: the current live probe includes insert-denial checks. If RLS is misconfigured, those attempted inserts could create test rows. That is exactly the thing we are testing for, which means it needs a clean gate.

## Allowed now

- Inspect repo state, schema, route code, and env key presence without printing values.
- Run `npm run check` and `npm run build` from `app/`.
- Run local preview route smokes in controlled local mode.
- Harden the privacy probe so live write-attempt checks are opt-in and safer.
- Update evidence/state/next docs and write a receipt.

## Forbidden without further approval

- Deploy or push.
- Open the public release gate in any deployed environment.
- Print Supabase secrets or env values.
- Run live insert-denial probes unless explicitly approved.
- Enter external tester data.
- Contact testers/community.
- Add ratings/gig mechanics/leaderboards/escrow/cash conversion.

## Verification target

1. `git status --short --branch` before/after.
2. `node --check scripts/shopfloor_privacy_probe.mjs`.
3. `npm run check` from `app/`.
4. `npm run build` from `app/`.
5. Local preview smokes for `/support`, `/field-notes`, `/field-notes/new`.
6. Receipt with pass/blocker state and next gate.
