"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Parallax speed factor (0-1) — default 0.15. Higher = more movement. */
  speed?: number;
  /** Children — the content */
  children: React.ReactNode;
}

export function ParallaxSection({
  speed = 0.15,
  className,
  children,
  ...props
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current || !innerRef.current) return;

      /* Desktop only — skip parallax on mobile */
      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) return;

      const yPercent = speed * 100;

      gsap.fromTo(
        innerRef.current,
        { yPercent: -yPercent / 2 },
        {
          yPercent: yPercent / 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
