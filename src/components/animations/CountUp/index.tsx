"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface CountUpProps extends React.ComponentPropsWithoutRef<"span"> {
  /** Target number to count up to */
  end: number;
  /** Animation duration in seconds — default 2 */
  duration?: number;
  /** Text to show before the number (e.g. "$") */
  prefix?: string;
  /** Text to show after the number (e.g. "%", "x", "+") */
  suffix?: string;
  /** Number of decimal places — default 0 */
  decimals?: number;
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
}

export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  start = "top 85%",
  className,
  ...props
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(
    () => {
      if (!spanRef.current) return;

      /* If reduced motion, show final value immediately */
      if (prefersReducedMotion()) {
        spanRef.current.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        return;
      }

      counterRef.current.value = 0;
      spanRef.current.textContent = `${prefix}0${suffix}`;

      gsap.to(counterRef.current, {
        value: end,
        duration,
        ease: EASE.smooth,
        snap: decimals === 0 ? { value: 1 } : undefined,
        scrollTrigger: {
          trigger: spanRef.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          if (spanRef.current) {
            spanRef.current.textContent = `${prefix}${counterRef.current.value.toFixed(decimals)}${suffix}`;
          }
        },
      });
    },
    { scope: spanRef },
  );

  return (
    <span
      ref={spanRef}
      className={cn("tabular-nums", className)}
      {...props}
    >
      {prefix}0{suffix}
    </span>
  );
}
