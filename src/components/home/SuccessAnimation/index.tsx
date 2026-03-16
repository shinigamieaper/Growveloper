"use client";

import { cn } from "@/lib/utils";

interface SuccessAnimationProps extends React.ComponentPropsWithoutRef<"section"> {}

export function SuccessAnimation({ className, ...props }: SuccessAnimationProps) {
  return (
    <section className={cn("relative bg-base-black text-base-white", className)} {...props}>
      {/* Stage 2 — What Success Looks Like: GSAP sticky panel, 5 scroll-triggered states */}
    </section>
  );
}
