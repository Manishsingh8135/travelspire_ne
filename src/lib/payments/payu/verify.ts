import "server-only";

import type { PayUConfig } from "@/lib/payments/payu/config";
import { createPayUCommandHash } from "@/lib/payments/payu/crypto";

export type PayUVerificationDetail = {
  txnid?: string;
  mihpayid?: string;
  amt?: string | number;
  transaction_amount?: string | number;
  status?: string;
  unmappedstatus?: string;
  bank_ref_num?: string;
  bank_ref_no?: string;
  mode?: string;
  error_code?: string;
  error_Message?: string;
};

type PayUVerificationResponse = {
  status?: number | string;
  msg?: string;
  transaction_details?: Record<string, PayUVerificationDetail>;
};

export class PayUVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PayUVerificationError";
  }
}

export async function verifyPayUTransaction(
  transactionId: string,
  config: PayUConfig,
) {
  const command = "verify_payment";
  const body = new URLSearchParams({
    key: config.merchantKey,
    command,
    var1: transactionId,
    hash: createPayUCommandHash(
      config.merchantKey,
      command,
      transactionId,
      config.merchantSalt,
    ),
  });

  let response: Response;
  try {
    response = await fetch(config.verificationEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    throw new PayUVerificationError(
      "PayU verification request did not complete",
    );
  }

  if (!response.ok) {
    throw new PayUVerificationError(
      `PayU verification returned HTTP ${response.status}`,
    );
  }

  let result: PayUVerificationResponse;
  try {
    result = (await response.json()) as PayUVerificationResponse;
  } catch {
    throw new PayUVerificationError("PayU verification returned invalid JSON");
  }

  const detail = result.transaction_details?.[transactionId];
  if (
    String(result.status) !== "1" ||
    !detail ||
    detail.status?.toLowerCase() === "not found"
  ) {
    throw new PayUVerificationError("PayU could not verify this transaction");
  }

  return detail;
}
