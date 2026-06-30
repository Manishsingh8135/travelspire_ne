-- 20260623000400_tours.sql — Tours: the first marketplace product (Publishable).
-- See docs-new/01-architecture/03-data-model.md.

do $$ begin
  create type tour_type as enum
    ('adventure', 'cultural', 'nature', 'pilgrimage', 'festival', 'trek');
exception when duplicate_object then null; end $$;

do $$ begin
  create type tour_difficulty as enum ('easy', 'moderate', 'challenging');
exception when duplicate_object then null; end $$;

create table if not exists tours (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  subtitle      text,
  region_id     uuid references regions(id) on delete set null,
  type          tour_type       not null default 'adventure',
  difficulty    tour_difficulty not null default 'moderate',
  duration_days int,
  price_inr     int,                                  -- base price per person, INR
  best_time     text,
  body          jsonb,                                -- { overview, highlights[], inclusions[], exclusions[], itinerary:[{title,description}] }
  seo           jsonb not null default '{}'::jsonb,
  status        publish_status not null default 'draft',
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

drop trigger if exists trg_tours_updated on tours;
create trigger trg_tours_updated before update on tours
  for each row execute function set_updated_at();

create index if not exists idx_tours_status   on tours (status) where deleted_at is null;
create index if not exists idx_tours_region    on tours (region_id);
create index if not exists idx_tours_type      on tours (type);
create index if not exists idx_tours_seo_gin   on tours using gin (seo);

alter table tours enable row level security;
drop policy if exists "tours public read" on tours;
create policy "tours public read" on tours for select to anon, authenticated
  using (status = 'published' and deleted_at is null);
