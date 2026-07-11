# ShopFloor AgentsRoom Team Packet

Configured: 2026-07-11T17:50:09.671186Z
Workspace root: `/Users/kn8/projects/shopfloor`
App root: `app/`
AgentsRoom project: `proj-1783791346295-rliytn`

## Agents currently detected
- Front-end / fullstack agent: `agent-1783791346295-5s3dhs`
- QA agent: `agent-1783791346296-5787xp`

## Use pattern
1. Producer/Triage turns Nate intent into one bounded task.
2. Front-End Developer implements one small SvelteKit slice.
3. QA verifies with check/build/smoke and writes a review note.
4. Egon/Nate decide commit/push/deploy separately.

## Critical gates
No reset, clean, stash drop, commit, push, deploy, credential handling, or broad refactor without explicit approval.

## Prompt files
- `prompts/shared-context.md`
- `prompts/front-end-developer.md`
- `prompts/qa-reviewer.md`
- `prompts/producer-triage.md`

## Saved AgentsRoom local prompt IDs
- `prompt-shopfloor-shared-context`
- `prompt-shopfloor-front-end-developer`
- `prompt-shopfloor-qa-reviewer`
- `prompt-shopfloor-producer-triage`

## Saved dev commands
- ShopFloor: git status
- ShopFloor: dev server
- ShopFloor: check
- ShopFloor: build
- ShopFloor: smoke request detail
