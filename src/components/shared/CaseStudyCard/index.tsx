"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";
import type { CaseStudyCardData } from "@/lib/types";

const accentVariants = [
  {
    panel: "bg-case-accent-1",
    heading: "text-case-accent-1-foreground",
    body: "text-case-accent-1-foreground/80",
    pill: "border-case-accent-1-foreground/25 text-case-accent-1-foreground/80",
  },
  {
    panel: "bg-case-accent-2",
    heading: "text-case-accent-2-foreground",
    body: "text-case-accent-2-foreground/80",
    pill: "border-case-accent-2-foreground/25 text-case-accent-2-foreground/80",
  },
  {
    panel: "bg-case-accent-3",
    heading: "text-case-accent-3-foreground",
    body: "text-case-accent-3-foreground/85",
    pill: "border-case-accent-3-foreground/25 text-case-accent-3-foreground/80",
  },
] as const;

interface CaseStudyCardProps extends React.ComponentPropsWithoutRef<"article"> {
  data: CaseStudyCardData | null;
  colorIndex?: number;
}

export function CaseStudyCard({ data, colorIndex = 0, className, ...props }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!data) return null;

  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;
  const hasVideo = Boolean(data.heroVideo);
  const hasMedia = Boolean(data.heroImage) || hasVideo;
  const caseUrl = `/work/${data.slug}`;
  const variant = accentVariants[colorIndex % accentVariants.length];

  /* ─── GSAP hover ─── */
  const handleMouseEnter = useCallback(() => {
    if (reduced || !cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.015,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });

    if (borderRef.current) {
      gsap.to(borderRef.current, {
        opacity: 0.8,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (hasVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [reduced, hasVideo]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });

    if (borderRef.current) {
      gsap.to(borderRef.current, {
        opacity: 0.15,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [reduced, hasVideo]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || reduced) return;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave, reduced]);

  /* ─── Tech icon renderer ─── */
  const renderTechIcon = (tech: string) => {
    const logoUrl = data.techStackLogos?.find((t) => t.name === tech)?.logo;
    if (logoUrl) {
      return (
        <Image
          key={tech}
          src={logoUrl}
          alt={tech}
          width={20}
          height={20}
          className="h-5 w-5 object-contain opacity-70 transition-opacity group-hover:opacity-100"
        />
      );
    }
    return (
      <span
        key={tech}
        className={cn("rounded border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", variant.pill)}
      >
        {tech}
      </span>
    );
  };

  const card = (
    <article
      ref={cardRef}
      className={cn(
        "group relative grid overflow-hidden rounded-2xl border border-glass-border bg-bg-secondary",
        "grid-cols-1 md:grid-cols-[55%_45%]",
        !reduced && "will-change-transform",
        className,
      )}
      {...props}
    >
      {/* ── Border accent overlay ── */}
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-brand-mid"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      />

      {/* ── Arrow affordance ── */}
      <div
        className="pointer-events-none absolute right-5 top-5 z-20 text-brand-mid opacity-70 transition-opacity group-hover:opacity-100"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* ── Left: Accent content panel ── */}
      <div className={cn("relative flex flex-col justify-between gap-6 rounded-l-2xl p-8 md:p-10 lg:p-12", variant.panel)}>

        <div className="flex flex-col gap-4">
          {/* Result headline */}
          <h3 className={cn("heading-font text-2xl font-bold uppercase leading-tight md:text-3xl lg:text-[2.5rem] lg:leading-[1.1]", variant.heading)}>
            {data.resultHeadline}
          </h3>

          {/* Description */}
          <p className={cn("max-w-md text-sm leading-relaxed md:text-base", variant.body)}>
            {data.situation}
          </p>
        </div>

        {/* Tech stack icons at bottom */}
        {data.techStack.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {data.techStack.map(renderTechIcon)}
          </div>
        )}
      </div>

      {/* ── Right: Media panel ── */}
      <div className="relative min-h-[280px] md:min-h-[360px]">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={data.heroVideo}
            poster={data.heroImage}
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : hasMedia ? (
          <Image
            src={data.heroImage!}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="h-full w-full bg-linear-to-br from-brand-dark to-brand-mid"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Clickable overlay ── */}
      <Link
        href={caseUrl}
        className="absolute inset-0 z-20"
        aria-label={`View case study: ${data.title}`}
      >
        <span className="sr-only">View case study: {data.title}</span>
      </Link>
    </article>
  );

  if (reduced) return card;

  return (
    <SpotlightCard
      spotlightColor="rgba(90, 177, 177, 0.15)"
      className="rounded-2xl"
    >
      {card}
    </SpotlightCard>
  );
}
