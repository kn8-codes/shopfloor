# Receipt — ShopFloor pre-alpha RLS hardening applied

**Date:** 2026-07-19
**Owner:** Egon/default
**Status:** `APPLIED_ANON_PROOF_PASSED_AUTHENTICATED_PROOF_PENDING`

## Verified target and migration

```text
Repository: /Users/kn8/projects/shopfloor
Branch at application: main
Migration: 20260719000000_prealpha_privacy_hardening.sql
Local SHA-256: d29e54bd9e7841e09992411de7faa871c0e178b42570da24bcbb00c5ff9f9bee
Target: linked ShopFloor Supabase project; reference matched configured public app URL
```

## Preflight

- Supabase CLI v2.109.1 was installed, authenticated through Nate’s local browser/device flow, and linked to the verified project.
- `supabase migration list --linked` showed migration `20260719000000` local and absent remote.
- `supabase db push --linked --dry-run` listed exactly `20260719000000_prealpha_privacy_hardening.sql`.
- No credentials, project reference, token, or password were printed in output.

## Approved application

Nate explicitly approved applying this exact migration after the dry-run.

```text
supabase db push --linked --yes
```

The CLI reported `Applying migration 20260719000000_prealpha_privacy_hardening.sql...` and `Finished supabase db push.` A subsequent linked migration list shows local and remote both at `20260719000000`.

The CLI emitted a post-apply warning that its local migration-catalog cache could not inspect Docker because Docker is not running. This did not affect remote application or the remote migration-history record.

## Post-apply anonymous proof

```text
node scripts/shopfloor_privacy_probe.mjs --confirm-live --include-write-denial
result: ok=true; secrets_printed=false
visible counts: shop_cards=2, help_requests=1, help_requests_with_author=1, field_notes=0
anonymous insert shop_cards: denied (42501)
anonymous insert help_requests: denied (42501)
anonymous insert field_notes: denied (42501)
```

The script fails if a probe insert succeeds. No probe row was created.

## Scope completed

- migration applied;
- anonymous protected-row write denial verified;
- public field-note count remains zero;
- public release gate, deployment, GitHub push, real-neighbor test data, and service-role access were not used.

## Deliberate remaining gate

No controlled authenticated author/unrelated-user test accounts or rows were created. That proof needs a separate Nate-approved test-data and cleanup plan before external tester data or public release.
