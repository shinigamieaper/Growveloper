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
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="flex max-w-4xl flex-col items-center gap-4 sm:gap-6 text-center"
        >
          <h1 className="heading-font text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl [@media(orientation:landscape)_and_(max-height:600px)]:text-2xl">
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
          <p className="max-w-lg text-base text-text-secondary md:text-lg [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
            {subStatement}
          </p>
        </motion.div>
      </LampContainer>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-60 md:left-auto md:right-12 md:translate-x-0 [@media(orientation:landscape)_and_(max-height:600px)]:hidden">
        <ScrollCue
          text={scrollCueText}
          targetId={scrollCueTargetId}
          className="py-0"
        />
      </div>
    </section>
  );
}
