-- 20260703000000_admin_platform.sql — Admin platform spine (Phase A0→A1).
-- Additive + idempotent. NOT YET APPLIED — apply with `supabase db push` when
-- moving to the Publishable Editor / RBAC / audit work.
-- See docs-new/05-admin/02-admin-revamp-plan.md §5–6 and §6 (data-model additions).

-- ── 1. Scheduled publish state ────────────────────────────────────────────
alter type publish_status add value if not exists 'scheduled';

alter table tours   add column if not exists scheduled_for timestamptz;
alter table places  add column if not exists scheduled_for timestamptz;
alter table regions add column if not exists scheduled_for timestamptz;

-- ── 2. Content history — append-only version snapshots (diff + restore) ────
create table if not exists entity_versions (
  id             uuid primary key default gen_random_uuid(),
  entity_type    text not null,              -- 'tour' | 'place' | 'region' | ...
  entity_id      uuid not null,
  version_no     int  not null,
  snapshot       jsonb not null,             -- full entity incl. seo jsonb
  state          text not null,              -- draft|published|scheduled|archived|restored
  change_summary text,
  author_id      uuid references auth.users(id) on delete set null,
  created_at     timestamptz not null default now(),
  unique (entity_type, entity_id, version_no)
);
create index if not exists entity_versions_entity_idx
  on entity_versions (entity_type, entity_id, version_no desc);

-- ── 3. Activity feed — human-readable operational journal (WorkOS shape) ───
create table if not exists activity_events (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid references auth.users(id) on delete set null,
  action      text not null,                 -- 'tour.published', 'place.archived', ...
  targets     jsonb not null default '[]'::jsonb,  -- [{type,id,name}]
  context     jsonb not null default '{}'::jsonb,  -- {ip, user_agent}
  metadata    jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);
create index if not exists activity_events_occurred_idx on activity_events (occurred_at desc);
create index if not exists activity_events_actor_idx on activity_events (actor_id, occurred_at desc);

-- ── 4. Itinerary — day rows (queryable, reorderable, per-day places) ───────
create table if not exists tour_days (
  id         uuid primary key default gen_random_uuid(),
  tour_id    uuid not null references tours(id) on delete cascade,
  day_no     int  not null,
  title      text,
  body       jsonb,                          -- { description, activities[] }
  place_ids  uuid[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tour_id, day_no)
);
create index if not exists tour_days_tour_idx on tour_days (tour_id, day_no);
create trigger tour_days_set_updated_at
  before update on tour_days for each row execute function set_updated_at();

-- ── 5. Relations — tours ↔ places ─────────────────────────────────────────
create table if not exists tour_places (
  tour_id  uuid not null references tours(id)  on delete cascade,
  place_id uuid not null references places(id) on delete cascade,
  role     text not null default 'stop',      -- stop | basecamp | highlight
  sort     int  not null default 0,
  primary key (tour_id, place_id)
);
create index if not exists tour_places_place_idx on tour_places (place_id);

-- ── 6. Media — galleries + DAM columns ────────────────────────────────────
alter table media add column if not exists focal_point  jsonb;   -- { x, y } 0..1
alter table media add column if not exists content_hash text;    -- SHA-256, dedupe
alter table media add column if not exists bytes        bigint;
alter table media add column if not exists mime         text;
create unique index if not exists media_content_hash_key
  on media (content_hash) where content_hash is not null;

create table if not exists media_links (
  id         uuid primary key default gen_random_uuid(),
  media_id   uuid not null references media(id) on delete cascade,
  owner_type text not null,                   -- tour | place | region | story | ...
  owner_id   uuid not null,
  role       text not null default 'gallery', -- hero | gallery | inline
  sort       int  not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists media_links_owner_idx on media_links (owner_type, owner_id, sort);
create index if not exists media_links_media_idx on media_links (media_id);

-- ── 7. Redirects — link a redirect to the entity whose slug changed ────────
alter table redirects add column if not exists entity_type text;
alter table redirects add column if not exists entity_id   uuid;

-- ── 8. Full-text search vectors (admin FTS + future public search) ─────────
alter table tours add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(subtitle, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(slug, '')), 'C')
  ) stored;
