-- 0001_init.sql — Foundation: extensions, publishable scaffolding, core geo tables, RLS.
-- See docs-new/01-architecture/03-data-model.md and docs-new/02-backend/02-database.md
-- Apply with the Supabase CLI (supabase db push) once the project is linked.

-- ── Extensions ────────────────────────────────────────────────────────────
create extension if not exists postgis;
create extension if not exists pgcrypto;

-- ── Enums ─────────────────────────────────────────────────────────────────
do $$ begin
  create type publish_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type place_kind as enum
    ('village','town','lake','pass','peak','monastery','market','viewpoint','waterfall','other');
exception when duplicate_object then null; end $$;

-- ── updated_at trigger helper ─────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ── 301 redirects (slugs are immutable post-publish; old slugs kept here) ──
create table if not exists redirects (
  id          uuid primary key default gen_random_uuid(),
  from_path   text not null unique,
  to_path     text not null,
  status_code int  not null default 301,
  created_at  timestamptz not null default now()
);

-- ── Regions (state / district / valley tree) ──────────────────────────────
create table if not exists regions (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  level        text not null default 'state',     -- state | district | valley
  parent_id    uuid references regions(id) on delete set null,
  geom         geometry(MultiPolygon, 4326),
  body         jsonb,
  seo          jsonb not null default '{}'::jsonb, -- Publishable SEO contract
  status       publish_status not null default 'draft',
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  deleted_at   timestamptz
);

-- ── Places (POIs / atlas nodes) ───────────────────────────────────────────
create table if not exists places (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  name             text not null,
  kind             place_kind not null default 'other',
  region_id        uuid references regions(id) on delete set null,
  geom             geometry(Point, 4326),
  elevation_m      int,
  body             jsonb,
  seo              jsonb not null default '{}'::jsonb,
  is_secret        boolean  not null default false,
  exclusivity_tier smallint not null default 0,    -- 0 public … higher = gated intel
  status           publish_status not null default 'draft',
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);

-- ── Media (image/video) with SEO metadata co-located ──────────────────────
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  kind         text not null default 'image',       -- image | video
  alt          text,
  caption      text,
  credit       text,
  width        int,
  height       int,
  blurhash     text,
  geom         geometry(Point, 4326),                -- where the photo was taken
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Triggers ──────────────────────────────────────────────────────────────
drop trigger if exists trg_regions_updated on regions;
create trigger trg_regions_updated before update on regions
  for each row execute function set_updated_at();
drop trigger if exists trg_places_updated on places;
create trigger trg_places_updated before update on places
  for each row execute function set_updated_at();
drop trigger if exists trg_media_updated on media;
create trigger trg_media_updated before update on media
  for each row execute function set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────
create index if not exists idx_regions_geom   on regions using gist (geom);
create index if not exists idx_regions_parent  on regions (parent_id);
create index if not exists idx_regions_status  on regions (status) where deleted_at is null;
create index if not exists idx_places_geom     on places using gist (geom);
create index if not exists idx_places_region   on places (region_id);
create index if not exists idx_places_status   on places (status) where deleted_at is null;
create index if not exists idx_places_seo_gin  on places using gin (seo);
create index if not exists idx_media_geom      on media using gist (geom);

-- ── Row Level Security ────────────────────────────────────────────────────
-- Anon + authenticated read only published, non-deleted content.
-- Admin/host/scout WRITE policies arrive with auth (JWT role claims) in a later
-- phase. The service_role key bypasses RLS for server-side admin + seeding.
alter table regions enable row level security;
alter table places  enable row level security;
alter table media   enable row level security;

drop policy if exists "regions public read" on regions;
create policy "regions public read" on regions for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

drop policy if exists "places public read" on places;
create policy "places public read" on places for select to anon, authenticated
  using (status = 'published' and deleted_at is null);

drop policy if exists "media public read" on media;
create policy "media public read" on media for select to anon, authenticated
  using (true);
