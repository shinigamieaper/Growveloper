"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { AboutStatItem } from "@/lib/types";

interface AboutStatStripProps {
  items: AboutStatItem[];
  id?: string;
}

function parseStatValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
}

function StatItem({ stat }: { stat: AboutStatItem }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const parsed = parseStatValue(stat.value);

  useGSAP(() => {
    if (!valueRef.current || !parsed) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: parsed.num,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: valueRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate() {
        if (valueRef.current) {
          const display = Number.isInteger(parsed.num)
            ? Math.round(obj.val).toString()
            : obj.val.toFixed(1);
          valueRef.current.textContent = display + parsed.suffix;
        }
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-6">
      <span
        ref={parsed ? valueRef : undefined}
        className="heading-font text-4xl font-extrabold leading-none text-brand-mid sm:text-5xl"
      >
        {stat.value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
        {stat.label}
      </span>
      <div className="mt-1 h-0.5 w-6 rounded bg-brand-mid/60" />
    </div>
  );
}

export function AboutStatStrip({ items, id }: AboutStatStripProps) {
  if (!items || items.length === 0) return null;

  const count = items.length;
  const mdCols =
    count <= 2 ? "md:grid-cols-2" :
    count === 3 ? "md:grid-cols-3" :
    count === 4 ? "md:grid-cols-4" :
    "md:grid-cols-5";

  return (
    <section id={id} className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${mdCols}`}>
          {items.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
