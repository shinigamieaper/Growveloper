"use client";

import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasText } from "@/components/ui/canvas-text";
import { ScrollCue } from "@/components/shared/ScrollCue";

interface AutomationsCatalogueHeroProps {
  headline: string;
  highlightedWord: string;
  subStatement: string;
  scrollCueText: string;
  scrollCueTargetId: string;
}

export function AutomationsCatalogueHero({
  headline,
  highlightedWord,
  subStatement,
  scrollCueText,
  scrollCueTargetId,
}: AutomationsCatalogueHeroProps) {
  const parts = headline.includes(highlightedWord)
    ? headline.split(highlightedWord)
    : null;

  return (
    <section className="relative">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-6 text-center"
        >
          <h1 className="heading-font text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {parts ? (
              <>
                {parts[0]}
                <CanvasText text={highlightedWord} />
                {parts[1]}
              </>
            ) : (
              headline
            )}
          </h1>
          <p className="max-w-lg text-base text-text-secondary md:text-lg">
            {subStatement}
          </p>
        </motion.div>
      </LampContainer>

      <div className="absolute bottom-8 right-6 z-60 md:right-12">
        <ScrollCue
          text={scrollCueText}
          targetId={scrollCueTargetId}
          className="py-0"
        />
      </div>
    </section>
  );
}
