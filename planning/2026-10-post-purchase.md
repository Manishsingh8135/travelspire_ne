# Post-purchase experience — nobody pays and then waits in the dark

Founder direction, 2026-10-18: after paying, a customer must always know what
happens next, how to reach a person, and where to see their trip. The team must
be able to see and run every booking without digging through email.

## Phases

1. **Receipt + status page** — done, PR #11. Contacts, three next steps, one-tap
   WhatsApp for the team. Copy lives in `src/lib/bookings/after-payment.ts`.
2. **My Trip page, traveller details, admin** — this document.
3. **Scheduled messages** — missing-details reminder, T-14 itinerary, T-2 driver
   details, post-trip review. Vercel Cron + a sent log so nothing sends twice.
4. **WhatsApp automation** — Meta Cloud API, direct (no reseller), once the
   business is verified. Same events as phase 3.

## Phase 2 decisions

- **No customer accounts.** A private link per booking:
  `/trip/<reference>?k=<token>`. The token is an HMAC of the reference, so it
  never needs storing and every email can carry it. A sign-in by email code can
  come later if repeat customers want one place for all trips.
- **No migration.** Trip data lives in `tour_bookings.metadata.trip` (jsonb,
  already there, untouched by the payment functions). Writes are
  compare-and-swap on `updated_at`, so a customer submitting details and the
  team changing a stage can't overwrite each other.
- **Secret:** `BOOKING_LINK_SECRET` (server env). Purpose-labelled sub-keys sign
  trip links, admin sign-in links and admin sessions. Without it, trip links
  and admin sign-in are switched off and nothing else breaks.
- **Admin sign-in:** an email link to addresses on `ADMIN_EMAILS` (defaults to
  the team inboxes that already get PAID emails). 15-minute link, 7-day
  httpOnly session cookie. No passwords to leak.
- **Traveller details collected on the web:** full name as on ID, age, gender,
  ID type, plus pickup/arrival note, food needs, emergency contact. **ID numbers
  and ID photos are not collected on the web** — they still go over WhatsApp
  until there is private storage with automatic deletion (DPDP Act).

## Stages (team-facing, shown to the customer as a progress line)

`paid` → `details_received` (automatic when the form is submitted) →
`permits_done` → `driver_assigned` → `completed`. `on_hold` for anything that
needs a human. Money states stay in `tour_bookings.status`; these never touch
payment.

## Pages

- `/trip/[reference]` — progress, traveller form (locked once permits are
  done), driver and pickup card, receipt, itinerary link, contacts. noindex.
- `/admin` — bookings by trip date: upcoming, unpaid checkouts (follow up on
  WhatsApp), past.
- `/admin/bookings/[reference]` — contact buttons, My Trip link, traveller
  details, stage, driver and pickup, internal notes.

## Log

- 2026-10-18 — plan written; phase 2 built: `/trip/[reference]`, traveller form
  (`/api/trip/details`), admin sign-in by email link, `/admin` (upcoming, didn't
  pay, past), `/admin/bookings/[reference]` (stage, driver with optional customer
  email, notes). Tested locally against a stand-in database with headless
  Chrome. `BOOKING_LINK_SECRET` added to Vercel production. Admin list falls
  back to `PAYMENT_NOTIFICATION_EMAILS`.
- 2026-10-18 — phase 2 merged (PR #12) and verified live against the real
  database. Phase 3 built: `src/lib/bookings/trip-messages.ts` + `/api/cron/daily`
  (Vercel Cron, 09:00 IST, `CRON_SECRET`). Customer emails: details reminder
  (+2 days), final reminder (≤7 days out, 3+ days after the first), "N days to
  go" (2–7 days out: status, packing, driver), thank-you (1–7 days after the
  trip; marks it completed). Sent keys live in `metadata.trip.sent`, claimed
  before sending. Team morning summary: leaving in 3 days, missing details,
  didn't pay in 24 h, emails sent. `?dry=1` previews a run.
