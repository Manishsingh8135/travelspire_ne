-- 20260714000000_content_graph.sql — The content graph (blueprint migration #9).
-- Makes the 4-layer model real: Festival/Event split, Experiences, Stays/Rides,
-- Tribes, Reviews, Stories, Partners + the tour/place extensions (pricing matrix,
-- route, gateway anchors, entry numbers). Additive + idempotent.
-- Spec: docs-new/08-blueprint/12-migration-9-plan.md (authored from 03/04/05).
-- Depends on #7 (admin_platform: scheduled enum value, tour_days, tour_places,
-- media_links) and #8 (permit_zones) — apply those first.

-- ── 1. Enums ────────────────────────────────────────────────────────────────
do $$ begin
  create type tour_format as enum
    ('expedition','trek','road_trip','cultural','festival','wildlife','pilgrimage','bike','camping');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_kind as enum ('festival_edition','tour_departure');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_status as enum
    ('scheduled','open','limited','sold_out','completed','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type stay_type as enum ('homestay','camp','tent','hotel','guesthouse');
exception when duplicate_object then null; end $$;

do $$ begin
  create type experience_kind as enum
    ('homestay_life','craft','food','ritual','trek_day','sunrise','wildlife','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type review_status as enum ('pending','approved','rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type partner_kind as enum ('host','guide','scout','artisan');
exception when duplicate_object then null; end $$;

-- regions.level is text (init migration): circuits use level = 'circuit', no enum change.

-- ── 2. Tribes — culture provenance ─────────────────────────────────────────
create table if not exists tribes (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  body          jsonb,                                 -- { who, language_note, crafts[] }
  region_ids    uuid[] not null default '{}',
  hero_media_id uuid references media(id) on delete set null,
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  scheduled_for timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_tribes_status on tribes (status) where deleted_at is null;
drop trigger if exists trg_tribes_updated on tribes;
create trigger trg_tribes_updated before update on tribes
  for each row execute function set_updated_at();

-- ── 3. Partners — hosts/guides/scouts (INTERNAL until Phase 4) ─────────────
create table if not exists partners (
  id            uuid primary key default gen_random_uuid(),
  kind          partner_kind not null default 'host',
  name          text not null,
  place_id      uuid references places(id) on delete set null,
  tribe_id      uuid references tribes(id) on delete set null,
  bio           text,
  contact       jsonb not null default '{}'::jsonb,    -- PRIVATE — never exposed to anon
  verified_at   timestamptz,
  hero_media_id uuid references media(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_partners_place on partners (place_id);
drop trigger if exists trg_partners_updated on partners;
create trigger trg_partners_updated before update on partners
  for each row execute function set_updated_at();

-- ── 4. Festivals — evergreen calendar entities ─────────────────────────────
create table if not exists festivals (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  tribe_id      uuid references tribes(id)  on delete set null,
  place_id      uuid references places(id)  on delete set null,
  region_id     uuid references regions(id) on delete set null,
  recurrence    jsonb not null default '{}'::jsonb,    -- { month, typical_start_day?, duration_days, rule_note }
  body          jsonb,                                 -- { significance, what_to_expect[], cultural_highlights[], lineup, attend, faqs[] }
  hero_media_id uuid references media(id) on delete set null,
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  scheduled_for timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_festivals_region on festivals (region_id);
create index if not exists idx_festivals_place  on festivals (place_id);
create index if not exists idx_festivals_status on festivals (status) where deleted_at is null;
create index if not exists idx_festivals_seo_gin on festivals using gin (seo);
drop trigger if exists trg_festivals_updated on festivals;
create trigger trg_festivals_updated before update on festivals
  for each row execute function set_updated_at();

-- ── 5. Events — dated instances (festival editions + tour departures) ──────
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  kind        event_kind not null,
  festival_id uuid references festivals(id) on delete cascade,
  tour_id     uuid references tours(id)     on delete cascade,
  label       text,                                    -- "Hornbill 2026", "Oct 12 departure"
  starts_on   date not null,
  ends_on     date,
  year        int generated always as (extract(year from starts_on)::int) stored,
  status      event_status not null default 'scheduled',
  capacity    int,
  booked_note text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint events_one_parent check (num_nonnulls(festival_id, tour_id) = 1)
);
create index if not exists idx_events_starts   on events (starts_on);
create index if not exists idx_events_festival on events (festival_id, starts_on);
create index if not exists idx_events_tour     on events (tour_id, starts_on);
drop trigger if exists trg_events_updated on events;
create trigger trg_events_updated before update on events
  for each row execute function set_updated_at();

-- ── 6. Experiences — the authentic, arrangeable units ──────────────────────
create table if not exists experiences (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  kind             experience_kind not null default 'other',
  place_id         uuid references places(id)   on delete set null,
  tribe_id         uuid references tribes(id)   on delete set null,
  host_id          uuid references partners(id) on delete set null,
  duration_label   text,                                -- "3 hours", "1 night"
  price_inr        int,
  group_max        int,
  authentic        boolean  not null default true,
  exclusivity_tier smallint not null default 0,         -- >0 = membership-gated
  body             jsonb,                               -- { what_it_is, who_hosts, includes[], bring[] }
  hero_media_id    uuid references media(id) on delete set null,
  seo              jsonb not null default '{}'::jsonb,
  status           publish_status not null default 'draft',
  published_at     timestamptz,
  scheduled_for    timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);
create index if not exists idx_experiences_place  on experiences (place_id);
create index if not exists idx_experiences_status on experiences (status) where deleted_at is null;
drop trigger if exists trg_experiences_updated on experiences;
create trigger trg_experiences_updated before update on experiences
  for each row execute function set_updated_at();

-- ── 7. Stays & Rides — the arrange-layer supply ────────────────────────────
create table if not exists stays (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  type          stay_type not null default 'homestay',
  place_id      uuid references places(id)   on delete set null,
  host_id       uuid references partners(id) on delete set null,
  capacity      int,
  rooms_note    text,
  facilities    text[] not null default '{}',           -- geyser, bonfire, …
  price_band    text,
  body          jsonb,                                   -- { description, access_note }
  geom          geometry(Point, 4326),
  hero_media_id uuid references media(id) on delete set null,
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  scheduled_for timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_stays_place  on stays (place_id);
create index if not exists idx_stays_geom   on stays using gist (geom);
create index if not exists idx_stays_status on stays (status) where deleted_at is null;
drop trigger if exists trg_stays_updated on stays;
create trigger trg_stays_updated before update on stays
  for each row execute function set_updated_at();

create table if not exists rides (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  type          text not null default 'suv',             -- suv | tempo | bike | self_drive
  base_place_id uuid references places(id) on delete set null,
  capacity      int,
  price_band    text,
  body          jsonb,                                   -- { terms }
  hero_media_id uuid references media(id) on delete set null,
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  scheduled_for timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_rides_base   on rides (base_place_id);
create index if not exists idx_rides_status on rides (status) where deleted_at is null;
drop trigger if exists trg_rides_updated on rides;
create trigger trg_rides_updated before update on rides
  for each row execute function set_updated_at();

-- ── 8. Reviews — moderated, v1-superset shape (04 §10) ─────────────────────
create table if not exists reviews (
  id         uuid primary key default gen_random_uuid(),
  tour_id    uuid not null references tours(id) on delete cascade,
  content    text not null,
  author     jsonb not null default '{}'::jsonb,  -- { name, age?, location, verified, travel_style[], previous_trips? }
  trip       jsonb not null default '{}'::jsonb,  -- { tour_name, destination, trip_type, duration, travel_date, season }
  rating     jsonb not null default '{}'::jsonb,  -- { overall, categories{accommodation,guide,transportation,value,food} }
  status     review_status not null default 'pending',
  source     text not null default 'import',      -- whatsapp | form | import
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_reviews_tour on reviews (tour_id, status);
drop trigger if exists trg_reviews_updated on reviews;
create trigger trg_reviews_updated before update on reviews
  for each row execute function set_updated_at();

-- ── 9. Stories — the journal ───────────────────────────────────────────────
create table if not exists stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  author        jsonb not null default '{}'::jsonb,     -- { name, bio_line, avatar_media_id }
  body          jsonb,                                  -- portable blocks: prose | image | pull_quote | place_ref | tour_ref
  mentions      jsonb not null default '[]'::jsonb,     -- [{ entity_type, entity_id }]
  hero_media_id uuid references media(id) on delete set null,
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  scheduled_for timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index if not exists idx_stories_status   on stories (status) where deleted_at is null;
create index if not exists idx_stories_mentions on stories using gin (mentions);
create index if not exists idx_stories_seo_gin  on stories using gin (seo);
drop trigger if exists trg_stories_updated on stories;
create trigger trg_stories_updated before update on stories
  for each row execute function set_updated_at();

-- ── 10. Tours — the money-entity extensions (03 §§2–5, 05 §1) ──────────────
alter table tours add column if not exists format tour_format not null default 'expedition';
alter table tours add column if not exists festival_id uuid references festivals(id) on delete set null;
alter table tours add column if not exists nights int;
alter table tours add column if not exists starts_from_place_id uuid references places(id) on delete set null;
alter table tours add column if not exists ends_at_place_id     uuid references places(id) on delete set null;
alter table tours add column if not exists max_group_size int;
alter table tours add column if not exists altitude_max_m int;
alter table tours add column if not exists featured boolean not null default false;
alter table tours add column if not exists trending boolean not null default false;
alter table tours add column if not exists pricing jsonb not null default '{}'::jsonb; -- 03 §4 matrix
alter table tours add column if not exists route   jsonb not null default '{}'::jsonb; -- { points[], stops[] } (v1 parity)

-- Backfill format from the legacy type enum (keep `type` until code swaps over).
update tours set format = case type::text
  when 'adventure'  then 'expedition'
  when 'cultural'   then 'cultural'
  when 'nature'     then 'expedition'   -- nature tours are expeditions; 'wildlife' reserved for safari products
  when 'pilgrimage' then 'pilgrimage'
  when 'festival'   then 'festival'
  when 'trek'       then 'trek'
  else 'expedition' end::tour_format;

-- Backfill nights for existing tours (N nights = days - 1; correct per-tour on re-import).
update tours set nights = duration_days - 1
  where nights is null and duration_days is not null and duration_days > 0;

create index if not exists idx_tours_format   on tours (format, status);
create index if not exists idx_tours_festival on tours (festival_id);

-- ── 11. Places — field-entry extensions (04 §2, 07 §1) ─────────────────────
alter table places add column if not exists entry_no int;
alter table places add column if not exists tribe_id uuid references tribes(id) on delete set null;
alter table places add column if not exists permit_note text;
create unique index if not exists places_entry_no_key
  on places (entry_no) where entry_no is not null;
create index if not exists idx_places_tribe on places (tribe_id);

-- ── 12. Row Level Security ──────────────────────────────────────────────────
-- Standard Publishable read for anon on public entities; children derive from
-- parents; partners deny-all (no anon policy — service role only).
alter table tribes      enable row level security;
alter table partners    enable row level security;
alter table festivals   enable row level security;
alter table events      enable row level security;
alter table experiences enable row level security;
alter table stays       enable row level security;
alter table rides       enable row level security;
alter table reviews     enable row level security;
alter table stories     enable row level security;

drop policy if exists "tribes public read" on tribes;
create policy "tribes public read" on tribes for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

drop policy if exists "festivals public read" on festivals;
create policy "festivals public read" on festivals for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

-- Events are visible when their parent is published.
drop policy if exists "events public read via parent" on events;
create policy "events public read via parent" on events for select to anon, authenticated
  using (
    (festival_id is not null and exists (
      select 1 from festivals f
      where f.id = events.festival_id and f.status = 'published' and f.deleted_at is null))
    or
    (tour_id is not null and exists (
      select 1 from tours t
      where t.id = events.tour_id and t.status = 'published' and t.deleted_at is null))
  );

-- Experiences: gated intel (exclusivity_tier > 0) hidden from anon (mirrors places).
drop policy if exists "experiences public read" on experiences;
create policy "experiences public read" on experiences for select to anon, authenticated
  using (status = 'published' and deleted_at is null and exclusivity_tier = 0);

drop policy if exists "stays public read" on stays;
create policy "stays public read" on stays for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

drop policy if exists "rides public read" on rides;
create policy "rides public read" on rides for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

-- Reviews: approved only, and only for published tours.
drop policy if exists "reviews public read approved" on reviews;
create policy "reviews public read approved" on reviews for select to anon, authenticated
  using (
    status = 'approved' and exists (
      select 1 from tours t
      where t.id = reviews.tour_id and t.status = 'published' and t.deleted_at is null)
  );

drop policy if exists "stories public read" on stories;
create policy "stories public read" on stories for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

-- partners: RLS enabled, NO anon/authenticated policy → deny-all (contact stays private).
