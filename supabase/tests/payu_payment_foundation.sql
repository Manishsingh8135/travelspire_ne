-- Run after 202608210001_payu_payment_foundation.sql in an isolated database.
-- The block raises on any failed invariant and rolls back its fixtures.

begin;

do $payu_security_test$
declare
  v_table text;
  v_function text;
  v_privilege text;
begin
  foreach v_table in array array[
    'tour_bookings',
    'payment_attempts',
    'payment_events'
  ] loop
    if not exists (
      select 1
      from pg_catalog.pg_class relation
      join pg_catalog.pg_namespace namespace
        on namespace.oid = relation.relnamespace
      where namespace.nspname = 'public'
        and relation.relname = v_table
        and relation.relrowsecurity
    ) then
      raise exception 'PAYMENT_RLS_NOT_ENABLED:%', v_table;
    end if;

    if exists (
      select 1
      from pg_catalog.pg_policy policy
      where policy.polrelid = format('public.%I', v_table)::regclass
    ) then
      raise exception 'PAYMENT_PUBLIC_POLICY_PRESENT:%', v_table;
    end if;

    foreach v_privilege in array array[
      'SELECT',
      'INSERT',
      'UPDATE',
      'DELETE'
    ] loop
      if has_table_privilege('anon', format('public.%I', v_table), v_privilege)
        or has_table_privilege(
          'authenticated',
          format('public.%I', v_table),
          v_privilege
        ) then
        raise exception
          'PAYMENT_BROWSER_PRIVILEGE_PRESENT:%:%',
          v_table,
          v_privilege;
      end if;

      if not has_table_privilege(
        'service_role',
        format('public.%I', v_table),
        v_privilege
      ) then
        raise exception
          'PAYMENT_SERVICE_PRIVILEGE_MISSING:%:%',
          v_table,
          v_privilege;
      end if;
    end loop;
  end loop;

  foreach v_function in array array[
    'public.issue_tour_booking(text,text,text,smallint,date,text,text,text,bigint,bigint,timestamp with time zone)',
    'public.start_payu_payment(text,text,text,text)',
    'public.record_payu_result(text,text,text,text,boolean,boolean,text,text,text,text,jsonb)'
  ] loop
    if has_function_privilege('anon', v_function, 'EXECUTE')
      or has_function_privilege('authenticated', v_function, 'EXECUTE') then
      raise exception 'PAYMENT_BROWSER_FUNCTION_EXECUTE_PRESENT:%', v_function;
    end if;

    if not has_function_privilege('service_role', v_function, 'EXECUTE') then
      raise exception 'PAYMENT_SERVICE_FUNCTION_EXECUTE_MISSING:%', v_function;
    end if;
  end loop;
end;
$payu_security_test$;

do $payu_test$
declare
  v_issued record;
  v_attempt record;
  v_pending_issued record;
  v_pending_attempt record;
  v_booking public.tour_bookings%rowtype;
  v_event_count integer;
