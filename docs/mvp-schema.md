# ShopFloor MVP schema

## Purpose
This is the first concrete data model for ShopFloor.
It is intentionally small, local, and practical.

Recommended stack:
- SvelteKit
- Supabase Postgres
- Supabase Auth
- Supabase Storage for optional images

---

## 1. profiles
Represents a person’s public shop card.

### Fields
- `id uuid primary key` — auth-linked user id
- `handle text unique not null`
- `display_name text not null`
- `neighborhood text not null`
- `bio text`
- `help_style text not null` — one of: `paid`, `barter`, `volunteer`, `depends`
- `contact_pref text not null default 'in_app'`
- `skills text[] not null default '{}'`
- `needs text[] not null default '{}'`
- `is_visible boolean not null default true`
- `completed_help_count integer not null default 0`
- `field_note_count integer not null default 0`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

---

## 2. help_requests
A real practical request posted by a user.

### Fields
- `id uuid primary key default gen_random_uuid()`
- `author_id uuid not null references profiles(id) on delete cascade`
- `title text not null`
- `description text not null`
- `category text not null`
- `neighborhood text not null`
- `urgency text not null default 'normal'` — `low`, `normal`, `high`, `urgent`
- `budget_note text`
- `status text not null default 'open'` — `open`, `in_progress`, `resolved`, `closed`
- `safe_to_share boolean not null default true`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

---

## 3. request_images
Optional images attached to a help request.

### Fields
- `id uuid primary key default gen_random_uuid()`
- `request_id uuid not null references help_requests(id) on delete cascade`
- `storage_path text not null`
- `caption text`
- `created_at timestamptz not null default now()`

---

## 4. request_responses
Replies/offers/advice on a request.

### Fields
- `id uuid primary key default gen_random_uuid()`
- `request_id uuid not null references help_requests(id) on delete cascade`
- `author_id uuid not null references profiles(id) on delete cascade`
- `response_type text not null` — `can_help`, `know_someone`, `have_tool`, `advice`
- `message text not null`
- `created_at timestamptz not null default now()`

---

## 5. field_notes
Structured knowledge artifact created after something gets solved.

### Fields
- `id uuid primary key default gen_random_uuid()`
- `request_id uuid references help_requests(id) on delete set null`
- `author_id uuid not null references profiles(id) on delete cascade`
- `title text not null`
- `problem text not null`
- `fix text not null`
- `cost text`
- `tools_used text`
- `time_required text`
- `safety_level text not null` — `safe`, `temporary`, `janky`
- `neighborhood_tip text`
- `created_at timestamptz not null default now()`

---

## 6. tools
Structured tool and resource inventory attached to a shop card.

### Fields
- `id uuid primary key default gen_random_uuid()`
- `profile_id uuid not null references profiles(id) on delete cascade`
- `name text not null`
- `category text`
- `description text`
- `condition text`
- `lendable boolean not null default false`
- `availability_status text not null default 'available'` — `available`, `limited`, `unavailable`
- `neighborhood text`
- `notes text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

---

## Shared enums as app-level constants first
Keep this lightweight for MVP. App constants are fine before DB enums.

### Categories
- `car`
- `housing`
- `appliance`
- `paperwork`
- `ride_help`
- `tool_borrow`
- `yard_outdoor`
- `kid_family`
- `other`

### Trust signals
For MVP, trust should be derived, not theatrical:
- completed help count
- field note count
- neighborhood consistency
- visible history of useful activity

No star ratings in MVP.
No public score humiliation nonsense.

---

## Suggested RLS posture
- profiles readable if `is_visible = true`
- users can edit only their own profile
- help requests readable to signed-in users by default
- request authors can edit/close their own requests, but resolved requests should require a field note unless explicitly exempted for safety/privacy
- responses writable by authenticated users
- field notes writable by authenticated users
- tools writable by owners

---

## Summary
This schema is enough to prove the core loop:
1. person creates shop card
2. person posts request
3. another person responds
4. outcome becomes field note
5. local trust accumulates from usefulness
