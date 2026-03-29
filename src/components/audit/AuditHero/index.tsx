"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { ScrollCue } from "@/components/shared/ScrollCue";
import type { AuditHeroData } from "@/lib/types";

interface AuditHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditHeroData | null;
  scrollCueTargetId?: string;
}

export function AuditHero({ data, scrollCueTargetId, className, ...props }: AuditHeroProps) {
  if (!data) return null;

  const {
    headline,
    highlightedWord,
    price,
    priceLabel,
    subStatement,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaText,
    secondaryCtaUrl,
  } = data;

  const renderHeadline = () => {
    if (!highlightedWord || !headline.includes(highlightedWord)) {
      return headline;
    }
    const parts = headline.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <CanvasText text={highlightedWord} />
        {parts[1]}
      </>
    );
  };

  return (
    <section className={cn("relative", className)} {...props}>
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-6"
        >
          <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {renderHeadline()}
          </h1>

          <ScrollFadeUp delay={0.2}>
            <p className="max-w-lg text-center text-base text-text-secondary md:text-lg">
              {subStatement}
            </p>
          </ScrollFadeUp>

          <ScrollFadeUp delay={0.35}>
            <div className="mx-auto mt-2 w-full max-w-md rounded-2xl border border-glass-border bg-glass-bg p-6 text-center backdrop-blur-md sm:p-8">
              <p className="heading-font text-2xl font-bold text-brand-mid sm:text-3xl md:text-4xl">
                {priceLabel ?? "From"} {price}
              </p>

              <div className="mt-5 flex flex-col items-center gap-3">
                <MagneticElement strength={0.4}>
                  <MovingBorderButton
                    as="a"
                    href={primaryCtaUrl}
                    duration={3000}
                    containerClassName="inline-flex w-full sm:w-auto"
                  >
                    {primaryCtaLabel}
                  </MovingBorderButton>
                </MagneticElement>

                {secondaryCtaText && secondaryCtaUrl && (
                  <Link
                    href={secondaryCtaUrl}
                    className="min-h-[44px] inline-flex items-center text-sm text-brand-mid transition-colors hover:text-brand-light"
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </ScrollFadeUp>
        </motion.div>
      </LampContainer>

      {scrollCueTargetId && (
        <div className="absolute bottom-8 right-6 z-[60] md:right-12">
          <ScrollCue
            text="VIEW OUR WORK · VIEW OUR WORK · "
            targetId={scrollCueTargetId}
            className="py-0"
          />
        </div>
      )}
    </section>
  );
}
