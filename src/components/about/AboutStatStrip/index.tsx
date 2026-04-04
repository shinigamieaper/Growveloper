"use client";

import { StaggerChildren } from "@/components/animations/StaggerChildren";
import type { AboutStatItem } from "@/lib/types";

interface AboutStatStripProps {
  items: AboutStatItem[];
}

export function AboutStatStrip({ items }: AboutStatStripProps) {
  if (!items || items.length === 0) return null;

  // Determine optimal column count based on number of items
  const count = items.length;
  const mdCols =
    count <= 2 ? "md:grid-cols-2" :
    count === 3 ? "md:grid-cols-3" :
    count === 4 ? "md:grid-cols-4" :
    "md:grid-cols-5";

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <StaggerChildren>
          <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${mdCols}`}>
            {items.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-glass-border bg-glass-bg px-4 py-6 text-center backdrop-blur-sm"
              >
                <span className="heading-font text-2xl font-bold text-brand-mid sm:text-3xl">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </StaggerChildren>
      </div>
    </section>
  );
}
