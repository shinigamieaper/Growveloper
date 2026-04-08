"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE, STAGGER } from "@/lib/gsap";
import { MetricsCounter } from "@/components/animations/MetricsCounter";
import { cn } from "@/lib/utils";

interface WorkflowAnimationProps extends React.ComponentPropsWithoutRef<"div"> {
  /** ScrollTrigger start position — default "top 85%" */
  start?: string;
  /** Node labels — defaults to the original hardcoded set */
  steps?: string[];
  /** Stat counter value — default 142 */
  statValue?: number;
  /** Stat counter label — default "Hours Saved Per Month" */
  statLabel?: string;
  /** Stat counter suffix — default "+" */
  statSuffix?: string;
}

const DEFAULT_NODES = [
  "Lead In",
  "Scored",
  "CRM Entry",
  "Email Sent",
  "Task Created",
];

export function WorkflowAnimation({
  start = "top 85%",
  steps,
  statValue = 142,
  statLabel = "Hours Saved Per Month",
  statSuffix = "+",
  className,
  ...props
}: WorkflowAnimationProps) {
  const nodes = steps && steps.length > 0 ? steps : DEFAULT_NODES;
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const reduced = prefersReducedMotion();

      if (reduced) {
        nodeRefs.current.forEach((n) => {
          if (n) {
            n.style.borderColor = "#5ab1b1";
            n.style.backgroundColor = "rgba(90, 177, 177, 0.15)";
            n.style.color = "#2b7575";
          }
        });
        lineRefs.current.forEach((l) => {
          if (l) l.style.backgroundColor = "#5ab1b1";
        });
        if (counterRef.current) counterRef.current.style.opacity = "1";
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });

      nodes.forEach((_, i) => {
        const node = nodeRefs.current[i];
        const pulse = pulseRefs.current[i];
        const line = lineRefs.current[i];

        if (node) {
          tl.to(
            node,
            {
              borderColor: "#5ab1b1",
              backgroundColor: "rgba(90, 177, 177, 0.15)",
              color: "#2b7575",
              duration: 0.4,
              ease: EASE.smooth,
            },
            i * STAGGER.relaxed + 0.2,
          );
        }

        if (pulse) {
          tl.fromTo(
            pulse,
            { scale: 0.8, opacity: 0 },
            {
              scale: 2,
              opacity: 0,
              duration: 0.8,
              ease: EASE.smooth,
            },
            i * STAGGER.relaxed + 0.2,
          );
          tl.set(pulse, { scale: 0.8 }, i * STAGGER.relaxed + 1.0);
        }

        if (line) {
          tl.to(
            line,
            {
              backgroundColor: "#5ab1b1",
              scaleX: 1,
              duration: 0.3,
              ease: EASE.smooth,
            },
            i * STAGGER.relaxed + 0.4,
          );
        }
      });

      if (counterRef.current) {
        tl.to(
          counterRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: EASE.smooth,
          },
          ">-0.3",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden rounded-2xl border border-glass-border bg-bg-tertiary p-6 md:p-10",
        className,
      )}
      {...props}
    >
      {/* Node row — horizontal on desktop, wraps on mobile */}
      <div className="flex flex-wrap items-center justify-center gap-0 md:flex-nowrap">
        {nodes.map((label, i) => (
          <React.Fragment key={label}>
            {/* Node */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                {/* Pulse ring */}
                <div
                  ref={(el) => { pulseRefs.current[i] = el; }}
                  className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand-mid"
                  style={{ opacity: 0 }}
                  aria-hidden="true"
                />
                {/* Node circle */}
                <div
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-text-secondary/30 bg-bg-tertiary text-sm font-bold text-text-secondary transition-none md:h-14 md:w-14"
                >
                  {i + 1}
                </div>
              </div>
              <span className="max-w-20 text-center text-[11px] font-medium text-text-secondary md:max-w-none md:text-xs">
                {label}
              </span>
            </div>

            {/* Connecting line (not after last node) */}
            {i < nodes.length - 1 && (
              <div
                ref={(el) => { lineRefs.current[i] = el; }}
                className="mx-1 hidden h-0.5 flex-1 origin-left bg-text-secondary/20 md:block"
                style={{ transform: "scaleX(1)" }}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Time saved counter */}
      <div
        ref={counterRef}
        className="mt-8 flex justify-center"
        style={{ opacity: 0, transform: "translateY(12px)" }}
      >
        <MetricsCounter
          value={statValue}
          label={statLabel}
          suffix={statSuffix}
          className="border-none bg-transparent"
        />
      </div>
    </div>
  );
}
