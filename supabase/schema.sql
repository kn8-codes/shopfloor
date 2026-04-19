-- ShopFloor MVP schema
-- Goal: get one real Akron person posting a real request by end of week.
-- Keep it simple. No over-engineering.

create extension if not exists pgcrypto;

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 1. shop_cards
-- One public-facing profile per auth user.
create table if not exists public.shop_cards (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique,
  display_name text not null,
  neighborhood text not null,
  bio text not null,
  help_style text not null default 'depends',
  contact_pref text not null default 'in_app',
  skills text[] not null default '{}',
  is_visible boolean not null default true,
  completed_help_count integer not null default 0,
  field_note_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint shop_cards_help_style_check
    check (help_style in ('paid', 'barter', 'volunteer', 'depends')),
  constraint shop_cards_handle_length_check
    check (char_length(handle) between 3 and 32),
  constraint shop_cards_bio_length_check
    check (char_length(bio) between 1 and 500)
);

create trigger set_shop_cards_updated_at
before update on public.shop_cards
for each row
execute function public.set_updated_at();

-- 2. help_requests
create table if not exists public.help_requests (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.shop_cards(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  neighborhood text not null,
  urgency text not null default 'normal',
  budget_note text,
  status text not null default 'open',
  safe_to_share boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint help_requests_category_check
    check (category in ('car', 'housing', 'appliance', 'paperwork', 'ride_help', 'tool_borrow', 'yard_outdoor', 'kid_family', 'other')),
  constraint help_requests_urgency_check
    check (urgency in ('low', 'normal', 'high', 'urgent')),
  constraint help_requests_status_check
    check (status in ('open', 'in_progress', 'resolved', 'closed')),
  constraint help_requests_title_length_check
    check (char_length(title) between 5 and 140),
  constraint help_requests_description_length_check
    check (char_length(description) between 20 and 5000)
);

create index if not exists help_requests_author_id_idx on public.help_requests(author_id);
create index if not exists help_requests_neighborhood_idx on public.help_requests(neighborhood);
create index if not exists help_requests_status_idx on public.help_requests(status);
create index if not exists help_requests_category_idx on public.help_requests(category);
create index if not exists help_requests_created_at_idx on public.help_requests(created_at desc);

create trigger set_help_requests_updated_at
before update on public.help_requests
for each row
execute function public.set_updated_at();

-- 3. field_notes
create table if not exists public.field_notes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.help_requests(id) on delete set null,
  author_id uuid not null references public.shop_cards(id) on delete cascade,
  title text not null,
  problem text not null,
  fix text not null,
  cost text,
  tools_used text,
  time_required text,
  safety_level text not null,
  neighborhood_tip text,
  created_at timestamptz not null default now(),
  constraint field_notes_safety_level_check
    check (safety_level in ('safe', 'temporary', 'janky')),
  constraint field_notes_title_length_check
    check (char_length(title) between 5 and 140),
  constraint field_notes_problem_length_check
    check (char_length(problem) between 10 and 3000),
  constraint field_notes_fix_length_check
    check (char_length(fix) between 10 and 5000)
);

create index if not exists field_notes_request_id_idx on public.field_notes(request_id);
create index if not exists field_notes_author_id_idx on public.field_notes(author_id);
create index if not exists field_notes_created_at_idx on public.field_notes(created_at desc);

-- 4. users
-- Lightweight app-owned mirror of auth identity for future growth.
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- Auto-create lightweight app user row when auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop/recreate trigger safely.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- RLS
alter table public.shop_cards enable row level security;
alter table public.help_requests enable row level security;
alter table public.field_notes enable row level security;
alter table public.users enable row level security;

-- shop_cards
create policy "public can read visible shop cards"
on public.shop_cards
for select
using (is_visible = true);

create policy "users can insert own shop card"
on public.shop_cards
for insert
with check (auth.uid() = id);

create policy "users can update own shop card"
on public.shop_cards
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- help_requests
create policy "public can read open-ish requests"
on public.help_requests
for select
using (safe_to_share = true and status in ('open', 'in_progress', 'resolved'));

create policy "users with a shop card can create requests"
on public.help_requests
for insert
with check (
  auth.uid() = author_id
  and exists (
    select 1
    from public.shop_cards sc
    where sc.id = auth.uid()
      and sc.is_visible = true
      and char_length(sc.bio) > 0
  )
);

create policy "authors can update own requests"
on public.help_requests
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

-- field_notes
create policy "public can read field notes"
on public.field_notes
for select
using (true);

create policy "users can create own field notes"
on public.field_notes
for insert
with check (auth.uid() = author_id);

create policy "authors can update own field notes"
on public.field_notes
for update
using (auth.uid() = author_id)
with check (auth.uid() = author_id);

-- users
create policy "users can read own user row"
on public.users
for select
using (auth.uid() = id);

create policy "users can update own user row"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Helpful view for feed queries later
create or replace view public.help_requests_with_author as
select
  hr.id,
  hr.title,
  hr.description,
  hr.category,
  hr.neighborhood,
  hr.urgency,
  hr.budget_note,
  hr.status,
  hr.safe_to_share,
  hr.created_at,
  hr.updated_at,
  sc.handle as author_handle,
  sc.display_name as author_display_name,
  sc.neighborhood as author_neighborhood
from public.help_requests hr
join public.shop_cards sc on sc.id = hr.author_id;
