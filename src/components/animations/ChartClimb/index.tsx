"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ChartClimbProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Animation duration in seconds — default 2 */
  duration?: number;
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
}

/* Hardcoded demo data — purely visual, not a real data chart */
const DATA_POINTS = [
  { x: 0, y: 85 },
  { x: 60, y: 78 },
  { x: 120, y: 72 },
  { x: 180, y: 60 },
  { x: 240, y: 55 },
  { x: 300, y: 48 },
  { x: 360, y: 35 },
  { x: 420, y: 28 },
  { x: 480, y: 22 },
  { x: 540, y: 18 },
  { x: 600, y: 10 },
];

const VIEW_W = 600;
const VIEW_H = 100;

function buildPath(points: typeof DATA_POINTS): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
}

function buildFillPath(points: typeof DATA_POINTS): string {
  const line = buildPath(points);
  return `${line} L${points[points.length - 1].x},${VIEW_H} L${points[0].x},${VIEW_H} Z`;
}

export function ChartClimb({
  duration = 2,
  start = "top 85%",
  className,
  ...props
}: ChartClimbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);

  const linePath = buildPath(DATA_POINTS);
  const fillPath = buildFillPath(DATA_POINTS);

  useGSAP(
    () => {
      const line = lineRef.current;
      const fill = fillRef.current;
      if (!line || !fill) return;

      const reduced = prefersReducedMotion();

      if (reduced) {
        line.style.strokeDashoffset = "0";
        fill.style.opacity = "1";
        return;
      }

      const length = line.getTotalLength();

      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(fill, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.to(line, {
        strokeDashoffset: 0,
        duration,
        ease: EASE.smoothInOut,
      }).to(
        fill,
        {
          opacity: 1,
          duration: duration * 0.6,
          ease: EASE.smooth,
        },
        `-=${duration * 0.4}`,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden rounded-2xl border border-glass-border bg-bg-tertiary p-6 md:p-8",
        className,
      )}
      {...props}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="h-48 w-full md:h-64"
        aria-hidden="true"
      >
        {/* Teal fill area at 15% opacity */}
        <path
          ref={fillRef}
          d={fillPath}
          fill="#5ab1b1"
          fillOpacity={0.15}
          style={{ opacity: 0 }}
        />
        {/* Teal line */}
        <path
          ref={lineRef}
          d={linePath}
          fill="none"
          stroke="#5ab1b1"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
