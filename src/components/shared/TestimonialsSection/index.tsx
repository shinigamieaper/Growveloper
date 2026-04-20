"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, prefersReducedMotion, EASE, DURATION } from "@/lib/gsap";
import { MagneticElement } from "@/components/animations/MagneticElement";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";
import type { TestimonialData } from "@/lib/types";

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={cn("h-4 w-4", filled ? "text-brand-mid" : "text-text-tertiary/30")}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Avatar({ src, name, size = "md" }: { src?: string; name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const dim = size === "sm" ? "h-8 w-8" : "h-12 w-12";
  const textSize = size === "sm" ? "text-[10px]" : "text-sm";

  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size === "sm" ? 32 : 48}
        height={size === "sm" ? 32 : 48}
        className={cn(dim, "rounded-full object-cover")}
      />
    );
  }

  return (
    <div
      className={cn(dim, textSize, "flex items-center justify-center rounded-full bg-brand-dark font-bold text-brand-light")}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function GridCard({ data }: { data: TestimonialData }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-white/[0.04] bg-white/[0.03] p-4">
      {data.rating > 0 && (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < data.rating} />
          ))}
        </div>
      )}
      <p className="line-clamp-4 text-xs leading-relaxed text-text-secondary">
        &ldquo;{data.quote}&rdquo;
      </p>
      <div className="mt-auto flex items-center gap-2 pt-1">
        <Avatar src={data.avatar} name={data.name} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-text-primary">{data.name}</p>
          <p className="truncate text-[9px] text-text-tertiary">
            {data.role}, {data.company}
          </p>
        </div>
      </div>
    </div>
  );
}

/* No h-full — card sizes to its natural content height */
function CarouselCard({ data }: { data: TestimonialData }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-brand-mid/60 bg-bg-secondary p-8 shadow-[0_8px_40px_rgba(90,177,177,0.12)] md:p-10">
      {data.rating > 0 && (
        <div className="flex gap-0.5" aria-label={`${data.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < data.rating} />
          ))}
        </div>
      )}

      <blockquote className="text-lg leading-relaxed text-text-primary md:text-xl">
        &ldquo;{data.quote}&rdquo;
      </blockquote>

      <div className="mt-auto flex items-center gap-4 border-t border-glass-border pt-5">
        <Avatar src={data.avatar} name={data.name} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary">{data.name}</p>
          <p className="text-xs text-text-secondary">
            {data.role}, {data.company}
          </p>
        </div>
        {data.companyLogo ? (
          <Image
            src={data.companyLogo}
            alt={data.company}
            width={80}
            height={28}
            className="ml-auto h-7 w-auto shrink-0 opacity-60"
          />
        ) : (
          <span className="ml-auto shrink-0 text-xs font-medium text-text-tertiary">
            {data.company}
          </span>
        )}
      </div>
    </div>
  );
}

function CTACard({ headline, label, url }: { headline: string; label: string; url: string }) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-8 rounded-2xl bg-brand-mid p-10 text-center shadow-xl md:p-14">
      <p className="heading-font text-3xl font-bold italic text-base-black md:text-4xl lg:text-5xl">
        {headline}
      </p>
      <MagneticElement strength={0.4}>
        <MovingBorderButton
          as={Link}
          href={url}
          duration={3000}
          containerClassName="inline-flex"
          className="px-10 py-4 text-base font-bold md:text-lg"
        >
          {label}
        </MovingBorderButton>
      </MagneticElement>
    </div>
  );
}

interface TestimonialsSectionProps {
  items: TestimonialData[];
  showCTACard?: boolean;
  ctaHeadline?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function TestimonialsSection({
  items,
  showCTACard = true,
  ctaHeadline = "This could be you\u2026",
  ctaLabel = "Book a Consultation",
  ctaUrl = "/start",
}: TestimonialsSectionProps) {
  const reduced = typeof window !== "undefined" ? prefersReducedMotion() : false;

  const slides: Array<{ type: "testimonial"; data: TestimonialData } | { type: "cta" }> = [
    ...items.map((data) => ({ type: "testimonial" as const, data })),
    ...(showCTACard ? [{ type: "cta" as const }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  if (items.length === 0) return null;

  /* Tile enough cards to fill the container regardless of carousel height */
  const gridItems: TestimonialData[] = [];
  while (gridItems.length < 24) {
    gridItems.push(...items);
  }
  const backgroundCards = gridItems.slice(0, 24);

  const animateToSlide = useCallback(
    (index: number) => {
      slidesRef.current.forEach((el, i) => {
        if (!el) return;
        if (i === index) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 24, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: reduced ? 0 : DURATION.normal, ease: EASE.smooth },
          );
        } else {
          gsap.to(el, {
            opacity: 0,
            y: -12,
            scale: 0.96,
            duration: reduced ? 0 : DURATION.fast,
            ease: EASE.smooth,
          });
        }
      });
    },
    [reduced],
  );

  const goToSlide = useCallback(
    (index: number) => {
      const clamped = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndex(clamped);
      animateToSlide(clamped);
    },
    [slides.length, animateToSlide],
  );

  useEffect(() => {
    if (reduced || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % slides.length;
          animateToSlide(next);
          return next;
        });
      }
    }, 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [reduced, slides.length, animateToSlide]);

  useEffect(() => {
    slidesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24, scale: i === 0 ? 1 : 0.96 });
    });
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      {/* ── Background grid — absolutely behind, never defines container height ── */}
      <div
        className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-3 p-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5"
        aria-hidden="true"
      >
        {backgroundCards.map((item, i) => (
          <GridCard key={`bg-${i}`} data={item} />
        ))}
      </div>

      {/* ── Fog overlay ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 50% 50%, var(--bg-primary) 25%, transparent 65%)",
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 15%, transparent 85%, var(--bg-primary) 100%)",
            "linear-gradient(to right, var(--bg-primary) 0%, transparent 10%, transparent 90%, var(--bg-primary) 100%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[3px]" aria-hidden="true" />

      {/* ── Carousel — normal flow, defines container height ── */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 md:py-20">
        <div className="w-full max-w-2xl">
          {/* CSS grid stacking: container grows to the tallest slide, dots always clear below */}
          <div className="grid">
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={(el) => { slidesRef.current[i] = el; }}
                className={cn("col-start-1 row-start-1 self-start", i !== activeIndex && "pointer-events-none")}
                aria-hidden={i !== activeIndex}
              >
                {slide.type === "testimonial" ? (
                  <CarouselCard data={slide.data} />
                ) : (
                  <CTACard headline={ctaHeadline} label={ctaLabel} url={ctaUrl} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Dot indicators — always below the carousel card ── */}
        {slides.length > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-2"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goToSlide(i)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "h-3.5 w-3.5 bg-brand-mid shadow-[0_0_8px_rgba(90,177,177,0.5)]"
                      : "h-2.5 w-2.5 bg-brand-mid/40 hover:bg-brand-mid/70",
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
