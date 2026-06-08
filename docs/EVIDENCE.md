# Evidence — ShopFloor

Record receipts here. Agent narration is not evidence. Pretty words are how bugs wear cologne.

## Format

```md
## YYYY-MM-DD — Thing verified

- Command/source:
- Result:
- File/path/link:
- Checked by:
```

## 2026-05-24 — Repository cloned and identified

- Command/source: `gh repo clone kn8-codes/shopfloor /Users/kn8/projects/shopfloor`; `gh repo view kn8-codes/shopfloor --json ...`
- Result: Repo cloned locally. GitHub description: “Neighborhood repair and survival network for working people. Akron-first.” Default branch `main`. Primary language Svelte.
- File/path/link: `/Users/kn8/projects/shopfloor`, `https://github.com/kn8-codes/shopfloor`
- Checked by: Egon

## 2026-05-24 — Recent repo history inspected

- Command/source: `git log --oneline --decorate --max-count=12`
- Result: Recent commits show Supabase wiring, Magic Link auth scaffold, request submission, shop card creation, and live data fallback work. HEAD at `6bb80d2 Update ShopFloor NEXT.md after live data wiring`.
- File/path/link: local git history in `/Users/kn8/projects/shopfloor`
- Checked by: Egon

## 2026-05-24 — Product docs inspected

- Command/source: read `README.md`, `NEXT.md`, `docs/prototype-decisions-2026-04-19.md`, `docs/mvp-schema.md`, `docs/first-five-screens.md`, `docs/trust-and-safety-v1.md`
- Result: Project aim, MVP decisions, first screens, schema direction, and trust/safety posture are documented. Key open mismatch is structured tools: docs/sample data include tools, SQL/live app does not persist them.
- File/path/link: listed docs under `/Users/kn8/projects/shopfloor`
- Checked by: Egon

## 2026-05-24 — App check passed

- Command/source: from `app/`, ran `npm ci && npm run check`
- Result: `svelte-check found 0 errors and 0 warnings`. NPM audit reported 5 dependency vulnerabilities: 1 low, 3 moderate, 1 high. No audit fix was run.
- File/path/link: `/Users/kn8/projects/shopfloor/app/package.json`
- Checked by: Egon

## 2026-05-24 — Stack OS bootstrap initialized in real ShopFloor repo

- Command/source: `stackctl init /Users/kn8/projects/shopfloor --name ShopFloor ...`
- Result: Stack OS files created on branch `chore/stack-os-shopfloor-audit`.
- File/path/link: `.stack/manifest.yaml`, `AGENTS.md`, `PROJECT_CHARTER.md`, `STATE.md`, `docs/DECISIONS.md`, `docs/EVIDENCE.md`, `work/`
- Checked by: Egon

## 2026-05-24 — Janine handoff written

- Command/source: wrote `docs/HANDOFF_JANINE_2026-05-24.md`
- Result: Thorough handoff summarizes aim, repo state, verified checks, completed work, gaps, next decision, and recommended next task.
- File/path/link: `/Users/kn8/projects/shopfloor/docs/HANDOFF_JANINE_2026-05-24.md`
- Checked by: Egon

## 2026-05-24 — First post-audit task card created

- Command/source: wrote `work/inbox/2026-05-24-structured-tools-mvp.md`
- Result: Task card captures the structured tools decision/implementation path and explicit non-goals.
- File/path/link: `/Users/kn8/projects/shopfloor/work/inbox/2026-05-24-structured-tools-mvp.md`
- Checked by: Egon

## 2026-05-25 — Request responses schema and live read path added

- Command/source: edited `supabase/schema.sql` and `app/src/lib/server/shopfloor.js`; ran `npm run check` from `app/`.
- Result: Added `public.request_responses`, indexes, RLS policies, and `public.request_responses_with_author`; request detail live loader now fetches and maps live responses. Views use `security_invoker = true` so underlying RLS still applies. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/supabase/schema.sql`; `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`
- Checked by: Egon at 2026-05-25 04:12:19 EDT

## 2026-05-25 — Request response creation form/action added

- Command/source: edited `app/src/lib/api.js` and `app/src/routes/request/[id]/+page.svelte`; ran `npm run check` from `app/`.
- Result: Added `createRequestResponse()` client helper and an “Offer help” form on request detail. Form requires sign-in plus a shop card, inserts into `request_responses`, then invalidates the page load so responses refresh from Supabase. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/api.js`; `/Users/kn8/projects/shopfloor/app/src/routes/request/[id]/+page.svelte`
- Checked by: Egon at 2026-05-25 04:24:45 EDT

