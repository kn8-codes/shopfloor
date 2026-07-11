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

## 2026-06-18 — Homepage alpha labels and live feed loader slice verified

- Command/source: reviewed and tightened `app/src/routes/+page.svelte`; added `loadFeedRequests()` in `app/src/lib/server/shopfloor.js`; added `app/src/routes/feed/+page.server.js`; updated `app/src/routes/feed/+page.svelte`; ran from `app/`: `npm run check && npm run build`; ran preview on `127.0.0.1:4175` and curled `/`, `/feed`, and `/request/request-battery-clamp`.
- Result: homepage sample cards now explicitly read `Sample open request`, `Sample shop card`, and `Sample field note`; `/feed` loads live safe-to-share requests from `help_requests_with_author` when Supabase is configured and otherwise shows a visible `Sample alpha feed` fallback notice. `svelte-check found 0 errors and 0 warnings`; `vite build` passed; preview route smoke returned HTTP 200 for `/`, `/feed`, and `/request/request-battery-clamp`; `/feed` HTML contained `Sample alpha feed`, `Nearby problems first`, sample request title, and `@northhillpartsrun` in no-Supabase mode.
- File/path/link: `app/src/routes/+page.svelte`; `app/src/lib/server/shopfloor.js`; `app/src/routes/feed/+page.server.js`; `app/src/routes/feed/+page.svelte`; Kanban `t_a13d9957`
- Checked by: Egon at 2026-06-18 11:21 EDT

## 2026-06-10 — About/mission page Sprint 2 slice verified

- Command/source: created `/about` route, added app-shell nav link, changed home secondary CTA to `/about`; ran from `app/`: `npm run check && npm run build`; then ran `npm run preview -- --host 127.0.0.1 --port 4174` and `curl -sS -D - http://127.0.0.1:4174/about`.
- Result: `svelte-check found 0 errors and 0 warnings`; `vite build` passed; `/about` returned HTTP 200 and contained `About ShopFloor`, `Aid is the visible action`, and `No gig-economy cosplay` copy.
- File/path/link: `app/src/routes/about/+page.svelte`; `app/src/lib/components/AppShell.svelte`; `app/src/routes/+page.svelte`; `STATE.md`; `NEXT.md`
- Checked by: Egon at 2026-06-10 18:20 EDT

## 2026-06-09 — Code review truth correction

- Command/source: Fable 5/Claude code review of `main` at `2db884f`; Egon verified with `grep -RIn "request_responses\|time_ledger_entries"` across M1, Venkman, Janine, and Winston worktrees.
- Result: `request_responses`, request completion, and `time_ledger_entries` are not present in current app/schema code. Mentions exist only in sample data, older docs/evidence, and planned schema docs. Treat 2026-05-25 evidence entries below as historical/stranded claims, not current HEAD truth, unless a future commit restores that implementation.
- File/path/link: `NEXT.md`; `STATE.md`; `supabase/schema.sql`; `app/src/lib/server/shopfloor.js`; peer paths `/Users/kn8/projects/shopfloor`, `/home/kn8/projects/shopfloor`, `/Users/kn8.claw/projects/shopfloor`
- Checked by: Egon at 2026-06-09

## 2026-06-09 — Fleet stranded-work check for responses/ledger

- Command/source: checked `git status --short --branch`, `git branch --all --verbose --no-abbrev`, and recursive grep for `time_ledger_entries` / `request_responses` on Venkman, Janine, and Winston.
- Result: all three peers were clean on `main...origin/main`; no implementation branch or dirty work containing response/ledger code was found. Venkman had only the old KB feature branch. Janine and Winston had only `main` plus remote refs.
- File/path/link: Venkman `/Users/kn8/projects/shopfloor`; Janine `/home/kn8/projects/shopfloor`; Winston `/Users/kn8.claw/projects/shopfloor`
- Checked by: Egon at 2026-06-09

## 2026-05-24 — Repository cloned and identified

