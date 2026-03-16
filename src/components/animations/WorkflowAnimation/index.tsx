"use client";

import { cn } from "@/lib/utils";

interface WorkflowAnimationProps extends React.ComponentPropsWithoutRef<"div"> {}

export function WorkflowAnimation({ className, ...props }: WorkflowAnimationProps) {
  return (
    <div className={cn("", className)} {...props}>
      {/* Stage 2 — Workflow nodes lighting up, time saved counter */}
    </div>
  );
}
