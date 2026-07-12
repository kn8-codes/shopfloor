# ShopFloor tester-loop script — request walkthrough + support intake

Date: 2026-07-12
Status: local/private preview script; no deploy or public release gate change

## Purpose

Prove one Akron-adjacent tester can walk through the request path and has a dignified way to report confusion, bugs, or safety concerns without being stranded.

## Operator boundary

- Keep `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE` closed in deployed/public environments.
- For local/private preview only, run the app with `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true` so the gated app shell is visible to the tester.
- Do not collect secrets, passwords, medical details, exact addresses, or anything that should not live in a small-alpha note.
- Do not treat the support form as emergency dispatch, legal advice, eligibility screening, or live case management.

## Walkthrough path

1. Open the local/private preview.
2. Show `/about` for the mission frame.
3. Open `/feed` and explain sample-vs-live labeling.
4. Open `/new-request` and have the tester describe a realistic request without submitting private details.
5. Open `/request/request-battery-clamp` and review the request detail path, including local support options as sample/non-endorsement data.
6. Open `/support` and ask the tester to record one point of confusion, blocker, safety concern, or improvement.
7. Use the `Copy note` button and paste the generated packet into the tester-loop receipt or operator notes.

## Success criteria

- Tester can understand what ShopFloor is for.
- Tester can see where a real request would start.
- Tester can identify what happens if they get confused or uncomfortable.
- Support note can be copied without any account, deployment, or public contact.
- Operator records the copied note as evidence before changing product direction.

## Current support-intake implementation

- Route: `/support`
- Nav label: `Support`
- Storage/send behavior: none; copyable local note only.
- Designed for controlled alpha walkthroughs before backend support-ticket persistence exists.
