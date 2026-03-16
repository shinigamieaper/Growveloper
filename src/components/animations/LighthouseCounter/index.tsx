"use client";

import { cn } from "@/lib/utils";

interface LighthouseCounterProps extends React.ComponentPropsWithoutRef<"div"> {}

export function LighthouseCounter({ className, ...props }: LighthouseCounterProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Stage 2 — Lighthouse score 0→100, load time 8.2s→0.9s animation */}
    </div>
  );
}
