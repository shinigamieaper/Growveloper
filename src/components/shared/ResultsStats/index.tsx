"use client";

import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CountUp } from "@/components/animations/CountUp";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import Link from "next/link";
import type { ResultsStatsData } from "@/lib/types";

interface ResultsStatsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: ResultsStatsData | null;
}

export function ResultsStats({ data, className, ...props }: ResultsStatsProps) {
  if (!data || data.stats.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <SectionHeader
            headline={data.headline}
            highlightedWord={data.highlightedWord}
            className="mb-0 text-left md:max-w-md"
          />
          {data.description && (
            <p className="max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
              {data.description}
            </p>
          )}
        </div>

        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md"
            >
              <div className="mb-4">
                {stat.isIcon ? (
                  <Zap
                    className="h-12 w-12 text-brand-mid"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                ) : (
                  <p className="heading-font text-4xl font-bold text-brand-mid md:text-5xl">
                    {stat.prefix}
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix ?? ""}
                      decimals={stat.decimals ?? 0}
                    />
                  </p>
                )}
              </div>
              <p className="text-sm leading-relaxed text-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </StaggerChildren>

        {data.ctaLabel && data.ctaUrl && (
          <ScrollFadeUp delay={0.3}>
            <div className="mt-10 flex justify-center">
              <MagneticElement strength={0.4}>
                <MovingBorderButton
                  as={Link}
                  href={data.ctaUrl}
                  duration={3000}
                  containerClassName="inline-flex"
                >
                  {data.ctaLabel}
                </MovingBorderButton>
              </MagneticElement>
            </div>
          </ScrollFadeUp>
        )}
      </div>
    </section>
  );
}
