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

## 2026-05-24 — Structured tools are the main open MVP decision

**Decision:**  
Pending. Audit recommends adding structured tools now in the smallest useful form.

**Why:**  
Docs and sample data already treat tools as first-class. Current SQL/app live flow does not persist tools. Nate reported fresh community interest, and prior product insight says “who has the damn tool” matters.

**Alternatives rejected:**  
None yet. Deferring structured tools one sprint remains possible, but should be explicit so the UI/docs stop pretending tools are live.

**Revisit when:**  
Nate or Janine chooses the next implementation task.

**Source:**  
`docs/HANDOFF_JANINE_2026-05-24.md`
