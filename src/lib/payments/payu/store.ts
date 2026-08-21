import "server-only";

export type PayUAttemptSnapshot = {
  id: string;
  booking_id: string;
  txnid: string;
  expected_amount_paise: number;
  currency: "INR";
  product_info: string;
  customer_first_name: string;
  customer_email: string;
  customer_phone: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  status: string;
};

export type StartedPayUAttempt = {
  payment_attempt_id: string;
  payment_txnid: string;
  booking_reference: string;
  amount_paise: number;
  currency: "INR";
  product_info: string;
  customer_first_name: string;
  customer_email: string;
  customer_phone: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
};

export type PaymentReceipt = {
  txnid: string;
  status: string;
  expected_amount_paise: number;
  currency: "INR";
  provider_status: string | null;
  provider_unmapped_status: string | null;
  updated_at: string;
  tour_bookings:
    | {
        reference: string;
        tour_slug: string;
        tour_name: string;
        package_tier_id: string;
        travellers: number;
        departure_date: string;
        customer_first_name: string;
        customer_email: string;
        customer_phone: string;
        total_amount_paise: number;
        paid_amount_paise: number;
        payment_due_paise: number;
        status: string;
      }
    | Array<{
        reference: string;
        tour_slug: string;
        tour_name: string;
        package_tier_id: string;
        travellers: number;
        departure_date: string;
        customer_first_name: string;
        customer_email: string;
        customer_phone: string;
        total_amount_paise: number;
        paid_amount_paise: number;
        payment_due_paise: number;
        status: string;
      }>;
};

export type IssuedTourBooking = {
  booking_reference: string;
  payment_code: string;
};

export class PaymentStoreError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PaymentStoreError";
    this.code = code;
  }
}

type SupabaseErrorBody = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

function getDatabaseConfig() {
  const baseUrl = (
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  )?.trim();
  const secretKey = (
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  )?.trim();

  if (!baseUrl || !secretKey) {
    throw new PaymentStoreError(
      "PAYMENT_DATABASE_NOT_CONFIGURED",
      "Payment database credentials are not configured",
    );
  }

  return { baseUrl: baseUrl.replace(/\/$/, ""), secretKey };
}

async function paymentDatabaseFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { baseUrl, secretKey } = getDatabaseConfig();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: secretKey,
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    let errorBody: SupabaseErrorBody = {};
    try {
      errorBody = (await response.json()) as SupabaseErrorBody;
    } catch {
      // Keep the public exception generic when PostgREST does not return JSON.
    }

    const message =
      errorBody.message || `Payment database returned ${response.status}`;
    const domainCode = /^[A-Z][A-Z0-9_]+$/.test(message)
      ? message
      : errorBody.code || "PAYMENT_DATABASE_ERROR";

    throw new PaymentStoreError(domainCode, message);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

async function callPaymentRpc<T>(name: string, body: Record<string, unknown>) {
  return paymentDatabaseFetch<T>(`/rest/v1/rpc/${name}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function issueTourBooking(input: {
  tourSlug: string;
  tourName: string;
  packageTierId: string;
  travellers: number;
  departureDate: string;
  customerFirstName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmountPaise: number;
}) {
  const rows = await callPaymentRpc<IssuedTourBooking[]>("issue_tour_booking", {
    p_tour_slug: input.tourSlug,
    p_tour_name: input.tourName,
    p_package_tier_id: input.packageTierId,
    p_travellers: input.travellers,
    p_departure_date: input.departureDate,
    p_customer_first_name: input.customerFirstName,
    p_customer_email: input.customerEmail,
    p_customer_phone: input.customerPhone,
    p_total_amount_paise: input.totalAmountPaise,
    p_payment_due_paise: input.totalAmountPaise,
  });

  const booking = rows[0];
  if (!booking) {
    throw new PaymentStoreError(
      "BOOKING_NOT_CREATED",
      "The booking was not created",
    );
  }

  return booking;
}

export async function startPayUPayment(input: {
  reference: string;
  accessTokenHash: string;
  transactionId: string;
  termsVersion: string;
}) {
  const rows = await callPaymentRpc<StartedPayUAttempt[]>(
    "start_payu_payment",
    {
      p_reference: input.reference,
      p_access_token_hash: input.accessTokenHash,
      p_txnid: input.transactionId,
      p_terms_version: input.termsVersion,
    },
  );

  const attempt = rows[0];
  if (!attempt) {
    throw new PaymentStoreError(
      "PAYMENT_ATTEMPT_NOT_CREATED",
      "The payment attempt was not created",
    );
  }

  return attempt;
}

export async function getPayUAttempt(transactionId: string) {
  const params = new URLSearchParams({
    txnid: `eq.${transactionId}`,
    select:
      "id,booking_id,txnid,expected_amount_paise,currency,product_info,customer_first_name,customer_email,customer_phone,udf1,udf2,udf3,udf4,udf5,status",
    limit: "1",
  });

  const rows = await paymentDatabaseFetch<PayUAttemptSnapshot[]>(
    `/rest/v1/payment_attempts?${params.toString()}`,
  );
  return rows[0] ?? null;
}

export async function recordPayUResult(input: {
  transactionId: string;
  eventKey: string;
  source: "return" | "webhook" | "manual";
  outcome:
    | "success"
    | "failed"
    | "pending"
    | "tampered"
    | "verification_required";
  hashValid: boolean;
  providerVerified: boolean;
  providerStatus: string | null;
  providerUnmappedStatus: string | null;
  mihpayid: string | null;
  bankReference: string | null;
  payload: Record<string, string | null>;
}) {
  const rows = await callPaymentRpc<
    Array<{ attempt_status: string; booking_status: string }>
  >("record_payu_result", {
    p_txnid: input.transactionId,
    p_event_key: input.eventKey,
    p_source: input.source,
    p_outcome: input.outcome,
    p_hash_valid: input.hashValid,
    p_provider_verified: input.providerVerified,
    p_provider_status: input.providerStatus,
    p_provider_unmapped_status: input.providerUnmappedStatus,
    p_mihpayid: input.mihpayid,
    p_bank_reference: input.bankReference,
    p_payload: input.payload,
  });

  return rows[0] ?? null;
}

export async function getPaymentReceipt(transactionId: string) {
  const params = new URLSearchParams({
    txnid: `eq.${transactionId}`,
    select:
      "txnid,status,expected_amount_paise,currency,provider_status,provider_unmapped_status,updated_at,tour_bookings!inner(reference,tour_slug,tour_name,package_tier_id,travellers,departure_date,customer_first_name,customer_email,customer_phone,total_amount_paise,paid_amount_paise,payment_due_paise,status)",
    limit: "1",
  });

  const rows = await paymentDatabaseFetch<PaymentReceipt[]>(
    `/rest/v1/payment_attempts?${params.toString()}`,
  );
  return rows[0] ?? null;
}
