"use client";

import { cn } from "@/lib/utils";

interface QualifyingFormProps extends React.ComponentPropsWithoutRef<"div"> {
  preSelectedService?: string;
}

export function QualifyingForm({ preSelectedService, className, ...props }: QualifyingFormProps) {
  return (
    <div className={cn("mx-auto max-w-2xl", className)} data-service={preSelectedService} {...props}>
      {/* Stage 5 — Multi-step qualifying form (Step1, Step2, Step3, Step4) */}
    </div>
  );
}
