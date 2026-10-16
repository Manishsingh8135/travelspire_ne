import Image from "next/image";
import { Callout } from "@/components/ds";
import { IconPin } from "@/components/icons";
import type { WayChapter } from "@/data/guides/way-to-anini";
import { cn } from "@/lib/utils";

/* The road guide's chapters: a sticky contents list on desktop, and one
   chapter per stretch of road — where it is, the numbers for that stretch,
   what it looks like, and what we actually do there. */

export type ChapterFacts = Record<string, { label: string; value: string }[]>;

export function RoadChapters({ chapters, facts }: { chapters: readonly WayChapter[]; facts: ChapterFacts }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <nav aria-label="Chapters" className="hidden lg:block">
        <div className="sticky top-36">
          <p className="font-ui text-eyebrow uppercase text-fg-subtle">Chapters</p>
          <ol className="mt-4 border-l border-line font-ui">
            {chapters.map((c) => (
              <li key={c.index}>
                <a
                  href={`#chapter-${c.index}`}
                  className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-small text-fg-muted transition-colors hover:border-brand hover:text-fg"
                >
                  <span className="text-fg-subtle tabular-nums">{c.index}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <ol className="min-w-0 space-y-16 md:space-y-20">
        {chapters.map((c, i) => (
          <li key={c.index} id={`chapter-${c.index}`} className="scroll-mt-36">
            <article className={cn("font-ui", i > 0 && "border-t border-line pt-12 md:pt-16")}>
              <p className="text-small font-semibold text-highlight tabular-nums">Chapter {c.index}</p>
              <h3 className="mt-2 text-h2 text-fg">{c.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-body text-fg-muted">
                <IconPin size={18} className="shrink-0 text-fg-subtle" />
                {c.where}
              </p>
              {facts[c.index]?.length ? (
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {facts[c.index].map((f) => (
                    <div key={f.label}>
                      <dt className="text-small text-fg-subtle">{f.label}</dt>
                      <dd className="text-body font-semibold text-fg tabular-nums">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {c.image ? (
                <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-panel bg-canvas-subtle">
                  <Image src={c.image} alt={c.imageAlt ?? ""} fill sizes="(min-width: 1024px) 860px, 100vw" className="object-cover" />
                </div>
              ) : null}
              <p className="mt-6 max-w-prose text-body-lg text-fg-muted">{c.story}</p>
              <Callout tone="tip" title={c.protocolLabel} className="mt-6 max-w-prose">
                {c.protocol}
              </Callout>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
