"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { StatsBandItem } from "@/lib/types";

export type { StatsBandItem };

interface StatsBandProps extends React.ComponentPropsWithoutRef<"section"> {
  items: StatsBandItem[];
  headline?: string;
  highlightedWord?: string;
  description?: string;
  label?: string;
}

function Counter({
  target,
  decimals,
  active,
}: {
  target: number;
  decimals: number;
  active: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  if (active && !hasRun.current && typeof window !== "undefined") {
    hasRun.current = true;
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) {
        ref.current.textContent = (eased * target).toFixed(decimals);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <span ref={ref}>{(0).toFixed(decimals)}</span>;
}

export function StatsBand({
  items,
  headline,
  highlightedWord,
  description,
  label,
  className,
  ...props
}: StatsBandProps) {
  if (!items.length) return null;

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const hasText = Boolean(headline);

  return (
    <section
      ref={ref}
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "grid gap-10",
            hasText && "md:grid-cols-2 md:items-center md:gap-16",
          )}
        >
          {/* Left — text content */}
          {hasText && (
            <SectionHeader
              label={label}
              headline={headline!}
              highlightedWord={highlightedWord}
              description={description}
              alignment="left"
              className="mb-0 md:mb-0"
            />
          )}

          {/* Right — bento stat cards */}
          <div
            className={cn(
              "grid grid-cols-2 gap-3",
              !hasText && "mx-auto max-w-4xl md:grid-cols-4",
            )}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={
                  inView ? { opacity: 1, y: 0, scale: 1 } : {}
                }
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-6 backdrop-blur-sm transition-colors hover:border-brand-mid/30",
                  i === 0 && hasText && "col-span-2",
                )}
              >
                {/* Subtle corner glow on hover */}
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-mid/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

                <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                  {item.label}
                </span>

                <span className="heading-font mt-3 text-4xl font-bold leading-none text-brand-mid drop-shadow-[0_0_14px_rgba(45,212,191,0.3)] md:text-5xl">
                  {item.prefix}
                  <Counter
                    target={item.value}
                    decimals={item.decimals ?? 0}
                    active={inView}
                  />
                  {item.suffix}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
