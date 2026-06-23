-- 20260623000100_seed_core.sql — bootstrap reference content so we can build
-- Phase 1 against real, published data. Idempotent (on conflict do nothing).
-- This is reference content the admin will manage later; safe to keep.

insert into regions (slug, name, level, status, published_at, seo)
values (
  'arunachal-pradesh', 'Arunachal Pradesh', 'state', 'published', now(),
  jsonb_build_object(
    'title', 'Arunachal Pradesh — travel guide',
    'description', 'The land of the dawn-lit mountains: permits, places, seasons and how to go.'
  )
)
on conflict (slug) do nothing;

insert into places (slug, name, kind, region_id, geom, elevation_m, status, published_at, seo, body)
select
  v.slug, v.name, v.kind::place_kind, r.id,
  ST_SetSRID(ST_MakePoint(v.lng, v.lat), 4326), v.elev,
  'published', now(),
  jsonb_build_object('title', v.name || ' — Arunachal Pradesh', 'description', v.descr),
  jsonb_build_object('intro', v.descr)
from regions r,
  (values
    ('mechuka', 'Mechuka', 'town',    94.1167, 28.6100, 1829,
      'A high border valley of pine slopes, a 400-year-old monastery and pink dawn light.'),
    ('tawang',  'Tawang',  'town',    91.8594, 27.5860, 3048,
      'Home to India''s largest monastery, reached over the 13,700 ft Sela Pass.'),
    ('ziro',    'Ziro',    'village', 93.8300, 27.5448, 1688,
      'The Apatani valley of paddy-fish farms and the Ziro music festival.')
  ) as v(slug, name, kind, lng, lat, elev, descr)
where r.slug = 'arunachal-pradesh'
on conflict (slug) do nothing;
