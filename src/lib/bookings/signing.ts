import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "@/lib/site";

// Signed links without a database: a My Trip link is an HMAC of the booking
// reference, and admin sign-in links and sessions are signed "email|expiry"
// pairs. One server secret, BOOKING_LINK_SECRET, is split into a sub-key per
// purpose so a token minted for one job is useless for another.
//
// Without the secret every function here reports "unavailable" and callers
// leave the feature out; nothing else on the site depends on it.

type Purpose = "trip" | "admin-login" | "admin-session";

function secret() {
  const value = process.env.BOOKING_LINK_SECRET?.trim();
  return value && value.length >= 32 ? value : null;
}

export function signingAvailable() {
  return secret() !== null;
}

function sign(purpose: Purpose, value: string) {
  const root = secret();
  if (!root) return null;
  const key = createHmac("sha256", root).update(`travelspire:${purpose}`).digest();
  return createHmac("sha256", key).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/* ── My Trip links ─────────────────────────────────────────────── */

const normalizeReference = (reference: string) => reference.trim().toUpperCase();

export function tripToken(reference: string) {
  return sign("trip", normalizeReference(reference))?.slice(0, 24) ?? null;
}

export function verifyTripToken(reference: string, token: string) {
  const expected = tripToken(reference);
  return expected !== null && safeEqual(expected, token);
}

/** Absolute My Trip URL, or null when signing is switched off. */
export function tripUrl(reference: string) {
  const token = tripToken(reference);
  if (!token) return null;
  const url = new URL(`/trip/${encodeURIComponent(normalizeReference(reference))}`, SITE_URL);
  url.searchParams.set("k", token);
  return url.toString();
}

/* ── Admin sign-in links and sessions ──────────────────────────── */

export function signEmailToken(purpose: "admin-login" | "admin-session", email: string, ttlSeconds: number) {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = Buffer.from(`${email.toLowerCase()}|${expires}`).toString("base64url");
  const signature = sign(purpose, payload);
  return signature ? `${payload}.${signature}` : null;
}

export function verifyEmailToken(purpose: "admin-login" | "admin-session", token: string) {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(purpose, payload);
  if (!expected || !safeEqual(expected, signature)) return null;

  const [email, expires] = Buffer.from(payload, "base64url").toString("utf8").split("|");
  if (!email || !expires || Number(expires) < Date.now() / 1000) return null;
  return email;
}
