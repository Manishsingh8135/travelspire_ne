export type HostedCheckoutResponse = {
  action?: string;
  method?: string;
  transactionId?: string;
  bookingReference?: string;
  fields?: Record<string, string>;
  error?: string;
};

const PAYU_ENDPOINTS = new Set([
  "https://test.payu.in/_payment",
  "https://secure.payu.in/_payment",
]);

export function postToPayU(payload: HostedCheckoutResponse) {
  if (
    !payload.action ||
    payload.method !== "POST" ||
    !payload.fields ||
    !PAYU_ENDPOINTS.has(payload.action)
  ) {
    throw new Error("The secure checkout response was not valid.");
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = payload.action;
  form.style.display = "none";
  form.setAttribute("aria-hidden", "true");

  Object.entries(payload.fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}
