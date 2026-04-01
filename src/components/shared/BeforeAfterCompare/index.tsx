"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollFadeUp } from "@/components/animations/ScrollFadeUp";
import { Compare } from "@/components/ui/compare";
import type { BeforeAfterData } from "@/lib/types";

interface BeforeAfterCompareProps extends React.ComponentPropsWithoutRef<"section"> {
  data: BeforeAfterData | null;
}

export function BeforeAfterCompare({ data, className, ...props }: BeforeAfterCompareProps) {
  if (!data || data.pairs.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const pair = data.pairs[activeIndex];
  const total = data.pairs.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          headline={data.headline}
          highlightedWord={data.highlightedWord}
          description={data.description}
        />

        <ScrollFadeUp>
          {/* Outer wrapper — flat stacking context for arrows + dots */}
          <div className="relative mx-auto w-full max-w-4xl">
            {/* Left arrow — outside 3D context */}
            {total > 1 && (
              <button
                onClick={goPrev}
                className="absolute -left-2 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-mid/30 bg-bg-secondary shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:border-brand-mid hover:bg-brand-dark/20 hover:shadow-brand-mid/20 md:-left-14"
                aria-label="Previous client"
              >
                <ChevronLeft className="h-5 w-5 text-text-primary" />
              </button>
            )}

            {/* Right arrow — outside 3D context */}
            {total > 1 && (
              <button
                onClick={goNext}
                className="absolute -right-2 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-mid/30 bg-bg-secondary shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:border-brand-mid hover:bg-brand-dark/20 hover:shadow-brand-mid/20 md:-right-14"
                aria-label="Next client"
              >
                <ChevronRight className="h-5 w-5 text-text-primary" />
              </button>
            )}

            {/* 3D perspective container — isolated */}
            <div className="flex items-center justify-center [perspective:800px]">
              <div
                style={{ transform: "rotateX(10deg) translateZ(60px)" }}
                className="mx-auto w-full rounded-3xl border border-glass-border bg-bg-secondary p-1 md:p-4"
              >
                {/* Client name + Before / After labels */}
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-text-tertiary">
                    {pair.beforeLabel ?? "Before"}
                  </span>
                  <span className="heading-font text-sm font-bold text-text-primary">
                    {pair.clientName}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-mid">
                    {pair.afterLabel ?? "After"}
                  </span>
                </div>

                <Compare
                  key={activeIndex}
                  firstImage={pair.beforeImage}
                  secondImage={pair.afterImage}
                  firstImageClassName="object-cover object-left-top w-full"
                  secondImageClassName="object-cover object-left-top w-full"
                  className="h-[300px] w-full rounded-[22px] sm:h-[400px] md:h-[500px] md:rounded-lg"
                  slideMode="drag"
                  autoplay={true}
                  autoplayDuration={4000}
                />
              </div>
            </div>

            {/* Dots indicator — outside 3D context */}
            {total > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {data.pairs.map((p, i) => (
                  <button
                    key={p.clientName}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all duration-300",
                      activeIndex === i
                        ? "scale-125 bg-brand-mid"
                        : "bg-text-tertiary/40 hover:bg-brand-mid/30",
                    )}
                    aria-label={`View ${p.clientName}`}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollFadeUp>
      </div>
    </section>
  );
}
