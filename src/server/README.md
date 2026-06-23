# `src/server` — server-only data access

The data-access layer (DAL). Reads/writes the database, talks to Supabase with
elevated context, composes queries. **Never imported by client components.**

Rules (see `docs-new/02-backend/01-backend-principles.md`):

- Layering is one-directional: `components → features → server/db`. Client code
  must not import anything here.
- Functions are pure-ish and typed; every external input has already crossed a
  Zod boundary in the calling Server Action.
- No React, no JSX here — just data.
- Mark modules with `import "server-only";` as they are added.
