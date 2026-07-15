-- ── tour_days: public read via published parent ────────────────────────────
-- The structured day-by-day itinerary (the dossier's heart) is public content
-- for published tours. RLS was enabled in 20260703000000_admin_platform.sql
-- with no anon policy (deny-all); this scopes anon/authenticated SELECT to
-- days whose parent tour is published and live — the same pattern as the
-- events/reviews policies in 20260714000000_content_graph.sql.

drop policy if exists "tour_days public read via parent" on tour_days;
create policy "tour_days public read via parent" on tour_days
  for select to anon, authenticated
  using (
    exists (
      select 1 from tours t
      where t.id = tour_days.tour_id
        and t.status = 'published'
        and t.deleted_at is null
    )
  );
