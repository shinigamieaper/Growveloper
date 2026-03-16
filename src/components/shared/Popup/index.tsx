"use client";

import { cn } from "@/lib/utils";
import type { PopupConfig } from "@/lib/types";

interface PopupProps extends React.ComponentPropsWithoutRef<"div"> {
  config: PopupConfig | null;
}

export function Popup({ config, className, ...props }: PopupProps) {
  if (!config || !config.enabled) return null;

  return (
    <div className={cn("fixed inset-0 z-[100]", className)} {...props}>
      {/* Stage 9 — Popup system implementation */}
    </div>
  );
}
