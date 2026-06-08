# Decisions — ShopFloor

Record project decisions here. The goal is not bureaucracy. The goal is preventing future agents from re-litigating solved problems like tiny metal idiots.

## Format

```md
## YYYY-MM-DD — Decision title

**Decision:**  
What was chosen.

**Why:**  
Reasoning.

**Alternatives rejected:**  
What we did not do.

**Revisit when:**  
Condition that would make this stale.
```

## 2026-04-19 — Prototype direction from Nate rapid-fire MVP prompts

**Decision:**  
ShopFloor should do all three: help people find local practical help, show what people can do, and share tools/resources. The first job is led by finding local practical help. Public copy should lead with local repair network.

**Why:**  
The useful local repair/help loop is broader than a tool catalog, but tools/resources are part of how practical help becomes real.

**Alternatives rejected:**  
A generic gig app, a social platform, pure tool rental, overbuilt trust/rating systems.

**Revisit when:**  
Community feedback shows tools/resources are the clearer entry point than “local repair network.”

**Source:**  
`docs/prototype-decisions-2026-04-19.md`

## 2026-05-24 — ShopFloor MVP centers on neighborhood repair time banking

**Decision:**  
ShopFloor should be framed and built as a **neighborhood repair time bank**, with tools/resources and field notes as supporting infrastructure. MVP should start with time-bank language and a minimal completion/history model, designed so it can grow into a real ledger later.

Recommended stance accepted by Nate:

- Time credits start as history/trust signal, designed to become spendable later.
- One hour should equal one credit by default.
- Negative balances should not block people from receiving help in MVP.
- Completion/hours should be confirmed by both sides eventually; MVP can start with request-author confirmation.
- Tool loans do not earn credits in the first pass unless explicitly added later.

**Why:**  
Nate clarified that community excitement around the project came from the **time bank** framing. The existing app already has the core objects a time bank can attach to: shop cards, help requests, responses, field notes, and planned tools/resources. This makes time banking a better center of gravity than a generic help board or standalone tool library.

**Alternatives rejected:**  
A pure tool-rental marketplace, cash conversion, hour bidding, skill-based hourly rates, public leaderboards, complex escrow/disputes, and blocking help behind earned balances.

**Revisit when:**  
Real users complete several help exchanges and either ask for spendable balances or show that soft history/trust signals are enough.

**Source:**  
Nate conversation 2026-05-24; `docs/DIRECTION_AND_AGENT_OPERATING_MODEL_2026-05-24.md`; `work/inbox/2026-05-24-time-bank-mvp.md`

## 2026-05-24 — Structured tools support the time-bank loop

**Decision:**  
Structured tools/resources remain important, but they are no longer the standalone first center of gravity. They support the time-bank loop by showing what practical assets helpers can bring to a request.

**Why:**  
“Who has the damn tool” is still first-class, but the stronger product loop is: request → offer help → complete help → record time/history → capture field note. Tools/resources make that loop more useful.

**Alternatives rejected:**  
Treating tools as a separate rental marketplace or implementing reservation/payment/deposit logistics before the basic help-completion loop works.

**Revisit when:**  
Tool/resource lending becomes common enough that availability, reservations, or lending-specific credit rules are needed.

**Source:**  
`docs/HANDOFF_JANINE_2026-05-24.md`; Nate conversation 2026-05-24
