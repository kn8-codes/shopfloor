# ShopFloor Direction + Agent Operating Model — 2026-05-24

**Status:** draft alignment document; ShopFloor defaults accepted by Nate, time-bank direction added for evaluation  
**Author:** Egon  
**Source:** Nate conversation + current ShopFloor Stack OS files  
**Checked at:** 2026-05-24 17:04 EDT  
**Updated:** Nate confirmed the default ShopFloor answers, corrected MWP naming, corrected mesh lane assumptions, and added time-bank functionality as the community-exciting feature to evaluate as ShopFloor's exchange layer.

This document exists because decisions are starting to pile up. The purpose is to reduce Nate's cognitive load, not create ceremonial paperwork. If this becomes bureaucracy, delete it with fire — after confirming with Nate, because agents are not allowed to delete things just because they have feelings.

---

## 1. What ShopFloor is right now

ShopFloor is currently a **SvelteKit + Supabase prototype** for a neighborhood repair and survival network, starting in Akron.

Current charter language:

> ShopFloor is a neighborhood repair and survival network for working people in Akron: local practical help, shop cards, tools/resources, requests, and field notes that turn fixes into reusable local knowledge.

In plainer terms:

ShopFloor is a way for people nearby to find practical help, show what they can do, share what tools/resources they have, and turn fixes into local memory.

It is **not** currently just an idea. The repo has:

- SvelteKit app under `app/`
- Supabase schema under `supabase/schema.sql`
- Magic Link auth scaffold
- shop card creation/upsert flow
- help request creation flow
- prototype routes for feed, shop profiles, requests, field notes, login, and onboarding copy
- product docs for MVP schema, first five screens, trust/safety, and prototype direction
- Stack OS project structure: `PROJECT_CHARTER.md`, `STATE.md`, `AGENTS.md`, `docs/DECISIONS.md`, `docs/EVIDENCE.md`, and task cards under `work/`

Current verified technical state from `STATE.md`:

- `npm ci && npm run check` passed with 0 errors / 0 warnings.
- Live data support is partial.
- Shop and request detail pages try Supabase first, then fallback to sample data.
- `/feed` still uses sample data.
- request responses and tools are not live-backed yet.

---

## 2. The core product fork

The project is not blocked on “what is ShopFloor?” anymore. The repo already answers that well enough.

The real fork is:

> Is the first external promise “find local practical help,” or “find tools/practical help nearby”?

The earlier decision says public copy should lead with **local repair network**, not pure tool rental.

But the strongest recent signal is that **tool inventory matters**. The phrase to preserve:

> “Who has the damn tool” is first-class alongside “who knows how to help.”

That means structured tools may not be a side feature. They may be the thing that makes the network legible to normal people.

---

## 3. Recommended ShopFloor direction

Recommended framing:

> ShopFloor is local repair infrastructure. The first useful object is a shop card: who you are, what you can help with, what tools/resources you have, what time you can offer, and what fixes you have actually done.

### Emerging direction: time bank as the exchange layer

Nate clarified that when he described the project to people in the community, the exciting part was **time bank functionality**: people helping each other and tracking earned/spent time instead of making every interaction cash-based.

This fits the current project. It does not require throwing away the repair/help model. A time bank can become the exchange/accounting layer underneath the existing objects:

- `shop_cards` = members / public profiles
- `help_requests` = needs / work opportunities
- `request_responses` = offers to help
- `field_notes` = completed work / proof of usefulness
- new `time_ledger_entries` = hour credits/debits after help is completed

Realistic MVP meaning:

- One hour of help earns one time credit.
- Time credits can be spent receiving help from someone else.
- Credits are tracked as ledger entries, not editable balances.
- No cash conversion.
- No marketplace bidding.
- No financialization. Time is coordination and reciprocity, not funny money with better branding.

This changes the product center of gravity:

> ShopFloor is a neighborhood repair time bank, with tools/resources and field notes as the practical infrastructure around it.

