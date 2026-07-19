# ShopFloor private proof / privacy verification packet

Date: 2026-07-15 05:37 EDT
Status: READ_ONLY_LOCAL_PACKET
Lane approval context: Nate approved read-only local ShopFloor inspection/plan during ambient live work.
Operator: Egon

## Scope and hard boundaries

This packet is a local evidence and planning packet only.

Allowed:
- read local ShopFloor docs/state/code;
- inspect local schema and route files;
- write this Markdown packet and a receipt.

Not used / not touched:
- no credentials;
- no Vercel;
- no Supabase network/API access;
- no deploys;
- no schema writes;
- no app-code modifications;
- no public/community contact;
- no external tester data.

Values gate:
- dignity over extraction;
- consent before follow-up;
- no public ratings, leaderboards, or humiliation mechanics;
- local trust and safety outrank growth/speed.

## Local sources read

Primary state/docs:
- `/Users/kn8/projects/shopfloor/STATE.md`
- `/Users/kn8/projects/shopfloor/NEXT.md`
- `/Users/kn8/projects/shopfloor/docs/EVIDENCE.md`
- `/Users/kn8/projects/shopfloor/docs/DECISIONS.md`
- `/Users/kn8/projects/shopfloor/docs/foundry/PROJECT_MANAGER.md`
- `/Users/kn8/projects/shopfloor/docs/plans/2026-07-12-shopfloor-tester-loop-script.md`

Local implementation/schema evidence:
- `/Users/kn8/projects/shopfloor/app/src/routes/+layout.svelte`
- `/Users/kn8/projects/shopfloor/app/src/routes/support/+page.svelte`
- `/Users/kn8/projects/shopfloor/app/src/routes/field-notes/+page.svelte`
- `/Users/kn8/projects/shopfloor/app/src/routes/field-notes/new/+page.svelte`
- `/Users/kn8/projects/shopfloor/app/src/routes/field-notes/new/+page.server.js`
- `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`
- `/Users/kn8/projects/shopfloor/app/src/lib/api.js`
- `/Users/kn8/projects/shopfloor/supabase/schema.sql`

## Current support / field-note loop evidence

Current local state says ShopFloor has:
- explicit public release gate in `app/src/routes/+layout.svelte` using `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE`;
- `/support` tester support route as no-send, copyable feedback intake;
- `/field-notes` archive route with sample fallback or live-capable loader;
- `/field-notes/new` creation route with validation, preview, and gated save behavior;
- support/tester-loop script at `docs/plans/2026-07-12-shopfloor-tester-loop-script.md`.

Read evidence:
- `STATE.md` lines 41-53 describe release gate, field-note creation v0, support intake, and tester loop.
- `NEXT.md` lines 41-58 list current capabilities including support intake and field-note creation.
- `docs/EVIDENCE.md` lines 24-30 record the dry private-proof pivot and successful route smoke for `/support`, `/field-notes`, and `/field-notes/new`.
- `docs/EVIDENCE.md` lines 32-46 record field-note creation v0 and tester support intake route verification.
- `/support` implementation includes a support note builder, explicit “Nothing is sent automatically” copy, and a consent-to-follow-up field.
- `/field-notes/new` implementation requires sign-in and shop card for live saving, includes safety/honesty labels, and states that saving does not deploy, notify anyone, or publish a launch.

Local conclusion:
- Good enough for an internal private walkthrough of language, flow, and consent boundaries.
- Not good enough for external tester data until live privacy/RLS and copy/data rules are verified.

## Privacy / RLS assumptions that need verification

Assumptions supported locally, but not live-verified in this packet:

1. Public release stays closed unless explicitly opened.
   - Local evidence: `+layout.svelte` only renders the app shell when `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE === 'true'`.
   - Required later: deployed preview/prod env confirmation without exposing credentials.

2. `help_requests` public reads are restricted to shareable open-ish records.
   - Local schema: `safe_to_share = true and status in ('open', 'in_progress', 'resolved')`.
   - Required later: anon read probe against live Supabase confirming unsafe/private requests do not appear.

3. `help_requests_with_author` should not bypass RLS.
   - Local schema: `alter view public.help_requests_with_author set (security_invoker = true);`
   - Required later: live database inspection/probe confirming the deployed view has `security_invoker` and respects base-table RLS.

