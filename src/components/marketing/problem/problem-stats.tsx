import { HeartHandshake } from "lucide-react";
import { StatBlock } from "@/components/ui";
import { RidgeMotif } from "@/components/marketing/decor/ridge-motif";
import { cn } from "@/lib/cn";

const STATS = [
  { value: "8", label: "States" },
  { value: "200+", label: "Tribes" },
  { value: "200+", label: "Languages" },
  { value: "Countless", label: "Stories" },
] as const;

/**
 * Closing band of the Problem section — reframes the platform as a human good,
 * then grounds the scale with field-journal stats. The ridge motif is quiet
 * marginalia in the corner (design language §"hand drawn map lines").
 */
export function ProblemStats({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-mist-50/70 px-6 py-7 ring-1 ring-border-subtle sm:px-8",
        className,
      )}
    >
      <RidgeMotif
        className="pointer-events-none absolute right-3 -bottom-1 w-44 text-pine-700 opacity-[0.13] sm:w-56"
      />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex items-start gap-3.5 lg:max-w-sm">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <HeartHandshake className="size-5" strokeWidth={1.75} />
          </span>
          <p className="text-base leading-relaxed text-balance text-foreground">
            We bring the human layer back to travel.{" "}
            <span className="text-muted-foreground">
              Locals earn. Cultures thrive. You travel deeper.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:gap-x-10">
          {STATS.map((s) => (
            <StatBlock
              key={s.label}
              value={s.value}
              label={s.label}
              valueClassName="text-secondary text-2xl sm:text-3xl"
              labelClassName="text-muted-foreground"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
