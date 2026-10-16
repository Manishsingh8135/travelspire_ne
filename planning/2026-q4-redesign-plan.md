# Q4 2026 — Site redesign plan (Evergreen)

Approved direction 2026-10-16: the founder picked **Evergreen** (crisp white +
cool greys, evergreen action colour, neutral near-black dark mode), asked for
**our own icon set**, a **rebuilt navbar**, and every page brought to the same
standard — "no section low effort". Design system spec:
`planning/2026-q4-design-system.md`. Branch: `feat/design-system`; nothing
merges to `main` until the whole site is on the system.

## Definition of done (every page)

- Built only from Evergreen tokens and `src/components/ds` / `site` pieces —
  no raw hex, no arbitrary font sizes, no lucide, no framer-motion.
- Light **and** dark checked by screenshot at 1440px and 390px.
- Clarity test: on product pages price, duration, season, what's included and
  the book/enquire action are visible without hunting.
- Content parity: every fact, FAQ, price and link the old page had survives
  (rewritten where it was cliché or unverifiable). URLs never change.
- SEO parity: metadata, canonical, JSON-LD, one `h1`, logical `h2/h3` outline,
  descriptive alt text, correct image `sizes`.
- No text under 12px; tap targets ≥ 44px; visible focus; reduced motion.

## Icons — `src/components/icons`

Our own set, drawn on a 24px grid: 1.6px stroke, round caps and joins,
2px corner radius on boxes, `currentColor`. UI glyphs (arrows, chevrons, menu,
close, check, plus/minus, search, sun/moon), contact (phone, mail, WhatsApp,
Instagram, chat) and a travel vocabulary of our own (mountain, route, permit,
monastery, prayer flags, sunrise, river, tent, 4×4, homestay…). Decorative by
default (`aria-hidden`); pass `title` to label.

## Shell

- **Navbar:** sticky 64px bar on `canvas`, hairline below; logo left; Tours ·
  Destinations · Permits panels, About, Contact; theme toggle and a "Plan a
  trip" button right. Panels and the mobile sheet are server-rendered (links
  are in the HTML for crawlers) and toggled with CSS — no media-query
  hydration flash, which is what broke the old bar. Desktop ≥1024px; below,
  a full-height sheet with grouped links and the two contact actions.
- **Footer:** link columns (Tours, Destinations, Permits & guides, Company),
  contact block, legal row. The fake newsletter goes.
- **WhatsApp:** one small floating button; hidden wherever a `PriceBar` or
  the mobile menu is on screen.
- **Theme:** next-themes on `data-theme`, light / dark / system.

## Execution order

1. Lock Evergreen, icons, shell, theme. ← start
2. Shared page pieces in `src/components/site`: page hero, CTA band, on-page
   contents, steps, itinerary, inclusions, gallery, testimonials, package cards.
3. Tour template `/tours/[slug]` + catalogue `/all-tours`.
4. Home.
5. Permits hub + 5 state guides.
6. Places (Anini, Dibang Valley, Dambuk, Roing) + the Anini road guide.
7. Bespoke tours (Mechuka–Dong–Anini, Pomo expedition).
8. About, Contact, Gallery.
9. Festival recaps (Anini Winter Fest, Ziro) — past events funnel to tours.
10. Policies, booking, payment status, 404.
11. Cleanup: delete legacy components, tokens, fonts and unused deps; full
    screenshot audit; build, lint, SEO checks (sitemap, JSON-LD, metadata).

## Log

- 2026-10-16 — Evergreen locked; plan written.
