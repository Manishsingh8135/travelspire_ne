import "server-only";

import { getPayUConfig } from "@/lib/payments/payu/config";
import {
  createPayURequestHash,
  formatPayUAmount,
} from "@/lib/payments/payu/crypto";
import type { StartedPayUAttempt } from "@/lib/payments/payu/store";

export function createHostedCheckoutPayload(attempt: StartedPayUAttempt) {
  const config = getPayUConfig();
  const callbackUrl = new URL(
    "/api/payments/payu/return",
    config.publicBaseUrl,
  ).toString();
  const amount = formatPayUAmount(attempt.amount_paise);
  const hashFields = {
    key: config.merchantKey,
    txnid: attempt.payment_txnid,
    amount,
    productinfo: attempt.product_info,
    firstname: attempt.customer_first_name,
    email: attempt.customer_email,
    udf1: attempt.udf1,
    udf2: attempt.udf2,
    udf3: attempt.udf3,
    udf4: attempt.udf4,
    udf5: attempt.udf5,
  };

  return {
    action: config.paymentEndpoint,
    method: "POST" as const,
    environment: config.environment,
    transactionId: attempt.payment_txnid,
    bookingReference: attempt.booking_reference,
    fields: {
      ...hashFields,
      phone: attempt.customer_phone,
      surl: callbackUrl,
      furl: callbackUrl,
      curl: callbackUrl,
      hash: createPayURequestHash(hashFields, config.merchantSalt),
    },
  };
}
