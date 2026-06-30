-- 20260623000500_media_hero.sql — hero images: link media to entities, public
-- storage bucket, and scope media reads to heroes of published entities (fixes
-- the security-review finding that media was world-readable / deny-all).

-- 1) hero image FK on each publishable entity
alter table regions add column if not exists hero_media_id uuid references media(id) on delete set null;
alter table places  add column if not exists hero_media_id uuid references media(id) on delete set null;
alter table tours   add column if not exists hero_media_id uuid references media(id) on delete set null;

create index if not exists idx_regions_hero on regions (hero_media_id);
create index if not exists idx_places_hero  on places (hero_media_id);
create index if not exists idx_tours_hero   on tours (hero_media_id);

-- 2) public storage bucket. Files are publicly readable by URL; uploads go through
--    the service-role admin client (requireAdmin), so no anon write policy needed.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- 3) media row is readable by anon ONLY when it is the hero of a published,
--    non-deleted entity (subqueries respect those tables' own RLS).
drop policy if exists "media public read" on media;
create policy "media public read" on media for select to anon, authenticated
using (
  exists (select 1 from tours t   where t.hero_media_id = media.id and t.status = 'published' and t.deleted_at is null)
  or exists (select 1 from places p  where p.hero_media_id = media.id and p.status = 'published' and p.deleted_at is null)
  or exists (select 1 from regions r where r.hero_media_id = media.id and r.status = 'published' and r.deleted_at is null)
);
