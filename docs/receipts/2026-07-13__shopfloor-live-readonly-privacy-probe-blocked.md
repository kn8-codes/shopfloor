# Receipt — ShopFloor live read-only privacy probe blocked

Date: 2026-07-13
Owner: Egon
Status: LIVE_READONLY_PRIVACY_PROBE_BLOCKED_DNS

## Approval

Nate approved:

```text
APPROVE SHOPFLOOR LIVE PRIVACY VERIFY
Mode: read-only anon first; write-denial probes only after Egon reports read-only result
Boundary: use local app/.env without printing secrets; no deploy; no public release; no external tester data; no schema mutation
```

## What ran

From `/Users/kn8/projects/shopfloor`:

```bash
set -a
. app/.env
set +a
node scripts/shopfloor_privacy_probe.mjs --confirm-live
```

## Result

```text
LIVE_READONLY_PRIVACY_PROBE_BLOCKED_DNS
```

The script ran in read-only mode only:

```text
mode: read-only
write_denial_checks_included: false
secrets_printed: false
```

All four read-only anon checks failed before reaching Supabase because DNS resolution failed for the configured Supabase project host:

```text
getaddrinfo ENOTFOUND [REDACTED_SUPABASE_PROJECT_HOST].supabase.co
```

Checks attempted:

```text
anon can count visible shop_cards
anon can count safe help_requests
anon can count help_requests_with_author
anon can count public field_notes
```

## Boundaries held

- no write-denial probes run;
- no insert attempts;
- no schema/RLS mutation;
- no deploy;
- no public release;
- no external tester data;
- no secrets printed.

## Next diagnostic

Run network/DNS diagnostics without printing secrets:

```bash
python3 - <<'PY'
import socket
for host in ['supabase.co', '[REDACTED_SUPABASE_PROJECT_HOST].supabase.co']:
    try:
        print(host, socket.getaddrinfo(host, 443)[0][4][0])
    except Exception as e:
        print(host, type(e).__name__, str(e))
PY
```

If only the project host fails, likely causes are stale Supabase project URL, paused/deleted project, or DNS/network filtering. If all DNS fails, local network/DNS is the blocker.
