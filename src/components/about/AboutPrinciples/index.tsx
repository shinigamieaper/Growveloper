import type { LucideIcon } from "lucide-react";
import { Users, BarChart3, Target, Brain, Zap, ShieldCheck, Wrench, Code2, Search, Lightbulb, Rocket, Workflow, Link, TrendingUp, Bot } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutHowIWorkData } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  users: Users, "bar-chart": BarChart3, target: Target, brain: Brain,
  zap: Zap, shield: ShieldCheck, wrench: Wrench, code: Code2,
  search: Search, lightbulb: Lightbulb, rocket: Rocket, workflow: Workflow,
  link: Link, "trending-up": TrendingUp, bot: Bot,
};

interface AboutPrinciplesProps {
  data: AboutHowIWorkData | null;
}

export function AboutPrinciples({ data }: AboutPrinciplesProps) {
  if (!data) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          alignment="center"
          label={null}
          description={null}
        />

        <StaggerChildren>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.principles.map((p, i) => {
              const IconComponent = p.icon ? ICON_MAP[p.icon] : undefined;
              return (
                <GrowveloperCard
                  key={p.title}
                  variant="diagnosis"
                  colorScheme="glass-dark"
                  tag={`0${i + 1}`}
                  headline={p.title}
                  subCopy={p.description}
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
