-- 20260705000000_permit_zones.sql — Permit Zones (Atlas Engine, slice 1).
-- The high-intent SEO + lead-gen pillar: ILP/PAP guides per state. Publishable.
-- Polygons (geom) are new data to source later; nullable for now. Rich legacy
-- guide content (whoNeeds, entryPoints, applicationSteps, documents) lands in
-- `body`; structured fields (fee, portal, processing) get first-class columns.
-- See docs-new/01-architecture/03-data-model.md §3 (permit_zones).

do $$ begin
  create type permit_type as enum ('ILP', 'PAP', 'RAP', 'none');
exception when duplicate_object then null; end $$;

create table if not exists permit_zones (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  name               text not null,
  region_id          uuid references regions(id) on delete set null,
  permit_type        permit_type not null default 'ILP',
  indians_allowed    boolean not null default true,
  foreigners_allowed boolean not null default true,
  on_arrival         boolean not null default false,
  fee                jsonb not null default '{}'::jsonb,   -- { indian, foreigner, tiers[] }
  processing_time    text,
  validity           text,
  official_portal    text,
  helpline           text,
  last_verified_at   timestamptz,
  body               jsonb,                                -- { overview, whoNeeds, entryPoints, applicationSteps, documents }
  rules              jsonb not null default '{}'::jsonb,
  faqs               jsonb not null default '[]'::jsonb,   -- [{ question, answer }]
  geom               geometry(MultiPolygon, 4326),
  hero_media_id      uuid references media(id) on delete set null,
  seo                jsonb not null default '{}'::jsonb,
  status             publish_status not null default 'draft',
  published_at       timestamptz,
  scheduled_for      timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  deleted_at         timestamptz
);

create index if not exists permit_zones_status_idx
  on permit_zones (status, published_at) where deleted_at is null;
create index if not exists permit_zones_region_idx on permit_zones (region_id);
create index if not exists permit_zones_type_idx on permit_zones (permit_type);
create index if not exists permit_zones_seo_gin on permit_zones using gin (seo);
create index if not exists permit_zones_geom_gist on permit_zones using gist (geom);

create trigger permit_zones_set_updated_at
  before update on permit_zones for each row execute function set_updated_at();

-- RLS: anon reads only published, non-deleted rows (Publishable contract).
alter table permit_zones enable row level security;

do $$ begin
  create policy "permit_zones public read published" on permit_zones
    for select to anon, authenticated
    using (status = 'published' and deleted_at is null);
exception when duplicate_object then null; end $$;
