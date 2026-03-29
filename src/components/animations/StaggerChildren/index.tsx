"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, EASE, DURATION, STAGGER } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Stagger delay between children in seconds */
  stagger?: number;
  /** Animation duration per child in seconds */
  duration?: number;
  /** Y offset in pixels — default 30 */
  y?: number;
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
  /** Children — the items to stagger */
  children: React.ReactNode;
}

export function StaggerChildren({
  stagger: staggerAmount = STAGGER.normal,
  duration = DURATION.reveal,
  y = 30,
  start = "top 85%",
  className,
  children,
  ...props
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const items = containerRef.current.querySelectorAll("[data-stagger-item]");
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: isMobile ? 20 : y });

      ScrollTrigger.batch(items, {
        start,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: isMobile ? duration * 0.75 : duration,
            stagger: staggerAmount,
            ease: EASE.smooth,
            overwrite: true,
          });
        },
        once: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn(className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <div data-stagger-item>
            {child}
          </div>
        );
      })}
    </div>
  );
}
