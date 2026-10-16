# Q4 2026 — Design system ("Field Guide")

Drafted 2026-10-15 after the live-site UI audit. Lives in git next to the SEO
plan. Status: **foundation in review** — tokens + primitives + the `/design`
specimen, nothing on live pages yet.

## Why

The live site runs three visual systems at once: the homepage's cream editorial
look, near-copies of it on tour/place pages built from hard-coded hex, and the
old navy + emerald-gradient template on permits, about, contact, gallery, Ziro
and policies. Measured on `main`:

- 1,518 hard-coded `[#hex]` classes (351 unique); 700 arbitrary font sizes,
  including 258 × 10px, 110 × 9px, 19 × 8px.
- 20–30 distinct font sizes per page; three serif faces; faint text at 2.6:1.
- Theme forced to dark, so every page paints over a slate body.

## Principles

1. **Clear before clever.** A visitor finds price, dates, duration, what's
   included and how to book within one screen of any tour page.
2. **One system, two modes.** Every colour is a semantic token with a light and
   a dark value. Components never name a raw colour.
3. **Readable sizes only.** Nothing below 12px. Body is 16px; long-form 17–18px.
   Headings scale fluidly between phone (360px) and desktop (1280px).
4. **Typography carries elegance.** Instrument Sans does the work; Instrument
   Serif italic is the accent — one phrase in a heading, a pull quote, a price.
5. **Boxes only for objects.** Cards for things you can pick (a tour, a
   package). Text content uses rules and whitespace, not bordered boxes.
6. **Fast by default.** Server components, CSS-only interactions where possible
   (`<details>` accordions), two font families, correct `sizes` on images.
7. **SEO-structured.** One `h1` per page; heading *level* is chosen for the
   outline, heading *size* separately for the design (`<Heading as size>`).

## Typography

Fonts: **Instrument Sans** (variable 400–700, body + UI) and **Instrument
Serif** (400 + italic, accents only). Geist and Geist Mono retire with the
migration; numbers use `tabular-nums` instead of a mono face.

| Token | Phone → desktop | Line height | Use |
|---|---|---|---|
| `display` | 40 → 72px | 1.02 | Hero title only |
| `h1` | 34 → 56px | 1.06 | Page title |
| `h2` | 28 → 40px | 1.1 | Section title |
| `h3` | 20 → 24px | 1.25 | Card / sub-section title |
| `h4` | 18px | 1.35 | Small group title |
| `lead` | 17 → 20px | 1.55 | Intro paragraph |
| `body-lg` | 17px | 1.65 | Guides, long reading |
| `body` | 16px | 1.6 | Default |
| `small` | 14px | 1.5 | Meta, helper text |
| `caption` | 13px | 1.45 | Image captions, fine print |
| `eyebrow` | 12px, caps, +0.1em, 600 | 1.3 | Section kicker |

Rules: headings 600 weight, tight tracking; body measure ≤ 68ch; a heading
gets at most one serif-italic phrase.

## Colour

Light is the default; dark is a full mode, not an afterthought. All text tokens
pass WCAG AA (4.5:1) on `canvas`, `canvas-subtle` and `surface` in both modes.

| Token | Light | Dark | Role |
|---|---|---|---|
| `canvas` | #FFFFFF | #0A0B0D | Page |
| `canvas-subtle` | #F6F7F9 | #111215 | Alternate section |
| `surface` / `surface-raised` | #FFFFFF | #16181B / #1C1E22 | Cards, inputs, menus |
| `inverse` / `on-inverse` | #0B0D10 / #EDEEF0 | #050506 / #EDEEF0 | Feature band |
| `fg` | #0B0D10 | #EDEEF0 | Primary text |
| `fg-muted` | #4B5260 | #A9AEB7 | Secondary text |
| `fg-subtle` | #656C78 | #858B95 | Meta, captions |
| `line` / `line-strong` | #E6E8EC / #D2D6DD | #24262B / #33363D | Hairlines |
| `brand` | #0F6B4B (evergreen) | #4CC38A | Primary action, links |
| `on-brand` | #FFFFFF | #04140C | Text on brand |
| `highlight` | = brand | = brand | Eyebrows, serif accents |
| `seasonal` | #B45309 | #F5B544 | Festival / seasonal only |
| `positive` · `caution` · `critical` · `notice` | crisp | lifted | Status (permits, availability) |

Each status and brand colour has a `-soft` background tint for callouts.
Founder direction (2026-10-16): clean and cool, no warm or greyish tints —
light is true white with cool neutral greys; dark is a neutral near-black
with no colour cast.

## Space, shape, depth

- **Spacing:** 4px base. Section padding 64px phone / 96px desktop; compact
  section headers (title left, short intro right on desktop).
- **Containers:** `page` 1280px, `wide` 1440px (media grids), `prose` 680px.
  Gutters 20 / 32 / 40px. One container standard across every page.
- **Radius:** `control` 8px (buttons, inputs), `card` 12px, `panel` 16px. Pills
  only for real filter chips.
- **Elevation:** `e1` resting card, `e2` hover / sticky bar, `e3` menus. Warm
  shadows in light; in dark, depth comes from lighter surfaces + a 1px rim.
- **Motion:** 150ms (controls) / 250ms (reveals), ease-out; no float, bounce or
  scroll-jacking; everything off under `prefers-reduced-motion`.

## Components (`src/components/ds/`)

| Primitive | Notes |
|---|---|
| `Container`, `Section` | Width + gutter; `tone="default \| subtle \| inverse"` |
| `Heading`, `Eyebrow`, `Lead`, `Prose` | Level and size decoupled |
| `Button`, `ButtonLink` | `primary · secondary · ghost · link`; `sm · md · lg` |
| `Badge` | Status only (`positive`, `caution`, …) — not decoration |
| `TourCard` | Photo, place, title, duration, price; one clear action |
| `KeyFacts` | `<dl>` for duration / season / altitude / group size |
| `Callout` | `note · tip · caution` with soft tint, no emoji |
| `Accordion` | `<details>`/`<summary>`, zero JS, crawlable FAQ |
| `Breadcrumbs` | With `BreadcrumbList` JSON-LD |
| `Field`, `Select`, `Textarea` | One input style site-wide |
| `PriceBar` | Sticky price + book/enquire; owns the WhatsApp slot so the floater never overlaps |
| `ThemeToggle` | Light / dark / system |

## Migration order

1. **Foundation** — tokens, fonts, primitives, `/design` specimen. ← now
2. **Shell** — navbar (no icons on labels), footer (honest copy, working or
   removed newsletter), WhatsApp floater collision fix, theme toggle.
3. **Permits** (6 pages) — biggest SEO value, furthest off-system.
4. **Tour template** — full-width layout, flatter cards, `PriceBar`.
5. **About, Contact, Gallery, Ziro recap, policies.**
6. **Home + places + guides** — swap to tokens, trim length.
7. **Cleanup** — delete legacy ramps, gradients, `ui/*` and old fontSize scale.

Each step ships behind a screenshot check at 1440 and 390, light and dark.

## Open decisions

- Navbar: dark bar on light pages, or follow the page theme? (Proposed: follow.)
- Unverified claims ("100% success", "1000+ travelers", 2022 award) — keep only
  if documented.
