# `src/features/<domain>` — feature modules

Vertical slices. Each feature colocates what it needs:

```
features/<domain>/
  actions.ts     Server Actions (mutations) — Zod-validated, return Result<T>
  queries.ts     read helpers (call src/server data-access)
  schemas.ts     Zod schemas (the single contract: form → action → db)
  hooks.ts       client hooks
  components/    composed UI specific to this feature (primitives live in src/components/ui)
```

Conventions: see `docs-new/03-frontend/01-frontend-architecture.md` and
`docs-new/01-architecture/04-api-design.md`. Domains map to the data model:
`places`, `stays`, `rides`, `experiences`, `tours`, `trips`, `bookings`, …
