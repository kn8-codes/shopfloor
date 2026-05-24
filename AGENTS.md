# Agent Instructions for ShopFloor

## First rule

Before doing work here, read:

1. `.stack/manifest.yaml`
2. `PROJECT_CHARTER.md`
3. `STATE.md`
4. Relevant task card under `work/`

If any are missing, run or recommend `stackctl audit` before proceeding.

## Work discipline

- For multi-step work, write a plan before changing files.
- For code changes, read existing code first.
- Never delete without explicit Nate approval.
- Never break working code to add a feature.
- Commit only with a meaningful message when working in a git repo and Nate has approved the commit boundary.
- Comment the why, not the what.

## Evidence standard

Any claim of completion must include receipts in `docs/EVIDENCE.md`:

- command run, source checked, or file inspected
- result
- path/link/id
- timestamp or checked-at date

## State update requirement

After meaningful work, update `STATE.md`:

- active goal
- current state
- next best action
- blockers
- open questions for Nate
- last verified date

## Escalation

Ask Nate before:

- destructive commands
- publishing/deploying
- spending money
- sharing private data
- changing project direction
- making irreversible design choices
