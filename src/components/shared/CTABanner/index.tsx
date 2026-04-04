"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { cn } from "@/lib/utils";
import { trackCTAClick } from "@/lib/analytics";
import type { CTABannerColorScheme, CTABannerPresentationMode, CTABannerProps } from "@/lib/types";

const legacyPresentationModeMap = {
  bar: "inline",
  block: "section",
} as const;

const colorSchemeClasses = {
  "teal-solid": {
    frame: "border border-base-white/20 bg-brand-dark text-base-white",
    subCopy: "text-base-white/80",
    buttonContainer: "w-full md:w-auto",
    buttonBorder: "bg-white/80",
    button: "bg-transparent text-base-white ring-1 ring-inset ring-base-white/30 transition-all duration-200 hover:scale-105 hover:bg-white/10",
    highlight: "text-brand-light",
  },
  "light-teal": {
    frame: "border border-brand-dark/15 bg-brand-light text-base-black",
    subCopy: "text-base-black/75",
    buttonContainer: "w-full md:w-auto",
    buttonBorder: "bg-[radial-gradient(var(--brand-dark)_40%,transparent_60%)]",
    button: "bg-base-black text-base-white transition-all duration-200 hover:scale-105 hover:bg-brand-dark",
    highlight: "text-brand-dark",
  },
  glass: {
    frame: "border border-brand-mid/35 bg-base-black/70 text-base-white backdrop-blur-xl",
    subCopy: "text-base-white/75",
    buttonContainer: "w-full md:w-auto",
    buttonBorder: "bg-[radial-gradient(var(--brand-light)_40%,transparent_60%)]",
    button: "bg-base-black/80 text-base-white transition-all duration-200 hover:scale-105 hover:bg-brand-dark",
    highlight: "text-brand-light",
  },
} as const;

const presentationModeClasses = {
  inline: {
    section: "px-4 py-10 md:px-6 md:py-14",
    frame: "mx-auto max-w-6xl",
    radius: "rounded-[32px] md:rounded-full",
    padding: "px-5 py-4 md:px-6 md:py-3",
    heading: "text-base md:text-[1.7rem]",
    layout: "flex-col text-center md:flex-row md:items-center md:justify-between md:gap-6 md:text-left",
    content: "w-full md:max-w-3xl",
    body: "mt-1 text-xs md:text-sm",
    buttonWrap: "w-full md:w-auto md:shrink-0",
  },
  section: {
    section: "py-10 md:py-14",
    frame: "w-full",
    radius: "rounded-none",
    padding: "px-6 py-10 md:px-10 md:py-14",
    heading: "text-3xl md:text-5xl",
    layout: "flex-col items-center text-center gap-4 md:gap-5",
    content: "max-w-3xl",
    body: "mt-1.5 text-sm md:text-base",
    buttonWrap: "w-full md:w-auto",
  },
} as const;

export function CTABanner({ data, colorScheme, presentationMode, variant, className, ...props }: CTABannerProps) {
  const pathname = usePathname();

  if (!data) return null;

  const resolvedColorScheme: CTABannerColorScheme = colorScheme ?? data.colorScheme ?? "glass";
  const resolvedPresentationMode: CTABannerPresentationMode =
    presentationMode ?? data.presentationMode ?? (variant ? legacyPresentationModeMap[variant] : "inline");
  const presentationClasses = presentationModeClasses[resolvedPresentationMode];
  const schemeClasses = colorSchemeClasses[resolvedColorScheme];

  return (
    <ScrollFadeUp>
    <section className={cn(presentationClasses.section, className)} {...props}>
      <div className={cn(presentationClasses.frame, schemeClasses.frame, presentationClasses.radius, "flex", presentationClasses.layout, presentationClasses.padding)}>
        <div className={presentationClasses.content}>
          <h2 className={cn(
            "heading-font font-bold tracking-tight",
            !data.subCopy && resolvedPresentationMode === "inline"
              ? "text-xl md:text-3xl"
              : presentationClasses.heading,
          )}>
            {data.highlightedWord ? renderHighlightedHeadline(data.headline, data.highlightedWord, schemeClasses.highlight) : data.headline}
          </h2>
          {data.subCopy ? <p className={cn("max-w-2xl leading-relaxed", presentationClasses.body, schemeClasses.subCopy)}>{data.subCopy}</p> : null}
        </div>
        <div className={cn("flex items-center justify-center md:justify-end", presentationClasses.buttonWrap, schemeClasses.buttonContainer)}>
          <MovingBorderButton
            as={Link}
            href={data.ctaDestination}
            borderRadius="9999px"
            containerClassName="inline-flex w-full md:w-auto"
            borderClassName={schemeClasses.buttonBorder}
            className={cn("px-6 py-3 text-sm font-semibold md:px-7", schemeClasses.button)}
            onClick={() => trackCTAClick(pathname, data.ctaLabel, data.ctaDestination)}
          >
            {data.ctaLabel}
          </MovingBorderButton>
        </div>
      </div>
    </section>
    </ScrollFadeUp>
  );
}

function renderHighlightedHeadline(headline: string, highlightedWord: string, highlightClassName: string) {
  const index = headline.toLowerCase().indexOf(highlightedWord.toLowerCase());
  if (index === -1) return headline;

  const before = headline.slice(0, index);
  const match = headline.slice(index, index + highlightedWord.length);
  const after = headline.slice(index + highlightedWord.length);

  return (
    <>
      {before}
      <span className={highlightClassName}>{match}</span>
      {after}
    </>
  );
}
