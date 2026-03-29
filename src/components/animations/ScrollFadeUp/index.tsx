"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrollFadeUpProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Y offset in pixels — default 40 */
  y?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
  /** Children to fade up */
  children: React.ReactNode;
}

export function ScrollFadeUp({
  y = 40,
  duration = DURATION.reveal,
  delay = 0,
  start = "top 85%",
  className,
  children,
  ...props
}: ScrollFadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!ref.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      gsap.from(ref.current, {
        y: isMobile ? 20 : y,
        opacity: 0,
        duration: isMobile ? duration * 0.75 : duration,
        delay,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
