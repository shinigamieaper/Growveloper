"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { ServiceQualifierData } from "@/lib/types";

interface ServiceQualifiersProps extends React.ComponentPropsWithoutRef<"section"> {
  data: ServiceQualifierData | null;
}

export function ServiceQualifiers({
  data,
  className,
  ...props
}: ServiceQualifiersProps) {
  if (!data || data.qualifiers.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {data.qualifiers.map((qualifier, i) => (
            <ScrollFadeUp key={qualifier} delay={i * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-glass-border bg-glass-bg p-5 backdrop-blur-sm transition-colors hover:border-brand-mid/30">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mid/15 text-sm text-brand-mid">
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                  {qualifier}
                </p>
              </div>
            </ScrollFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
