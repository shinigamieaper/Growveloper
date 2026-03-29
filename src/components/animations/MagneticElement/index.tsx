"use client";

import React, { useRef, useCallback } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MagneticElementProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Magnetic pull strength (0-1) — default 0.3 */
  strength?: number;
  /** Children — the interactive element */
  children: React.ReactNode;
}

export function MagneticElement({
  strength = 0.3,
  className,
  children,
  ...props
}: MagneticElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quickToX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const quickToY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      /* Desktop only — skip on touch devices */
      const isTouch =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: none)").matches;
      if (isTouch) return;

      quickToX.current = gsap.quickTo(containerRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      quickToY.current = gsap.quickTo(containerRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !quickToX.current || !quickToY.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      quickToX.current(deltaX);
      quickToY.current(deltaY);
    },
    [strength],
  );

  const handleMouseLeave = useCallback(() => {
    if (!quickToX.current || !quickToY.current) return;
    quickToX.current(0);
    quickToY.current(0);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}
