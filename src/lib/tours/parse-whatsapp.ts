import type { ItineraryDay, Overnight, OvernightType, DayTag } from "./itinerary";
import type { Pricing, PricingMode, GroupTier } from "./pricing";
import { parseDurationNotation } from "./pricing";

/**
 * Parser for the founder's canonical WhatsApp itineraries — the richest source
 * of truth we have (richer than v1). Forgiving by design: real data is messy
 * (duplicate day numbers, mixed bullets, invisible unicode). Anything it cannot
 * classify lands in `unparsed` — NOTHING is silently dropped (08-blueprint/05 §6).
 *
 * Format it understands (from the real Anini 5N/6D + Menchukha 12N/13D texts):
 *   *Anini 5N/6D*                     → title + nights/days (plain lines work too)
 *   *Day 1*: Dibrugarh to Anini       → day header (also `Day 1 :- Dib - Aalo`)
 *   *Trip Time*: Morning 05:00-06:30  → tripTime (verbatim)
 *   Dibrugarh to Aalo (250 km, 6 hours approx) - …  → route + distance + driveTime
 *   • Deccan falls / * Buddha park / - Drive to…    → sightseeing bullets
 *   • overnight stay at Chigu camp    → overnight { name, type }
 *   *Group Trip* / ₹18,999/- per pax (Group of 6)   → pricing tiers
 *   *Private Trip couple/twin* / 51,999/- per pax   → private mode
 *   *Inclusion :-* / *Exclusion* / *Facilities*     → the three lists
 */

export interface ParsedTour {
  title: string | null;
  nights: number | null;
  days: ItineraryDay[];
  pricing: Pricing | null;
  inclusions: string[];
  exclusions: string[];
  facilities: string[];
  /** Lines the parser could not classify — surfaced for human review, never dropped. */
  unparsed: string[];
}

// ── line helpers ─────────────────────────────────────────────────────────────

/** Strip invisible unicode (word-joiner, zero-width, BOM) and nbsp; trim. */
function clean(line: string): string {
  return line.replace(/[⁠​‌‍﻿]/g, "").replace(/ /g, " ").trim();
}

const DAY_HEADER = /^\*?\s*Day\s*(\d+)\s*\*?\s*(?::-?|-)?\s*(.*)$/i;
/** `*Section*` header — the whole line wrapped in asterisks (vs `* bullet item`). */
const SECTION_WRAP = /^\*([^*]+)\*\s*:?-?\s*$/;
const BULLET = /^(?:[•▪‣]\s*|[-*]\s+)(.+)$/;
const TRIP_TIME = /^\*?\s*Trip\s*Time\s*\*?\s*:?\s*(.*)$/i;
const SIGHTSEEING_LABEL = /^Sightseeing\s*[:\-]*\s*(.*)$/i;
const OVERNIGHT = /(?:over\s*night\s*(?:stay)?|night\s*stay|last\s*night)\s*(?:at|in)\s+(.+)$/i;
const PRICE_LINE = /(?:₹\s*)?([\d,]{3,})\s*\/?\s*-?\s*per\s*pax(?:\s*\(\s*Group\s*of\s*(\d+)\s*\))?/i;
const ROUTE_PARENS = /^(.+?)\s+(?:to|-)\s+(.+?)\s*\(\s*(\d+)\s*km\s*,?\s*([^)]*)\)\s*-?\s*/i;
const BARE_TIME = /^\d{1,2}[:.]\d{2}\s*(?:am|pm)?\s*$/i;
const THANK_YOU = /^thank\s*you!?\.?$/i;

export function parseRouteFromTitle(title: string): { from: string; to: string } | null {
  // " to " always splits; " - " splits only with surrounding spaces (protects hyphenated names).
  const to = /^(.{2,}?)\s+to\s+(.{2,})$/i.exec(title);
  if (to) return { from: to[1]!.trim(), to: to[2]!.trim() };
  const dash = /^(.{2,}?)\s+-\s+(.{2,})$/.exec(title);
  if (dash) return { from: dash[1]!.trim(), to: dash[2]!.trim() };
  return null;
}