4. Field notes are currently public-readable.
   - Local schema: `create policy "public can read field notes" ... using (true);`
   - Risk: acceptable for a prototype archive only if field-note copy/data rules prevent sensitive data. This is the main privacy pressure point before external tester data.
   - Required later: decide whether field notes need `safe_to_share`, review status, redaction workflow, or author-only draft state before external testers.

5. Inserts/updates are auth-bound locally.
   - Local schema: help-request insert checks `auth.uid() = author_id` plus visible shop card; field-note insert checks `auth.uid() = author_id`; updates are author-bound.
   - Required later: live anon and authenticated probes. Do not run write-denial probes until Nate explicitly approves that exact test.

6. Support notes are not persisted.
   - Local `/support` route is client-only copyable text; no backend submission.
   - Required later: if persistent support tickets are implemented, design data minimization, consent, retention, escalation owner, and delete/export handling first.

## Consented internal walkthrough definition

Purpose:
- Prove that a trusted internal tester can understand the ShopFloor loop and identify confusion/safety concerns without entering real external tester data or being stranded.

Who qualifies:
- Nate, Egon/Venkman/Janine as operators, or one explicitly consented internal/private tester known to Nate.
- Not public/community testers yet.

Environment:
- local/private preview only;
- no Vercel auth changes;
- no Supabase live verification unless Nate gives a separate explicit approval;
- if a local preview is used, it may set `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true` locally only to view the gated app shell.

Allowed walkthrough path:
1. Open `/about` for mission frame.
2. Open `/feed` and identify sample-vs-live labels.
3. Open `/new-request` and draft a realistic but non-sensitive request; do not submit live external data.
4. Open one request detail page and inspect the local support options label as sample/non-endorsement data.
5. Open `/field-notes` and `/field-notes/new`; discuss what would be safe to record after help happens.
6. Open `/support`; create a copyable note containing one confusion/blocker/safety concern.
7. Record copied note in an internal receipt only if the tester consents.

Consent script:
> This is an internal walkthrough, not a public launch. Please do not enter secrets, passwords, medical details, exact addresses, or anything you would not want in a small-alpha test note. The support note is not sent automatically. If you choose to share it with us, you can say whether follow-up is okay. You can stop at any time.

Stop conditions:
- tester enters or starts to disclose exact address, medical/legal/emergency detail, password, or credential;
- tester thinks ShopFloor is emergency dispatch or official eligibility screening;
- route labels imply endorsement, rating, or public ranking;
- app requires public identity exposure before the person understands the privacy boundary;
- any live credential/Supabase/Vercel step becomes necessary.

## Safe copy/data before external tester data

Before any external tester enters real data, ShopFloor needs these copy/data decisions recorded and verified:

1. Request copy/data
   - No exact addresses in request body.
   - Neighborhood-level location only unless a later private coordination channel exists.
   - `safe_to_share` must be visible and meaningful to the requester.
   - Requests must not imply guaranteed help, emergency response, or eligibility decisions.

2. Field-note copy/data
   - Field notes are public-readable in current schema, so they must exclude identifying/sensitive details by default.
   - Required copy: “Write what happened and what worked; do not name neighbors, exact addresses, medical/legal details, or private contact details.”
   - Consider implementation before external testers: `safe_to_share` boolean, draft/review state, or moderation/redaction path.

3. Support intake copy/data
   - Current no-send copyable support note is safe for internal walkthroughs.
   - Before persistence: define owner, retention, who can read it, deletion path, and emergency/non-emergency language.

4. Local support options
   - Must remain explicitly sample-only / unverified / non-endorsement until a real source and verification workflow exists.
   - No scraped directory import or implied eligibility/ranking.

5. Public identity and shop cards
   - Shop cards are public-facing when visible. External tester onboarding needs plain copy explaining what profile fields become public.
   - No public ratings, no public trust score, no leaderboards.

Minimum external-tester go/no-go gates:
- live anon read probe confirms private/unsafe requests do not leak;
- live view check confirms `help_requests_with_author` respects RLS/security invoker;
- field-note public-read risk is resolved by copy and/or schema/app change;
- support flow has explicit consent and data handling;
- Nate approves public-facing copy for `/about`, support boundaries, field-note safety copy, and sample/non-endorsement language.

