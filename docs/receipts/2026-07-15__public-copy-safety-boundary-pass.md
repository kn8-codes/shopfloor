# Receipt — Public-copy safety boundary pass

Date: 2026-07-15 21:50 EDT
Status: COMPLETE_LOCAL_VERIFIED

Canonical mesh receipt:

```text
/mesh/30_RECEIPTS/egon/2026-07-15__shopfloor-public-copy-safety-boundary-pass.md
```

## Summary

Patched alpha-facing copy on:

```text
/support
/field-notes
/new-request
/knowledge
```

Boundaries clarified:

- support note is not a secure private channel;
- no secrets, medical details, passwords, or exact addresses;
- field notes are public-readable;
- safe-to-share requests may be readable under current Supabase policies;
- KB starter entries are not professional advice, emergency instructions, or endorsements.

Verification:

```text
npm run check: pass, 0 errors / 0 warnings
npm run build: pass, adapter-auto warning only
local route smoke: markers present on all four routes
```

Not done:

```text
no live DB write
no schema migration
no deploy
no release gate change
no commit
```
