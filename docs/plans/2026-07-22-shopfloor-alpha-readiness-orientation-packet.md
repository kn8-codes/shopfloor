# ShopFloor Alpha Readiness + Orientation Packet

Date: 2026-07-22
Status: local-only internal packet; not public copy; no commit/push/deploy/public release authorized
Operator: Egon/default
Source list: `/Users/kn8/.hermes/kanban/boards/mesh-open-loops/attachments/2026-07-22__later-work-list-shopfloor-belt-venkman.md`

## Purpose

This packet consolidates the later-work list Nate asked to run while he is asleep/at work:

1. authenticated RLS proof follow-through;
2. Belt.works homepage relationship copy;
3. ShopFloor orientation;
4. Field Notes copy guardrails;
5. help-loop unification.

It is meant to keep future implementation from drifting into a service catalog, public ratings system, or premature launch posture.

## Current proven state

### Domain / gate

- `shopfloor.belt.works` is wired and serving through Vercel.
- The public release gate remains closed.
- Pre-release public behavior should continue to show the holding/closed message unless Nate explicitly approves opening the gate.

### Privacy / RLS

The authenticated-role RLS proof passed on 2026-07-22 with controlled synthetic data and cleanup.

Proof summary:

- synthetic author could create/read their own private request;
- synthetic author could create/read their own restricted Field Note;
- synthetic author could create/read their own hidden shop card;
- unrelated signed-in user could not read those private/restricted/hidden rows;
- anonymous user could not read those rows;
- unrelated user could not insert as the author;
- `help_requests_with_author` did not bypass RLS;
- cleanup left zero synthetic `auth.users`, `shop_cards`, `help_requests`, and `field_notes` rows;
- release gate stayed closed;
- repo stayed clean.

Receipt:

```text
/Users/kn8/.hermes/kanban/boards/mesh-open-loops/attachments/t_a0cd55cf/2026-07-22__shopfloor-authenticated-role-rls-proof-passed.md
```

## Message lock

ShopFloor is Akron-first neighborhood repair/trust infrastructure, not a service catalog.

Aid is the visible action. Relationship is the infrastructure.

The approved internal Alpha Loop v1 is:

```text
public promise
→ safe request framing
→ local help / triage
→ restricted Field Note
→ support feedback
```

## Belt.works homepage relationship copy

Belt.works should not present ShopFloor as the whole business or as a lead funnel.

Recommended hierarchy:

1. **Belt.works** — practical software shop and mutual-aid infrastructure builder.
2. **Services** — scoped tools, workflow automation, data cleanup/shaping, web systems, local tech recovery.
3. **Method** — problem first, narrow scope, working artifact, receipts.
4. **ShopFloor** — flagship public-interest proof of the method and values.
5. **Mesh/agents** — backstage capacity and receipts, not the public front door.

Recommended public homepage line, still approval-gated:

```text
Belt.works is a practical software shop that builds small working systems for real problems — and uses that work to build mutual-aid infrastructure like ShopFloor.
```

Short proof block:

```text
ShopFloor is the flagship proof: Akron-first repair and mutual-aid infrastructure built around trust, local memory, and practical help instead of ratings, bids, or gig-work mechanics.
```

Use later with the Belt.works homepage draft:

```text
/Users/kn8/.hermes/kanban/boards/mesh-open-loops/attachments/t_3e59808d/2026-07-21__beltworks-homepage-service-lanes-concise-v1.md
/Users/kn8/.hermes/kanban/boards/mesh-open-loops/attachments/t_4fd2e0b3/2026-07-21__beltworks-homepage-service-lanes-copy-draft.md
```

## ShopFloor orientation

### What ShopFloor is

ShopFloor is a small local help loop for practical problems: repair, diagnosis, tool borrowing, setup, salvage, confusing local processes, and the ordinary stuck points that become expensive when people face them alone.

It should help neighbors:

- ask safely without needing a polished problem statement;
- find a practical next step;
- connect with local know-how or tools when appropriate;
- leave behind a restricted/private-first record of what worked;
- turn repeated lessons into safer local knowledge.

### What ShopFloor is not

ShopFloor is not:

- an emergency service;
- a licensed contractor marketplace;
- a public ratings board;
- a bidding/rates/escrow platform;
- a service catalog;
- a content mill for neighbor hardship;
- an endorsement directory;
- a machine that certifies professional quality or safety.

### Alpha posture

The alpha is not trying to prove scale. It is trying to prove that one or two controlled help loops can create useful local memory without exposing people.

Good alpha proof:

```text
safe ask → bounded help/triage → restricted note → reviewed lesson → support feedback
```

Bad alpha proof:

```text
fake activity → public posts → ratings → growth metrics → trust theater
```

## Field Notes copy guardrails

Field Notes are the memory layer of the help loop.

They should say:

```text
Keep the fix. Do not turn the neighbor into content.
```

A Field Note records:

- what broke or blocked someone;
- what was tried;
- what worked;
- what failed or stayed risky;
- tools/parts/time/cost where useful;
- limits, stop conditions, and what the next neighbor should check first.

A Field Note is not:

- a rating;
- a testimonial;
- an ad;
- a public dispute trail;
- a marketplace listing;
- a résumé;
- proof that ShopFloor certifies someone;
- permission to expose a neighbor’s situation.

Default circulation:

- restricted by default;
- publication only after reviewed path exists;
- no blasts/engagement mechanics in alpha;
- useful-for-next-neighbor beats attention.

## Help-loop unification model

The current hodgepodge becomes coherent if Field Notes are treated as the conversion point from event to memory.

```text
request = what is stuck
shop card = who/what capability may help
knowledge base = reusable reviewed guidance
support/resource panel = contextual options, not endorsements
field note = what actually happened and what we learned
support feedback = whether the loop left people stranded or safer
```

The unified loop:

1. Someone submits a safe, broad request.
2. A known/trusted/internal helper or steward triages it.
3. Practical help happens, or a realistic next step is found.
4. A restricted Field Note captures the lesson without exposing the person.
5. Repeated Field Notes become KB entries or copyable scripts/checklists.
6. Support feedback tells whether the process worked or stranded someone.

This lets ShopFloor grow local memory without becoming a generic service listing.

## Implementation backlog after Nate review

No implementation is authorized by this packet, but these are the next clean local tasks when approved:

1. Update ShopFloor `STATE.md`, `NEXT.md`, and deployment checklist to mark authenticated RLS proof as passed.
2. Keep `/about` language aligned to the message lock.
3. Keep `/field-notes` and `/field-notes/new` copy restricted-first and non-rating.
4. Add a private walkthrough script that uses controlled/synthetic data only.
5. Prepare a Belt.works homepage section map against the actual Belt.works repo in an isolated worktree because the main Belt.works working tree is dirty.
6. Decide whether the first controlled proof is:
   - restricted draft only;
   - full request-to-restricted-note walkthrough;
   - moderated public sample after review.

## Remaining approval gates

Still blocked until Nate separately approves:

- commit/push/deploy;
- public release gate opening;
- public ShopFloor copy approval;
- external tester data;
- real support-ticket persistence;
- request response/completion implementation;
- public Field Note publication;
- Belt.works homepage live rewrite;
- Venkman public-surface handoff execution.

## Recommended next action

When Nate resumes, decide the next proof shape:

```text
APPROVE SHOPFLOOR PRIVATE WALKTHROUGH PLAN — SYNTHETIC DATA ONLY
```

or keep the current batch parked and move to Belt.works homepage implementation planning.
