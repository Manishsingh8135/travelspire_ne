-- Travelspire PayU payment foundation
--
-- Money is stored in paise, customer-entered prices are never accepted, and a
-- booking must be confirmed by the operator before a payment attempt can be
-- created. All tables are server-only: RLS is enabled with no public policies.

-- Supabase keeps extensions outside public. Pinning pgcrypto to that schema
-- prevents SECURITY DEFINER functions from depending on a mutable search path.
do $$
declare
  v_pgcrypto_schema text;
begin
  select namespace.nspname
  into v_pgcrypto_schema
  from pg_catalog.pg_extension extension
  join pg_catalog.pg_namespace namespace
    on namespace.oid = extension.extnamespace
  where extension.extname = 'pgcrypto'
  limit 1;

  if v_pgcrypto_schema is not null
    and v_pgcrypto_schema <> 'extensions' then
    raise exception 'PAYU_PGCRYPTO_SCHEMA_MISMATCH';
  end if;
end;
$$;

create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.tour_bookings (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  payment_access_token_hash text not null unique,
  tour_slug text not null,
  tour_name text not null,
  package_tier_id text not null,
  travellers smallint not null check (travellers between 1 and 30),
  departure_date date not null,
  customer_first_name text not null,
  customer_email text not null,
  customer_phone text not null,
  total_amount_paise bigint not null check (total_amount_paise > 0),
  payment_due_paise bigint not null check (payment_due_paise >= 0),
  paid_amount_paise bigint not null default 0 check (paid_amount_paise >= 0),
  currency text not null default 'INR' check (currency = 'INR'),
  status text not null default 'confirmed' check (
    status in (
      'awaiting_confirmation',
      'confirmed',
      'payment_pending',
      'partially_paid',
      'paid',
      'cancelled'
    )
  ),
  confirmed_at timestamptz,
  payment_link_expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tour_bookings_reference_format check (
    reference ~ '^[A-Z0-9][A-Z0-9-]{5,31}$'
  ),
  constraint tour_bookings_access_hash_format check (
    payment_access_token_hash ~ '^[a-f0-9]{64}$'
  ),
  constraint tour_bookings_customer_field_limits check (
    char_length(customer_first_name) between 2 and 60
    and char_length(customer_email) between 3 and 50
    and char_length(customer_phone) between 10 and 15
    and customer_phone ~ '^[0-9]+$'
  ),
  constraint tour_bookings_payment_totals check (
    paid_amount_paise <= total_amount_paise
    and payment_due_paise <= total_amount_paise - paid_amount_paise
  )
);

create table if not exists public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.tour_bookings(id) on delete restrict,
  provider text not null default 'payu' check (provider = 'payu'),
  txnid text not null unique,
  expected_amount_paise bigint not null check (expected_amount_paise > 0),
  currency text not null default 'INR' check (currency = 'INR'),
  product_info text not null,
  customer_first_name text not null,
  customer_email text not null,
  customer_phone text not null,
  udf1 text not null default '',
  udf2 text not null default '',
  udf3 text not null default '',
  udf4 text not null default '',
  udf5 text not null default '',
  terms_version text not null,
  terms_accepted_at timestamptz not null,
  status text not null default 'created' check (
    status in (
      'created',
      'redirected',
      'pending',
      'success',
      'failed',
      'tampered',
      'verification_required',
      'expired'
    )
  ),
  hash_valid boolean,
  provider_status text,
  provider_unmapped_status text,
  mihpayid text,
  bank_reference text,
  provider_payload jsonb not null default '{}'::jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payment_attempts_txnid_length check (
    char_length(txnid) between 8 and 25
  ),
  constraint payment_attempts_product_length check (
    char_length(product_info) between 1 and 100
  )
);

create unique index if not exists payment_attempts_one_open_per_booking
  on public.payment_attempts (booking_id)
  where status in (
    'created',
    'redirected',
    'pending',
    'tampered',
    'verification_required'
  );