function overnightType(text: string): OvernightType | null {
  if (/homestay/i.test(text)) return "homestay";
  if (/\bcamp\b/i.test(text)) return "camp";
  if (/\btents?\b/i.test(text)) return "tent";
  if (/hotel/i.test(text)) return "hotel";
  if (/guest\s*house/i.test(text)) return "guesthouse";
  return null;
}

export function parseOvernight(text: string): Overnight | null {
  const m = OVERNIGHT.exec(text);
  if (!m) return null;
  // "Anini Homestay with Bonfire evening." → name "Anini", type homestay.
  let name = m[1]!.replace(/\bwith\b.*$/i, "").trim().replace(/[.。]+$/, "");
  const type = overnightType(name) ?? overnightType(text);
  const stripped = name.replace(/\s*(homestay|hotel|guest\s*house|tents?)\s*$/i, "").trim();
  if (stripped) name = stripped;
  return { name, type, raw: text };
}

function dayTags(day: ItineraryDay, extraText: string[]): DayTag[] {
  const hay = [day.title, day.summary ?? "", ...extraText].join(" \n ");
  const tags = new Set<DayTag>();
  if (/\btrek/i.test(hay)) tags.add("trek");
  if (/\brest\s*day/i.test(hay)) tags.add("rest");
  if (/sunrise/i.test(hay)) tags.add("sunrise");
  if (/last\s+village|\bborder\b/i.test(hay)) tags.add("border");
  if (/\bmarket\b/i.test(hay)) tags.add("market");
  if ((day.distanceKm ?? 0) >= 150) tags.add("long-drive");
  return [...tags];
}

type SectionKind =
  | "preamble"
  | "day"
  | "pricing-group"
  | "pricing-private"
  | "inclusions"
  | "exclusions"
  | "facilities"
  | "ignore";

function classifySection(header: string): SectionKind | null {
  const h = header.toLowerCase();
  if (/group\s*(trip|package)/.test(h)) return "pricing-group";
  if (/private/.test(h)) return "pricing-private";
  if (/inclusion/.test(h)) return "inclusions";
  if (/exclusion/.test(h)) return "exclusions";
  if (/facilit/.test(h)) return "facilities";
  if (/thank\s*you|travelspire/.test(h)) return "ignore";
  return null;
}

// ── the parser ───────────────────────────────────────────────────────────────

type DayInProgress = ItineraryDay & { _extra: string[] };

