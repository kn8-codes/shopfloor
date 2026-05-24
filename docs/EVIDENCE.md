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
