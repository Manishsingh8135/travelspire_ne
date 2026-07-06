import { Photo } from "@/components/ui/photo";
import { Leaf, Check, Sparkles } from "lucide-react";

const TAGS = ["Scenic Drives", "Culture", "Offbeat", "Food"];
const HIGHLIGHTS = [
  "Scenic drive via Bhalukpong & Dirang",
  "Sunrise at Sela Pass",
  "Visit Tawang Monastery",
  "Offbeat village stay in Zemithang",
  "Local food experiences",
  "All permits & safety covered",
];

/**
 * The Mei chat — a scripted, static preview of the travel companion (not a live
 * model, and clearly a demo). Mei is an AI companion, shown with a leaf glyph
 * avatar rather than a fake human face. Server-rendered; the parent fades it in.
 */
export function MeiPhone() {
  return (
    <div className="mx-auto w-full max-w-[21rem]">
      <div className="rounded-[2.5rem] border border-border-subtle bg-card p-2.5 shadow-deep">
        <div className="overflow-hidden rounded-[2rem] bg-background">
          {/* top bar */}
          <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3.5">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-pine-400 to-pine-600 text-charcoal-950">
              <Leaf className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Mei</p>
              <p className="font-mono text-[10px] tracking-wide text-secondary uppercase">
                AI Travel Companion
              </p>
            </div>
          </div>

          {/* chat */}
          <div className="space-y-3 px-4 py-4">
            <div className="flex justify-end">
              <p className="max-w-[86%] rounded-2xl rounded-tr-sm bg-secondary px-3.5 py-2.5 text-sm text-secondary-foreground">
                {"I'm planning a 7-day trip from Guwahati to Tawang in October. I love mountains, local food and offbeat places."}
              </p>
            </div>
            <p className="max-w-[90%] text-sm text-muted-foreground">
              {"That sounds amazing! I've crafted a journey just for you:"}
            </p>

            {/* trip card */}
            <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-panel">
              <div className="relative aspect-[16/9]">
                <Photo
                  src="/images/places/tawang/Tawang_1.PNG"
                  alt="Tawang Monastery on a ridge below a bank of cloud, Arunachal Pradesh"
                  fill
                  sizes="336px"
                  className="object-cover"
                />
                <span className="absolute top-2 right-2 rounded-full bg-charcoal-950/70 px-2 py-0.5 font-mono text-[10px] text-mist-100 ring-1 ring-glass-border">
                  7 Days
                </span>
              </div>
              <div className="p-3.5">
                <p className="font-display text-base font-medium">
                  Guwahati to Tawang Explorer
                </p>
                <p className="text-xs text-muted-foreground">Mountains, monasteries & quiet valleys</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {TAGS.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted/70 px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-secondary" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* input (decorative preview) */}
          <div className="border-t border-border-subtle px-4 py-3">
            <div className="flex items-center justify-between rounded-full border border-border-subtle bg-muted/60 px-4 py-2.5">
              <span className="text-sm text-subtle-foreground">Ask Mei anything…</span>
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Sparkles className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