- Command/source: `gh repo clone kn8-codes/shopfloor /Users/kn8/projects/shopfloor`; `gh repo view kn8-codes/shopfloor`
- Result: Repo cloned locally. Default branch `main`. Primary language Svelte.
- File/path/link: `/Users/kn8/projects/shopfloor`, `https://github.com/kn8-codes/shopfloor`
- Checked by: Egon

## 2026-05-24 — Product docs inspected

- Command/source: read `README.md`, `NEXT.md`, `docs/prototype-decisions-2026-04-19.md`, `docs/mvp-schema.md`, `docs/first-five-screens.md`, `docs/trust-and-safety-v1.md`
- Result: Project aim, MVP decisions, first screens, schema direction, and trust/safety posture are documented. Key open mismatch is structured tools: docs/sample data include tools, SQL/live app does not persist them.
- File/path/link: listed docs under `/Users/kn8/projects/shopfloor`
- Checked by: Egon

## 2026-05-24 — App check passed

- Command/source: from `app/`, ran `npm ci && npm run check`
- Result: `svelte-check found 0 errors and 0 warnings`. NPM audit reported dependency vulnerabilities. No audit fix was run.
- File/path/link: `/Users/kn8/projects/shopfloor/app/package.json`
- Checked by: Egon

## 2026-05-25 — Request responses schema and live read path added

- Command/source: edited `supabase/schema.sql` and `app/src/lib/server/shopfloor.js`; ran `npm run check` from `app/`.
- Result: Added `public.request_responses`, indexes, RLS policies, and `public.request_responses_with_author`; request detail live loader fetches and maps live responses. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/supabase/schema.sql`; `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`
- Checked by: Egon at 2026-05-25 04:12:19 EDT

## 2026-05-25 — Request response creation form/action added

- Command/source: edited `app/src/lib/api.js` and `app/src/routes/request/[id]/+page.svelte`; ran `npm run check` from `app/`.
- Result: Added `createRequestResponse()` client helper and an “Offer help” form on request detail. Form requires sign-in plus a shop card, inserts into `request_responses`, then invalidates the page load. `svelte-check found 0 errors and 0 warnings`.
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
- Result: `/feed` loads requests from `help_requests_with_author` when Supabase is configured and falls back to sample requests otherwise. Structural assertions passed. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`; `/Users/kn8/projects/shopfloor/app/src/routes/feed/+page.server.js`; `/Users/kn8/projects/shopfloor/app/src/routes/feed/+page.svelte`; `/Users/kn8/projects/shopfloor/app/src/lib/components/RequestCard.svelte`
- Checked by: Egon at 2026-05-25 05:01:31 EDT

## 2026-05-25 — Profile-level time history added

- Command/source: edited `app/src/lib/server/shopfloor.js`, `app/src/routes/shop/[handle]/+page.js`, `app/src/routes/shop/[handle]/+page.svelte`, and `app/src/lib/data/sample.js`; ran structural assertions and `npm run check` from `app/`.
- Result: Shop profile pages load ledger receipts where the profile is requester or helper, compute separate hours helped/received totals, and render raw time receipts. Structural assertions passed. `svelte-check found 0 errors and 0 warnings`.
- File/path/link: `/Users/kn8/projects/shopfloor/app/src/lib/server/shopfloor.js`; `/Users/kn8/projects/shopfloor/app/src/routes/shop/[handle]/+page.js`; `/Users/kn8/projects/shopfloor/app/src/routes/shop/[handle]/+page.svelte`; `/Users/kn8/projects/shopfloor/app/src/lib/data/sample.js`
- Checked by: Egon at 2026-05-25 05:08:57 EDT

## 2026-06-08 — Sprint one inventory and week plan written

