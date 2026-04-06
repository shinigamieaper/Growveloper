"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { trackCTAClick } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import type { ServicePageHeroData } from "@/lib/types";

interface ServiceHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: ServicePageHeroData | null;
}

export function ServiceHero({ data, className, ...props }: ServiceHeroProps) {
  const pathname = usePathname();

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
          className="flex max-w-4xl flex-col items-center gap-6"
        >
          <h1 className="heading-font text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {renderHeadline()}
          </h1>

          <p className="max-w-lg text-center text-base text-text-secondary md:text-lg">
            {subStatement}
          </p>
        </motion.div>
      </LampContainer>

      {/* CTAs — outside LampContainer, pulled up into glow. No scroll trigger — hero CTAs must be visible on load. */}
      <div className="relative z-60 mx-auto -mt-32 flex flex-col items-center gap-3 px-6 pb-16 sm:flex-row sm:justify-center sm:gap-4">
        <MagneticElement strength={0.4}>
          <MovingBorderButton
            as={Link}
            href={primaryCtaUrl}
            duration={3000}
            containerClassName="inline-flex w-full sm:w-auto"
            onClick={() => trackCTAClick(pathname, primaryCtaLabel, primaryCtaUrl)}
          >
            {primaryCtaLabel}
          </MovingBorderButton>
        </MagneticElement>

        <MagneticElement strength={0.3}>
          <MovingBorderButton
            as={Link}
            href={secondaryCtaUrl}
            duration={3500}
            variant="inverted"
            containerClassName="inline-flex w-full sm:w-auto"
            onClick={() => trackCTAClick(pathname, secondaryCtaLabel ?? "", secondaryCtaUrl ?? "")}
          >
            {secondaryCtaLabel}
          </MovingBorderButton>
        </MagneticElement>
      </div>

      {scrollCueTargetId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60] md:left-auto md:right-12 md:translate-x-0">
          <ScrollCue
            text={scrollCueText ?? "EXPLORE · EXPLORE · EXPLORE · "}
            targetId={scrollCueTargetId}
            className="py-0"
          />
        </div>
      )}
    </section>
  );
}