create index if not exists tours_search_idx on tours using gin (search_vector);

alter table places add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(slug, '')), 'C')
  ) stored;
create index if not exists places_search_idx on places using gin (search_vector);

alter table regions add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('simple', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(slug, '')), 'C')
  ) stored;
create index if not exists regions_search_idx on regions using gin (search_vector);

-- ── 9. RBAC — roles + permission mapping (replaces the env allowlist) ──────
-- Canonical Supabase pattern: role in JWT via access-token hook, permission
-- mapping in a table read by an authorize() SECURITY DEFINER function.
do $$ begin
  create type app_role as enum ('owner', 'editor', 'contributor', 'scout');
exception when duplicate_object then null; end $$;

do $$ begin
  create type app_permission as enum (
    'content.read', 'content.write', 'content.publish',
    'content.delete', 'media.manage', 'settings.manage', 'roles.manage'
  );
exception when duplicate_object then null; end $$;

create table if not exists user_roles (
  id      bigint generated by default as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  role    app_role not null,
  unique (user_id, role)
);

create table if not exists role_permissions (
  id         bigint generated by default as identity primary key,
  role       app_role not null,
  permission app_permission not null,
  unique (role, permission)
);

insert into role_permissions (role, permission) values
  ('owner', 'content.read'), ('owner', 'content.write'), ('owner', 'content.publish'),
  ('owner', 'content.delete'), ('owner', 'media.manage'), ('owner', 'settings.manage'),
  ('owner', 'roles.manage'),
  ('editor', 'content.read'), ('editor', 'content.write'), ('editor', 'content.publish'),
  ('editor', 'content.delete'), ('editor', 'media.manage'),
  ('contributor', 'content.read'), ('contributor', 'content.write'), ('contributor', 'media.manage'),
  ('scout', 'content.read'), ('scout', 'content.write')
on conflict do nothing;

-- authorize(permission): read role from JWT, look up permission mapping.
create or replace function authorize(requested_permission app_permission)
returns boolean
language plpgsql stable security definer set search_path = ''
as $$
declare
  bound int;
  role  public.app_role;
begin
  select (auth.jwt() ->> 'user_role')::public.app_role into role;
  if role is null then return false; end if;
  select count(*) into bound
  from public.role_permissions
  where role_permissions.permission = requested_permission
    and role_permissions.role = role;
  return bound > 0;
end $$;

-- Access-token hook: stamps the user's role into the JWT as `user_role`.
-- After applying, enable it in Supabase → Auth → Hooks (Custom Access Token).
create or replace function custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql stable
as $$
declare
  claims jsonb;
  role   public.app_role;
begin
  select ur.role into role from public.user_roles ur
  where ur.user_id = (event ->> 'user_id')::uuid
  order by ur.role limit 1;
  claims := event -> 'claims';
  if role is not null then
    claims := jsonb_set(claims, '{user_role}', to_jsonb(role));
  else
    claims := jsonb_set(claims, '{user_role}', 'null');
  end if;
  event := jsonb_set(event, '{claims}', claims);
  return event;
end $$;

-- ── 10. RLS — admin-only tables (deny anon; service-role bypasses RLS) ─────
do $$
declare t text;
begin
  foreach t in array array[
    'entity_versions', 'activity_events', 'tour_days', 'tour_places',
    'media_links', 'user_roles', 'role_permissions'
  ] loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- supabase_auth_admin needs to read user_roles for the access-token hook.
grant usage on schema public to supabase_auth_admin;
grant select on public.user_roles to supabase_auth_admin;
do $$ begin
  create policy "auth admin reads roles" on public.user_roles
    as permissive for select to supabase_auth_admin using (true);
exception when duplicate_object then null; end $$;