## 2026-05-25 — Minimal request completion path added

- Command/source: edited `supabase/schema.sql`, `app/src/lib/api.js`, and `app/src/routes/request/[id]/+page.svelte`; ran `npm run check` from `app/`.
- Result: Added completion fields to `help_requests`; added `completeHelpRequest()` helper; request authors can mark a request resolved and optionally select a response/helper. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/supabase/schema.sql`; `/Users/kn8/projects/shopfloor/app/src/lib/api.js`; `/Users/kn8/projects/shopfloor/app/src/routes/request/[id]/+page.svelte`
- Checked by: Egon at 2026-05-25 04:37:08 EDT

## 2026-05-25 — Simple time ledger/history added

- Command/source: edited `supabase/schema.sql`, `app/src/lib/api.js`, `app/src/lib/server/shopfloor.js`, and `app/src/routes/request/[id]/+page.svelte`; ran structural assertions and `npm run check` from `app/`.
- Result: Added `public.time_ledger_entries`, RLS, `public.time_ledger_entries_with_people`, request-detail ledger loading, completion-time hours entry, and request-local time history UI. Structural assertions passed. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/supabase/schema.sql`; `/Users/kn8/projects/shopfloor/app/src/lib/api.js`; `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`; `/Users/kn8/projects/shopfloor/app/src/routes/request/[id]/+page.svelte`
- Checked by: Egon at 2026-05-25 04:51:42 EDT

## 2026-05-25 — Feed live loader added

- Command/source: edited `app/src/lib/server/shopfloor.js`, added `app/src/routes/feed/+page.server.js`, edited `app/src/routes/feed/+page.svelte` and `app/src/lib/components/RequestCard.svelte`; ran structural assertions and `npm run check` from `app/`.
- Result: `/feed` now loads requests from `help_requests_with_author` when Supabase is configured and falls back to sample requests otherwise. Request cards render either `body` or `description`. Structural assertions passed. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`; `/Users/kn8/projects/shopfloor/app/src/routes/feed/+page.server.js`; `/Users/kn8/projects/shopfloor/app/src/routes/feed/+page.svelte`; `/Users/kn8/projects/shopfloor/app/src/lib/components/RequestCard.svelte`
- Checked by: Egon at 2026-05-25 05:01:31 EDT

## 2026-05-25 — Profile-level time history added

- Command/source: edited `app/src/lib/server/shopfloor.js`, `app/src/routes/shop/[handle]/+page.js`, `app/src/routes/shop/[handle]/+page.svelte`, and `app/src/lib/data/sample.js`; ran structural assertions and `npm run check` from `app/`.
- Result: Shop profile pages now load ledger receipts where the profile is requester or helper, compute separate hours helped/received totals, and render raw time receipts. Sample fallback includes empty time history. Structural assertions passed. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`; `/Users/kn8/projects/shopfloor/app/src/routes/shop/[handle]/+page.js`; `/Users/kn8/projects/shopfloor/app/src/routes/shop/[handle]/+page.svelte`; `/Users/kn8/projects/shopfloor/app/src/lib/data/sample.js`
- Checked by: Egon at 2026-05-25 05:08:57 EDT

## 2026-05-25 — Global UI baseline fixed during live verification

