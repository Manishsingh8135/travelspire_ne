import { Photo } from "@/components/ui/photo";
import { CloudSun, FileText, Home, Headphones, Check } from "lucide-react";
import { GlassPanel } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

const FEATURES = [
  {
    icon: CloudSun,
    title: "Real-time road & weather updates",
    sub: "Always know before you go.",
  },
  { icon: FileText, title: "Permit guidance made simple", sub: "ILP / PAP info, forms & help." },
  {
    icon: Home,
    title: "Handpicked stays & experiences",
    sub: "Vetted by locals, loved by explorers.",
  },
  { icon: Headphones, title: "Local experts & 24/7 support", sub: "We're with you on the road." },
] as const;

const TAGS = ["Trusted", "Updated", "Unified", "Effortless"] as const;

/**
 * Right side of the diptych — the calm payoff. One saturated photograph,
 * four glass capability cards, four affirming tags. The visual opposite of
 * the desaturated chaos beside it. Cards reveal in sequence (clarity arriving).
 */
export function AfterPanel({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* AFTER badge */}
      <div className="relative z-20 mx-auto -mb-3 w-fit">
        <span className="inline-flex items-center rounded-full bg-pine-700 px-4 py-1.5 font-mono text-[0.7rem] font-medium tracking-[0.2em] uppercase text-mist-50 shadow-md">
          After
        </span>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-black/10 sm:aspect-auto sm:min-h-[480px] sm:flex-1">
        <Photo
          src="/images/places/mechuka-new/mechuka-new-landscape-16.JPG"
          alt="A homestay in the sunlit Mechuka valley framed by Himalayan ridges, Arunachal Pradesh — the calm of one trusted guide"
          fill
          sizes="(min-width: 1024px) 36vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-center"
        />
        {/* legibility scrims — light at top for the headline, dark at the base for cards */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-mist-50/55 via-transparent to-charcoal-950/55"
        />

        <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
          <div className="text-center">
            <h3 className="font-display text-2xl leading-tight font-medium text-balance text-basalt-900 sm:text-[1.75rem]">
              One trusted guide.
              <br />
              Everything you need.
            </h3>
            <div aria-hidden className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-basalt-900/30" />
              <span className="size-1 rotate-45 bg-secondary/70" />
              <span className="h-px w-8 bg-basalt-900/30" />
            </div>
          </div>

          <ul className="mt-auto space-y-2.5 pt-8">
            {FEATURES.map(({ icon: Icon, title, sub }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08}>
                  <GlassPanel
                    tone="darker"
                    radius="lg"
                    className="flex items-center gap-3 p-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-mist-50/10">
                      <Icon className="size-4.5 text-mist-100" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-tight font-medium text-mist-50">{title}</p>
                      <p className="mt-0.5 text-xs leading-tight text-mist-200/75">{sub}</p>
                    </div>
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success/20">
                      <Check className="size-3 text-success" strokeWidth={3} />
                    </span>
                  </GlassPanel>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ✓ tag row */}
      <ul className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {TAGS.map((t) => (
          <li key={t} className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <Check className="size-3.5 text-success" strokeWidth={2.5} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
