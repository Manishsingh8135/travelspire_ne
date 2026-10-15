# PayU payments

PayU Hosted Checkout for full package payments. Updated October 2026.

**Live status:** production runs with `PAYU_ENVIRONMENT=production` (the booking
page shows no sandbox banner). Real money moves only when
`PAYU_LIVE_ENABLED=true` is also set in Vercel. Check both before relying on
either assumption.

## Two ways to pay

### Self-serve: `/book/[slug]` (the "Book and pay" buttons)

1. The customer picks a package tier, traveller count and departure date.
2. `POST /api/bookings/checkout`:
   - validates the input
   - rate-limits per IP
   - checks the date against the product's departure window
     (`src/lib/bookings/catalog.ts`)
   - checks the PayU configuration **before** writing anything
3. The price comes from the static tour data on the server (unit price ×
   travellers; fixed group sizes for the expeditions). The browser never sends
   a price.
4. `issue_tour_booking` and `start_payu_payment` snapshot the booking and the
   signed attempt, and the browser is sent to PayU.

Off-sale products, such as a festival whose dates have passed, redirect from
`/book` back to their tour page, and the API rejects them.

### Operator-issued: `/pay`

For custom quotes:

1. Travelspire confirms the departure, group, stays, vehicle, inclusions and
   final price.
2. An operator issues a booking reference and a private payment code (see §4).
3. The customer enters both values at `/pay`.

### Both flows, after checkout

- PayU POSTs the customer return and the server-to-server webhook. Both are
  reverse-hash checked and compared with the immutable request snapshot.
- The Verify Payment API must agree before a result updates the booking.
- Repeated or out-of-order events are deduplicated in the database.
- On verified success, receipts go to the customer and the team through Resend
  (`src/lib/email/resend.ts`).

## 1. Apply the database migration

Apply, in order:

- `supabase/migrations/202608210001_payu_payment_foundation.sql`
- `supabase/migrations/202608210002_full_payment_product_info.sql` (labels
  attempts as full payment instead of advance)

The migration installs or reuses `pgcrypto` in Supabase's `extensions` schema
and schema-qualifies every cryptographic call. If an existing project has
`pgcrypto` in a different schema, the migration stops with
`PAYU_PGCRYPTO_SCHEMA_MISMATCH` before creating payment tables; inspect and
resolve that extension layout instead of weakening the function search path.

It creates:

- `tour_bookings`: confirmed commercial/customer snapshot and payment access
- `payment_attempts`: immutable signed PayU request plus latest verified state
- `payment_events`: append-only, deduplicated return/webhook receipts
- `issue_tour_booking(...)`: trusted operator utility
- `start_payu_payment(...)`: atomic access validation and attempt creation
- `record_payu_result(...)`: idempotent payment/booking reconciliation

RLS is enabled with no browser policies. Only the Supabase secret/service-role
key can read or mutate this payment data.

## 2. Configure server environment

Copy the payment variables from `.env.example` into the deployment environment.

Required for test mode:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `PAYU_ENVIRONMENT=test`
- `PAYU_MERCHANT_KEY`
- `PAYU_MERCHANT_SALT`
- `PAYU_PUBLIC_BASE_URL=https://public-test-origin.example`
- `PAYU_LIVE_ENABLED=false`

No PayU credential uses a `NEXT_PUBLIC_` prefix. The salt must never be sent to
the browser, placed in a callback URL, committed, logged or shared in a support
message.

PayU must reach the callback origin over public HTTPS. `localhost` is not enough;
use a trusted HTTPS tunnel for local gateway testing or use a preview deployment.

## 3. Configure the PayU webhook

In the PayU dashboard, register this payment webhook:

`https://YOUR-PUBLIC-ORIGIN/api/payments/payu/webhook`

Enable at least the successful and failed payment events. The webhook sends a
form-encoded POST. The integration validates its reverse hash, verifies the
transaction against PayU, and only then updates the booking.

The customer return URL is generated automatically as:

`https://YOUR-PUBLIC-ORIGIN/api/payments/payu/return`

## 4. Issue a confirmed booking

The first operational version deliberately issues payment access from a trusted
SQL session. An admin UI can call the same server-only function later.

Example for six travellers on the Mechuka + Dong + Anini tour:

```sql
select *
from public.issue_tour_booking(
  p_tour_slug => 'mechuka-dong-anini-tour-package',
  p_tour_name => 'Mechuka + Dong + Anini 12N/13D',
  p_package_tier_id => 'group-six',
  p_travellers => 6::smallint,
  p_departure_date => date '2026-11-10',
  p_customer_first_name => 'Guest first name',
  p_customer_email => 'guest@example.com',
  p_customer_phone => '+91 90000 00000',
  p_total_amount_paise => 22499400,
  p_payment_due_paise => 22499400
);
```

This example snapshots ₹224,994 as the full amount due; we take complete
package payments. Always calculate from the operator-confirmed quote, including
any approved adjustment, instead of trusting values copied from the public page.

The function returns `booking_reference` and `payment_code`. The raw payment
code is shown only once; the database stores its SHA-256 digest. Send both to the
customer through a verified conversation. Never send a generic reusable code.

## 5. Test-mode acceptance checklist

- Run `pnpm test:payments`.
- Apply the migration to an isolated database and run
  `supabase/tests/payu_payment_foundation.sql`; it rolls back its fixtures after
  checking replay idempotency, pending-payment blocking and late success.
- Run `pnpm build` with no PayU secrets embedded in source or client bundles.
- Open `/pay` and confirm invalid/missing access is rejected without revealing
  whether the reference or code was wrong.
- Issue one test booking and complete a PayU test transaction.
- Confirm one `payment_attempts` row and deduplicated `payment_events` rows.
- Confirm a browser return alone does not create a success: request snapshot,
  reverse hash, amount/transaction ID and Verify Payment API must all agree.
- Replay the same webhook and confirm `paid_amount_paise` does not increase.
- Test failed and pending transactions; the status page must say not to pay
  twice while a result is uncertain.
- Confirm expired access codes cannot create a new attempt.
- Confirm no card number, CVV, UPI PIN, PayU salt or full gateway payload is
  stored or logged.

## Production gates

Do not set `PAYU_ENVIRONMENT=production` or `PAYU_LIVE_ENABLED=true` until all of
these are complete:

- PayU merchant onboarding/KYC and production key/salt are active.
- The booking and terms pages (updated 21 Aug 2026 for full payment) and the
  privacy policy (still dated Nov 2024) are reviewed for refund timelines,
  taxes, chargebacks and payment data.
- The operator has a documented process for issuing, expiring and revoking
  payment access, sending receipts, collecting the balance and reconciling daily.
- Refund and dispute events have an operational owner. This foundation records
  successful/failed payments; it does not yet execute refunds or automate
  dispute handling.
- Production webhook delivery is verified from PayU server logs to the database.
- A small real transaction is completed and independently checked in the PayU
  dashboard, Travelspire database and bank settlement report.
- Failure, cancellation, webhook retry, delayed success and Verify API outage
  cases are tested in the production deployment.
- Monitoring alerts on `tampered` and `verification_required` attempts exist.

The explicit `PAYU_LIVE_ENABLED=true` gate is intentional. Production mode stays
blocked even if someone accidentally adds production credentials.

## Known gaps (October 2026 audit)

- **No reconciliation job.** Attempts left `pending` or `verification_required`
  rely on the webhook or a manual SQL check. There is no cron and no admin view.
- **Late success after expiry.** An attempt expires after 30 minutes and a
  retry opens a new one. If PayU later reports success on the expired attempt,
  it is still credited, so a customer who paid twice needs a manual refund.
- **Forged callbacks.** A junk POST that carries a real `txnid` marks the
  attempt `tampered`, which blocks that booking until an operator clears it.
  The ID has about 80 bits of randomness, so the risk is low.
- **Duplicate receipts.** Return and webhook both send receipts; only Resend's
  idempotency key (about 24 hours) prevents duplicates. Nothing in the
  database records that a receipt went out.
- **No availability.** The self-serve flow checks the date window but not
  capacity or blackout dates.
- **Refunds and disputes** are handled outside the system.

## Official integration references

- Hosted Checkout: https://docs.payu.in/docs/prebuilt-checkout-page-integration
- Request/response hashing: https://docs.payu.in/docs/hashing-request-and-response
- Verify Payment API: https://docs.payu.in/reference/verify_payment_api
- Webhook payloads: https://docs.payu.in/docs/webhook-events-and-sample-payloads