Recommended MVP order after this clarification:

1. **Time bank framing and ledger MVP**
   - Add simple time-credit language to product direction.
   - Add minimal ledger model after request completion.
   - Keep balances derived from ledger entries, not manually edited.

2. **Structured tool/resource inventory**
   - Add real persistence for tools/resources.
   - Keep it boring: name, category, lendable yes/no, availability/note, owner shop card.
   - Tools support time-bank work; they are not a separate rental marketplace.

3. **Live neighborhood feed**
   - Replace sample feed with Supabase-backed requests.
   - Let people browse needs and offers.

4. **Request response + completion loop**
   - Let people offer help.
   - Let request author mark help completed.
   - Completion can create a field note and optional time ledger entry.

5. **Field notes**
   - Turn completed fixes into reusable local knowledge.
   - This is what prevents the platform from becoming disposable chat sludge.

This keeps the first loop concrete:

1. Sign in.
2. Create shop card.
3. Add skills/tools/resources and rough availability.
4. Post or browse a request.
5. Offer help.
6. Mark help completed.
7. Record time credit and capture what worked.

---

## 4. Questions Nate needs to answer

These are the few questions that matter. Everything else is agent compost.

### Question 1 — Entry promise

When someone first hears about ShopFloor, which sentence should be true?

A. “Find local practical help when something breaks.”  
B. “Find who nearby has the tool, skill, or resource you need.”  
C. “Build a neighborhood repair network around people, tools, and field notes.”

Default recommendation: **C for internal strategy, A for public copy, B for first data feature.**

### Question 2 — Tool inventory now or next sprint?

Should structured tools be included in the next implementation pass?

A. Yes — tools are core MVP and should be persisted now.  
B. No — finish live request/feed loop first and explicitly soften tool promises until later.

Default recommendation: **A.**

### Question 3 — What counts as a “tool/resource”?

Should the MVP include only physical tools, or broader practical resources?

A. Physical tools only: jack, drill, ladder, scanner, compressor.  
B. Tools + equipment/resources: garage bay, truck, OBD scanner, sewing machine, printer, workspace.  
C. Anything useful locally, including skills and materials.

Default recommendation: **B.** Skills stay separate; tools/resources are concrete assets.

### Question 4 — Is ShopFloor mutual aid first or contractor lead-gen adjacent?

A. Pure mutual aid / neighborhood repair infrastructure.  
B. Mutual aid first, but compatible with trusted local tradespeople.  
C. Contractor lead-gen product with community language.

Default recommendation: **B.** Do not contaminate the trust layer with extractive lead-gen mechanics, but do not exclude real tradespeople.

### Question 5 — What is the first real-world pilot shape?

A. Private invite-only Akron pilot.  
B. Public read-only prototype, posting by invite.  
C. Internal demo only until live Supabase flow is proven.

Default recommendation: **C until live flow is verified, then A.**

---

## 5. MWP / Stack OS overlap

Nate referred to “MWP structure.” Current working interpretation:

> MWP / Stack OS = Markdown-based project operating system: charter, state, agent instructions, task cards, decisions, evidence, and handoffs.

If MWP means something else, correct this document.

The overlap is:

- **Stack OS/MWP is not the product.**
- It is the rail that keeps agents from turning the product into a haunted forest.
- Each project gets a small durable filesystem brain:
  - `PROJECT_CHARTER.md` — what this is / is not
  - `STATE.md` — current reality and next best action
  - `AGENTS.md` — how agents behave here
  - `work/` — task cards, one unit of work at a time
  - `docs/DECISIONS.md` — decisions that should not be re-litigated every session
  - `docs/EVIDENCE.md` — receipts, not claims

For ShopFloor, MWP/Stack OS answers:

- What is the current goal?
- What is the next safe task?
- What evidence proves it worked?
- What did Nate decide?
- What should the next agent read before touching code?

It does **not** answer:

