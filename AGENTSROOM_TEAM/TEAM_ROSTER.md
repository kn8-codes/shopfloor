# ShopFloor AgentsRoom Team Roster

Updated: 2026-07-11T18:02:27.556708Z

## Standing team

| Role | Agent ID | Purpose |
|---|---|---|
| Producer / Triage Lead | `agent-shopfloor-producer-triage` | Converts intent into bounded auditable tickets |
| Frontend Implementer | `agent-1783791346295-5s3dhs` | SvelteKit UI/component implementation |
| Backend / Data Steward | `agent-shopfloor-backend-data` | Server loaders, Supabase boundaries, data-shape review |
| QA Reviewer | `agent-1783791346296-5787xp` | User-facing verification, browser/check/build review |
| Trust & Safety / Privacy Reviewer | `agent-shopfloor-trust-safety` | Dignity, consent, privacy, anti-gig/defaults review |
| Release / Receipt Clerk | `agent-shopfloor-release-receipt` | Receipts, changed files, approval gates, release notes |

## Default pipeline

Producer -> Implementer -> QA -> Trust/Safety when user-facing trust/privacy is touched -> Release/Receipt Clerk -> Nate/Egon commit/deploy gate.

## Rule
Not every task runs every role. Separation of powers means independent review when it matters, not six agents arguing over a button color.