export function parseWhatsAppItinerary(text: string): ParsedTour {
  const lines = text.split(/\r?\n/).map(clean);

  const out: ParsedTour = {
    title: null,
    nights: null,
    days: [],
    pricing: null,
    inclusions: [],
    exclusions: [],
    facilities: [],
    unparsed: [],
  };

  const groupTiers: GroupTier[] = [];
  const privateModes: PricingMode[] = [];
  let section: SectionKind = "preamble";
  let currentDay: DayInProgress | null = null;

  const finishDay = () => {
    if (!currentDay) return;
    const { _extra: extra, ...day } = currentDay;
    day.tags = dayTags(day, extra);
    out.days.push(day);
    currentDay = null;
  };

  for (const line of lines) {
    if (!line) continue;

    // Day header — starts (or restarts) a day, only before the money sections.
    const dh = DAY_HEADER.exec(line);
    if (dh && (section === "preamble" || section === "day")) {
      finishDay();
      const title = (dh[2] ?? "").trim();
      currentDay = {
        dayNo: out.days.length + 1, // renumber: real data has duplicate day numbers
        title,
        route: parseRouteFromTitle(title),
        sightseeing: [],
        tags: [],
        _extra: [],
      };
      section = "day";
      continue;
    }

    // Plain sign-off ends parsing-relevant content.
    if (THANK_YOU.test(line)) {
      finishDay();
      section = "ignore";
      continue;
    }

    // Section headers (*Group Trip*, *Inclusion :-*, *Thankyou*, …).
    const wrap = SECTION_WRAP.exec(line);
    if (wrap) {
      const kind = classifySection(wrap[1]!);
      if (kind) {
        finishDay();
        section = kind;
        continue;
      }
      if (section === "preamble" && !out.title) {
        out.title = wrap[1]!.trim();
        out.nights = parseDurationNotation(out.title)?.nights ?? null;
        continue;
      }
      if (section !== "day") {
        // Decorative wrapped line inside a list/pricing section ("*~ Join us…*",
        // "*Package price* :") — never a list item; surface for review.
        out.unparsed.push(line);
        continue;
      }
    }

    // Pricing sections — ₹ optional (the real private line omits it).
    if (section === "pricing-group" || section === "pricing-private") {
      const p = PRICE_LINE.exec(line);
      if (p) {
        const pricePax = Number(p[1]!.replace(/,/g, ""));
        if (section === "pricing-group") {
          groupTiers.push({ groupSize: p[2] ? Number(p[2]) : 0, pricePax });
        } else {
          privateModes.push({ mode: "private", label: "Private (couple/twin)", pricePax });
        }
      } else {
        out.unparsed.push(line);
      }
      continue;
    }

    // The three list sections.
    if (section === "inclusions" || section === "exclusions" || section === "facilities") {
      const b = BULLET.exec(line);
      const item = (b ? b[1]! : line).trim();
      if (item) out[section].push(item);
      continue;
    }

    if (section === "ignore") continue;

    // ── inside a day ──
    if (currentDay) {
      const day: DayInProgress = currentDay;

      const tt = TRIP_TIME.exec(line);
      if (tt) {
        day.tripTime = tt[1]!.trim() || day.tripTime;
        continue;
      }
      // Bare-time continuation ("*Trip Time*: starting at morning" ↵ "09:00 am").
      if (day.tripTime != null && BARE_TIME.test(line)) {
        day.tripTime = `${day.tripTime} ${line}`.trim();
        continue;
      }

      // Route + distance prose: "Dibrugarh to Aalo (250 km, 6 hours approx) - Start early…"
      const rp = ROUTE_PARENS.exec(line);
      if (rp) {
        day.route = { from: rp[1]!.trim(), to: rp[2]!.trim() };
        day.distanceKm = Number(rp[3]);
        day.driveTime = rp[4]!.trim() || null;
        const tail = line.slice(rp[0].length).trim(); // keep the rest — nothing dropped
        if (tail) day.summary = day.summary ? `${day.summary} ${tail}` : tail;
        continue;
      }

      const sl = SIGHTSEEING_LABEL.exec(line);
      if (sl) {
        const inline = sl[1]!.trim();
        if (inline) day.sightseeing.push({ name: inline });
        continue;
      }

      const b = BULLET.exec(line);
      if (b) {
        let content = b[1]!.trim();
        const on = parseOvernight(content);
        if (on) {
          day.overnight = on;
          continue;
        }
        // "* Sightseeing : Mayodia pass" — label inside a bullet.
        const isl = SIGHTSEEING_LABEL.exec(content);
        if (isl) content = isl[1]!.trim();
        if (content) {
          day.sightseeing.push({ name: content.replace(/[.。]+$/, "") });
          day._extra.push(content);
        }
        continue;
      }

      // Prose inside a day: an unbulleted overnight line, else summary.
      const on = parseOvernight(line);
      if (on) {
        day.overnight = on;
        continue;
      }
      day.summary = day.summary ? `${day.summary} ${line}` : line;
      day._extra.push(line);
      continue;
    }

    // Preamble: a plain first line is the title ("MENCHUKHA + DONG + ANINI (12N/13D)").
    if (section === "preamble" && !out.title) {
      out.title = line;
      out.nights = parseDurationNotation(line)?.nights ?? null;
      continue;
    }
    out.unparsed.push(line);
  }
  finishDay();

  const modes: PricingMode[] = [];
  if (groupTiers.length) modes.push({ mode: "group", label: "Group trip", tiers: groupTiers });
  modes.push(...privateModes);
  if (modes.length) out.pricing = { currency: "INR", per: "pax", modes };

  return out;
}