- What should the product become?
- Which community promise is most important?
- Whether Nate wants mutual aid purity or trades-adjacent pragmatism.

Those remain Nate judgment calls.

---

## 6. Agent lanes and model/problem routing — current plan

Updated after Nate correction: the active mesh is smaller than the old map. Peter/OpenClaw is effectively retired for operational purposes. Winston/Jeep exists as a fallback/diagnostic node, not a normal work lane. Kimi on Winston is underused and should not be renewed unless the new operating strategy proves a concrete use for it.

The mesh should not treat all work as the same kind of work. Different problems need different lanes, but the lane map should be small enough to survive actual use.

### Lane 1 — Janine: coordination / front desk

**Primary:** Janine / M4  
**Best for:** daily reports, routing, status, reminders, asking Nate for decisions, keeping the board clean.  
**Near-term model stance:** keep current stable provider/model until model-switching rules are defined and tested. DeepSeek Flash is a candidate for Janine later.  
**Should not do:** deep code surgery without a scoped task card.

### Lane 2 — Egon: heavy technical implementation

**Primary:** Egon / M1  
**Best for:** code audits, debugging, architecture, deterministic scripts, infra repair, writing implementation plans, verifying receipts.  
**Default model shape:** Codex/gpt-5.5 style heavy reasoning/coding.  
**Should not do:** become the front desk or silently expand product scope.

### Lane 3 — Script-only deterministic automation

**Primary:** deterministic scripts, cron `no_agent=true` where possible.  
**Best for:** health checks, reports based on CLI JSON, polling, backups, status pings.  
**Rule:** if the job is mainly “run command, parse JSON, report result,” do not spend LLM tokens or invite hallucination.

The Janine morning report repair proved this rule. The LLM report hallucinated stale identity state. The script told the truth.

### Lane 4 — Winston/Jeep: fallback and field diagnostics only

**Primary:** Winston / Jeep only when needed.  
**Best for:** diagnosing the mesh when M1/M4 are down, Jeep-local checks, emergency fallback, OBD/field-node work if explicitly revived.  
**Current model stance:** Kimi is underused; do not renew just because it exists. Give it a concrete job or let it lapse.  
**Should not do:** routine product work, product strategy, or normal coordination.

### Retired lane — Peter/OpenClaw

Peter/OpenClaw remains installed but should be treated as retired unless Nate explicitly revives it. Do not route work there by default. Do not include it in implementation plans as an active capacity.

### Escalation lane — expensive / special models

**Primary:** high-end or specialty models only when needed.  
**Best for:** hard architecture, messy synthesis, difficult bugs, ambiguous product strategy, or evaluation of a model switch.  
**Rule:** use deliberately. Do not burn premium inference on cron jobs, simple summaries, or mechanical checks.

---

## 7. How agent lanes use MWP / Stack OS

The agent lane plan and MWP/Stack OS are complementary:

- **MWP/Stack OS defines the work.**
- **Agent lanes decide who or what should do the work.**

Work should flow like this:

1. Nate expresses intent casually.
2. Janine or Egon converts it into a project/task card.
3. The task card declares:
   - intent
   - acceptance criteria
   - evidence required
   - blocker/decision needed
4. The orchestrating agent chooses the lane:
   - script if deterministic
   - Janine if coordination
   - Egon if technical analysis/repair or code planning
   - Winston/Jeep only if M1/M4 are down or the task is genuinely field-node-specific
   - expensive/special model only after the task card justifies escalation
5. The implementer updates evidence and state.
6. Nate gets a short report with receipts and next decision, not a wall of internal process.

This is the intended cognitive load transfer:

- Nate supplies judgment.
- Agents hold structure.
- Scripts hold facts.
- Evidence prevents drift.

---

## 8. Model switching rules under Stack OS / MWP

Model switching should not be a mood ring. It should be a controlled routing decision attached to work type, cost, and evidence requirements.

### Principle

> The task card chooses the model lane; the agent does not free-solo model switches mid-task.