create index if not exists payment_attempts_booking_created_idx
  on public.payment_attempts (booking_id, created_at desc);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.payment_attempts(id) on delete restrict,
  event_key text not null unique,
  source text not null check (source in ('return', 'webhook', 'manual')),
  outcome text not null check (
    outcome in ('success', 'failed', 'pending', 'tampered', 'verification_required')
  ),
  hash_valid boolean not null,
  provider_verified boolean not null,
  payload jsonb not null default '{}'::jsonb,
  received_at timestamptz not null default now()
);

create index if not exists payment_events_attempt_received_idx
  on public.payment_events (attempt_id, received_at desc);

create or replace function public.set_payment_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tour_bookings_set_updated_at on public.tour_bookings;
create trigger tour_bookings_set_updated_at
before update on public.tour_bookings
for each row execute function public.set_payment_updated_at();

drop trigger if exists payment_attempts_set_updated_at on public.payment_attempts;
create trigger payment_attempts_set_updated_at
before update on public.payment_attempts
for each row execute function public.set_payment_updated_at();

-- Operator utility. Run this only from a trusted server or Supabase SQL editor.
-- The raw payment code is returned once; only its SHA-256 digest is stored.
create or replace function public.issue_tour_booking(
  p_tour_slug text,
  p_tour_name text,
  p_package_tier_id text,
  p_travellers smallint,
  p_departure_date date,
  p_customer_first_name text,
  p_customer_email text,
  p_customer_phone text,
  p_total_amount_paise bigint,
  p_payment_due_paise bigint,
  p_link_expires_at timestamptz default now() + interval '72 hours'
)
returns table (booking_reference text, payment_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_reference text;
  v_payment_code text;
begin
  if p_total_amount_paise <= 0
    or p_payment_due_paise <= 0
    or p_payment_due_paise > p_total_amount_paise then
    raise exception 'INVALID_PAYMENT_TOTALS';
  end if;

  if p_travellers < 1 or p_travellers > 30 then
    raise exception 'INVALID_TRAVELLER_COUNT';
  end if;

  if char_length(trim(p_customer_first_name)) < 2
    or char_length(trim(p_customer_first_name)) > 60
    or position('@' in p_customer_email) < 2
    or char_length(trim(p_customer_email)) > 50
    or char_length(regexp_replace(p_customer_phone, '[^0-9]', '', 'g')) not between 10 and 15 then
    raise exception 'INVALID_CUSTOMER_DETAILS';
  end if;

  v_reference := 'TSBK-' || upper(substr(
    encode(extensions.gen_random_bytes(8), 'hex'),
    1,
    12
  ));
  v_payment_code := upper(encode(extensions.gen_random_bytes(16), 'hex'));

  insert into public.tour_bookings (
    reference,
    payment_access_token_hash,
    tour_slug,
    tour_name,
    package_tier_id,
    travellers,
    departure_date,
    customer_first_name,
    customer_email,
    customer_phone,
    total_amount_paise,
    payment_due_paise,
    status,
    confirmed_at,
    payment_link_expires_at
  ) values (
    v_reference,
    encode(extensions.digest(v_payment_code, 'sha256'), 'hex'),
    trim(p_tour_slug),
    trim(p_tour_name),
    trim(p_package_tier_id),
    p_travellers,
    p_departure_date,
    trim(p_customer_first_name),
    lower(trim(p_customer_email)),
    regexp_replace(p_customer_phone, '[^0-9]', '', 'g'),
    p_total_amount_paise,
    p_payment_due_paise,
    'confirmed',
    now(),
    p_link_expires_at
  );

  return query select v_reference, v_payment_code;
end;
$$;

-- Atomically validates the private payment code and snapshots every signed
-- field. A recent open attempt is reused to make checkout retries idempotent.
create or replace function public.start_payu_payment(
  p_reference text,
  p_access_token_hash text,
  p_txnid text,
  p_terms_version text
)
returns table (
  payment_attempt_id uuid,
  payment_txnid text,
  booking_reference text,
  amount_paise bigint,
  currency text,
  product_info text,
  customer_first_name text,
  customer_email text,
  customer_phone text,
  udf1 text,
  udf2 text,
  udf3 text,
  udf4 text,
  udf5 text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.tour_bookings%rowtype;
  v_attempt public.payment_attempts%rowtype;
  v_product_info text;
begin
  if char_length(p_txnid) < 8 or char_length(p_txnid) > 25 then
    raise exception 'INVALID_TRANSACTION_ID';
  end if;

  select * into v_booking
  from public.tour_bookings
  where reference = upper(trim(p_reference))
    and payment_access_token_hash = lower(trim(p_access_token_hash))
  for update;

  if not found then
    raise exception 'BOOKING_ACCESS_DENIED';
  end if;

  if v_booking.status not in ('confirmed', 'partially_paid', 'payment_pending') then
    raise exception 'BOOKING_NOT_READY';
  end if;

  if v_booking.payment_link_expires_at is not null
    and v_booking.payment_link_expires_at <= now() then
    raise exception 'BOOKING_LINK_EXPIRED';
  end if;

  if v_booking.payment_due_paise <= 0
    or v_booking.payment_due_paise > v_booking.total_amount_paise - v_booking.paid_amount_paise then
    raise exception 'NO_PAYMENT_DUE';
  end if;

  if exists (
    select 1
    from public.payment_attempts
    where booking_id = v_booking.id
      and status in ('tampered', 'verification_required')
  ) then
    raise exception 'PAYMENT_REVIEW_REQUIRED';
  end if;

  if exists (
    select 1
    from public.payment_attempts
    where booking_id = v_booking.id
      and status = 'pending'
  ) then
    raise exception 'PAYMENT_ALREADY_PROCESSING';
  end if;

  select * into v_attempt
  from public.payment_attempts
  where booking_id = v_booking.id
    and status in ('created', 'redirected')
    and created_at > now() - interval '30 minutes'
  order by created_at desc
  limit 1
  for update;

  if not found then
    update public.payment_attempts
    set status = 'expired'
    where booking_id = v_booking.id
      and status in ('created', 'redirected');

    v_product_info := left(v_booking.tour_name || ' full payment', 100);

    insert into public.payment_attempts (
      booking_id,
      txnid,
      expected_amount_paise,
      currency,
      product_info,
      customer_first_name,
      customer_email,
      customer_phone,
      udf1,
      udf2,
      terms_version,
      terms_accepted_at
    ) values (
      v_booking.id,
      p_txnid,
      v_booking.payment_due_paise,
      v_booking.currency,
      v_product_info,
      v_booking.customer_first_name,
      v_booking.customer_email,
      v_booking.customer_phone,
      v_booking.reference,
      v_booking.id::text,
      p_terms_version,
      now()
    )
    returning * into v_attempt;
  end if;

  update public.tour_bookings
  set status = 'payment_pending'
  where id = v_booking.id and status <> 'paid';

  return query
  select
    v_attempt.id,
    v_attempt.txnid,
    v_booking.reference,
    v_attempt.expected_amount_paise,
    v_attempt.currency,
    v_attempt.product_info,
    v_attempt.customer_first_name,
    v_attempt.customer_email,
    v_attempt.customer_phone,
    v_attempt.udf1,
    v_attempt.udf2,
    v_attempt.udf3,
    v_attempt.udf4,
    v_attempt.udf5;
end;
$$;

-- Records each callback once and updates booking money atomically. A later
-- verified success may safely promote an earlier pending/failed/tampered event;
-- a success is never downgraded by a replayed failure.
create or replace function public.record_payu_result(
  p_txnid text,
  p_event_key text,
  p_source text,
  p_outcome text,
  p_hash_valid boolean,
  p_provider_verified boolean,
  p_provider_status text,
  p_provider_unmapped_status text,
  p_mihpayid text,
  p_bank_reference text,
  p_payload jsonb
)
returns table (attempt_status text, booking_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_attempt public.payment_attempts%rowtype;
  v_booking public.tour_bookings%rowtype;
  v_event_rows integer;
begin
  select * into v_attempt
  from public.payment_attempts
  where txnid = p_txnid
  for update;

  if not found then
    raise exception 'PAYMENT_ATTEMPT_NOT_FOUND';
  end if;

  select * into v_booking
  from public.tour_bookings
  where id = v_attempt.booking_id
  for update;

  insert into public.payment_events (
    attempt_id,
    event_key,
    source,
    outcome,
    hash_valid,
    provider_verified,
    payload
  ) values (
    v_attempt.id,
    p_event_key,
    p_source,
    p_outcome,
    p_hash_valid,
    p_provider_verified,
    coalesce(p_payload, '{}'::jsonb)
  )
  on conflict (event_key) do nothing;

  get diagnostics v_event_rows = row_count;

  if v_event_rows = 0 then
    return query select v_attempt.status, v_booking.status;
    return;
  end if;

  if p_outcome = 'success'
    and p_hash_valid
    and p_provider_verified
    and v_attempt.status <> 'success' then
    update public.payment_attempts
    set
      status = 'success',
      hash_valid = true,
      provider_status = p_provider_status,
      provider_unmapped_status = p_provider_unmapped_status,
      mihpayid = p_mihpayid,
      bank_reference = p_bank_reference,
      provider_payload = coalesce(p_payload, '{}'::jsonb),
      verified_at = now()
    where id = v_attempt.id;

    update public.tour_bookings
    set
      paid_amount_paise = least(
        total_amount_paise,
        paid_amount_paise + v_attempt.expected_amount_paise
      ),
      payment_due_paise = greatest(
        0,
        payment_due_paise - v_attempt.expected_amount_paise
      ),
      status = case
        when paid_amount_paise + v_attempt.expected_amount_paise >= total_amount_paise
          then 'paid'
        else 'partially_paid'
      end
    where id = v_booking.id;
  elsif v_attempt.status <> 'success' then
    update public.payment_attempts
    set
      status = case p_outcome
        when 'failed' then 'failed'
        when 'pending' then 'pending'
        when 'tampered' then 'tampered'
        else 'verification_required'
      end,
      hash_valid = p_hash_valid,
      provider_status = p_provider_status,
      provider_unmapped_status = p_provider_unmapped_status,
      mihpayid = p_mihpayid,
      bank_reference = p_bank_reference,
      provider_payload = coalesce(p_payload, '{}'::jsonb),
      verified_at = case when p_provider_verified then now() else verified_at end
    where id = v_attempt.id;

    if p_outcome = 'failed' then
      update public.tour_bookings
      set status = case
        when paid_amount_paise > 0 then 'partially_paid'
        else 'confirmed'
      end
      where id = v_booking.id and status = 'payment_pending';
    end if;
  end if;

  select * into v_attempt from public.payment_attempts where id = v_attempt.id;
  select * into v_booking from public.tour_bookings where id = v_booking.id;

  return query select v_attempt.status, v_booking.status;
end;
$$;

alter table public.tour_bookings enable row level security;
alter table public.payment_attempts enable row level security;
alter table public.payment_events enable row level security;

revoke all on public.tour_bookings from anon, authenticated;
revoke all on public.payment_attempts from anon, authenticated;
revoke all on public.payment_events from anon, authenticated;
revoke all on function public.issue_tour_booking(
  text, text, text, smallint, date, text, text, text, bigint, bigint, timestamptz
) from public, anon, authenticated;
revoke all on function public.start_payu_payment(text, text, text, text)
  from public, anon, authenticated;
revoke all on function public.record_payu_result(
  text, text, text, text, boolean, boolean, text, text, text, text, jsonb
) from public, anon, authenticated;

grant all on public.tour_bookings to service_role;
grant all on public.payment_attempts to service_role;
grant all on public.payment_events to service_role;
grant execute on function public.issue_tour_booking(
  text, text, text, smallint, date, text, text, text, bigint, bigint, timestamptz
) to service_role;
grant execute on function public.start_payu_payment(text, text, text, text)
  to service_role;
grant execute on function public.record_payu_result(
  text, text, text, text, boolean, boolean, text, text, text, text, jsonb
) to service_role;

comment on table public.tour_bookings is
  'Operator-confirmed tour bookings eligible for private payment access.';
comment on table public.payment_attempts is
  'Immutable PayU request snapshots plus the latest verified provider state.';
comment on table public.payment_events is
  'Append-only, deduplicated PayU return and webhook receipts.';
