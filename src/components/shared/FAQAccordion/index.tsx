"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/lib/types";

interface FAQAccordionProps extends React.ComponentPropsWithoutRef<"section"> {
  items: FAQItem[];
  sectionHeadline?: string | null;
  highlightedWord?: string | null;
  sectionDescription?: string | null;
  ctaHeadline?: string | null;
  ctaDescription?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md transition-all duration-300",
        isOpen && "border-brand-mid/30 shadow-md",
      )}
    >
      <button
        onClick={onToggle}
        className="flex w-full min-h-[44px] items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="heading-font text-base font-semibold text-text-primary md:text-lg">
          {item.question}
        </span>
        <svg
          className={cn(
            "h-5 w-5 shrink-0 text-brand-mid transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-text-secondary md:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({
  items,
  sectionHeadline,
  highlightedWord,
  sectionDescription,
  ctaHeadline,
  ctaDescription,
  ctaLabel,
  ctaUrl,
  className,
  ...props
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left column — heading + CTA */}
          <div className="flex shrink-0 flex-col gap-6 lg:w-[380px] lg:sticky lg:top-32 lg:self-start">
            <SectionHeader
              headline={sectionHeadline ?? null}
              highlightedWord={highlightedWord}
              description={sectionDescription}
              alignment="left"
              className="mb-0"
            />

            {ctaHeadline && ctaLabel && ctaUrl && (
              <div className="mt-4 rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-md">
                <h3 className="heading-font mb-2 text-lg font-semibold text-text-primary">
                  {ctaHeadline}
                </h3>
                {ctaDescription && (
                  <p className="mb-4 text-sm text-text-secondary">{ctaDescription}</p>
                )}
                <MagneticElement strength={0.3}>
                  <MovingBorderButton
                    as={Link}
                    href={ctaUrl}
                    borderRadius="9999px"
                    containerClassName="inline-flex"
                  >
                    {ctaLabel}
                  </MovingBorderButton>
                </MagneticElement>
              </div>
            )}
          </div>

          {/* Right column — accordion */}
          <div className="flex flex-1 flex-col gap-3">
            {items.map((item, i) => (
              <ScrollFadeUp key={`${item.question}-${i}`} delay={i * 0.05}>
                <AccordionItem
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              </ScrollFadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
