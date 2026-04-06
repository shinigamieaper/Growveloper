"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn, fluidGrid } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { AuditProcessData } from "@/lib/types";

interface AuditProcessProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditProcessData | null;
}

export function AuditProcess({ data, className, ...props }: AuditProcessProps) {
  if (!data || data.steps.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />
        <ProcessTimeline steps={data.steps} />
      </div>
    </section>
  );
}

/**
 * Splits steps into rows, never leaving a single orphan on its own row.
 * 1–4 steps → one row. 5+ → balanced rows of 3–4.
 * Lookup covers realistic CMS step counts; generic fallback handles the rest.
 */
function getRowSizes(total: number): number[] {
  const lookup: Record<number, number[]> = {
    1: [1], 2: [2], 3: [3], 4: [4],
    5: [3, 2], 6: [3, 3], 7: [4, 3], 8: [4, 4],
    9: [3, 3, 3], 10: [4, 3, 3], 11: [4, 4, 3], 12: [4, 4, 4],
  };
  if (lookup[total]) return lookup[total];
  // Fallback for >12: rows of 4
  const rows: number[] = [];
  let rem = total;
  while (rem > 4) { rows.push(4); rem -= 4; }
  if (rem > 0) rows.push(rem);
  return rows;
}

function buildRows<T>(items: T[]): T[][] {
  const sizes = getRowSizes(items.length);
  const rows: T[][] = [];
  let offset = 0;
  for (const size of sizes) {
    rows.push(items.slice(offset, offset + size));
    offset += size;
  }
  return rows;
}

function ProcessTimeline({ steps }: { steps: AuditProcessData["steps"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const circles = containerRef.current.querySelectorAll("[data-step-circle]");
      const cards = containerRef.current.querySelectorAll("[data-step-card]");
      const lines = containerRef.current.querySelectorAll("[data-row-line]");

      gsap.set(circles, { scale: 0, opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 30 });

      if (!isMobile) {
        lines.forEach((line) => {
          gsap.set(line, { scaleX: 0 });
          gsap.to(line, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 70%",
              end: "top 40%",
              scrub: 0.6,
            },
          });
        });
      }

      circles.forEach((circle, i) => {
        gsap.to(circle, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: circle,
            start: isMobile ? "top 90%" : "top 75%",
            toggleActions: "play none none none",
          },
          delay: isMobile ? i * 0.1 : 0,
        });
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: DURATION.reveal,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 90%" : "top 80%",
            toggleActions: "play none none none",
          },
          delay: isMobile ? i * 0.08 : 0,
        });
      });
    },
    { scope: containerRef },
  );

  const handleCircleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, {
      scale: 1.15,
      borderColor: "var(--brand-mid)",
      duration: 0.25,
      ease: EASE.snap,
    });
    const text = e.currentTarget.querySelector("[data-step-number]");
    if (text) gsap.to(text, { scale: 1.1, duration: 0.25, ease: EASE.snap });
  };

  const handleCircleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      borderColor: "rgba(90, 177, 177, 0.4)",
      duration: 0.25,
      ease: EASE.snap,
    });
    const text = e.currentTarget.querySelector("[data-step-number]");
    if (text) gsap.to(text, { scale: 1, duration: 0.25, ease: EASE.snap });
  };

  const rows = buildRows(steps);

  return (
    <div ref={containerRef} className="flex flex-col gap-16">
      {rows.map((row, rowIndex) => {
        const maxCols: 2 | 3 | 4 = row.length === 4 ? 4 : 3;
        // Show line only at the breakpoint where all cols are side-by-side
        const lineBreakpoint = row.length === 4 ? "hidden lg:block" : "hidden md:block";
        const pct = (1 / (2 * row.length)) * 100;

        return (
          <div key={rowIndex} className="relative">
            {row.length > 1 && (
              <div
                data-row-line
                className={`absolute top-8 h-0.5 origin-left bg-linear-to-r from-brand-mid/60 via-brand-mid to-brand-mid/60 ${lineBreakpoint}`}
                style={{ left: `${pct}%`, right: `${pct}%` }}
                aria-hidden
              />
            )}

            <div className={`${fluidGrid(row.length, maxCols)} gap-10 md:gap-6`}>
              {row.map((step) => (
                <div key={step.stepNumber} className="relative flex flex-col items-center text-center">
                  <div
                    data-step-circle
                    className="group relative z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-brand-mid/40 bg-bg-secondary transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-mid/20"
                    onMouseEnter={handleCircleEnter}
                    onMouseLeave={handleCircleLeave}
                    role="presentation"
                  >
                    <span data-step-number className="heading-font text-2xl font-bold text-brand-mid">
                      {step.stepNumber}
                    </span>
                  </div>

                  <div data-step-card className="mt-4">
                    <h3 className="heading-font text-lg font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
