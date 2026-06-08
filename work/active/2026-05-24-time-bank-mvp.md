---
status: active
priority: high
owner: Nate + Egon
created: 2026-05-24
project: ShopFloor
requires_decision: true
---

# Decide time-bank MVP shape

## Intent

Evaluate and define the smallest realistic time-bank layer for ShopFloor, based on Nate's community feedback that people reacted strongly to the time-bank concept.

## Context

ShopFloor already has the pieces a time bank can attach to:

- `shop_cards` = members / public profiles
- `help_requests` = needs / work opportunities
- planned `request_responses` = offers to help
- `field_notes` = completed work / proof of usefulness
- planned `tools` = practical resources used to perform help

A time bank likely does not replace the repair/help network. It becomes the exchange/accounting layer underneath it.

Working framing:

> ShopFloor is a neighborhood repair time bank, with tools/resources and field notes as the practical infrastructure around it.

## Decision Needed

Choose the MVP accounting model:

1. **Simple ledger after completion** — request author marks help complete; helper receives time credit; requester receives matching debit or system-visible spend.
2. **Soft hours only** — show contributed/received hours as trust signal, but do not enforce spendable balances yet.
3. **Defer accounting** — use time-bank language publicly, but implement requests/tools/field notes first.

Recommendation: start with #2 or a very small #1. Do not build full marketplace/accounting mechanics yet.

## Acceptance Criteria for planning

- [ ] Decide whether time credits are spendable balances or trust/history signals in MVP.
- [ ] Decide whether one hour always equals one credit.
- [ ] Decide who can record/confirm completed time.
- [ ] Decide whether negative balances are allowed.
- [ ] Decide whether tool loans earn time credits, and if so how simply.
- [ ] Update `docs/DIRECTION_AND_AGENT_OPERATING_MODEL_2026-05-24.md`.
- [ ] Update `docs/DECISIONS.md` with the chosen time-bank MVP stance.
- [ ] If approved, write implementation plan for time-bank schema/UI.

## Evidence Required

- Decision recorded in `docs/DECISIONS.md`.
- Implementation plan path if proceeding.
- Explicit list of what is out of scope.

## Do Not Add Yet

- Cash conversion.
- Hour bidding.
- Different hourly rates by skill.
- Public leaderboards.
- Financial/legal language.
- Automated dispute resolution.
- Complex escrow.
- Ratings-as-punishment.

## Deferred UX / product notes from live walkthrough

Captured 2026-05-25 09:32 EDT during User A shop-card walkthrough. These should not interrupt the current time-bank verification loop, but they should survive into the next design/product pass.

- Add some kind of visual treatment and logo/identity pass. Current interface is functional but lacks a recognizable ShopFloor mark.
- Header navigation should stay on one line at normal desktop widths. If “How it works” wraps, reduce nav sizing and close horizontal gaps rather than letting it break onto a second line.
- Neighborhood should become structured multi-select data, similar to skills, not a single free-text field.
- Neighborhood choices should include Akron neighborhoods, and users should be able to select every neighborhood that applies to them or where they are willing to help.
- Tools should eventually move beyond “free text for now.” Exact structure is undecided; likely needs a lightweight inventory/resource model rather than a plain text blob.
- Profile/detail pages need stronger typography hierarchy. Current fonts/weights/sizes are too similar, so profile content blends together instead of scanning cleanly.
- Home page had duplicate adjacent CTA buttons both labeled “Open the neighborhood feed”; second CTA should point somewhere distinct, such as “How it works.”
- Magic Link-only auth rate limits blocked final same-browser two-user completion testing after signing out of both users; future E2E should use separate browsers/sessions or a dev auth strategy.
- Auth roadmap note, captured 2026-05-25 10:28 EDT: Magic Link is acceptable for MWP concept validation, but standard email/password auth or another durable sign-in option should be planned for a later version before broader testing. Auth cannot remain a bottleneck where one project-wide email cap can stall the whole loop.
