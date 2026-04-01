"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { CanvasText } from "@/components/ui/canvas-text";
import { ScrollCue } from "@/components/shared/ScrollCue";
import { gsap, useGSAP, EASE, DURATION } from "@/lib/gsap";
import type { AboutHeroData } from "@/lib/types";

interface AboutHeroProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AboutHeroData | null;
}

export function AboutHero({ data, className, ...props }: AboutHeroProps) {
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!portraitRef.current) return;
    gsap.from(portraitRef.current, {
      y: 80,
      opacity: 0,
      duration: DURATION.slow * 1.4,
      ease: EASE.snap,
      delay: 0.2,
    });
  }, []);

  if (!data) return null;

  const { name, identity, portraitImage, portraitAlt, scrollCueText, scrollCueTargetId, namePrefix } = data;

  return (
    <section
      className={cn("relative flex min-h-screen items-center overflow-hidden", className)}
      {...props}
    >
      {/* Text — left side */}
      <div className="relative z-20 w-full px-6 md:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="max-w-sm"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            {namePrefix ?? "Hello, I\u2019m"}
          </p>
          <h1 className="mt-5 heading-font text-6xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-[8rem]">
            <CanvasText text={name} />
          </h1>
          <p className="mt-5 max-w-xs text-base leading-relaxed text-text-secondary md:text-lg">
            {identity}
          </p>
        </motion.div>
      </div>

      {/* Portrait — right side, GSAP float-up entrance */}
      {portraitImage && (
        <div
          ref={portraitRef}
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[85%] sm:w-[78%] md:w-[68%]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 30%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 22%), linear-gradient(to top, transparent 0%, black 30%)",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={portraitImage}
              alt={portraitAlt ?? name}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 78vw, 68vw"
              className="object-cover object-top grayscale"
              priority
            />
          </div>
        </div>
      )}

      {/* Scroll cue — bottom-left, clear of portrait */}
      {scrollCueTargetId && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 md:left-14 md:translate-x-0">
          <ScrollCue
            text={scrollCueText ?? "SCROLL TO LEARN MORE \u00b7 "}
            targetId={scrollCueTargetId}
            className="py-0"
          />
        </div>
      )}
    </section>
  );
}
