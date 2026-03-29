"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface LineRevealProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Direction the line draws from — default "left" */
  direction?: "left" | "right" | "center";
  /** Animation duration in seconds — default 0.8 */
  duration?: number;
  /** ScrollTrigger start position — default "top 90%" */
  start?: string;
}

export function LineReveal({
  direction = "left",
  duration = DURATION.reveal,
  start = "top 90%",
  className,
  ...props
}: LineRevealProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!lineRef.current) return;

      const origin =
        direction === "left"
          ? "left center"
          : direction === "right"
            ? "right center"
            : "center center";

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: origin,
      });

      gsap.to(lineRef.current, {
        scaleX: 1,
        duration,
        ease: EASE.smoothInOut,
        scrollTrigger: {
          trigger: lineRef.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: lineRef },
  );

  return (
    <div
      ref={lineRef}
      className={cn("h-px w-full bg-glass-border", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
