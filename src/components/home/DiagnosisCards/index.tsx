"use client";

import type { LucideIcon } from "lucide-react";
import {
  Zap,
  TrendingDown,
  Puzzle,
  Bot,
  Target,
  BarChart3,
  Code2,
  Megaphone,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { DiagnosisSectionData, DiagnosisLayoutStyle } from "@/lib/types";

interface DiagnosisCardsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: DiagnosisSectionData | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  zap: Zap,
  "trending-down": TrendingDown,
  puzzle: Puzzle,
  bot: Bot,
  target: Target,
  "bar-chart": BarChart3,
  code: Code2,
  megaphone: Megaphone,
  shield: ShieldCheck,
  workflow: Workflow,
};

const gridClasses: Record<DiagnosisLayoutStyle, string> = {
  "grid-2x2": "grid gap-6 md:grid-cols-2",
  "grid-3col": "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
  "single-col": "flex flex-col gap-6 max-w-2xl mx-auto",
};

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

        <StaggerChildren className={gridClasses[data.layoutStyle]}>
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
