-- The launch checkout collects the complete package amount. Keep the PayU
-- product label accurate on projects that already applied the foundation
-- migration when it still used the word "advance".
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

revoke all on function public.issue_tour_booking(
  text, text, text, smallint, date, text, text, text, bigint, bigint, timestamptz
) from public, anon, authenticated;
grant execute on function public.issue_tour_booking(
  text, text, text, smallint, date, text, text, text, bigint, bigint, timestamptz
) to service_role;

create or replace function public.normalize_payu_product_info()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.product_info like '% advance' then
    new.product_info := regexp_replace(
      new.product_info,
      ' advance$',
      ' full payment'
    );
  end if;
  return new;
end;
$$;

drop trigger if exists payment_attempts_normalize_product_info
  on public.payment_attempts;
create trigger payment_attempts_normalize_product_info
before insert on public.payment_attempts
for each row execute function public.normalize_payu_product_info();

revoke all on function public.normalize_payu_product_info()
  from public, anon, authenticated;
grant execute on function public.normalize_payu_product_info()
  to service_role;
