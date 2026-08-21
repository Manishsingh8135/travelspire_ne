import assert from "node:assert/strict";
import {
  createPaymentAccessTokenHash,
  createPayURequestHash,
  createPayUResponseHash,
  createPayUTransactionId,
  formatPayUAmount,
  isValidPayUResponseHash,
  parsePayUAmount,
} from "../src/lib/payments/payu/crypto.ts";

const requestFields = {
  key: "merchantKey",
  txnid: "TSABC123",
  amount: "112497.00",
  productinfo: "Mechuka Dong Anini advance",
  firstname: "Manish",
  email: "guest@example.com",
  udf1: "u1",
  udf2: "u2",
  udf3: "u3",
  udf4: "u4",
  udf5: "u5",
};

assert.equal(
  createPayURequestHash(requestFields, "merchantSalt"),
  "ffbe5c047b891648a978263532ab1b444fcc6a7354a64c7c0f5a422a1e6c1cc049503c5fb90de2ef51bab7aa4eaaeab08380cf422d084eeed9d6723fc845ad56",
  "request hash sequence must match PayU Hosted Checkout",
);

const responseFields = { ...requestFields, status: "success" };
const responseHash = createPayUResponseHash(responseFields, "merchantSalt");
assert.equal(
  responseHash,
  "a4876f4e1b00499ac3bfae9d0464ea5ec6056ea30561a9e58f34206c30f6a8508f637557ae93b7ac2ac46c8652aba2002c479b9b3e8b6cb779e0acedef9a5c0f",
  "regular reverse hash sequence must match PayU",
);
assert.equal(
  isValidPayUResponseHash(
    { ...responseFields, hash: responseHash.toUpperCase() },
    "merchantSalt",
  ),
  true,
  "response hash validation should be case-insensitive",
);

assert.equal(
  createPayUResponseHash(
    { ...responseFields, additional_charges: "25.00" },
    "merchantSalt",
  ),
  "e451b3696360dfb3bc8c92adda1f46b2e437e253c3ad0bff6deca73f406ac2b3e12ed294c43084a0228d2f2666d93df119b76602a8e5ef7dae91b4f24daf5847",
  "additional charges must prefix the reverse hash",
);

assert.equal(formatPayUAmount(11_249_700), "112497.00");
assert.equal(parsePayUAmount("112497.00"), 11_249_700);
assert.equal(parsePayUAmount("112497.5"), 11_249_750);
assert.equal(parsePayUAmount("112497.001"), null);
assert.equal(
  createPaymentAccessTokenHash("abcdef0123456789abcdef0123456789"),
  "3a6926f607353577a7979fa9b6182999ca9105aa5c61a24a6dcb108c54d22e3e",
);

for (let index = 0; index < 100; index += 1) {
  const transactionId = createPayUTransactionId();
  assert.match(transactionId, /^TS[A-Z0-9]{23}$/);
  assert.equal(transactionId.length, 25);
}

console.log("PayU foundation checks passed");
