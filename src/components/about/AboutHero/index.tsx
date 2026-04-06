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
      className={cn("relative flex min-h-screen overflow-hidden", className)}
      {...props}
    >
      {/* Portrait — right half, face aligned to top */}
      {portraitImage && (
        <div
          ref={portraitRef}
          className="pointer-events-none absolute right-0 top-0 z-10 h-[85%] w-[55%] sm:h-full sm:w-[55%] md:w-[58%]"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 15%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 30%), linear-gradient(to top, transparent 0%, black 15%)",
            WebkitMaskComposite: "source-in",
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={portraitImage}
              alt={portraitAlt ?? name}
              fill
              sizes="(max-width: 640px) 55vw, (max-width: 768px) 55vw, 58vw"
              className="object-cover object-top grayscale"
              priority
            />
          </div>
        </div>
      )}

      {/* Text — left side, vertically centered in the upper portion */}
      <div className="relative z-20 flex w-[48%] flex-col justify-start px-5 pt-24 sm:w-[45%] sm:pt-28 md:px-10 md:pt-32 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-tertiary">
            {namePrefix ?? "Hello, I\u2019m"}
          </p>
          <h1 className="mt-3 heading-font text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-[8rem]">
            <CanvasText text={name} />
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg">
            {identity}
          </p>
        </motion.div>
      </div>

      {/* ScrollCue — bottom-left, always in the clear zone */}
      {scrollCueTargetId && (
        <div className="absolute bottom-25 left-5 z-30 md:bottom-12 md:left-14">
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
