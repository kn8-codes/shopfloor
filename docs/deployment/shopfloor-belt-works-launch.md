# ShopFloor home deployment procedure

Date: 2026-07-11
Canonical home: `https://shopfloor.belt.works`
Repo: `https://github.com/kn8-codes/shopfloor`
Canonical branch: `main`
Current prepared HEAD: `1dd1df3935958d9e369cbddbaff21a492aa7259e`

## Current decision

ShopFloor should live at:

```text
shopfloor.belt.works
```

The app is now safe to deploy there before public release because production has an app-level launch gate. Unless the release flag is explicitly set, all routes render a holding page instead of the usable ShopFloor shell.

## What is already done

- `main` has been fast-forwarded and pushed to the prepared gated branch.
- Current `main` HEAD: `1dd1df3935958d9e369cbddbaff21a492aa7259e`.
- Release gate defaults closed:
  - `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false` or unset means public closed.
  - `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true` opens the app.
- Local closed-mode smoke passed for `/`, `/feed`, and `/new-request`.
- Local open-mode smoke passed for `/`, `/feed`, and `/new-request`.
- `npm run check` and `npm run build` passed.

## Release gate

### Environment variables

Set these in the hosting provider.

Closed/staging-public mode:

```text
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false
PUBLIC_SHOPFLOOR_LAUNCH_MESSAGE=ShopFloor is being wired for a small, trust-first Akron alpha. The public app is intentionally closed until the release gate is opened.
PUBLIC_SUPABASE_URL=<project url>
PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Open/public-alpha mode:

```text
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true
PUBLIC_SHOPFLOOR_LAUNCH_MESSAGE=<optional public release message>
PUBLIC_SUPABASE_URL=<project url>
PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Important: do not set `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true` until data/privacy/local-trust checks are complete.

## Vercel project setup

Vercel CLI is available through `npx vercel`, but this machine did not have Vercel credentials at the time this procedure was written:

```text
Error: No existing credentials found. Please run `vercel login` or pass "--token"
```

Do not paste a Vercel token into chat. Use Vercel dashboard or `vercel login` locally.

### Recommended Vercel settings

Create/import project from GitHub:

```text
Repository: kn8-codes/shopfloor
Production branch: main
Root directory: app
Framework preset: SvelteKit
Install command: npm install
Build command: npm run build
Output directory: leave default / framework detected
```

SvelteKit currently uses `@sveltejs/adapter-auto`. Vercel documentation says adapter-auto detects Vercel and installs/uses the Vercel adapter at build time. Later we can pin `@sveltejs/adapter-vercel` for stability, but do not add that in the DNS/deploy turn unless needed.

### Vercel environment variables

Set for Production, and optionally Preview:

```text
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false
PUBLIC_SHOPFLOOR_LAUNCH_MESSAGE=ShopFloor is being wired for a small, trust-first Akron alpha. The public app is intentionally closed until the release gate is opened.
PUBLIC_SUPABASE_URL=<Supabase project URL>
PUBLIC_SUPABASE_ANON_KEY=<Supabase anon key>
```

Secrets stay in Vercel/Supabase/Proton Pass. Do not place real keys in repo, receipts, board files, or chat.

## DNS setup

Current public DNS check before setup:

```text
shopfloor.belt.works -> no A/CNAME record observed
belt.works -> A 216.198.79.1
www.belt.works -> CNAME 885aa6622d374fb3.vercel-dns-017.com plus Vercel A records observed
```

Vercel docs say subdomains are configured with a CNAME record, and the project/domain screen provides the exact CNAME target.

### Procedure

1. In Vercel project settings, add domain:

```text
shopfloor.belt.works
```

2. Vercel will display the required CNAME target. Add the DNS record wherever `belt.works` DNS is managed:

```text
Type: CNAME
Host/Name: shopfloor
Value/Target: <exact CNAME target shown by Vercel for this project>
TTL: Auto or 300
Proxy/CDN: DNS only unless the DNS provider/Vercel instructions say otherwise
```

Do not guess the CNAME target from `www.belt.works`; use the value Vercel shows for the ShopFloor project/domain.

3. If Vercel asks for TXT verification because the domain is already attached elsewhere, add only the TXT record Vercel displays, verify it, then add the final CNAME.

