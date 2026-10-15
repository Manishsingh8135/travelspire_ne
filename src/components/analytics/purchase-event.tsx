"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Reports a verified payment to GA4 once per transaction. The status page can
// be refreshed or revisited, so the transaction ID is remembered for the
// session to keep revenue from being counted twice.
export function PurchaseEvent({
  transactionId,
  value,
  itemId,
  itemName,
}: {
  transactionId: string;
  value: number;
  itemId: string;
  itemName: string;
}) {
  useEffect(() => {
    const key = `ga-purchase-${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage blocked: fall through and report once for this render.
    }
    trackEvent("purchase", {
      transaction_id: transactionId,
      currency: "INR",
      value,
      items: [{ item_id: itemId, item_name: itemName }],
    });
  }, [transactionId, value, itemId, itemName]);

  return null;
}
