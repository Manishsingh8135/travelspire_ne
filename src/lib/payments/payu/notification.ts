import "server-only";

import { getPayUConfig } from "@/lib/payments/payu/config";
import {
  createPaymentEventKey,
  isValidPayUResponseHash,
  parsePayUAmount,
  type PayUResponseHashFields,
} from "@/lib/payments/payu/crypto";
import {
  getPayUAttempt,
  recordPayUResult,
  type PayUAttemptSnapshot,
} from "@/lib/payments/payu/store";
import {
  PayUVerificationError,
  verifyPayUTransaction,
  type PayUVerificationDetail,
} from "@/lib/payments/payu/verify";

export type PayUNotificationSource = "return" | "webhook";

export class PayUNotificationError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PayUNotificationError";
    this.code = code;
  }
}

function formDataToRecord(formData: FormData) {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !(key in values)) {
      values[key] = value;
    }
  }

  return values;
}

function requiredValue(values: Record<string, string>, key: string) {
  const value = values[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new PayUNotificationError(
      "INVALID_PAYU_NOTIFICATION",
      `PayU notification is missing ${key}`,
    );
  }
  return value;
}

function sanitizeProviderPayload(values: Record<string, string>) {
  const allowedKeys = [
    "txnid",
    "status",
    "unmappedstatus",
    "amount",
    "productinfo",
    "udf1",
    "udf2",
    "mihpayid",
    "mode",
    "bankcode",
    "bank_ref_num",
    "bank_ref_no",
    "error",
    "error_Message",
    "addedon",
    "additional_charges",
  ] as const;

  return Object.fromEntries(
    allowedKeys.map((key) => [key, values[key] ?? null]),
  );
}

function snapshotMatchesNotification(
  values: Record<string, string>,
  attempt: PayUAttemptSnapshot,
  merchantKey: string,
) {
  const amountPaise = parsePayUAmount(values.amount ?? "");

  return (
    values.key === merchantKey &&
    amountPaise === attempt.expected_amount_paise &&
    values.txnid === attempt.txnid &&
    values.productinfo === attempt.product_info &&
    values.firstname === attempt.customer_first_name &&
    values.email === attempt.customer_email &&
    (values.udf1 ?? "") === attempt.udf1 &&
    (values.udf2 ?? "") === attempt.udf2 &&
    (values.udf3 ?? "") === attempt.udf3 &&
    (values.udf4 ?? "") === attempt.udf4 &&
    (values.udf5 ?? "") === attempt.udf5
  );
}

function verificationMatchesAttempt(
  detail: PayUVerificationDetail,
  attempt: PayUAttemptSnapshot,
) {
  const verifiedAmount = String(detail.transaction_amount ?? detail.amt ?? "");

  return (
    detail.txnid === attempt.txnid &&
    parsePayUAmount(verifiedAmount) === attempt.expected_amount_paise
  );
}

function mapVerificationOutcome(detail: PayUVerificationDetail) {
  const status = detail.status?.toLowerCase() ?? "";
  const unmappedStatus = detail.unmappedstatus?.toLowerCase() ?? "";

  if (
    status === "success" &&
    ["captured", "success"].includes(unmappedStatus)
  ) {
    return "success" as const;
  }

  if (
    status === "failure" ||
    ["failed", "bounced", "dropped", "usercancelled"].includes(unmappedStatus)
  ) {
    return "failed" as const;
  }

  return "pending" as const;
}

function notificationHashFields(
  values: Record<string, string>,
): PayUResponseHashFields {
  return {
    key: requiredValue(values, "key"),
    txnid: requiredValue(values, "txnid"),
    amount: requiredValue(values, "amount"),
    productinfo: requiredValue(values, "productinfo"),
    firstname: values.firstname ?? "",
    email: requiredValue(values, "email"),
    udf1: values.udf1 ?? "",
    udf2: values.udf2 ?? "",
    udf3: values.udf3 ?? "",
    udf4: values.udf4 ?? "",
    udf5: values.udf5 ?? "",
    status: requiredValue(values, "status"),
    hash: requiredValue(values, "hash"),
    additional_charges:
      values.additional_charges || values.additionalCharges || undefined,
    splitInfo: values.splitInfo || undefined,
  };
}

