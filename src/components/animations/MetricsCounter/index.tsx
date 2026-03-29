"use client";

import React from "react";
import { CountUp } from "@/components/animations/CountUp";
import { cn } from "@/lib/utils";

interface MetricsCounterProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Target number to count up to */
  value: number;
  /** Descriptor label below the number */
  label: string;
  /** Text before the number, e.g. "$" */
  prefix?: string;
  /** Text after the number, e.g. "%", "×", "s" */
  suffix?: string;
  /** Decimal places — default 0 */
  decimals?: number;
  /** Animation duration in seconds — default 2 */
  duration?: number;
}

export function MetricsCounter({
  value,
  label,
  prefix,
  suffix,
  decimals = 0,
  duration = 2,
  className,
  ...props
}: MetricsCounterProps) {
  if (value === undefined || !label) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-glass-border bg-bg-secondary p-6 text-center md:p-8",
        className,
      )}
      {...props}
    >
      <CountUp
        end={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        duration={duration}
        className="heading-font text-4xl font-bold text-brand-mid md:text-5xl"
      />
      <span className="text-sm font-medium text-text-primary md:text-base">
        {label}
      </span>
    </div>
  );
}
