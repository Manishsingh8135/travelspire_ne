# Q4 2026 — Evergreen pivot + Arunachal SEO

Approved by the founder on 2026-10-15. Lives in git on purpose: the earlier
`docs-new/` planning set was kept out of the repo and was lost.

## Where we are

- **`main` is the live site** (www.travelspirene.com, Vercel). Content is static
  TypeScript under `src/data/`. Supabase is used only for PayU payments.
- **v2** (`feat/public-experience`, pushed to origin 2026-10-15) is the paused
  Supabase + admin rebuild. We resume porting it in **January 2027**. Its
  database already holds research-verified Arunachal content (state hub;
  Tawang, Mechuka, Ziro, Anini, Dong field entries; corrected permit facts),
  which this plan reuses.
- Anini Winter Fest (19–20 Sep) and Ziro Festival (24–27 Sep) are over. The site
  must now sell Travelspire itself: Arunachal tours and places (evergreen),
  then Hornbill (1–10 Dec) and Orange Festival (13–15 Dec) as the winter season.

## Strategy

- **Positioning:** the Dibrugarh-based local team that runs these roads. We
  compete with aggregators (TravelTriangle, Holidify, Thrillophilia) and a few
  specialists (Muddie Trails, Eka). We beat them by being specific, correct and
  current.
- **Hub and spoke:** `/arunachal-pradesh` hub → `/places/*` guides →
  `/tours/*` packages, with `/permits/*` as the trust and traffic magnet.
  Hornbill gets its own cluster.
- **One intent per URL.** No two of our pages target the same query.
- **Never change a live URL.** Retitle and enrich instead. Past-event pages
  become recaps that funnel visitors into evergreen pages.

## Keyword → page map

| Intent | Page |
|---|---|
| Travelspire, Northeast India tours | `/` |
| Arunachal Pradesh tour packages / travel guide | `/arunachal-pradesh` (new) |
| Tawang guide · best time · Sela Tunnel · Bum La | `/places/tawang` (new) |
| Tawang tour package from Guwahati/Tezpur | `/tours/tawang-expedition` |
| Mechuka guide · how to reach | `/places/mechuka` (new) |
| Mechuka tour package from Dibrugarh | `/tours/mechuka-expedition` |
| Ziro Valley guide | `/places/ziro` (new) |
| Dong Valley sunrise | `/places/dong` (new) |
| Dong Valley tour | `/tours/dong-valley-expedition` |
| Anini / Dibang guides | `/places/anini`, `/places/dibang-valley` (exist) |
| Anini tour packages, Pomo trek | the Anini duration family (see below) |
| Arunachal ILP fee / apply | `/permits/arunachal-pradesh-ilp` |
| Hornbill Festival 2026 · dates · Kisama · ILP | `/hornbill-festival` (new, evergreen URL) |
| Hornbill festival package / camping | `/tours/hornbill-festival-2026` |
| Nagaland ILP | `/permits/nagaland-ilp` |

**Tour duration families.** Many circuits come in 3/4/5/6/7-day versions that
share places, e.g. the Anini 3D, the Pomo trek 4D and the Pomo grassland
expedition 6D. Do not merge or redirect them. Each page states its length in its
title and H1, and the family links to each other under "Choose by days". The
future trip planner becomes the real interface for this (see bottom).

## Phase 0 — live fixes (now)

1. Retire the past festivals:
   - AWF: set `status: "past"`; the page's built-in recap mode takes over.
   - Ziro 2026 page: recap mode.
   - Remove both from the homepage, nav, footer and WhatsApp templates.
2. Booking catalog: give every product an on-sale window. Past festival products
   close automatically on the booking page and in the API.
3. Homepage and listings revalidate on a timer, so date logic runs at request
   time and no longer freezes at build. Extend the season calendar into 2027.
4. The contact form actually delivers (Resend email). Today it only logs.
5. Arunachal ILP facts, from the official eILP portal: ₹300 for up to 3 days,
   ₹500 for 4–14 days, 14-day tourist cap; PAP royalty USD 30.
6. Technical SEO:
   - Canonical host: the apex domain is primary (Vercel setting, founder).
   - robots: drop the `/_next/` and `*.json` blocks; add the image sitemap.
   - AI crawlers: allow the search/assistant bots, block the training-only ones.
   - Verification code via env var.
   - `noindex` `/design`; add legal-page metadata.
   - Dedupe the breadcrumb JSON-LD.
   - Real `lastModified` dates in the sitemap.
7. Analytics: GA4 via env var, plus events for WhatsApp click, booking start and
   payment success.
8. Payments:
   - Check the PayU config before any database write.
   - Rate-limit the booking and contact endpoints.
   - Refresh `PAYU_SETUP.md`.

## Phase 1 — Hornbill (target live ~2026-10-28)

- Research → author → verify:
  - dates and edition
  - Kisama logistics from Dimapur and Kohima
  - Nagaland ILP
  - entry fees
  - Dzukou trek
  - night carnival
  - stays
