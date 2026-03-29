import { SectionHeader } from "@/components/shared/SectionHeader";
import { CaseStudyCard } from "@/components/shared/CaseStudyCard";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { cn } from "@/lib/utils";
import type { CaseStudyCardData } from "@/lib/types";

interface CaseStudiesSectionProps extends React.ComponentPropsWithoutRef<"section"> {
  headline?: string;
  highlightedWord?: string;
  description?: string;
  items: CaseStudyCardData[];
}

export function CaseStudiesSection({
  headline,
  highlightedWord,
  description,
  items,
  className,
  ...props
}: CaseStudiesSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader headline={headline ?? null} highlightedWord={highlightedWord} description={description ?? null} />
        <div className="space-y-10">
          {items.map((item, i) => (
            <ScrollFadeUp key={item.slug} delay={i * 0.1}>
              <CaseStudyCard data={item} colorIndex={i % 3} />
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