- Command/source: inspected `STATE.md`, `NEXT.md`, `docs/plans/2026-05-25-shopfloor-sprint-table.md`, `supabase/schema.sql`, `app/src/lib/api.js`, `app/src/lib/server/shopfloor.js`; ran `git status --short --branch`, `git log -1 --oneline --decorate`, `npm run check`; probed Supabase table/view availability with anon key without printing secrets; ran local Vite route smoke for live-backed routes.
- Result: Repo clean at commit `3094e63`; `svelte-check found 0 errors and 0 warnings`; live Supabase had two shop cards, one open request, one helper response, and zero ledger entries; live route smoke returned HTTP 200 for feed, shop profiles, request detail, field notes, new request, shop new, and login. Wrote granular one-week execution plan.
- File/path/link: `/Users/kn8/projects/shopfloor/docs/plans/2026-06-08-shopfloor-sprint-one-inventory-and-week-plan.md`
- Checked by: Egon at 2026-06-08 08:36 EDT

## 2026-06-09 — ShopFloor KB MVP implemented and verified

- Command/source: added Markdown KB source files, KB loader, `/knowledge` index route, `/knowledge/[...slug]` detail route, and `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`; ran from `app/`: `npm ci`, `npm run check`, and `npm run build`.
- Result: `svelte-check` passed with 0 errors and 0 warnings. `vite build` passed. KB MVP committed as `b8ab43c feat: add markdown knowledge base MVP`.
- File/path/link: `app/src/lib/content/kb.js`; `app/src/lib/content/kb/`; `app/src/routes/knowledge/`; `docs/KNOWLEDGE_BASE_IMPLEMENTATION.md`
- Checked by: Egon at 2026-06-09

## 2026-06-09 — Server-only route load build fix pushed

- Command/source: renamed route loaders importing `$lib/server/shopfloor.js` from `+page.js` to `+page.server.js`; ran from `app/`: `npm run check`, `npm run build`.
- Result: fixed SvelteKit server/client boundary build failure. `svelte-check` passed with 0 errors and 0 warnings. `vite build` passed. Fix committed as `8a6d550 fix: run shopfloor route loads on server`.
- File/path/link: `app/src/routes/request/[id]/+page.server.js`; `app/src/routes/shop/[handle]/+page.server.js`
- Checked by: Egon at 2026-06-09

## 2026-06-09 — KB MVP pushed to main and fleet synchronized

- Command/source: pushed GitHub `main`; then on Venkman/M4, Janine/HP, and Winston, cloned or fast-forward pulled `main`.
- Result: remote `main` at `8a6d550 fix: run shopfloor route loads on server`; Venkman at `/Users/kn8/projects/shopfloor`, Janine at `/home/kn8/projects/shopfloor`, and Winston at `/Users/kn8.claw/projects/shopfloor` all reported `main...origin/main` at `8a6d550`.
- File/path/link: `https://github.com/kn8-codes/shopfloor`; `/mesh/30_RECEIPTS/egon/2026-06-09__receipt__shopfloor-kb-mvp-main-and-fleet-pull.md`
- Checked by: Egon at 2026-06-09

## 2026-06-29 — Request-detail Local support options sample slice

- Command/source: Nate approved code changes in Telegram; implemented a sample-data-only `Local support options` panel on `/request/[id]` using category-matched fixture data from `app/src/lib/data/sample.js` and loader output from `app/src/lib/server/shopfloor.js`.
- Result: `npm run check` passed with 0 errors / 0 warnings after one type-narrowing fix. `npm run build` passed. Preview with Supabase disabled returned rendered HTML for `/request/request-battery-clamp` containing `Local support options`, `Support data, not a replacement for neighbor help`, `sample only — not live checked`, and `not verified endorsements`. Browser snapshot confirmed the panel appears between the request body and responses.
- Boundary: no live Akron resource import, no scraping, no standalone `/resources` route, no database/schema migration, no endorsement/eligibility claims.
- File/path/link: `app/src/lib/data/sample.js`; `app/src/lib/server/shopfloor.js`; `app/src/routes/request/[id]/+page.svelte`; receipt `/mesh/MESH_BOARD/30_RECEIPTS/egon/2026-06-29__shopfloor-local-support-options-code-slice.md`
- Checked by: Egon at 2026-06-29
