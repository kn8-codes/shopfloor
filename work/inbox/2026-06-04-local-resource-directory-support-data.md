---
status: inbox
priority: high
owner: unassigned
created: 2026-06-04
project: ShopFloor
requires_decision: true
execution_lane: peter_m4_review_then_egon_or_nate_build
model_policy: coding_heavy
requires_receipts: true
---

# Local resource directory as ShopFloor support data

## Intent

Figure out where Akron local resource information belongs in ShopFloor without turning the product into a generic directory, charity portal, or content dump.

ShopFloor is trying to help people solve real problems. A curated, practical list of existing help is not adjacent to that mission; it is part of the survival/repair loop.

## Context

Source signal:

- Everyone Deserves to Eat public site review:
  - `/Users/kn8/MESH_BOARD/projects/research/local-akron/2026-06-04__everyone-deserves-to-eat-signal-mining.md`

Useful public-resource categories observed:

- childcare
- clothing
- dental
- harm reduction / recovery
- education
- employment
- reentry
- eyecare
- financial / housing
- shelters
- legal
- meal sites / food
- zines / printable mutual-aid knowledge packets

Current ShopFloor state already has a known gap:

- structured tools/resources are important to product direction
- sample data has tools/resources
- schema does not yet persist structured tools/resources
- `STATE.md` says structured tools/resources should support the help loop, not become a separate marketplace

## Product question

Where does this fit?

Candidate surfaces to evaluate:

1. Request creation help: when someone posts a request, suggest relevant local resources before/alongside neighbor help.
2. Request detail sidebar: show nearby/existing resource options related to the request category.
3. Field notes: let agents/humans preserve useful local resource packets as field notes.
4. Shop/community profiles: allow trusted shops/groups to attach resource links or printable packets.
5. Separate `/resources` route: only if the above seams are too cramped; avoid making this the homepage or center of gravity.

## Acceptance Criteria

Peter/M4 should produce a bounded recommendation, not a broad rebuild:

- Read current ShopFloor docs/state before proposing changes.
- Read the EDE signal-mining artifact.
- Inspect current app routes/components enough to know real insertion points.
- Propose the smallest useful integration seam for local resources.
- Identify whether this should share the future structured tools model or needs a separate `resources` model.
- Avoid ratings, public scores, charity voyeurism, monetized referrals, or anything that humiliates people for needing help.
- Preserve ShopFloor center of gravity: neighborhood repair time bank first; resources as support data.

## Evidence Required

Write a short handoff/receipt with:

- files read
- recommended surface
- suggested data shape
- suggested first UI slice
- risks / do-not-build list
- whether coding should start now or wait for Nate decision

Suggested output path:

`/Users/kn8/MESH_BOARD/00_INBOX/egon/2026-06-05__peter-shopfloor-local-resources-recommendation.md`

## Notes

This is not a request to scrape, copy, or republish EDE's whole directory. Start with product placement and data model. Any public use of specific EDE content should be credited and reviewed by Nate first.
