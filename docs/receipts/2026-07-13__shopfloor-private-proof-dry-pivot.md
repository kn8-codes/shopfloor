# Receipt — ShopFloor private-proof dry pivot

Date: 2026-07-13
Owner: Egon
Status: DRY_PRIVATE_PROOF_PASSED_LIVE_PRIVACY_VERIFY_GATED

## Trigger

After belt.loop was accepted, Nate said:

```text
we can pivot
```

## Scope

Advance ShopFloor one bounded step toward private alpha proof without opening the public release gate, deploying, contacting testers, or entering external tester data.

## Starting state

```text
Repo: /Users/kn8/projects/shopfloor
Branch: main...origin/main
HEAD before work: 2961711 Add ShopFloor private proof verification packet
Dirty file before work: scripts/shopfloor_privacy_probe.mjs
```

The dirty file was an import-path fix for the privacy probe:

```text
@supabase/supabase-js import moved to createRequire(.../app/package.json)
```

## Live-gate decision

I did **not** run write-denial live probes. Those require explicit approval because they intentionally attempt anon inserts that should be denied by RLS. If RLS is wrong, they could create test rows.

Approval phrase remains:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
```

## Probe hardening

Updated:

```text
scripts/shopfloor_privacy_probe.mjs
```

Changes:

- requires `--confirm-live` before any Supabase network probe;
- keeps read-only anon count/select checks as the default live mode after confirmation;
- requires additional `--include-write-denial` for anon insert-denial probes;
- keeps secret values out of output;
- improves Supabase error serialization so failures do not appear as `[object Object]`.

Reason: the shell already had Supabase env vars available, so an unguarded script can touch live Supabase by accident. The new explicit gate prevents that footgun. A footgun with a local-trust product is still a gun.

## Commands run

```bash
git status --short --branch
git log --oneline -5
node --check scripts/shopfloor_privacy_probe.mjs
node scripts/shopfloor_privacy_probe.mjs --help
node scripts/shopfloor_privacy_probe.mjs
cd app && npm run check
cd app && npm run build
env -u PUBLIC_SUPABASE_URL -u PUBLIC_SUPABASE_ANON_KEY PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true npm run preview -- --host 127.0.0.1 --port 4188
curl -fsS http://127.0.0.1:4188/support
curl -fsS http://127.0.0.1:4188/field-notes
curl -fsS http://127.0.0.1:4188/field-notes/new
```

## Verification results

```text
node --check scripts/shopfloor_privacy_probe.mjs: passed
node scripts/shopfloor_privacy_probe.mjs --help: printed usage without secrets
node scripts/shopfloor_privacy_probe.mjs: exit 2, refused live Supabase probe without --confirm-live
npm run check: 0 errors, 0 warnings
npm run build: passed; adapter-auto warning only
local preview: http://127.0.0.1:4188/
```

Dry route smoke marker results:

```text
/support: HTTP 200, Tester support, Nothing is sent automatically, No emergency dispatch
/field-notes: HTTP 200, Keep the fix, not ratings, Write a field note
/field-notes/new: HTTP 200, Capture what worked, Safety / honesty label, Public release stays gated
```

## Live privacy status

```text
LIVE_PRIVACY_VERIFY_GATED_NOT_RUN
```

A read-only live probe was briefly attempted before the new `--confirm-live` guard was added because Supabase env vars were already present in the shell. It did not run write-denial probes. Its output failed with serialized Supabase errors as `[object Object]`, which is now fixed in the script. Treat that as a blocker signal, not a pass.

## Boundaries held

- no deploy;
- no push;
- no public release gate opened in any deployed environment;
- no secrets printed;
- no write-denial live probes run;
- no external tester data entered;
- no tester/community contact;
- no ratings/gig mechanics/leaderboards/escrow/cash conversion added.

## Files changed

```text
docs/plans/2026-07-13-shopfloor-private-proof-pivot.md
scripts/shopfloor_privacy_probe.mjs
docs/receipts/2026-07-13__shopfloor-private-proof-dry-pivot.md
STATE.md
NEXT.md
docs/EVIDENCE.md
```

## Next gate

To run live anon/privacy verification, Nate should approve with:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
```

Then run:

```bash
node scripts/shopfloor_privacy_probe.mjs --confirm-live
```

Only after the read-only live probe is understood should we run:

```bash
node scripts/shopfloor_privacy_probe.mjs --confirm-live --include-write-denial
```
