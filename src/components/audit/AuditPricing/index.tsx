"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { trackCTAClick } from "@/lib/analytics";
import type { AuditPricingData } from "@/lib/types";

interface AuditPricingProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditPricingData | null;
}

export function AuditPricing({ data, className, ...props }: AuditPricingProps) {
  if (!data || data.tiers.length === 0) return null;

  return (
    <section
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        <StaggerChildren className="grid gap-6 pt-8 md:grid-cols-3">
          {data.tiers.map((tier) => {
            const isHighlighted = tier.highlighted === true;

            return (
              <SpotlightCard
                key={tier.name}
                spotlightColor="rgba(90, 177, 177, 0.15)"
                className={cn("h-full", isHighlighted && "!overflow-visible")}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-2xl border p-6 md:p-8",
                    isHighlighted
                      ? "border-brand-mid/40 bg-glass-bg backdrop-blur-md shadow-lg shadow-brand-mid/5 md:-translate-y-4"
                      : "border-glass-border bg-glass-bg backdrop-blur-md",
                  )}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-mid px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-base-black">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="heading-font text-lg font-bold text-text-primary">
                    {tier.name}
                  </h3>

                  <div className="mt-3 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "heading-font text-3xl font-bold md:text-4xl",
                        isHighlighted ? "text-brand-mid" : "text-text-primary",
                      )}
                    >
                      {tier.price}
                    </span>
                    {tier.priceSubtext && (
                      <span className="text-sm text-text-tertiary">
                        {tier.priceSubtext}
                      </span>
                    )}
                  </div>

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isHighlighted ? "text-brand-mid" : "text-brand-dark",
                          )}
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <MagneticElement strength={0.3}>
                      <MovingBorderButton
                        as={Link}
                        href={tier.ctaUrl}
                        duration={isHighlighted ? 3000 : 3500}
                        containerClassName="inline-flex w-full"
                        variant={isHighlighted ? "default" : "inverted"}
                        className={isHighlighted ? undefined : "!bg-base-white !text-brand-dark"}
                        onClick={() =>
                          trackCTAClick("audit", tier.ctaLabel, tier.ctaUrl)
                        }
                      >
                        {tier.ctaLabel}
                      </MovingBorderButton>
                    </MagneticElement>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
