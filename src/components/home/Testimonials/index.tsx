import { SectionHeader } from "@/components/shared/SectionHeader";
import { TestimonialsSection } from "@/components/shared/TestimonialsSection";
import { cn } from "@/lib/utils";
import type { TestimonialData } from "@/lib/types";

interface HomeTestimonialsProps extends React.ComponentPropsWithoutRef<"section"> {
  headline?: string;
  highlightedWord?: string;
  description?: string;
  items: TestimonialData[];
  ctaHeadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function HomeTestimonials({
  headline,
  highlightedWord,
  description,
  items,
  ctaHeadline = "This could be you\u2026",
  ctaLabel = "Book a Consultation",
  ctaUrl = "/start",
  className,
  ...props
}: HomeTestimonialsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn("py-24 overflow-hidden", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader headline={headline ?? null} highlightedWord={highlightedWord} description={description ?? null} />
      </div>
      <TestimonialsSection
        items={items}
        showCTACard
        ctaHeadline={ctaHeadline}
        ctaLabel={ctaLabel}
        ctaUrl={ctaUrl}
      />
    </section>
  );
}
