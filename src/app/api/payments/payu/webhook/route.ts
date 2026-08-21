import { NextResponse } from "next/server";
import {
  PayUNotificationError,
  processPayUNotification,
} from "@/lib/payments/payu/notification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new NextResponse("Invalid form payload", { status: 400 });
  }

  try {
    await processPayUNotification(formData, "webhook");
    return new NextResponse("OK", {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    if (error instanceof PayUNotificationError) {
      return new NextResponse("Invalid payment notification", { status: 400 });
    }

    // A 503 asks PayU to retry a valid event when our database or verification
    // provider is temporarily unavailable.
    return new NextResponse("Payment processing unavailable", { status: 503 });
  }
}

export async function GET() {
  return NextResponse.json(
    { status: "ready", accepts: "PayU form-encoded POST only" },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
