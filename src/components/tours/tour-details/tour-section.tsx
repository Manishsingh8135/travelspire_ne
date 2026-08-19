import { cn } from "@/lib/utils";

interface TourSectionProps {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function TourSection({
  title,
  eyebrow,
  children,
  className,
  id,
}: TourSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <header className="mb-7 sm:mb-9">
        {eyebrow && (
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#87543a]">
            {eyebrow}
          </p>
        )}
        <h2 className="max-w-[16ch] text-[clamp(2.2rem,4.5vw,4rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#17221b]">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
