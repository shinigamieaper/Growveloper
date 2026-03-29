"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { MagneticElement } from "@/components/animations/MagneticElement";
import type { HomeHeroData } from "@/lib/types";

interface HeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: HomeHeroData | null;
}

export function Hero({ data, className, ...props }: HeroProps) {
  if (!data) return null;

  const {
    headline,
    highlightedWord,
    subStatement,
    primaryCtaLabel,
    primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaUrl,
    scrollCueText,
    scrollCueTargetId,
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
          className="flex max-w-4xl flex-col items-center gap-5"
        >
          <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {renderHeadline()}
          </h1>

          <p className="max-w-lg text-center text-base text-text-secondary md:text-lg">
            {subStatement}
          </p>

          <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
            <MagneticElement strength={0.4}>
              <MovingBorderButton
                as={Link}
                href={primaryCtaUrl}
                duration={3000}
                containerClassName="inline-flex"
              >
                {primaryCtaLabel}
              </MovingBorderButton>
            </MagneticElement>

            {secondaryCtaLabel && secondaryCtaUrl && (
              <MagneticElement strength={0.3}>
                <MovingBorderButton
                  as={Link}
                  href={secondaryCtaUrl}
                  duration={4000}
                  variant="inverted"
                  containerClassName="inline-flex"
                >
                  {secondaryCtaLabel}
                </MovingBorderButton>
              </MagneticElement>
            )}
          </div>
        </motion.div>
      </LampContainer>

      {scrollCueTargetId && (
        <div className="absolute bottom-8 right-6 z-[60] md:right-12">
          <ScrollCue
            text={scrollCueText ?? "EXPLORE OUR WORK · EXPLORE OUR WORK · "}
            targetId={scrollCueTargetId}
            className="py-0"
          />
        </div>
      )}
    </section>
  );
}
