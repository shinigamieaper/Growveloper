"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";
import type {
  GrowveloperCardVariant,
  GrowveloperCardColorScheme,
  GrowveloperCardProps,
} from "@/lib/types";

/* ─── Color scheme class maps ─── */

const colorSchemeClasses: Record<
  GrowveloperCardColorScheme,
  {
    card: string;
    headline: string;
    subCopy: string;
    tag: string;
    badge: string;
    iconBox: string;
    decorBlobBg: string;
  }
> = {
  dark: {
    card: "bg-bg-secondary border-glass-border",
    headline: "text-text-primary",
    subCopy: "text-text-secondary",
    tag: "text-brand-mid",
    badge: "bg-brand-dark/20 text-brand-light",
    iconBox: "bg-brand-dark/10 text-brand-mid",
    decorBlobBg: "bg-brand-mid",
  },
  "glass-dark": {
    card: "bg-glass-bg backdrop-blur-md border-glass-border",
    headline: "text-text-primary",
    subCopy: "text-text-secondary",
    tag: "text-brand-mid",
    badge: "bg-brand-dark/20 text-brand-light",
    iconBox: "bg-brand-dark/10 text-brand-mid",
    decorBlobBg: "bg-brand-mid",
  },
  "glass-light": {
    card: "bg-white/70 backdrop-blur-md border-brand-dark/10",
    headline: "text-base-black",
    subCopy: "text-base-black/60",
    tag: "text-brand-dark",
    badge: "bg-brand-dark/10 text-brand-dark",
    iconBox: "bg-brand-dark/10 text-brand-dark",
    decorBlobBg: "bg-brand-dark",
  },
  "teal-solid": {
    card: "bg-brand-dark border-brand-mid/30",
    headline: "text-base-white",
    subCopy: "text-brand-light/80",
    tag: "text-brand-light",
    badge: "bg-base-white/20 text-base-white",
    iconBox: "bg-base-white/10 text-brand-light",
    decorBlobBg: "bg-brand-light",
  },
  "light-teal": {
    card: "bg-brand-light/15 border-brand-mid/20",
    headline: "text-text-primary",
    subCopy: "text-text-secondary",
    tag: "text-brand-dark",
    badge: "bg-brand-dark/10 text-brand-dark",
    iconBox: "bg-brand-mid/15 text-brand-dark",
    decorBlobBg: "bg-brand-dark",
  },
};

/* ─── Variant-specific layout logic ─── */

function getVariantClasses(variant: GrowveloperCardVariant): string {
  switch (variant) {
    case "sound-like-you":
      return "flex flex-col items-center justify-center gap-8 text-center min-h-[240px] md:min-h-[280px]";
    case "diagnosis":
      return "flex flex-col gap-4";
    case "resource":
    case "automation":
      return "flex flex-col gap-3";
    case "industry":
    default:
      return "flex flex-col gap-2";
  }
}

function getVariantTypography(variant: GrowveloperCardVariant): {
  headline: string;
  subCopy: string;
} {
  switch (variant) {
    case "industry":
      return {
        headline: "text-2xl md:text-3xl",
        subCopy: "text-base md:text-lg",
      };
    case "sound-like-you":
      return {
        headline: "text-4xl leading-[1.05] md:text-5xl",
        subCopy: "text-lg md:text-xl",
      };
    default:
      return {
        headline: "text-lg",
        subCopy: "text-sm",
      };
  }
}

/* ─── Component ─── */

