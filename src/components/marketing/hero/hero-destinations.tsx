import { Photo } from "@/components/ui/photo";
import { GlassPanel } from "@/components/ui";
import { cn } from "@/lib/cn";

// Real, correctly-labelled NE photography from the repo library.
const DESTINATIONS = [
  {
    name: "Tawang",
    region: "Arunachal Pradesh",
    src: "/images/places/tawang/Tawang_2.JPG",
    href: "/arunachal-pradesh/tawang",
  },
  {
    name: "Mechuka",
    region: "Arunachal Pradesh",
    src: "/images/places/mechuka-new/mechuka-new-landscape-16.JPG",
    href: "/arunachal-pradesh/mechuka",
  },
  {
    name: "Ziro Valley",
    region: "Arunachal Pradesh",
    src: "/images/places/ziro-new/ziro-new-landscape-3.JPG",
    href: "/arunachal-pradesh/ziro",
  },
  {
    name: "Anini",
    region: "Arunachal Pradesh",
    src: "/images/places/anini-new/anini-new-landscape-11.jpeg",
    href: "/tours/anini-expedition",
  },
  {
    name: "Dzükou",
    region: "Nagaland",
    src: "/images/places/hornbill/Dzoku_1.webp",
    href: "/tours/hornbill-festival-2026",
  },
];

/** Bottom-left "featured destinations" strip — horizontal scroll on small screens. */
export function HeroDestinations({ className }: { className?: string }) {
  return (
    <GlassPanel tone="darker" radius="2xl" className={cn("overflow-hidden", className)}>
      <ul className="flex snap-x gap-3 overflow-x-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DESTINATIONS.map((d) => (
          <li key={d.name} className="shrink-0 snap-start">
            <a href={d.href} className="group block w-[116px]">
              <div className="relative h-[74px] w-full overflow-hidden rounded-lg">
                <Photo
                  src={d.src}
                  alt={`${d.name}, ${d.region}`}
                  fill
                  sizes="116px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm leading-tight font-medium text-mist-50">{d.name}</p>
              <p className="font-mono text-[0.6rem] tracking-wide uppercase text-mist-300/70">
                {d.region}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
