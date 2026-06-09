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
ShopFloor should be framed and built as a neighborhood repair time bank, with tools/resources and field notes as supporting infrastructure. MVP starts with a minimal completion/history model that can grow into a real ledger later.

**Why:**  
Nate clarified that community excitement around the project came from the time-bank framing. The existing app already has the core objects a time bank can attach to: shop cards, help requests, responses, field notes, and planned tools/resources.

**Alternatives rejected:**  
A pure tool-rental marketplace, cash conversion, hour bidding, skill-based hourly rates, public leaderboards, complex escrow/disputes, and blocking help behind earned balances.

**Revisit when:**  
Real users complete several help exchanges and either ask for spendable balances or show that soft history/trust signals are enough.

**Source:**  
Nate conversation 2026-05-24; `docs/DIRECTION_AND_AGENT_OPERATING_MODEL_2026-05-24.md`; `work/inbox/2026-05-24-time-bank-mvp.md`

## 2026-05-24 — Structured tools support the time-bank loop

**Decision:**  
Structured tools/resources remain important, but they are not the standalone first center of gravity. They support the help/time-bank loop by showing what practical assets helpers can bring to a request.

**Why:**  
“Who has the damn tool” is still first-class, but the stronger product loop is: request → offer help → complete help → record time/history → capture field note. Tools/resources make that loop more useful.

**Alternatives rejected:**  
Treating tools as a separate rental marketplace or implementing reservation/payment/deposit logistics before the basic help-completion loop works.

**Revisit when:**  
Tool/resource lending becomes common enough that availability, reservations, or lending-specific credit rules are needed.

**Source:**  
`docs/HANDOFF_JANINE_2026-05-24.md`; Nate conversation 2026-05-24

## 2026-06-08 — Low/no-data access belongs on the roadmap

**Decision:**  
ShopFloor should eventually support low-bandwidth and no-smartphone-adjacent access patterns: SMS-style control, low-data notifications, and later exploration of very low-bandwidth/mesh transport such as Meshtastic. This is not required for alpha, but it should be planned for early beta / release-candidate readiness.

**Why:**  
ShopFloor is mutual-aid infrastructure, not a polished app for people who already have stable data plans, modern phones, and time to fight a web UI.

**Alternatives rejected:**  
Treating ShopFloor as web-only indefinitely; making low-bandwidth access an alpha blocker; designing around rich notifications before the core help loop is stable.

**Revisit when:**  
The alpha loop is live-verified and the project starts early beta planning for notifications, support intake, and broader community testing.

**Source:**  
Nate conversation 2026-06-08.

## 2026-06-09 — Knowledge base starts as curated Markdown

**Decision:**  
The ShopFloor knowledge base starts as curated, file-backed Markdown rendered by SvelteKit. It should use wiki-style links and repo-owned source files. Supabase-backed KB tables, CMS editing, and user-submitted KB entries are deferred.

**Why:**  
Markdown is fastest for Sprint 1, easy for Nate and agents to edit, reviewable in Git diffs, durable if the app/database shape changes, and good enough to make the alpha useful immediately.

**Alternatives rejected:**  
Starting with Supabase KB tables, building an admin CMS, accepting user-generated KB entries, or adding database search before the content shape is proven.

**Revisit when:**  
The curated KB has enough entries that search/filtering, editorial workflow, or community submission becomes an actual bottleneck.

**Source:**  
`docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`; Sprint 1 conversation 2026-06-09.

## 2026-06-09 — Relationship is the infrastructure

**Decision:**  
ShopFloor public framing should make clear that practical help is the visible action, but durable local relationship is the deeper infrastructure.

**Why:**  
Nate clarified that beneath mutual aid/help language, the core mission is strengthening relationships with people nearby because those relationships keep people safe and alive through whatever comes.

**Alternatives rejected:**  
A gig-style task board, public ratings, humiliation mechanics, growth-first metrics, or any design that makes help faster while weakening trust.

**Revisit when:**  
Public user feedback shows the phrasing is unclear or the product mechanics drift away from relationship-building.

**Source:**  
Belt/ShopFloor public statement draft and Sprint 1 alignment conversation 2026-06-09.
