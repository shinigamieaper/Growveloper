"use client";

import { useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Search,
  Megaphone,
  PenTool,
  FlaskConical,
  BarChart3,
  Code2,
  Zap,
  Shield,
  Gauge,
  Wrench,
  Bot,
  Workflow,
  LineChart,
} from "lucide-react";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { SubServicesData } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  search: Search,
  megaphone: Megaphone,
  "pen-tool": PenTool,
  flask: FlaskConical,
  "bar-chart": BarChart3,
  code: Code2,
  zap: Zap,
  shield: Shield,
  gauge: Gauge,
  wrench: Wrench,
  bot: Bot,
  workflow: Workflow,
  "line-chart": LineChart,
};

interface SubServicesGridProps extends React.ComponentPropsWithoutRef<"section"> {
  data: SubServicesData | null;
}

export function SubServicesGrid({ data, className, ...props }: SubServicesGridProps) {
  if (!data || data.items.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <SubServiceCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

function SubServiceCard({ title, description, icon }: { title: string; description: string; icon?: string }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const IconComponent = icon ? ICON_MAP[icon] : null;

  const handleMouseEnter = useCallback(() => {
    if (reduced || !iconRef.current) return;
    gsap.to(iconRef.current, {
      y: -4,
      rotate: 8,
      scale: 1.15,
      duration: DURATION.fast,
      ease: EASE.snap,
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !iconRef.current) return;
    gsap.to(iconRef.current, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.snap,
    });
  }, [reduced]);

  return (
    <article
      className="group flex flex-col items-center rounded-2xl border border-glass-border bg-glass-bg p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-brand-mid/30 hover:shadow-lg hover:shadow-brand-mid/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {IconComponent && (
        <div
          ref={iconRef}
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-dark/10"
        >
          <IconComponent className="h-7 w-7 text-brand-mid" strokeWidth={1.8} aria-hidden />
        </div>
      )}

      <h3 className="heading-font text-lg font-bold text-text-primary">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </article>
  );
}
