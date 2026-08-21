import "server-only";

export type PayUEnvironment = "test" | "production";

export type PayUConfig = {
  environment: PayUEnvironment;
  merchantKey: string;
  merchantSalt: string;
  publicBaseUrl: string;
  paymentEndpoint: string;
  verificationEndpoint: string;
};

export class PayUConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PayUConfigurationError";
  }
}

function requiredServerValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new PayUConfigurationError(`${name} is not configured`);
  }
  return value;
}

function readEnvironment(): PayUEnvironment {
  const value = process.env.PAYU_ENVIRONMENT?.trim().toLowerCase() || "test";
  if (value !== "test" && value !== "production") {
    throw new PayUConfigurationError(
      "PAYU_ENVIRONMENT must be either test or production",
    );
  }
  return value;
}

function readPublicBaseUrl() {
  const rawUrl = requiredServerValue("PAYU_PUBLIC_BASE_URL");

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new PayUConfigurationError(
      "PAYU_PUBLIC_BASE_URL must be a valid URL",
    );
  }

  if (url.protocol !== "https:") {
    throw new PayUConfigurationError(
      "PAYU_PUBLIC_BASE_URL must use public HTTPS for PayU callbacks",
    );
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new PayUConfigurationError(
      "PAYU_PUBLIC_BASE_URL cannot contain credentials, a query, or a hash",
    );
  }

  return url.origin;
}

export function getPayUConfig(): PayUConfig {
  const environment = readEnvironment();

  if (
    environment === "production" &&
    process.env.PAYU_LIVE_ENABLED?.trim().toLowerCase() !== "true"
  ) {
    throw new PayUConfigurationError(
      "Production PayU checkout is locked until PAYU_LIVE_ENABLED=true",
    );
  }

  return {
    environment,
    merchantKey: requiredServerValue("PAYU_MERCHANT_KEY"),
    merchantSalt: requiredServerValue("PAYU_MERCHANT_SALT"),
    publicBaseUrl: readPublicBaseUrl(),
    paymentEndpoint:
      environment === "production"
        ? "https://secure.payu.in/_payment"
        : "https://test.payu.in/_payment",
    verificationEndpoint:
      environment === "production"
        ? "https://info.payu.in/merchant/postservice.php?form=2"
        : "https://test.payu.in/merchant/postservice?form=2",
  };
}