export async function processPayUNotification(
  formData: FormData,
  source: PayUNotificationSource,
) {
  const values = formDataToRecord(formData);
  const transactionId = requiredValue(values, "txnid");
  const config = getPayUConfig();
  const attempt = await getPayUAttempt(transactionId);

  if (!attempt) {
    throw new PayUNotificationError(
      "PAYMENT_ATTEMPT_NOT_FOUND",
      "No matching payment attempt exists",
    );
  }

  const sanitizedPayload = sanitizeProviderPayload(values);
  const hashFields = notificationHashFields(values);
  const hashValid = isValidPayUResponseHash(hashFields, config.merchantSalt);
  const snapshotMatches = snapshotMatchesNotification(
    values,
    attempt,
    config.merchantKey,
  );
  const baseEventParts = [
    source,
    transactionId,
    values.hash ?? "missing-hash",
    values.status ?? "missing-status",
    values.mihpayid ?? "missing-mihpayid",
  ];

  if (!hashValid || !snapshotMatches) {
    await recordPayUResult({
      transactionId,
      eventKey: createPaymentEventKey([source, transactionId, "tampered"]),
      source,
      outcome: "tampered",
      hashValid,
      providerVerified: false,
      providerStatus: values.status ?? null,
      providerUnmappedStatus: values.unmappedstatus ?? null,
      mihpayid: values.mihpayid ?? null,
      bankReference: values.bank_ref_num || values.bank_ref_no || null,
      payload: sanitizedPayload,
    });

    throw new PayUNotificationError(
      "PAYU_RESPONSE_MISMATCH",
      "PayU response integrity validation failed",
    );
  }

  let detail: PayUVerificationDetail;
  try {
    detail = await verifyPayUTransaction(transactionId, config);
  } catch (error) {
    if (!(error instanceof PayUVerificationError)) throw error;

    const result = await recordPayUResult({
      transactionId,
      eventKey: createPaymentEventKey([
        ...baseEventParts,
        "verification-required",
      ]),
      source,
      outcome: "verification_required",
      hashValid: true,
      providerVerified: false,
      providerStatus: values.status ?? null,
      providerUnmappedStatus: values.unmappedstatus ?? null,
      mihpayid: values.mihpayid ?? null,
      bankReference: values.bank_ref_num || values.bank_ref_no || null,
      payload: sanitizedPayload,
    });

    return {
      transactionId,
      outcome: "verification_required" as const,
      storedStatus: result?.attempt_status ?? "verification_required",
    };
  }

  if (!verificationMatchesAttempt(detail, attempt)) {
    const result = await recordPayUResult({
      transactionId,
      eventKey: createPaymentEventKey([...baseEventParts, "verify-mismatch"]),
      source,
      outcome: "verification_required",
      hashValid: true,
      providerVerified: false,
      providerStatus: detail.status ?? null,
      providerUnmappedStatus: detail.unmappedstatus ?? null,
      mihpayid: detail.mihpayid ?? values.mihpayid ?? null,
      bankReference:
        detail.bank_ref_num ||
        detail.bank_ref_no ||
        values.bank_ref_num ||
        values.bank_ref_no ||
        null,
      payload: sanitizedPayload,
    });

    return {
      transactionId,
      outcome: "verification_required" as const,
      storedStatus: result?.attempt_status ?? "verification_required",
    };
  }

  const outcome = mapVerificationOutcome(detail);
  const result = await recordPayUResult({
    transactionId,
    eventKey: createPaymentEventKey([...baseEventParts, outcome]),
    source,
    outcome,
    hashValid: true,
    providerVerified: true,
    providerStatus: detail.status ?? null,
    providerUnmappedStatus: detail.unmappedstatus ?? null,
    mihpayid: detail.mihpayid ?? values.mihpayid ?? null,
    bankReference:
      detail.bank_ref_num ||
      detail.bank_ref_no ||
      values.bank_ref_num ||
      values.bank_ref_no ||
      null,
    payload: sanitizedPayload,
  });

  return {
    transactionId,
    outcome,
    storedStatus: result?.attempt_status ?? outcome,
  };
}