begin
  select * into v_issued
  from public.issue_tour_booking(
    p_tour_slug => 'mechuka-dong-anini-tour-package',
    p_tour_name => 'Mechuka + Dong + Anini 12N/13D',
    p_package_tier_id => 'group-six',
    p_travellers => 6::smallint,
    p_departure_date => current_date + 90,
    p_customer_first_name => 'Test Guest',
    p_customer_email => 'payu-test@example.com',
    p_customer_phone => '+91 90000 00000',
    p_total_amount_paise => 22499400,
    p_payment_due_paise => 11249700
  );

  if v_issued.booking_reference is null
    or char_length(v_issued.payment_code) <> 32 then
    raise exception 'ISSUED_BOOKING_INVALID';
  end if;

  select * into v_attempt
  from public.start_payu_payment(
    v_issued.booking_reference,
    encode(extensions.digest(v_issued.payment_code, 'sha256'), 'hex'),
    'TSTSUCCESS0000000000001',
    'booking-and-terms-test'
  );

  if v_attempt.amount_paise <> 11249700
    or v_attempt.customer_phone <> '919000000000' then
    raise exception 'PAYMENT_SNAPSHOT_INVALID';
  end if;

  perform *
  from public.record_payu_result(
    v_attempt.payment_txnid,
    'test-success-event',
    'webhook',
    'success',
    true,
    true,
    'success',
    'captured',
    'payu-test-id',
    'bank-test-id',
    '{"status":"success"}'::jsonb
  );

  -- Exact replay must not increment the booking twice.
  perform *
  from public.record_payu_result(
    v_attempt.payment_txnid,
    'test-success-event',
    'webhook',
    'success',
    true,
    true,
    'success',
    'captured',
    'payu-test-id',
    'bank-test-id',
    '{"status":"success"}'::jsonb
  );

  select * into v_booking
  from public.tour_bookings
  where reference = v_issued.booking_reference;

  if v_booking.paid_amount_paise <> 11249700
    or v_booking.payment_due_paise <> 0
    or v_booking.status <> 'partially_paid' then
    raise exception 'SUCCESS_RECONCILIATION_INVALID';
  end if;

  select count(*) into v_event_count
  from public.payment_events
  where event_key = 'test-success-event';

  if v_event_count <> 1 then
    raise exception 'PAYMENT_EVENT_NOT_IDEMPOTENT';
  end if;

  select * into v_pending_issued
  from public.issue_tour_booking(
    p_tour_slug => 'mechuka-dong-anini-tour-package',
    p_tour_name => 'Mechuka + Dong + Anini 12N/13D',
    p_package_tier_id => 'private',
    p_travellers => 2::smallint,
    p_departure_date => current_date + 120,
    p_customer_first_name => 'Pending Guest',
    p_customer_email => 'pending-test@example.com',
    p_customer_phone => '9000000001',
    p_total_amount_paise => 13999800,
    p_payment_due_paise => 6999900
  );

  select * into v_pending_attempt
  from public.start_payu_payment(
    v_pending_issued.booking_reference,
    encode(extensions.digest(v_pending_issued.payment_code, 'sha256'), 'hex'),
    'TSTPENDING0000000000001',
    'booking-and-terms-test'
  );

  perform *
  from public.record_payu_result(
    v_pending_attempt.payment_txnid,
    'test-pending-event',
    'webhook',
    'pending',
    true,
    true,
    'pending',
    'pending',
    'payu-pending-id',
    null,
    '{"status":"pending"}'::jsonb
  );

  begin
    perform *
    from public.start_payu_payment(
      v_pending_issued.booking_reference,
      encode(extensions.digest(v_pending_issued.payment_code, 'sha256'), 'hex'),
      'TSTDUPLICATE00000000001',
      'booking-and-terms-test'
    );
    raise exception 'PENDING_PAYMENT_WAS_NOT_BLOCKED';
  exception
    when others then
      if sqlerrm <> 'PAYMENT_ALREADY_PROCESSING' then
        raise;
      end if;
  end;

  perform *
  from public.record_payu_result(
    v_pending_attempt.payment_txnid,
    'test-tampered-event',
    'return',
    'tampered',
    false,
    false,
    'success',
    'captured',
    'untrusted-id',
    null,
    '{"status":"untrusted"}'::jsonb
  );

  begin
    perform *
    from public.start_payu_payment(
      v_pending_issued.booking_reference,
      encode(extensions.digest(v_pending_issued.payment_code, 'sha256'), 'hex'),
      'TSTREVIEW00000000000001',
      'booking-and-terms-test'
    );
    raise exception 'REVIEW_PAYMENT_WAS_NOT_BLOCKED';
  exception
    when others then
      if sqlerrm <> 'PAYMENT_REVIEW_REQUIRED' then
        raise;
      end if;
  end;

  -- A later authentic success must be able to promote the reviewed attempt.
  perform *
  from public.record_payu_result(
    v_pending_attempt.payment_txnid,
    'test-late-success-event',
    'webhook',
    'success',
    true,
    true,
    'success',
    'captured',
    'payu-pending-id',
    'late-bank-id',
    '{"status":"success"}'::jsonb
  );

  select * into v_booking
  from public.tour_bookings
  where reference = v_pending_issued.booking_reference;

  if v_booking.paid_amount_paise <> 6999900
    or v_booking.status <> 'partially_paid' then
    raise exception 'LATE_SUCCESS_RECONCILIATION_INVALID';
  end if;

  begin
    perform *
    from public.start_payu_payment(
      v_pending_issued.booking_reference,
      repeat('0', 64),
      'TSTBADACCESS000000000001',
      'booking-and-terms-test'
    );
    raise exception 'INVALID_ACCESS_WAS_NOT_BLOCKED';
  exception
    when others then
      if sqlerrm <> 'BOOKING_ACCESS_DENIED' then
        raise;
      end if;
  end;
end;
$payu_test$;

rollback;
