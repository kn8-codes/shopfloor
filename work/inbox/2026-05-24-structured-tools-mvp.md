---
status: inbox
priority: high
owner: unassigned
created: 2026-05-24
project: ShopFloor
requires_decision: true
---

# Decide and implement structured tools as MVP data

## Intent

Resolve the main product/data mismatch found during audit: tools are core in the product docs and sample data, but current SQL/app live flow does not persist structured tools.

## Context

Community signal suggests ShopFloor is welcomed because it solves practical local coordination. Prior product insight: “who has the damn tool” is first-class alongside “who knows how to help.”

Current mismatch:

- `docs/mvp-schema.md` defines a `tools` object.
- `app/src/lib/data/sample.js` contains structured tools.
- `docs/prototype-decisions-2026-04-19.md` says tool inventory in MVP should be structured list + lendable + availability.
- `supabase/schema.sql` does not define a `tools` table.
- `/shop/new` captures tools as free text and returns parsed values in a success message, but does not persist them.
- live shop profile loading currently returns `tools: []`.

## Decision Needed

Choose one:

1. Add structured tools now, in the smallest useful form.
2. Explicitly defer structured tools one sprint and remove/soften UI promises until then.

Recommendation: choose #1, but keep it boring. No reservations, payments, calendars, logistics, or tool-lending workflows yet.

## Acceptance Criteria if implemented

- [ ] Read `STATE.md`, `NEXT.md`, `docs/HANDOFF_JANINE_2026-05-24.md`, `docs/mvp-schema.md`, and `supabase/schema.sql`.
- [ ] Add `public.tools` table to `supabase/schema.sql` using the documented MVP shape.
- [ ] Add RLS policies for public readable visible-owner tools and owner write access.
- [ ] Update shop card save flow to persist simple structured tool rows from the current free-text input.
- [ ] Update live shop profile loading so Supabase tools are displayed instead of `[]`.
- [ ] Preserve sample-data fallback behavior.
- [ ] Run `npm run check` from `app/`.
- [ ] Update `NEXT.md`, `STATE.md`, and `docs/EVIDENCE.md`.

## Evidence Required

- Changed file paths.
- SQL/schema summary.
- `npm run check` result.
- Any remaining live Supabase verification blocker.

## Do Not Add

- Tool reservations.
- Lending request workflow.
- Payments.
- Ratings.
- Image upload.
- Availability calendar.
- Logistics/dispatch system.
