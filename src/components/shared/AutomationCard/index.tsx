"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Filter,
  BarChart2,
  FileText,
  Database,
  Headphones,
  Settings,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { AutomationToolIcon } from "@/components/shared/AutomationToolIcons";
import type { AutomationCardData } from "@/lib/types";

/* ─── Category → icon mapping for gradient placeholder ─── */

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  "Lead Gen": Filter,
  Reporting: BarChart2,
  Content: FileText,
  CRM: Database,
  Support: Headphones,
  Operations: Settings,
};

/* ─── Component ─── */

interface AutomationCardProps extends React.ComponentPropsWithoutRef<"div"> {
  data: AutomationCardData;
}

export function AutomationCard({ data, className, ...props }: AutomationCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const handleMouseEnter = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.015,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });
  }, [reduced]);

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

  const CategoryIcon = CATEGORY_ICON_MAP[data.category] ?? Settings;

  return (
    <div className={cn("relative", className)} {...props}>
      <SpotlightCard
        spotlightColor="rgba(90, 177, 177, 0.12)"
        radius={300}
        className="h-full rounded-2xl"
      >
        <article
          ref={cardRef}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-mid/5",
            !reduced && "will-change-transform",
          )}
        >
          {/* ─── Visual preview zone ─── */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-dark/40 to-bg-secondary">
            {data.coverImage ? (
              <Image
                src={data.coverImage}
                alt={data.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <CategoryIcon
                  className="h-12 w-12 text-brand-mid/30"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            )}

            {/* Category badge */}
            <span className="absolute left-3 top-3 rounded-full bg-bg-primary/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-mid backdrop-blur-sm">
              {data.category}
            </span>


          </div>

          {/* ─── Content zone ─── */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            {/* Title */}
            <h3 className="heading-font text-lg font-bold tracking-tight text-text-primary">
              {data.title}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {data.description}
            </p>

            {/* Tools strip */}
            {data.toolsUsed.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {data.toolsUsed.slice(0, 4).map((tool) => (
                  <AutomationToolIcon
                    key={tool.name}
                    name={tool.iconKey ?? tool.name}
                    className="h-4 w-4 text-text-tertiary"
                  />
                ))}
                {data.toolsUsed.length > 4 && (
                  <span className="font-mono text-[10px] text-text-tertiary">
                    +{data.toolsUsed.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom row: setup time + price */}
            <div className="flex items-end justify-between gap-3">
              <span className="font-mono text-xs text-text-tertiary">
                Live in {data.setupTimeDays} {data.setupTimeDays === 1 ? "day" : "days"}
              </span>
              {data.accessType === "fixed" && data.price != null ? (
                <span className="font-mono text-lg font-bold text-brand-mid">
                  &pound;{data.price.toLocaleString()}
                </span>
              ) : (
                <span className="font-mono text-sm font-medium text-text-tertiary">
                  Custom pricing
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/automations/${data.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-mid/30 bg-brand-mid/5 px-4 py-2.5 font-mono text-sm font-medium text-brand-mid transition-all hover:border-brand-mid hover:bg-brand-mid/10"
            >
              View Details
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>
        </article>
      </SpotlightCard>
    </div>
  );
}
