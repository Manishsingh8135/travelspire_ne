import "server-only";

import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export type PayURequestHashFields = {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
};

export type PayUResponseHashFields = PayURequestHashFields & {
  status: string;
  hash: string;
  additional_charges?: string;
  splitInfo?: string;
};

function sha512(value: string) {
  return createHash("sha512").update(value, "utf8").digest("hex");
}

function safeHashMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received.toLowerCase(), "utf8");
  const expectedBuffer = Buffer.from(expected.toLowerCase(), "utf8");

  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export function formatPayUAmount(amountPaise: number) {
  if (!Number.isSafeInteger(amountPaise) || amountPaise <= 0) {
    throw new Error("Payment amount must be a positive integer in paise");
  }

  return `${Math.floor(amountPaise / 100)}.${String(amountPaise % 100).padStart(2, "0")}`;
}

export function parsePayUAmount(amount: string) {
  if (!/^\d+(?:\.\d{1,2})?$/.test(amount)) return null;

  const [rupees, decimal = ""] = amount.split(".");
  const paise = Number(rupees) * 100 + Number(decimal.padEnd(2, "0"));
  return Number.isSafeInteger(paise) ? paise : null;
}

export function createPayURequestHash(
  fields: PayURequestHashFields,
  merchantSalt: string,
) {
  const sequence = [
    fields.key,
    fields.txnid,
    fields.amount,
    fields.productinfo,
    fields.firstname,
    fields.email,
    fields.udf1 ?? "",
    fields.udf2 ?? "",
    fields.udf3 ?? "",
    fields.udf4 ?? "",
    fields.udf5 ?? "",
    "",
    "",
    "",
    "",
    "",
    merchantSalt,
  ];

  return sha512(sequence.join("|"));
}

export function createPayUResponseHash(
  fields: Omit<PayUResponseHashFields, "hash">,
  merchantSalt: string,
) {
  const sequence = [
    merchantSalt,
    fields.status,
    ...(fields.splitInfo ? [fields.splitInfo] : []),
    "",
    "",
    "",
    "",
    "",
    fields.udf5 ?? "",
    fields.udf4 ?? "",
    fields.udf3 ?? "",
    fields.udf2 ?? "",
    fields.udf1 ?? "",
    fields.email,
    fields.firstname,
    fields.productinfo,
    fields.amount,
    fields.txnid,
    fields.key,
  ];

  const reverseSequence = sequence.join("|");
  const value = fields.additional_charges
    ? `${fields.additional_charges}|${reverseSequence}`
    : reverseSequence;

  return sha512(value);
}

export function isValidPayUResponseHash(
  fields: PayUResponseHashFields,
  merchantSalt: string,
) {
  const expected = createPayUResponseHash(fields, merchantSalt);
  return safeHashMatch(fields.hash, expected);
}

export function createPayUCommandHash(
  key: string,
  command: string,
  value: string,
  merchantSalt: string,
) {
  return sha512(`${key}|${command}|${value}|${merchantSalt}`);
}

export function createPaymentAccessTokenHash(paymentCode: string) {
  return createHash("sha256")
    .update(paymentCode.trim().toUpperCase(), "utf8")
    .digest("hex");
}

export function createPayUTransactionId() {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-7);
  const entropy = BigInt(`0x${randomBytes(10).toString("hex")}`)
    .toString(36)
    .toUpperCase()
    .padStart(16, "0");
  return `TS${timestamp}${entropy}`;
}

export function createPaymentEventKey(parts: string[]) {
  return createHash("sha256").update(parts.join("|"), "utf8").digest("hex");
}
