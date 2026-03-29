"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { AuditFindingsData } from "@/lib/types";

interface AuditFindingsProps extends React.ComponentPropsWithoutRef<"section"> {
  data: AuditFindingsData | null;
}

export function AuditFindings({ data, className, ...props }: AuditFindingsProps) {
  if (!data || data.findings.length === 0) return null;

  const isGrid = data.layoutStyle === "grid";

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
        />

        {isGrid ? (
          <FindingsGrid findings={data.findings} />
        ) : (
          <FindingsTimeline findings={data.findings} />
        )}
      </div>
    </section>
  );
}

/* ─── Grid layout with GSAP stagger ─── */

function FindingsGrid({ findings }: { findings: AuditFindingsData["findings"] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        window.matchMedia("(max-width: 767px)").matches;

      const cards = containerRef.current.querySelectorAll("[data-finding]");
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.4 : 0.6,
            stagger: 0.12,
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
    <div ref={containerRef} className="grid gap-4 md:grid-cols-2">
      {findings.map((finding, index) => (
        <blockquote
          key={finding.text}
          data-finding
          className="group rounded-xl border border-glass-border border-l-4 border-l-brand-mid bg-glass-bg p-5 backdrop-blur-md transition-all duration-300 hover:border-l-brand-light hover:shadow-lg hover:shadow-brand-mid/5"
        >
          <p className="text-sm italic leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
            &ldquo;{finding.text}&rdquo;
          </p>
        </blockquote>
      ))}
    </div>
  );
}

/* ─── Timeline layout with scroll-drawing vertical line ─── */

function FindingsTimeline({ findings }: { findings: AuditFindingsData["findings"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      if (!containerRef.current || !lineRef.current) return;

      const cards = containerRef.current.querySelectorAll("[data-finding]");
      if (cards.length === 0) return;

      gsap.set(cards, { opacity: 0, x: -30 });
      gsap.set(lineRef.current, { scaleY: 0 });

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.5,
        },
      });

      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          x: 0,
          duration: DURATION.reveal,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl pl-8 md:pl-12">
      <div
        ref={lineRef}
        className="absolute left-0 top-0 h-full w-0.5 origin-top bg-gradient-to-b from-brand-mid via-brand-dark to-brand-mid/20 md:left-4"
        aria-hidden
      />

      <div className="flex flex-col gap-6">
        {findings.map((finding) => (
          <blockquote
            key={finding.text}
            data-finding
            className="group relative rounded-xl border border-glass-border border-l-4 border-l-brand-mid bg-glass-bg p-5 backdrop-blur-md transition-all duration-300 hover:border-l-brand-light hover:shadow-lg hover:shadow-brand-mid/5"
          >
            <div
              className="absolute -left-[calc(2rem+5px)] top-6 h-2.5 w-2.5 rounded-full border-2 border-brand-mid bg-bg-primary md:-left-[calc(3rem+5px)]"
              aria-hidden
            />
            <p className="text-sm italic leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
              &ldquo;{finding.text}&rdquo;
            </p>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
