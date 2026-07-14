-- 20260714000100_seed_arunachal_circuits.sql — Seed: the 9 Arunachal circuits.
-- Bootstrap content per docs-new/08-blueprint/02-arunachal-reference.md §2.
-- Circuits are regions at level='circuit' under the Arunachal Pradesh state row.
-- Idempotent (on conflict do nothing). Published: they are structural navigation,
-- not editorial pages yet — the state hub renders them as sections/filters.
--
-- DELIBERATE DEVIATION from 12-migration-9-plan.md §5: existing places are NOT
-- re-parented to circuits here. Current atlas queries read places by the state's
-- region_id; re-parenting before the hub build ships circuit traversal would
-- empty /arunachal-pradesh. Re-parent in the state-hub vertical build instead.

with ap as (
  select id from regions where slug = 'arunachal-pradesh' limit 1
)
insert into regions (slug, name, level, parent_id, body, status, published_at)
select c.slug, c.name, 'circuit', ap.id,
       jsonb_build_object('intro', c.intro),
       'published', now()
from ap, (values
  ('tawang-west-kameng',  'Tawang–West Kameng',
   'The Monpa high road: Bomdila, Dirang, Sela Pass at 4,170 m, and the great monastery at Tawang.'),
  ('ziro-apatani',        'Ziro–Apatani',
   'Paddy-field valley of the Apatani — village walks, Talle Valley forest, and September''s music festival.'),
  ('mechuka-shi-yomi',    'Mechuka–Shi Yomi',
   'The far valley near the line: a 400-year-old gompa, hanging bridges, and the last café before the mountains end.'),
  ('siang',               'Siang',
   'Adi country along the great river — Pasighat, Aalo, and the road that follows the Siang north.'),
  ('dibang-valley',       'Dibang Valley',
   'India''s least-crowded district: Anini, the Mayodia pass, Idu Mishmi homesteads, grasslands and falls.'),
  ('lohit-dong-walong',   'Lohit–Dong–Walong',
   'Where India''s day begins — Dong valley''s first sunrise, Walong''s war memorial, Kaho''s last houses.'),
  ('namdapha-changlang',  'Namdapha–Changlang',
   'Rainforest to snowline in one park — Namdapha''s biodiversity, Miao, and the far settlement of Vijaynagar.'),
  ('dambuk-lower-dibang', 'Dambuk–Lower Dibang',
   'Orange orchards, river crossings, and December''s off-road-and-music festival.'),
  ('tirap-longding',      'Tirap–Longding',
   'The deep southeast: Wancho and Nocte villages, master carvers, almost no visitors.')
) as c(slug, name, intro)
on conflict (slug) do nothing;

-- Entry numbers for the already-published places, by publish order (07 §1: assigned
-- once, immutable, global). Guarded: only assigns where entry_no is still null.
with ordered as (
  select id, row_number() over (order by published_at asc nulls last, created_at asc) as rn
  from places
  where status = 'published' and deleted_at is null and entry_no is null
)
update places p
set entry_no = ordered.rn + coalesce((select max(entry_no) from places), 0)
from ordered
where p.id = ordered.id;
