"use client";

import { cn, fluidGrid } from "@/lib/utils";
import { ICON_MAP } from "@/lib/icons";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { DiagnosisSectionData, DiagnosisLayoutStyle } from "@/lib/types";

interface DiagnosisCardsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: DiagnosisSectionData | null;
}

function getDiagnosisGrid(layout: DiagnosisLayoutStyle, count: number): string {
  if (layout === "single-col" || count === 1) {
    return "flex flex-col gap-6 max-w-2xl mx-auto";
  }
  if (count === 2) {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto";
  }
  if (layout === "grid-2x2") {
    return "grid gap-6 grid-cols-1 sm:grid-cols-2";
  }
  return "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

export function DiagnosisCards({ data, className, ...props }: DiagnosisCardsProps) {
  if (!data || data.cards.length === 0) return null;

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={data.label}
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <StaggerChildren className={getDiagnosisGrid(data.layoutStyle, data.cards.length)}>
          {data.cards.map((card) => {
            const IconComponent = ICON_MAP[card.icon];
            return (
              <GrowveloperCard
                key={card.headline}
                variant="diagnosis"
                colorScheme="glass-dark"
                headline={card.headline}
                subCopy={card.body}
                icon={
                  IconComponent ? (
                    <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                  ) : null
                }
              />
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
