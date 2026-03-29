import Link from "next/link";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import type { TestimonialData } from "@/lib/types";

interface TestimonialGridProps extends React.ComponentPropsWithoutRef<"div"> {
  items: TestimonialData[];
  showCTACard?: boolean;
  ctaHeadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function TestimonialGrid({
  items,
  showCTACard = true,
  ctaHeadline = "This could be you...",
  ctaLabel = "Book a Consultation",
  ctaUrl = "/start",
  className,
  ...props
}: TestimonialGridProps) {
  if (items.length === 0 && !showCTACard) return null;

  const count = items.length + (showCTACard ? 1 : 0);

  const gridClass = cn(
    "grid gap-6",
    count === 1 && "grid-cols-1 max-w-xl mx-auto",
    count === 2 && "grid-cols-1 md:grid-cols-2",
    count >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  );

  return (
    <div className={cn(gridClass, className)} {...props}>
      {items.map((item, i) => (
        <TestimonialCard
          key={`${item.name}-${i}`}
          data={item}
          className={cn(
            count >= 3 && i === 0 && "md:col-span-2 lg:col-span-1",
          )}
        />
      ))}

      {showCTACard && (
        <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-brand-dark p-8 text-center transition-all duration-300 hover:shadow-lg">
          <p className="heading-font text-xl font-bold italic text-brand-light">
            {ctaHeadline}
          </p>
          <Link
            href={ctaUrl}
            className="inline-flex min-h-[44px] items-center rounded-full bg-base-white px-6 py-2.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-light hover:scale-105"
          >
            {ctaLabel} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
