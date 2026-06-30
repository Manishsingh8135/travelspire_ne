-- 20260623000300_rls_hardening.sql — security review follow-ups (RLS).
-- See docs-new/progress/log.md (Phase 2 security review).

-- 1) redirects: enable RLS. No anon policy → anon is denied read AND write
--    (previously RLS-disabled = world readable/writable). Service role bypasses
--    RLS for admin/management; we'll add scoped access when redirects are wired.
alter table redirects enable row level security;

-- 2) places: also hide gated rows from anon. Makes is_secret / exclusivity_tier
--    actually enforced (the exclusive layer), not just advisory columns.
drop policy if exists "places public read" on places;
create policy "places public read" on places for select to anon, authenticated
  using (
    status = 'published'
    and deleted_at is null
    and is_secret = false
    and exclusivity_tier = 0
  );

-- 3) media: deny anon by default until media is linked to a parent and scoped by
--    the parent's publish state. RLS stays enabled; dropping the open policy means
--    anon is denied. Service role still serves media in admin.
drop policy if exists "media public read" on media;
