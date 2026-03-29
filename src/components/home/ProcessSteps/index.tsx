import { SectionHeader } from "@/components/shared/SectionHeader";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { cn } from "@/lib/utils";
import type { StickyScrollSectionData } from "@/lib/types";

interface ProcessStepsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: StickyScrollSectionData | null;
}

export function ProcessSteps({ data, className, ...props }: ProcessStepsProps) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline ?? null}
          highlightedWord={data.highlightedWord}
          description={data.description ?? null}
        />
        <StickyScroll items={data.items} bottomCta={data.bottomCta} />
      </div>
    </section>
  );
}
