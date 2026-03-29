"use client";

import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Target,
  Cpu,
  Landmark,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GrowveloperCard } from "@/components/shared/GrowveloperCard";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import type { IndustriesGridData } from "@/lib/types";

interface IndustriesGridProps extends React.ComponentPropsWithoutRef<"section"> {
  data: IndustriesGridData | null;
}

const ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  target: Target,
  cpu: Cpu,
  landmark: Landmark,
  "shopping-cart": ShoppingCart,
  stethoscope: Stethoscope,
  "graduation-cap": GraduationCap,
  building: Building2,
};

export function IndustriesGrid({ data, className, ...props }: IndustriesGridProps) {
  if (!data || data.industries.length === 0) return null;

  const industryCount = data.industries.length;
  const ctaSpanClass = industryCount % 3 === 0 ? "lg:col-span-1" : "lg:col-span-2";

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          label={data.label}
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <ScrollFadeUp>
          <div className="overflow-hidden rounded-2xl border border-glass-border bg-glass-border">
            <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
              {data.industries.map((industry) => {
                const IconComponent = ICON_MAP[industry.icon];
                return (
                  <GrowveloperCard
                    key={industry.slug}
                    variant="industry"
                    colorScheme="dark"
                    headline={industry.name}
                    subCopy={industry.hookLine}
                    ctaLabel="Learn More"
                    ctaHref={`/industries/${industry.slug}`}
                    icon={
                      IconComponent ? (
                        <IconComponent className="h-6 w-6" strokeWidth={1.8} aria-hidden />
                      ) : null
                    }
                    className="rounded-none border-0"
                  />
                );
              })}
              <GrowveloperCard
                variant="sound-like-you"
                colorScheme="teal-solid"
                headline={data.ctaHeadline}
                ctaLabel={data.ctaLabel}
                ctaHref={data.ctaUrl}
                className={cn("rounded-none border-0 md:col-span-2", ctaSpanClass)}
              />
            </div>
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
