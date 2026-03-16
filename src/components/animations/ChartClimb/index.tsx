"use client";

import { cn } from "@/lib/utils";

interface ChartClimbProps extends React.ComponentPropsWithoutRef<"div"> {}

export function ChartClimb({ className, ...props }: ChartClimbProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Stage 2 — GA4 chart climbing, ROAS counter animation */}
    </div>
  );
}
