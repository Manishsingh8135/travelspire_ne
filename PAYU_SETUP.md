# PayU payment foundation

This branch contains a production-shaped PayU Hosted Checkout foundation. It is
**not live and cannot collect money until the database migration, test merchant
credentials, a public HTTPS callback origin, and the PayU dashboard webhook are
configured**.

## Customer flow

1. Travelspire confirms the departure date, group size, room plan, vehicle,
   inclusions and final price.
2. An operator issues a booking reference and a private payment code.
3. The customer opens `/pay`, accepts the booking terms and enters both values.
4. The server loads the confirmed amount from the database, creates a PayU
   transaction ID, signs the request with the server-only salt and sends the
   browser to PayU Hosted Checkout.
5. PayU POSTs the customer return and the server-to-server webhook. Both are
   reverse-hash checked and compared with the original immutable snapshot.
6. The Verify Payment API is called before a result can update the booking.
   Repeated or out-of-order events are deduplicated in the database.

The browser never sends a price. A valid public tour tier is not enough to pay:
the booking must already be operator-confirmed and have a private access code.

## 1. Apply the database migration

Apply:

`supabase/migrations/202608210001_payu_payment_foundation.sql`

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
  p_payment_due_paise => 11249700
);
```

This example snapshots ₹224,994 total and ₹112,497 as the 50% advance. Always
calculate from the operator-confirmed quote, including any approved adjustment,
instead of trusting values copied from the public page.

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
- The November 2024 booking, cancellation, privacy and payment wording is
  reviewed for the current business, refund timelines, taxes and chargebacks.
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

## Official integration references

- Hosted Checkout: https://docs.payu.in/docs/prebuilt-checkout-page-integration
- Request/response hashing: https://docs.payu.in/docs/hashing-request-and-response
- Verify Payment API: https://docs.payu.in/reference/verify_payment_api
- Webhook payloads: https://docs.payu.in/docs/webhook-events-and-sample-payloads
