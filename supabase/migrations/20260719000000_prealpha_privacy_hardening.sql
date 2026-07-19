-- ShopFloor pre-alpha privacy hardening
-- Status: migration-ready; not applied from this checkout because no verified Supabase CLI/project link exists.
--
-- This migration makes field notes restricted by default and requires a separate,
-- reviewed publication path before anonymous readers can see them.

-- Private help requests remain readable by their author.
drop policy if exists "authors can read own requests" on public.help_requests;
create policy "authors can read own requests"
on public.help_requests
for select
using (auth.uid() = author_id);

-- A missed checkbox must not make a new request public by default.
alter table public.help_requests
alter column safe_to_share set default false;

-- Hidden profile owners still need to manage/read their own profile.
drop policy if exists "users can read own shop card" on public.shop_cards;
create policy "users can read own shop card"
on public.shop_cards
for select
using (auth.uid() = id);

-- Field notes begin restricted. Publication is intentionally not implemented here.
alter table public.field_notes
add column if not exists visibility text not null default 'restricted';

alter table public.field_notes
add column if not exists published_at timestamptz;

alter table public.field_notes
add column if not exists withdrawn_at timestamptz;

alter table public.field_notes
add column if not exists privacy_acknowledged_at timestamptz;

alter table public.field_notes
drop constraint if exists field_notes_visibility_check;

alter table public.field_notes
add constraint field_notes_visibility_check
check (visibility in ('restricted', 'public', 'hidden'));

-- Replace universal public visibility with an explicit publication gate.
drop policy if exists "public can read field notes" on public.field_notes;
drop policy if exists "public can read published field notes" on public.field_notes;
create policy "public can read published field notes"
on public.field_notes
for select
using (visibility = 'public' and withdrawn_at is null);

drop policy if exists "authors can read own field notes" on public.field_notes;
create policy "authors can read own field notes"
on public.field_notes
for select
using (auth.uid() = author_id);

-- App acknowledgements are persisted and required for all new notes.
drop policy if exists "users can create own field notes" on public.field_notes;
drop policy if exists "users can create own restricted field notes" on public.field_notes;
create policy "users can create own restricted field notes"
on public.field_notes
for insert
with check (
  auth.uid() = author_id
  and visibility = 'restricted'
  and published_at is null
  and withdrawn_at is null
  and privacy_acknowledged_at is not null
);

-- Keep the feed view explicitly governed by base-table RLS.
alter view public.help_requests_with_author set (security_invoker = true);

-- Deliberate non-goal: the existing broad owner update policies and derived
-- shop-card counters need a separate RPC/trigger design; this migration does
-- not pretend to solve column-level update control.