- Build the `/hornbill-festival` hub. Enrich `/tours/hornbill-festival-2026`.
- Positioning: the local ground operator (camping from ₹1,799, Hornbill + Dzukou
  ₹7,299, join at Dimapur or Kohima) against ₹50–75k metro packages.
- Orange Festival / OFAM: a lighter version of the same treatment.
- Nav "Festivals" points to real pages.

## Phase 2 — evergreen Arunachal core (weeks 2–5)

1. A reusable data-driven **PlaceGuide** template:
   - hero and field note
   - vitals
   - how to reach (legs)
   - season band and permit note
   - tours that go there
   - FAQs and related places
2. The `/arunachal-pradesh` hub, from the v2 hub content.
3. Place guides: Tawang, Mechuka, Ziro, Dong. Anini and Dong drafts need the
   founder's ground-truth pass first.
4. Every Arunachal tour page gets:
   - a search-shaped title and H1 ("Tawang Tour Package from Guwahati — 5D/4N")
   - a unique overview
   - per-tour FAQs
   - TouristTrip + Offer schema
   - related links
5. Internal link mesh with breadcrumbs. Nav gets "Arunachal" and "Festivals" menus.

## Phase 3 — compounding (Nov onward)

- 1–2 long-tail guides a week:
  - how to reach Tawang
  - Bum La permit
  - Mechuka from Dibrugarh
  - Dong sunrise by month
  - Arunachal in 7 days
  - Tawang in winter
- Google Business Profile (Dibrugarh) and a reviews push; on-site testimonials
  are from 2024.
- Backlinks: the AWF organisers (official travel partner), state tourism
  listings, bloggers, press.

## Measures

- Google Search Console: impressions and clicks per target query.
- Indexed pages; WhatsApp clicks; booking starts; paid bookings.
- Expect 4–12 weeks before new pages rank. Hornbill 2026 is a partial win;
  evergreen URLs compound.

## Later — Trip Planner (flagship, after this plan)

Airbnb-style date-range + group-size + season picker that returns either our
predefined itinerary for that length or a customised one, including
off-internet places. Plan it deeply before building; the v2 itinerary and
pricing-matrix models are its backbone.

## Log

- 2026-10-15 — Plan approved. v2 pushed to origin. Phase 0 started on
  `feat/evergreen-seo-pivot`.
- 2026-10-15 — Phase 0 code complete:
  - festivals retired by date (AWF/Ziro recaps; booking windows; listings)
  - homepage revalidates every 6 hours; season calendar runs into 2027
  - contact form delivers through Resend
  - Arunachal ILP facts corrected to ₹300/₹500, 14 days
  - robots/sitemap/metadata pass; GA4 + events
  - checkout checks PayU config before writing; per-IP rate limits
  - **Founder actions still open:**
    - Vercel: make the apex domain primary, with www redirecting to it.
    - Vercel: confirm the `PAYU_LIVE_ENABLED` value.
    - Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
    - Search Console (DNS Domain property) and Bing; submit both sitemaps.
    - Confirm `RESEND_API_KEY` is set in production (contact form uses it).
- 2026-10-15 — Apex is primary in Vercel (www and testing 308 to it).
  Search Console Domain property verified by DNS (Hostinger); both sitemaps
  submitted and read. Image sitemap fixed to one entry per page (8 pages,
  123 images). Still open: `mail.` host redirect, GA4 ID, PayU/Resend env
  check, Bing import, merge PR #7.
- 2026-10-15 — PR #7 merged and live (merge a7ec720). Vercel had retired
  Node 20, so every deploy failed until `engines.node` was pinned to 24.x.
  Production smoke-tested: redirects, recaps, robots, both sitemaps, ILP page,
  contact validation.
- Not yet verified (outside Phase 0):
  - Manipur, Mizoram and Sikkim permit fees. Nagaland is verified in Phase 1.
  - The privacy policy is still dated Nov 2024 and doesn't mention PayU.
- 2026-10-16 — Evergreen redesign merged and live (PR #8). Phase 1 started on
  `feat/hornbill-and-tour-years`:
  - `/hornbill-festival` hub: dated "confirmed vs awaited" board, crowd
    calendar from 2025 daily footfall, getting there, ILP and tickets, stays,
    Dzükou rules, packages, 13-question FAQ. Festival + FAQPage + WebPage
    JSON-LD; in the nav, sitemap and image sitemap. Facts sourced 16 Oct
    (27th edition confirmed 1–10 Dec; ILP ₹200; 2025 ticket ₹150).
  - Hornbill product page: own search title/description, links to the hub.
  - Years removed from non-festival tour and guide titles; festivals keep them.
  - Fact fixes: Mizoram ILP (≈₹300–350, 7 days), Nagaland fee categories,
    Sikkim ₹50 fee and foreigners' RAP, Dibang dam location, OFAM 2026 dates
    marked TBA. Privacy policy rewritten (PayU, Supabase, Resend, GA4).
  - Re-check in late November: 2026 ticket price, programme, PAP waiver,
    the Phesama road stretch, Dzükou status. Update `src/data/festivals/hornbill.ts`.
