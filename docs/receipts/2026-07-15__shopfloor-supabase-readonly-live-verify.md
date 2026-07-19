# Receipt — ShopFloor Supabase read-only live verification

Date: 2026-07-15 21:30 EDT
Owner: Egon/default
Status: COMPLETE_READ_ONLY_PASS
Approval: `APPROVE SHOPFLOOR SUPABASE READ-ONLY VERIFY`

See canonical mesh receipt:

```text
/mesh/30_RECEIPTS/egon/2026-07-15__shopfloor-supabase-readonly-live-verify.md
```

## Summary

The previous live Supabase DNS blocker is cleared. The configured project host resolves and the REST surface responds. Read-only anon privacy probes passed.

Observed live read-only counts:

```text
shop_cards visible to anon: 2
help_requests visible to anon: 1
help_requests_with_author visible to anon: 1
field_notes visible to anon: 0
```

Additional read-only check:

```text
unsafe visible help_requests: 0
disallowed visible help_request statuses: 0
statuses seen: open
view/base visible counts match: true
```

Not done:

```text
no write-denial probes
no service-role use
no schema migration
no data writes
no deploy
no public release gate change
no secrets printed
```

Files updated:

```text
docs/EVIDENCE.md
STATE.md
NEXT.md
```

Remaining gates before external tester data:

1. Field-note privacy preflight copy/acknowledgement or schema hardening.
2. Optional write-denial probes after explicit approval.
3. Public copy review and release-gate approval.
