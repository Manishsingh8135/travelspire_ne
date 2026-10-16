import Image from "next/image";
import { IconQuote } from "@/components/icons";
import { homeStories } from "@/data/home/homepage";

/* Traveller accounts, as written. A sideways rail on phones, three columns
   from tablet up. */
export function Testimonials({ limit = 3 }: { limit?: number }) {
  return (
    <ul className="mx-auto flex w-full max-w-page snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden">
      {homeStories.slice(0, limit).map((story) => (
        <li key={story.id} className="w-[85%] shrink-0 snap-start md:w-auto">
          <figure className="flex h-full flex-col overflow-hidden rounded-panel border border-line bg-surface font-ui">
            {story.image ? (
              <div className="relative aspect-[16/10]">
                <Image
                  src={story.image}
                  alt={story.imageAlt || story.destination}
                  fill
                  sizes="(min-width: 768px) 33vw, 85vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <IconQuote size={22} className="text-highlight" />
              <blockquote className="mt-3 line-clamp-6 text-body text-fg-muted">{story.quote}</blockquote>
              <figcaption className="mt-auto border-t border-line pt-4">
                <span className="block text-body font-semibold text-fg">{story.name}</span>
                <span className="block text-small text-fg-subtle">
                  {story.origin} · {story.tourName}
                </span>
              </figcaption>
            </div>
          </figure>
        </li>
      ))}
    </ul>
  );
}
