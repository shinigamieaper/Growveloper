"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import type { ServiceRowData } from "@/lib/types";

interface ServiceRowProps extends React.ComponentPropsWithoutRef<"div"> {
  data: ServiceRowData | null;
  reversed?: boolean;
}

function AnimatedIcon({ type }: { type: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    if (prefersReduced || !svgRef.current) return;
    const paths = svgRef.current.querySelectorAll(".animate-path");
    paths.forEach((path, i) => {
      const el = path as SVGElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
      el.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s`;
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((path) => {
            const el = path as SVGElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, [prefersReduced]);

  if (type === "dev") {
    return (
      <svg ref={svgRef} viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <rect className="animate-path" x="10" y="10" width="100" height="100" rx="12" fill="none" stroke="var(--brand-mid)" strokeWidth="2" opacity="0.3" />
        <rect className="animate-path" x="20" y="20" width="80" height="16" rx="4" fill="var(--brand-dark)" opacity="0.6" />
        <rect className="animate-path" x="20" y="44" width="55" height="8" rx="2" fill="var(--brand-mid)" opacity="0.5" />
        <rect className="animate-path" x="20" y="60" width="70" height="8" rx="2" fill="var(--brand-mid)" opacity="0.4" />
        <rect className="animate-path" x="20" y="76" width="45" height="8" rx="2" fill="var(--brand-mid)" opacity="0.3" />
        <circle className="animate-path" cx="90" cy="95" r="12" fill="var(--brand-mid)" opacity="0.8" />
        <path className="animate-path" d="M85 95l4 4 8-8" stroke="var(--bg-primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "marketing") {
    return (
      <svg ref={svgRef} viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <rect className="animate-path" x="10" y="10" width="100" height="100" rx="12" fill="none" stroke="var(--brand-mid)" strokeWidth="2" opacity="0.3" />
        <rect className="animate-path" x="22" y="75" width="14" height="25" rx="3" fill="var(--brand-dark)" opacity="0.5" />
        <rect className="animate-path" x="42" y="55" width="14" height="45" rx="3" fill="var(--brand-mid)" opacity="0.6" />
        <rect className="animate-path" x="62" y="40" width="14" height="60" rx="3" fill="var(--brand-mid)" opacity="0.7" />
        <rect className="animate-path" x="82" y="22" width="14" height="78" rx="3" fill="var(--brand-light)" opacity="0.8" />
        <path className="animate-path" d="M29 70 L49 50 L69 35 L89 18" stroke="var(--brand-light)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="animate-path" cx="89" cy="18" r="4" fill="var(--brand-light)" />
      </svg>
    );
  }

  // AI type
  return (
    <svg ref={svgRef} viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <rect className="animate-path" x="10" y="10" width="100" height="100" rx="12" fill="none" stroke="var(--brand-mid)" strokeWidth="2" opacity="0.3" />
      <circle className="animate-path" cx="40" cy="40" r="8" fill="var(--brand-dark)" opacity="0.6" />
      <circle className="animate-path" cx="80" cy="40" r="8" fill="var(--brand-dark)" opacity="0.6" />
      <circle className="animate-path" cx="60" cy="75" r="8" fill="var(--brand-mid)" opacity="0.7" />
      <circle className="animate-path" cx="35" cy="85" r="6" fill="var(--brand-mid)" opacity="0.5" />
      <circle className="animate-path" cx="85" cy="85" r="6" fill="var(--brand-mid)" opacity="0.5" />
      <line className="animate-path" x1="40" y1="48" x2="60" y2="67" stroke="var(--brand-mid)" strokeWidth="1.5" opacity="0.5" />
      <line className="animate-path" x1="80" y1="48" x2="60" y2="67" stroke="var(--brand-mid)" strokeWidth="1.5" opacity="0.5" />
      <line className="animate-path" x1="40" y1="40" x2="80" y2="40" stroke="var(--brand-mid)" strokeWidth="1.5" opacity="0.4" />
      <line className="animate-path" x1="35" y1="85" x2="60" y2="75" stroke="var(--brand-mid)" strokeWidth="1.5" opacity="0.4" />
      <line className="animate-path" x1="85" y1="85" x2="60" y2="75" stroke="var(--brand-mid)" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

export function ServiceRow({ data, reversed = false, className, ...props }: ServiceRowProps) {
  if (!data) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-10 py-12 md:flex-row md:gap-16",
        reversed && "md:flex-row-reverse",
        className,
      )}
      {...props}
    >
      {/* Animated visual */}
      <div className="flex w-full shrink-0 items-center justify-center md:w-2/5">
        <div className="h-48 w-48 md:h-64 md:w-64">
          <AnimatedIcon type={data.visualType ?? "dev"} />
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1 space-y-5">
        <h3 className="heading-font text-2xl font-bold text-text-primary md:text-3xl">
          {data.pillarName}
        </h3>
        <p className="text-lg leading-relaxed text-text-secondary">
          {data.outcomeStatement}
        </p>
        {data.subServices.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {data.subServices.map((service) => (
              <li
                key={service}
                className="rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm"
              >
                {service}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={data.link}
          className="inline-flex min-h-[44px] items-center text-base font-semibold text-brand-mid transition-colors hover:text-brand-light"
        >
          Learn More &rarr;
        </Link>
      </div>
    </div>
  );
}