- Command/source: edited `app/src/lib/components/AppShell.svelte`; ran `npm run check`; inspected computed browser styles on `http://127.0.0.1:5173/login`.
- Result: Added global `html`/`body` baseline styles in the app shell so live routes no longer fall back to serif fonts, white page background, or default body margin. Browser computed styles showed `bodyMargin: 0px`, dark body/html backgrounds, light text, and system sans font stack. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/components/AppShell.svelte`
- Checked by: Egon at 2026-05-25 09:16:34 EDT
## 2026-05-25 — Server-only route loaders renamed during live verification

- Command/source: renamed route loaders importing `$lib/server/shopfloor` from `+page.js` to `+page.server.js`; ran `npm run check` from `app/`; requested `/feed`, `/shop/nate-test-a`, and `/request/not-a-real-id` from local Vite with `curl`.
- Result: Fixed SvelteKit browser overlay error: “Cannot import $lib/server/shopfloor.js into code that runs in the browser.” `svelte-check found 0 errors and 0 warnings`; local route probes returned HTTP 200.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/routes/feed/+page.server.js`; `/Users/kn8/projects/shopfloor/app/src/routes/shop/[handle]/+page.server.js`; `/Users/kn8/projects/shopfloor/app/src/routes/request/[id]/+page.server.js`
- Checked by: Egon at 2026-05-25 09:42 EDT
## 2026-05-25 — Home hero duplicate CTA fixed

- Command/source: edited `app/src/routes/+page.svelte`; ran `npm run check` from `app/`; requested `/`, `/how-it-works`, and `/feed` from local Vite with `curl`.
- Result: Home hero no longer renders two adjacent buttons both labeled “Open the neighborhood feed.” Primary CTA still points to `/feed`; secondary CTA now points to `/how-it-works` as “See how it works.” `svelte-check found 0 errors and 0 warnings`; route probes returned HTTP 200.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/routes/+page.svelte`
- Checked by: Egon at 2026-05-25 10:12 EDT

## 2026-06-04 — Local resource directory placement card created

- Command/source: Nate requested that the EDE/local-help information be worked into ShopFloor; read `PROJECT_CHARTER.md`, `.stack/manifest.yaml`, `STATE.md`, and `NEXT.md`; wrote a new task card.
- Result: Created a bounded product-placement task for local resources as support data. Also created a Peter/M4 inbox assignment for a recommendation pass.
- File/path/link: `/Users/kn8/projects/shopfloor/work/inbox/2026-06-04-local-resource-directory-support-data.md`; `/Users/kn8/MESH_BOARD/00_INBOX/m4/2026-06-05__shopfloor-local-resource-directory-placement.md`; `/Users/kn8/MESH_BOARD/projects/research/local-akron/2026-06-04__everyone-deserves-to-eat-signal-mining.md`
- Checked by: Egon at 2026-06-04 20:00 EDT

## 2026-06-04 — Peter/M4 local resources placement recommendation received

- Command/source: Egon copied a self-contained ShopFloor packet to `kn8-m4` and invoked M4 Hermes one-shot against it.
- Result: Peter/M4 produced a recommendation: request-detail `Local support options` first; separate `local_resources` model sharing taxonomy with structured tools/resources; code only after Nate reviews scope.
- File/path/link: `/Users/kn8/MESH_BOARD/00_INBOX/egon/2026-06-05__peter-shopfloor-local-resources-recommendation.md`; `/Users/kn8/MESH_BOARD/30_RECEIPTS/egon/2026-06-04__receipt__peter-m4-shopfloor-local-resources-recommendation.md`
- Checked by: Egon at 2026-06-04 20:04 EDT



## 2026-06-08 — Dirty working tree reconciliation checkpoint

- Command/source: `git status --short --branch`; `git diff --stat`; read changed critical path (`supabase/schema.sql`, `app/src/lib/server/shopfloor.js`, `app/src/lib/api.js`, affected Svelte route pages/loaders, Stack OS docs/task cards); ran `npm run check` and `npm run build` from `app/`; ran local Vite route probes with `curl`.
- Result: Working tree is a coherent ShopFloor MWP time-bank implementation slice, not random spillover. It includes request responses, request completion, simple time ledger/history, live feed loader, server-only route-loader migration, profile time-history display, and supporting Stack OS docs. `svelte-check found 0 errors and 0 warnings`; `vite build` completed successfully; local route probes returned HTTP 200 for `/`, `/feed`, `/how-it-works`, `/login`, `/shop/nate-test-a`, and `/request/not-a-real-id`.
- File/path/link: `/Users/kn8/projects/shopfloor`; branch `feat/time-bank-loop-mvp`; dev server route probe source `http://127.0.0.1:5173`.
- Checked by: Egon at 2026-06-08 04:36 EDT
- Remaining risk: live Supabase/browser two-user verification is still not complete; completion update plus ledger insert is not atomic yet and should become a Postgres RPC before broader alpha.