Every non-trivial task card should eventually include a small routing block:

```yaml
execution_lane: janine | egon | script | winston_fallback | escalation
model_policy: stable_default | cheap_batch | coding_heavy | deepseek_flash_trial | premium_escalation
requires_receipts: true
```

This keeps model choice tied to the work, not to whichever agent is currently excited about a benchmark.

### Stable defaults until proven otherwise

Until the new workflow proves out:

- Janine stays on the current stable lane.
- Egon stays the heavy technical/Codex lane.
- Winston stays fallback-only.
- Peter/OpenClaw stays retired.
- DeepSeek Flash is a candidate for Janine, not an immediate default.
- Kimi on Winston should not be renewed unless a concrete job appears before renewal.

### When to switch models

Switch only when one of these is true:

1. **Cost pressure:** current model is too expensive for the work class.
2. **Quality mismatch:** current model repeatedly fails a known task type.
3. **Latency:** a coordination/reporting lane needs faster responses.
4. **Capability:** a model is clearly better for a narrow class: code, summarization, routing, long context, etc.
5. **Trial card:** Nate explicitly wants to evaluate a model.

### How to trial DeepSeek Flash for Janine

Do not silently swap Janine’s main runtime first.

Create a trial task card:

```text
work/inbox/YYYY-MM-DD-janine-deepseek-flash-trial.md
```

Acceptance criteria:

- capture current Janine provider/model config
- run a fixed test prompt pack on current model
- switch Janine test session or temporary profile to DeepSeek Flash
- run the same prompt pack
- compare:
  - instruction following
  - concision
  - tool discipline
  - cost
  - latency
  - hallucination/receipt behavior
- only then decide whether to promote DeepSeek Flash to Janine’s default

Recommended test prompt pack:

1. Morning report from Envoy receipts.
2. Convert Nate voice-dictated ambiguity into 3 clear questions.
3. Summarize a project `STATE.md` without inventing work.
4. Route a task card to Janine/Egon/script/escalation.
5. Refuse to perform an action without receipts when required.

### Rule from the Janine report incident

If a task can be made deterministic, make it deterministic. Do not ask a model to “remember” authority state when a script can read JSON and print receipts.

LLMs may summarize deterministic output. They should not be the source of truth for identity, capability, deployment, billing, or health state.

---

## 9. Immediate implementation plan

### Step 1 — Decide ShopFloor direction

Answer the five questions above, or accept the defaults:

- internal strategy: repair network around people + tools + field notes
- public copy: local practical help when something breaks
- first data feature: structured tools/resources
- resource scope: physical tools + concrete resources
- pilot: internal until live flow works, then invite-only Akron

### Step 2 — Record decisions

Update:

- `docs/DECISIONS.md`
- `STATE.md`
- current task card: `work/inbox/2026-05-24-structured-tools-mvp.md`

### Step 3 — Write implementation plan for structured tools

Create:

- `docs/plans/2026-05-24-structured-tools-mvp.md`

Plan should include exact changes to:

- `supabase/schema.sql`
- `app/src/lib/api.js`
- `app/src/lib/server/shopfloor.js`
- `app/src/routes/shop/new/+page.svelte`
- relevant display components/routes
- `docs/EVIDENCE.md`
- `STATE.md`

### Step 4 — Implement only after decision

Do not touch code until Nate chooses or accepts the default.

### Step 5 — Verify

Required verification:

```bash
cd /Users/kn8/projects/shopfloor/app
npm run check
```

If live Supabase credentials are available, also verify against the live project. If not, record that as a blocker instead of pretending.

---

## 9. Current recommended next action

Ask Nate to choose one of these:

1. “Accept defaults and write the structured tools implementation plan.”
2. “Adjust the direction first; here are my answers.”
3. “Pause ShopFloor and finalize mesh agent lanes first.”

Default if Nate is tired:

> Accept defaults and write the structured tools implementation plan.
