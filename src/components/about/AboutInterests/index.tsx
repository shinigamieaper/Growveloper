import type { LucideIcon } from "lucide-react";
import { Eye, Target, Lightbulb, Brain, Globe, Puzzle, Search, Zap, Flame } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutInterestsData } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  eye: Eye, target: Target, lightbulb: Lightbulb, brain: Brain,
  globe: Globe, puzzle: Puzzle, search: Search, zap: Zap, flame: Flame,
};

interface AboutInterestsProps {
  data: AboutInterestsData | null;
}

export function AboutInterests({ data }: AboutInterestsProps) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="left"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.items.map((item) => {
              const IconComponent = item.icon ? ICON_MAP[item.icon] : undefined;
              return (
                <GrowveloperCard
                  key={item.interest}
                  variant="diagnosis"
                  colorScheme="glass-dark"
                  headline={item.interest}
                  subCopy={item.connection}
                  icon={
                    IconComponent ? (
                      <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                    ) : undefined
                  }
                />
              );
            })}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
