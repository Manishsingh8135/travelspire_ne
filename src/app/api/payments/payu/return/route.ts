import { NextResponse } from "next/server";
import { processPayUNotification } from "@/lib/payments/payu/notification";
import { sendVerifiedPaymentEmails } from "@/lib/payments/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function statusRedirect(
  request: Request,
  transactionId: string,
  result: string,
) {
  const baseUrl = process.env.PAYU_PUBLIC_BASE_URL?.trim() || request.url;
  const url = new URL("/pay/status", baseUrl);
  if (transactionId) url.searchParams.set("txnid", transactionId);
  url.searchParams.set("result", result);

  return NextResponse.redirect(url, {
    status: 303,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return statusRedirect(request, "", "review");
  }

  const transactionId = String(formData.get("txnid") ?? "");

  try {
    const result = await processPayUNotification(formData, "return");
    if (result.outcome === "success") {
      try {
        await sendVerifiedPaymentEmails(result.transactionId);
      } catch (error) {
        console.error("Verified payment receipt email was not sent", error);
      }
    }
    const publicResult =
      result.outcome === "success"
        ? "received"
        : result.outcome === "failed"
          ? "failed"
          : "processing";
    return statusRedirect(request, result.transactionId, publicResult);
  } catch {
    return statusRedirect(request, transactionId, "review");
  }
}
