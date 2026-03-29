"use client";

import React, { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Layout, Layers, FileText, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const TYPE_ICON_MAP: Record<string, LucideIcon> = {
  Guide: BookOpen,
  Template: Layout,
  Framework: Layers,
  Playbook: FileText,
};

interface ResourceCardProps extends React.ComponentPropsWithoutRef<"div"> {
  headline: string;
  subCopy?: string;
  image?: string;
  tag?: string;
  resourceType: string;
  accessType: "free" | "paid";
  price?: number;
  href?: string;
}

export function ResourceCard({
  headline,
  subCopy,
  image,
  tag,
  resourceType,
  accessType,
  price,
  href,
  className,
  ...props
}: ResourceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const handleMouseEnter = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1.015, duration: DURATION.fast, ease: EASE.smooth });
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !cardRef.current) return;
    gsap.to(cardRef.current, { scale: 1, duration: DURATION.fast, ease: EASE.smooth });
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

  if (!headline) return null;

  const TypeIcon = TYPE_ICON_MAP[resourceType] ?? FileText;

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
          {/* ─── Image zone ─── */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-dark/40 to-bg-secondary">
            {image ? (
              <Image
                src={image}
                alt={headline}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <TypeIcon className="h-12 w-12 text-brand-mid/30" strokeWidth={1.5} aria-hidden />
              </div>
            )}

            {/* Resource type badge — top left */}
            <span className="absolute left-3 top-3 rounded-full bg-bg-primary/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-brand-mid backdrop-blur-sm">
              {resourceType}
            </span>

            {/* Access badge — top right */}
            {accessType === "free" ? (
              <span className="absolute right-3 top-3 rounded-full bg-brand-dark px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-base-white">
                Free
              </span>
            ) : (
              <span className="absolute right-3 top-3 rounded-full bg-bg-primary/80 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-text-primary backdrop-blur-sm">
                {price ? `$${price}` : "Paid"}
              </span>
            )}
          </div>

          {/* ─── Content zone ─── */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            {tag && (
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
                {tag}
              </span>
            )}

            <h3 className="heading-font text-lg font-bold tracking-tight text-text-primary">
              {headline}
            </h3>

            {subCopy && (
              <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
                {subCopy}
              </p>
            )}

            <div className="flex-1" />

            {href && (
              <Link
                href={href}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-mid/30 bg-brand-mid/5 px-4 py-2.5 font-mono text-sm font-medium text-brand-mid transition-all hover:border-brand-mid hover:bg-brand-mid/10"
              >
                {accessType === "free" ? "Get it free" : price ? `Buy — $${price}` : "View resource"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </Link>
            )}
          </div>
        </article>
      </SpotlightCard>
    </div>
  );
}
