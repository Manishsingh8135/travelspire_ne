import { Compass } from "lucide-react";

interface TourItineraryDayProps {
  day: {
    title: string;
    description: string;
    activities: string[];
  };
  index: number;
}

export function TourItineraryDay({ day, index }: TourItineraryDayProps) {
  return (
    <article className="grid gap-5 rounded-[14px] bg-[#e7dece] p-5 shadow-[7px_14px_30px_-24px_rgba(35,47,39,0.58)] sm:p-7 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-7">
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8a715f]">
          Day
        </p>
        <p className="mt-1 text-4xl font-medium tracking-[-0.05em] text-[#754933]">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold leading-7 tracking-[-0.025em] text-[#17221b] sm:text-2xl">
          {day.title}
        </h3>
        <p className="mt-3 max-w-[48rem] text-sm leading-6 text-[#59655d] sm:text-base sm:leading-7">
          {day.description}
        </p>

        {day.activities.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {day.activities.map((activity) => (
              <span
                key={activity}
                className="inline-flex min-h-9 items-center gap-2 rounded-[8px] bg-[#f5efe5] px-3 text-[11px] font-medium text-[#4c5a51]"
              >
                <Compass
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#87543a]"
                />
                {activity}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
