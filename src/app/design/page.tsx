import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldMessage,
  Input,
  Label,
  SearchBar,
  Textarea,
} from "@/components/ui";
import * as FieldIcons from "@/components/icons/field-icons";
import { ContourField } from "@/components/marketing/decor/contour-field";
import { WeaveBand } from "@/components/marketing/decor/weave-band";
import { MistBand } from "@/components/marketing/decor/mist-band";
import { WaxStamp } from "@/components/marketing/decor/wax-stamp";
import { NEMap } from "@/components/marketing/decor/ne-map";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const RAMPS: { name: string; family: string }[] = [
  { name: "Mist", family: "mist" },
  { name: "Basalt", family: "basalt" },
  { name: "Stone", family: "stone" },
  { name: "Pine", family: "pine" },
  { name: "Clay", family: "clay" },
  { name: "Marigold", family: "marigold" },
  { name: "Charcoal", family: "charcoal" },
];
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const SEMANTICS: { label: string; cls: string; fg?: string }[] = [
  { label: "background", cls: "bg-background", fg: "text-foreground" },
  { label: "card", cls: "bg-card", fg: "text-card-foreground" },
  { label: "muted", cls: "bg-muted", fg: "text-muted-foreground" },
  { label: "primary", cls: "bg-primary", fg: "text-primary-foreground" },
  { label: "secondary", cls: "bg-secondary", fg: "text-secondary-foreground" },
  { label: "success", cls: "bg-success", fg: "text-white" },
  { label: "warning", cls: "bg-warning", fg: "text-on-accent" },
  { label: "danger", cls: "bg-danger", fg: "text-white" },
];

const TYPE: { token: string; cls: string; note: string }[] = [
  { token: "text-6xl / display", cls: "font-display text-6xl font-medium", note: "Oversized editorial hero" },
  { token: "text-5xl / display", cls: "font-display text-5xl font-medium", note: "Hero" },
  { token: "text-4xl / display", cls: "font-display text-4xl font-medium", note: "Page title" },
  { token: "text-3xl", cls: "font-display text-3xl font-medium", note: "Section heading" },
  { token: "text-2xl", cls: "text-2xl font-medium", note: "Subsection" },
  { token: "text-xl", cls: "text-xl font-medium", note: "Card title" },
  { token: "text-lg", cls: "text-lg", note: "Lead paragraph" },
  { token: "text-base", cls: "text-base", note: "Body" },
  { token: "text-sm", cls: "text-sm", note: "Secondary UI" },
  { token: "text-xs", cls: "text-xs", note: "Metadata / captions" },
];

