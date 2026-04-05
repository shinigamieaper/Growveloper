"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
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

function ProcessTimeline({ steps }: { steps: AuditProcessData["steps"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const circles = containerRef.current.querySelectorAll("[data-step-circle]");
      const cards = containerRef.current.querySelectorAll("[data-step-card]");

      gsap.set(circles, { scale: 0, opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 30 });

      if (lineRef.current && !isMobile) {
        gsap.set(lineRef.current, { scaleX: 0 });

        gsap.to(lineRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 0.6,
          },
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
    if (text) {
      gsap.to(text, { scale: 1.1, duration: 0.25, ease: EASE.snap });
    }
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
    if (text) {
      gsap.to(text, { scale: 1, duration: 0.25, ease: EASE.snap });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={lineRef}
        className="absolute left-[8.33%] right-[8.33%] top-8 hidden h-0.5 origin-left bg-gradient-to-r from-brand-mid/60 via-brand-mid to-brand-mid/60 md:block"
        aria-hidden
      />

      <div className={`${fluidGrid(steps.length, 3)} gap-10 md:gap-6`}>
        {steps.map((step) => (
          <div key={step.stepNumber} className="relative flex flex-col items-center text-center">
            <div
              data-step-circle
              className="group relative z-10 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-brand-mid/40 bg-bg-secondary transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-mid/20"
              onMouseEnter={handleCircleEnter}
              onMouseLeave={handleCircleLeave}
              role="presentation"
            >
              <span
                data-step-number
                className="heading-font text-2xl font-bold text-brand-mid"
              >
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
}
