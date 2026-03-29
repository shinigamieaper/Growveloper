"use client";

import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { TextReveal } from "@/components/animations/TextReveal";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
interface SectionHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: string | null;
  headline: string | null;
  highlightedWord?: string | null;
  description?: string | null;
  alignment?: "left" | "center";
}

export function SectionHeader({
  label,
  headline,
  highlightedWord,
  description,
  alignment = "center",
  className,
  ...props
}: SectionHeaderProps) {
  if (!headline) return null;

  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        alignment === "center" && "mx-auto max-w-3xl text-center",
        alignment === "left" && "max-w-2xl",
        className,
      )}
      {...props}
    >
      {label && (
        <ScrollFadeUp>
          <SectionLabel text={label} />
        </ScrollFadeUp>
      )}
      <TextReveal
        as="h2"
        className="heading-font text-3xl font-bold text-text-primary md:text-4xl lg:text-5xl"
        splitType="words"
        highlightedWord={highlightedWord}
      >
        {headline}
      </TextReveal>
      {description && (
        <ScrollFadeUp delay={0.15}>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            {description}
          </p>
        </ScrollFadeUp>
      )}
    </div>
  );
}
