"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import type { StickyScrollSectionData } from "@/lib/types";

interface ServicesAlternatingProps extends React.ComponentPropsWithoutRef<"section"> {
  data: StickyScrollSectionData | null;
}

export function ServicesAlternating({ data, className, ...props }: ServicesAlternatingProps) {
  if (!data || data.items.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={data.sectionLabel}
          headline={data.headline ?? null}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />
        <StickyScroll
          items={data.items}
          bottomCta={data.bottomCta}
        />
      </div>
    </section>
  );
}
