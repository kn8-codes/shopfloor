# Superseded RLS/privacy proposal — ShopFloor

**Date:** 2026-07-15
**Status:** superseded by migration-ready source on 2026-07-19; **not applied live**.

The executable privacy/RLS slice now lives at:

```text
supabase/migrations/20260719000000_prealpha_privacy_hardening.sql
```

It:

- defaults new help requests to `safe_to_share = false`;
- adds owner-read policies for private help requests and hidden shop cards;
- makes new field notes `restricted` by default;
- replaces universal anonymous field-note reads with explicit published-only reads;
- requires an author-owned restricted insert with `privacy_acknowledged_at`;
- preserves `security_invoker = true` on `help_requests_with_author`.

It does **not** apply the migration, implement publication, or solve broad owner-update access to derived shop-card counters. Live application requires a verified Supabase CLI/project link or another explicitly approved, authenticated migration route.