## One next implementation card

CARD: Add field-note privacy preflight before external tester data

Goal:
- Prevent sensitive external tester data from being published through public-readable field notes.

Why this card:
- The support loop is no-send and safer by design. The field-note loop is the live product proof, but current schema makes field notes public-readable. That can be okay only if the product blocks or clearly warns against sensitive content before any external data exists.

Scope:
- Add explicit privacy warning copy to `/field-notes/new` near the form start.
- Add a required acknowledgement checkbox before `Save field note`, e.g. “I did not include names, exact addresses, private contact info, passwords, medical/legal details, or anything the neighbor did not consent to share.”
- Keep current public release gate unchanged.
- No Supabase/Vercel/schema work in this card unless separately approved.

Acceptance criteria:
- In local sample/no-Supabase mode, `/field-notes/new` visibly explains public-read risk and sensitive-data exclusions.
- Save button remains disabled until the acknowledgement is checked, in addition to existing Supabase/auth/shop-card gates.
- `npm run check` passes from `app/`.
- `npm run build` passes from `app/`.
- Receipt documents no deploy, no credentials, no schema write, no public contact.

Approval needed:
- Nate approval before implementation because this changes app code/copy. The change is low-risk, but it touches public-facing product language.

## Verification commands and output

Command:
```bash
git status --short --branch
git log --oneline --decorate --max-count=3
node - <<'NODE'
const fs = require('fs');
const checks = [
  ['STATE support route evidence', 'STATE.md', '/support` as a no-send, copyable tester note'],
  ['STATE field-note creation evidence', 'STATE.md', 'Field-note creation v0 exists'],
  ['schema RLS enabled field_notes', 'supabase/schema.sql', 'alter table public.field_notes enable row level security;'],
  ['schema help_requests safe_to_share policy', 'supabase/schema.sql', 'using (safe_to_share = true'],
  ['schema view security_invoker', 'supabase/schema.sql', 'alter view public.help_requests_with_author set (security_invoker = true);'],
  ['schema field_notes public read policy', 'supabase/schema.sql', 'create policy "public can read field notes"'],
  ['support no-send copyable note', 'app/src/routes/support/+page.svelte', 'Nothing is sent automatically.'],
  ['support consent follow-up checkbox', 'app/src/routes/support/+page.svelte', 'Consent to follow up'],
  ['field-note gated save copy', 'app/src/routes/field-notes/new/+page.svelte', 'Public release stays gated. Saving here does not deploy'],
  ['field-note requires shop card', 'app/src/routes/field-notes/new/+page.svelte', 'Create your shop card before writing a field note'],
  ['release gate env check', 'app/src/routes/+layout.svelte', "PUBLIC_SHOPFLOOR_PUBLIC_RELEASE === 'true'"]
];
let failed = 0;
for (const [name, path, needle] of checks) {
  const text = fs.readFileSync(path, 'utf8');
  const ok = text.includes(needle);
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name} :: ${path}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
NODE
```

Output:
```text
COMMAND: git status --short --branch
## main...origin/main [ahead 5]

COMMAND: git log --oneline --decorate --max-count=3
4e5a700 (HEAD -> main) Record ShopFloor live privacy DNS blocker
8719ce6 Avoid self-referential ShopFloor state commit
1428c45 Clarify ShopFloor dry proof commits

COMMAND: node local read-only assertions
PASS STATE support route evidence :: STATE.md
PASS STATE field-note creation evidence :: STATE.md
PASS schema RLS enabled field_notes :: supabase/schema.sql
PASS schema help_requests safe_to_share policy :: supabase/schema.sql
PASS schema view security_invoker :: supabase/schema.sql
PASS schema field_notes public read policy :: supabase/schema.sql
PASS support no-send copyable note :: app/src/routes/support/+page.svelte
PASS support consent follow-up checkbox :: app/src/routes/support/+page.svelte
PASS field-note gated save copy :: app/src/routes/field-notes/new/+page.svelte
PASS field-note requires shop card :: app/src/routes/field-notes/new/+page.svelte
PASS release gate env check :: app/src/routes/+layout.svelte
```

## Packet result

Private proof packet is ready for Nate review.

Do not proceed to external tester data until the privacy/RLS assumptions above are verified and Nate approves the exact tester-data boundary.