4. Verify externally:

```bash
dig +short CNAME shopfloor.belt.works
curl -I https://shopfloor.belt.works/
curl -fsS https://shopfloor.belt.works/ | grep -q 'Not open for requests yet'
```

Expected pre-release result: HTTPS works and the page contains `Not open for requests yet`.

## Supabase setup

### Schema

Schema file:

```text
supabase/schema.sql
```

Tables/views/policies include:

- `public.shop_cards`
- `public.help_requests`
- `public.field_notes`
- `public.users`
- `public.help_requests_with_author`
- RLS enabled on app tables
- `help_requests_with_author` set to `security_invoker = true`

Apply through Supabase SQL editor or migration tooling with project-owner credentials. Do not run with pasted secrets in chat.

### Auth URLs

In Supabase Auth URL settings, when ready, add:

```text
Site URL: https://shopfloor.belt.works
Redirect URLs:
- https://shopfloor.belt.works
- https://shopfloor.belt.works/**
```

During local development, keep localhost redirect URLs as needed:

```text
http://localhost:5173
http://127.0.0.1:5173
```

### Pre-release data safety checks

Current proof state as of 2026-07-22:

- anonymous write-denial proof passed after `20260719000000_prealpha_privacy_hardening.sql` was applied;
- controlled authenticated-role proof passed with synthetic data and cleanup;
- no real neighbor/tester data was used;
- public release gate stayed closed.

Before opening the gate:

1. Confirm anon read behavior remains true:
   - visible shop cards are readable;
   - non-visible shop cards are not readable;
   - only safe/open-ish help requests are readable;
   - `help_requests_with_author` respects RLS through `security_invoker`.
2. Confirm anon cannot insert without auth.
3. Confirm signed-in user can only create/read their own private/restricted rows unless separately published/shared.
4. Confirm sample/demo fallback language is honest if Supabase is absent or failing.
5. Confirm no real user private contact info is shown publicly by default.
6. Confirm support/withdrawal handling before any external tester data.
7. Preserve receipt pointer:

```text
/Users/kn8/.hermes/kanban/boards/mesh-open-loops/attachments/t_a0cd55cf/2026-07-22__shopfloor-authenticated-role-rls-proof-passed.md
```

## Local verification commands

From repo root:

```bash
cd app
npm run check
npm run build
```

Closed gate smoke:

```bash
npm run preview -- --host 127.0.0.1 --port 4182
curl -fsS http://127.0.0.1:4182/ | grep -q 'Not open for requests yet'
curl -fsS http://127.0.0.1:4182/feed | grep -q 'Not open for requests yet'
curl -fsS http://127.0.0.1:4182/new-request | grep -q 'Not open for requests yet'
```

Open app smoke:

```bash
PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true npm run preview -- --host 127.0.0.1 --port 4183
curl -fsS http://127.0.0.1:4183/ | grep -q 'ShopFloor'
curl -fsS http://127.0.0.1:4183/feed | grep -q 'Nearby problems first'
curl -fsS http://127.0.0.1:4183/new-request | grep -q 'Post the real problem'
```

## Go/no-go gate

Do not open public release until all are true:

- [x] Vercel project serves `shopfloor.belt.works` behind the closed app release gate.
- [x] `shopfloor.belt.works` resolves and serves HTTPS.
- [x] Closed gate verified on production.
- [x] Supabase env vars are set in hosting without secrets in repo/receipts.
- [x] RLS/auth behavior verified against live Supabase with anonymous and controlled authenticated synthetic-data proofs.
- [ ] Support/withdrawal/private-walkthrough handling approved before real external tester data.
- [ ] Nate explicitly approves opening public alpha.
- [ ] `PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=true` is set only after that approval.

## Rollback / close gate

Fastest safe close:

```text
Set PUBLIC_SHOPFLOOR_PUBLIC_RELEASE=false in Vercel Production env and redeploy/restart.
```

If DNS must be parked:

```text
Remove or change the shopfloor CNAME in DNS, then verify NXDOMAIN/no route externally.
```

Prefer the app-level release gate over DNS removal for normal pre-release work: DNS can exist while the public app remains intentionally closed.
