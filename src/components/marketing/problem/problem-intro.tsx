import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, ShieldCheck, RefreshCw, Compass, Layers } from "lucide-react";
import { Button, Eyebrow } from "@/components/ui";
import { BrandMark } from "@/components/marketing/brand-logo";

const PROMISES = [
  { icon: ShieldCheck, label: "Trusted\nInformation" },
  { icon: RefreshCw, label: "Real-time\nUpdates" },
  { icon: Compass, label: "Local\nIntelligence" },
  { icon: Layers, label: "All in One\nPlace" },
] as const;

/**
 * Left column of the Problem section — names the pain, then names the fix.
 * The H2 carries the section's single big idea (italic Pine clause = the
 * editorial emphasis device, same Fraunces family). Server-rendered.
 */
export function ProblemIntro({
  className,
  headingId,
}: {
  className?: string;
  headingId?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <Eyebrow tone="muted">The Problem</Eyebrow>
        <span aria-hidden className="h-px flex-1 bg-border-subtle" />
        <span aria-hidden className="size-1.5 rotate-45 bg-secondary/60" />
      </div>

      <h2
        id={headingId}
        className="mt-6 font-display text-3xl leading-[1.1] font-medium text-balance text-foreground sm:text-4xl"
      >
        Northeast isn&apos;t difficult because it lacks beauty.{" "}
        <span className="text-secondary italic">
          It&apos;s difficult because nobody built the guide it deserved.
        </span>
      </h2>

      <p className="mt-6 max-w-md text-base text-pretty text-muted-foreground">
        Information is scattered. Permits are confusing. Roads are unpredictable. And the
        best places exist only in word of mouth.
      </p>

      <hr className="mt-8 border-border-subtle" />

      <div className="mt-8 flex items-center gap-2.5 text-foreground">
        <BrandMark className="size-5 shrink-0 text-secondary" />
        <span className="font-mono text-xs font-medium tracking-[0.22em] uppercase">
          Travelspire
        </span>
      </div>
      <p className="mt-3 max-w-md text-base text-pretty text-foreground/90">
        Brings it all together — so you can explore Northeast with clarity, confidence and
        freedom.
      </p>

      <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {PROMISES.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-start gap-2.5">
            <Icon className="mt-0.5 size-4 shrink-0 text-secondary" strokeWidth={1.75} />
            <span className="text-sm leading-snug font-medium whitespace-pre-line text-foreground">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <Button asChild variant="secondary" size="lg" className="group mt-9 rounded-full pr-2">
        <Link href={"/explore" as Route}>
          See How It Works
          <span className="ml-1 flex size-7 items-center justify-center rounded-full bg-mist-50/15 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </Button>
    </div>
  );
}