export function GrowveloperCard({
  variant,
  colorScheme = "glass-dark",
  headline,
  subCopy,
  ctaLabel,
  ctaHref,
  icon,
  tag,
  badge,
  image,
  children,
  className,
  ...props
}: GrowveloperCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const decorBlobRef = useRef<HTMLDivElement>(null);
  const borderAccentRef = useRef<HTMLDivElement>(null);

  const scheme = colorSchemeClasses[colorScheme];
  const variantLayout = getVariantClasses(variant);
  const typography = getVariantTypography(variant);
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const handleMouseEnter = useCallback(() => {
    if (reduced || !cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });

    if (borderAccentRef.current) {
      gsap.to(borderAccentRef.current, {
        opacity: 0.6,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (decorBlobRef.current) {
      gsap.to(decorBlobRef.current, {
        opacity: 0.18,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -3,
        rotate: 5,
        scale: 1.1,
        duration: DURATION.fast,
        ease: EASE.snap,
      });
    }

    if (colorScheme === "glass-dark" || colorScheme === "glass-light") {
      gsap.to(cardRef.current, {
        backdropFilter: "blur(16px)",
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }
  }, [reduced, colorScheme]);

  const handleMouseLeave = useCallback(() => {
    if (reduced || !cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: 1,
      duration: DURATION.fast,
      ease: EASE.smooth,
    });

    if (borderAccentRef.current) {
      gsap.to(borderAccentRef.current, {
        opacity: 0.2,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (decorBlobRef.current) {
      gsap.to(decorBlobRef.current, {
        opacity: 0.08,
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: 0,
        rotate: 0,
        scale: 1,
        duration: DURATION.fast,
        ease: EASE.snap,
      });
    }

    if (colorScheme === "glass-dark" || colorScheme === "glass-light") {
      gsap.to(cardRef.current, {
        backdropFilter: "blur(12px)",
        duration: DURATION.fast,
        ease: EASE.smooth,
      });
    }
  }, [reduced, colorScheme]);

  /* attach hover listeners via useEffect + cleanup */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (reduced) return;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave, reduced]);

  /* ─── CTA button ─── */
  const renderCTA = () => {
    if (!ctaLabel) return null;

    if (variant === "sound-like-you") {
      return (
        <MagneticElement strength={0.3}>
          <MovingBorderButton
            as={ctaHref ? "a" : "button"}
            href={ctaHref}
            duration={3000}
            containerClassName="inline-flex"
            className={cn(
              "px-10 py-4 text-base font-semibold md:px-12 md:text-lg",
              colorScheme === "teal-solid"
                ? "bg-base-white! text-brand-dark!"
                : undefined,
            )}
          >
            {ctaLabel}
          </MovingBorderButton>
        </MagneticElement>
      );
    }

    if (ctaHref) {
      return (
        <MagneticElement strength={0.25}>
          <MovingBorderButton
            as="a"
            href={ctaHref}
            duration={3500}
            containerClassName="inline-flex"
          >
            {ctaLabel}
          </MovingBorderButton>
        </MagneticElement>
      );
    }

    return (
      <MagneticElement strength={0.25}>
        <MovingBorderButton duration={3500}>
          {ctaLabel}
        </MovingBorderButton>
      </MagneticElement>
    );
  };

  /* ─── Decorative background circle ─── */
  const renderDecorCircle = () => {
    if (variant === "sound-like-you") return null;
    return (
      <div
        ref={decorBlobRef}
        className={cn(
          "pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full transition-none",
          scheme.decorBlobBg,
        )}
        style={{ opacity: 0.08 }}
        aria-hidden="true"
      />
    );
  };

  return (
    <article
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        variant === "sound-like-you" ? "p-10 md:p-12" : "p-6",
        scheme.card,
        variantLayout,
        !reduced && "will-change-transform",
        className,
      )}
      {...props}
    >
      <div
        ref={borderAccentRef}
        className="pointer-events-none absolute inset-0 border border-brand-mid"
        style={{ borderRadius: "inherit", opacity: 0.2 }}
        aria-hidden="true"
      />
      {/* Tag */}
      {tag && (
        <span
          className={cn(
            "mb-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
            scheme.tag,
          )}
        >
          {tag}
        </span>
      )}

      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            scheme.badge,
          )}
        >
          {badge}
        </span>
      )}

      {/* Image (resource) */}
      {image && variant === "resource" && (
        <div className="relative -mx-6 -mt-6 mb-4 aspect-video overflow-hidden rounded-t-2xl">
          <Image
            src={image}
            alt={headline}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div
          ref={iconRef}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            scheme.iconBox,
          )}
        >
          {icon}
        </div>
      )}

      {/* Headline */}
      <h3
        className={cn(
          "heading-font",
          variant === "sound-like-you" ? "font-extrabold" : "font-bold",
          typography.headline,
          scheme.headline,
        )}
      >
        {headline}
      </h3>

      {/* SubCopy */}
      {subCopy && (
        <p
          className={cn(
            "leading-relaxed",
            typography.subCopy,
            scheme.subCopy,
          )}
        >
          {subCopy}
        </p>
      )}

      {/* Slot content */}
      {children}

      {/* CTA */}
      {ctaLabel && (
        <div className={cn("mt-auto pt-3", variant === "sound-like-you" && "pt-2")}>
          {renderCTA()}
        </div>
      )}

      {renderDecorCircle()}
    </article>
  );
}
