import { User } from "lucide-react";
import { GlassPanel, StatBlock } from "@/components/ui";
import { cn } from "@/lib/cn";

// Decorative avatar cluster (no fabricated faces). The "10K+" figure is a
// placeholder — replace with a real metric before launch.
const AVATAR_TINTS = ["bg-pine-700", "bg-clay-600", "bg-stone-600"];

/** Bottom-right social-proof card. */
export function HeroExplorers({ className }: { className?: string }) {
  return (
    <GlassPanel tone="darker" radius="2xl" className={cn("flex items-center gap-3 px-4 py-3", className)}>
      <div aria-hidden className="flex -space-x-2.5">
        {AVATAR_TINTS.map((tint, i) => (
          <span
            key={i}
            className={cn(
              "flex size-9 items-center justify-center rounded-full border-2 border-charcoal-900 text-mist-50",
              tint,
            )}
          >
            <User className="size-4" />
          </span>
        ))}
      </div>
      <StatBlock
        value="10K+"
        label="Explorers & counting"
        valueClassName="text-2xl text-mist-50"
        labelClassName="text-mist-300/80"
      />
    </GlassPanel>
  );
}
