"use client";

import { cn } from "@/lib/utils";

interface MetricsCounterProps extends React.ComponentPropsWithoutRef<"div"> {}

export function MetricsCounter({ className, ...props }: MetricsCounterProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Stage 7 — Animated scroll-triggered counter for case study metrics */}
    </div>
  );
}