const SPACING = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24] as const;
const RADII = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const SHADOWS = ["xs", "sm", "md", "lg", "xl"] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 font-mono text-xs tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:px-10">
      <header className="flex items-end justify-between border-b border-border-subtle pb-8">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            Travelspire · field journal
          </p>
          <h1 className="font-display text-4xl font-medium">Design System</h1>
          <p className="max-w-xl text-muted-foreground">
            The single source of truth for tokens and primitives. Toggle the theme — every
            value swaps from one variable.
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* PALETTE */}
      <section className="py-12">
        <SectionLabel>Palette — OKLCH ramps</SectionLabel>
        <div className="flex flex-col gap-6">
          {RAMPS.map((ramp) => (
            <div key={ramp.family} className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{ramp.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{ramp.family}</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-11">
                {STEPS.map((step) => (
                  <div key={step} className="flex flex-col gap-1">
                    <div
                      className="h-12 rounded-sm border border-border-subtle"
                      style={{ backgroundColor: `var(--color-${ramp.family}-${step})` }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEMANTIC ROLES */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Semantic roles</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SEMANTICS.map((s) => (
            <div
              key={s.label}
              className={`flex h-24 flex-col justify-end rounded-md border border-border-subtle p-3 ${s.cls} ${s.fg ?? ""}`}
            >
              <span className="font-mono text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Typography — Fraunces · Hanken Grotesk · Geist Mono</SectionLabel>
        <div className="flex flex-col gap-6">
          {TYPE.map((t) => (
            <div key={t.token} className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{t.token}</span>
                <span className="text-xs text-muted-foreground">— {t.note}</span>
              </div>
              <p className={t.cls}>The living root bridges of Cherrapunji</p>
            </div>
          ))}
          <p className="font-mono text-sm text-muted-foreground">
            Geist Mono · 2,134 m · 27.5860°N 91.8594°E · ILP-AR-0042
          </p>
        </div>
      </section>

      {/* SPACING + RADIUS */}
      <section className="grid gap-12 border-t border-border-subtle py-12 md:grid-cols-2">
        <div>
          <SectionLabel>Spacing — 4px base, 8px rhythm</SectionLabel>
          <div className="flex flex-col gap-2">
            {SPACING.map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="w-8 font-mono text-xs text-muted-foreground">{s}</span>
                <div className="h-3 rounded-xs bg-primary" style={{ width: `${s * 4}px` }} />
                <span className="font-mono text-xs text-muted-foreground">{s * 4}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>Radius</SectionLabel>
          <div className="grid grid-cols-3 gap-3">
            {RADII.map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-full border border-border bg-muted"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <span className="font-mono text-xs text-muted-foreground">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEVATION */}
      {/* FOREST TONE — the dark chapter system. data-tone remaps every semantic
          role + elevation, so these are the SAME classes as the light cards. */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Forest tone — semantic surfaces on dark (data-tone)</SectionLabel>
        <div data-tone="forest" className="rounded-xl bg-background p-8 text-foreground">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border-subtle bg-card p-5 shadow-panel">
              <p className="font-mono text-[10px] tracking-[0.18em] text-secondary uppercase">
                shadow-panel
              </p>
              <p className="mt-2 font-display text-lg font-medium">Card at rest</p>
              <p className="mt-1 text-sm text-muted-foreground">
                bg-card · border-border-subtle · lit top rim + deep pool.
              </p>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-card p-5 shadow-lift">
              <p className="font-mono text-[10px] tracking-[0.18em] text-secondary uppercase">
                shadow-lift
              </p>
              <p className="mt-2 font-display text-lg font-medium">Raised / hover</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Same classes as light — the tone remap does the work.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/25 bg-card p-5 shadow-deep">
              <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                shadow-deep
              </p>
              <p className="mt-2 font-display text-lg font-medium">Floating / marquee</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Accent-bordered flagship object (passport, membership).
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm">
            Body on forest ·{" "}
            <span className="text-muted-foreground">muted (mist-300)</span> ·{" "}
            <span className="text-subtle-foreground">subtle</span> ·{" "}
            <span className="text-secondary italic">pine accent italic</span> ·{" "}
            <span className="text-accent">marigold accent</span>
          </p>
        </div>
      </section>

      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Elevation — warm, multi-layer, never neon</SectionLabel>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="grid grid-cols-5 gap-4 rounded-lg bg-background p-6">
            {SHADOWS.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="grid size-14 place-items-center rounded-md bg-card"
                  style={{ boxShadow: `var(--shadow-${s})` }}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">{s}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="grid grid-cols-5 gap-4 rounded-lg p-6"
            style={{ backgroundColor: "var(--color-charcoal-950)" }}
          >
            {SHADOWS.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="grid size-14 place-items-center rounded-md"
                  style={{
                    backgroundColor: "var(--color-charcoal-800)",
                    boxShadow: `var(--shadow-${s})`,
                  }}
                >
                  <span className="font-mono text-[10px] text-charcoal-200">{s}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUTTONS */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Buttons</SectionLabel>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Plan a trip</Button>
            <Button variant="secondary">Explore</Button>
            <Button variant="outline">Filters</Button>
            <Button variant="ghost">Skip</Button>
            <Button variant="danger">Cancel booking</Button>
            <Button variant="link">Learn more</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Pin">
              <MapPin />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Booking…</Button>
            <Button disabled>Disabled</Button>
            <Button>
              <MapPin /> With icon
            </Button>
          </div>
        </div>
      </section>

      {/* FORMS */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Inputs &amp; forms</SectionLabel>
        <div className="grid max-w-xl gap-5">
          <SearchBar placeholder="Search villages, treks, homestays…" />
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
            <FieldDescription>We&apos;ll only use this for your trip.</FieldDescription>
          </Field>
          <Field>
            <Label htmlFor="bad">Phone</Label>
            <Input id="bad" aria-invalid placeholder="+91" defaultValue="abc" />
            <FieldMessage>Enter a valid phone number.</FieldMessage>
          </Field>
          <Field>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Tell us what you're dreaming of…" />
          </Field>
        </div>
      </section>

      {/* BADGES + CARD */}
      <section className="border-t border-border-subtle py-12">
        <SectionLabel>Badges &amp; cards</SectionLabel>
        <div className="mb-8 flex flex-wrap gap-2">
          <Badge variant="neutral">Moderate</Badge>
          <Badge variant="accent">Featured</Badge>
          <Badge variant="outline">Arunachal</Badge>
          <Badge variant="success">Road open</Badge>
          <Badge variant="warning">Permit needed</Badge>
          <Badge variant="danger">Landslide</Badge>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge variant="accent" className="w-fit">
                Secret spot
              </Badge>
              <CardTitle>Pomo Valley dawn ridge</CardTitle>
              <CardDescription>Anjaw · Arunachal Pradesh · 2,134 m</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                A quiet ridge above the village — go at 6am for the light. Bikes only past the
                third bend; carry cash, the homestay has no card.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Save</Button>
              <Button size="sm" variant="outline">
                On map
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── Field Icons v1 (08-blueprint/14 D4) ─────────────────────────── */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-2xl font-medium">Field Icons</h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          The owned set — 24-grid, 1.75 stroke, field-guide line work. Public surfaces only.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
          {Object.entries(FieldIcons).map(([name, Icon]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border-subtle p-4"
            >
              <Icon className="size-7 text-foreground" />
              <span className="text-center font-mono text-[10px] tracking-wide text-muted-foreground">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Marginalia v1 (08-blueprint/14 D5) ──────────────────────────── */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display text-2xl font-medium">Marginalia</h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Section atmosphere — background motifs render at 4–7% opacity; stamps stay crisp at
          edges. One family per section.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg border border-border-subtle p-6">
            <ContourField className="absolute -top-10 -right-10 w-[26rem] text-foreground opacity-[0.06]" />
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              ContourField · bg motif @6%
            </p>
            <p className="mt-16 max-w-xs text-sm text-muted-foreground">
              Content sits over the contour field — the motif whispers, never shouts.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-lg border border-border-subtle p-6">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                WeaveBand · diamond / lines
              </p>
              <WeaveBand variant="diamond" className="h-5 w-full text-foreground/60" />
              <WeaveBand variant="lines" className="h-5 w-full text-foreground/60" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                MistBand
              </p>
              <MistBand className="w-full text-foreground/50" />
            </div>
          </div>
          <div className="flex items-center gap-8 rounded-lg border border-border-subtle p-6">
            <WaxStamp label="Dream" sub="Stage 01" className="size-24 -rotate-3 text-secondary" />
            <WaxStamp label="Tawang" sub="Explored" className="size-24 rotate-2 text-marigold-600" />
            <p className="max-w-[16rem] text-sm text-muted-foreground">
              WaxStamp — the postal/permit mark language for chapter nodes and passport moments.
            </p>
          </div>
          <div className="rounded-lg border border-border-subtle p-6">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              NEMap · activeState=&quot;arunachal-pradesh&quot; · labels on
            </p>
            <NEMap
              showLabels
              activeState="arunachal-pradesh"
              className="mt-4 w-full text-foreground/80"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
