-- 20260623000200_place_latlng.sql — expose lat/lng as generated columns derived
-- from the PostGIS geom (ST_Y/ST_X are IMMUTABLE, so STORED generated cols are valid).
-- Useful for display (place pages) and as a cheap source for the map markers.

alter table places
  add column if not exists lng double precision generated always as (ST_X(geom)) stored,
  add column if not exists lat double precision generated always as (ST_Y(geom)) stored;
