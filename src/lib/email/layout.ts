import { absoluteUrl } from "@/lib/bookings/after-payment";
import { escapeHtml } from "./resend";

// Building blocks for every email we send: the receipt, the team's PAID
// note, and the trip reminders. They share one frame so they read as one
// voice.

export function formatMoney(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amountPaise / 100);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${date}T00:00:00+05:30`));
}

/* Email clients ignore stylesheets and most layout CSS, so everything below is
   tables with inline styles. Colours are the site's light tokens: fg #0B0D10,
   muted #4B5260, subtle #656C78, line #E6E8EC, subtle canvas #F6F7F9, brand
   #0F6B4B. */
export const font = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif";

export function emailShell(preheader: string, content: string, forCustomer = true) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head><body style="margin:0;padding:0;background:#F6F7F9;color:#0B0D10;${font}"><div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F7F9"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px"><tr><td style="padding:0 4px 18px;font-size:12px;font-weight:600;letter-spacing:2.4px;text-transform:uppercase;color:#0B0D10">Travelspire <span style="color:#656C78;font-weight:500">Northeast</span></td></tr><tr><td style="background:#FFFFFF;border:1px solid #E6E8EC;border-radius:16px;padding:32px 28px">${content}</td></tr><tr><td style="padding:18px 4px 0;font-size:12px;line-height:1.7;color:#656C78">Travelspire Northeast · Dibrugarh, Assam · <a href="${absoluteUrl("/booking-policy")}" style="color:#656C78">Booking policy</a> · <a href="${absoluteUrl("/terms-and-conditions")}" style="color:#656C78">Terms</a>${forCustomer ? "<br>We will never ask for your card details, UPI PIN or OTP." : ""}</td></tr></table></td></tr></table></body></html>`;
}

export function detailRows(details: ReadonlyArray<readonly [string, string | number]>) {
  return details
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 0;border-top:1px solid #E6E8EC;color:#4B5260;font-size:14px">${escapeHtml(label)}</td><td style="padding:10px 0;border-top:1px solid #E6E8EC;text-align:right;font-weight:600;font-size:14px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
}

export function button(href: string, label: string, primary = true) {
  const style = primary
    ? "background:#0F6B4B;color:#FFFFFF;border:1px solid #0F6B4B"
    : "background:#FFFFFF;color:#0B0D10;border:1px solid #D2D6DD";
  return `<a href="${escapeHtml(href)}" style="display:inline-block;${style};border-radius:10px;padding:12px 20px;font-size:15px;font-weight:600;text-decoration:none;margin:0 8px 8px 0">${escapeHtml(label)}</a>`;
}

export function heading(text: string) {
  return `<h2 style="margin:32px 0 14px;font-size:17px;line-height:1.3;color:#0B0D10">${escapeHtml(text)}</h2>`;
}
