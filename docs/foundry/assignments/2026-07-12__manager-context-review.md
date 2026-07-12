# Assignment — ShopFloor Manager Context Review

Date: 2026-07-12
Owner: ShopFloor Manager
Issued by: Egon
Status: COMPLETED_UPDATED

## Goal

Gather current ShopFloor context and produce a manager context snapshot so Egon/Nate can interrogate ShopFloor Manager about project state.

This assignment was originally read-only. After Nate approved continuing and pushing, Egon updated the packet to reflect field-note v0 and current repo state.

## Scope

Docs/foundry continuity review and state refresh.

## Required reads

```text
README.md
NEXT.md
STATE.md
docs/DECISIONS.md
docs/EVIDENCE.md
docs/KNOWLEDGE_BASE_IMPLEMENTATION.md
app/package.json
```

## Commands

```bash
git status --short --branch
git log --oneline --decorate --max-count=8
```

App verification, when source changes are in scope:

```bash
cd app
npm run check
npm run build
```

## Outputs

```text
docs/foundry/MANAGER_CONTEXT_SNAPSHOT.md
docs/receipts/2026-07-12__shopfloor-manager-context-review.md
```

## Forbidden without fresh approval

- deploy/public release;
- Supabase/Vercel/DNS/session/secret changes;
- dependency installs;
- public/community contact;
- deletion/destructive cleanup.

## Done criteria

- Snapshot names current state, blockers, and recommended first manager task.
- Receipt names sources read and commands run.
- Field-note v0 state is no longer described as missing.
