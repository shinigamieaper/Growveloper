"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { ServiceProblemData } from "@/lib/types";

interface ServiceProblemProps extends React.ComponentPropsWithoutRef<"section"> {
  data: ServiceProblemData | null;
}

export function ServiceProblem({
  data,
  className,
  ...props
}: ServiceProblemProps) {
  if (!data || data.painPoints.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <div className="space-y-4">
          {data.painPoints.map((point, i) => (
            <ScrollFadeUp key={point} delay={i * 0.08}>
              <div className="flex items-start gap-4 rounded-xl border border-glass-border bg-glass-bg p-5 backdrop-blur-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-sm text-red-400">
                  ✕
                </span>
                <p className="text-base leading-relaxed text-text-secondary">
                  {point}
                </p>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
