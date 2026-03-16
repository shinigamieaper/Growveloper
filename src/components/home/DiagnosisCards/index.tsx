import { cn } from "@/lib/utils";

interface DiagnosisCardsProps extends React.ComponentPropsWithoutRef<"section"> {}

export function DiagnosisCards({ className, ...props }: DiagnosisCardsProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      {/* Stage 2 — The Diagnosis: 2x2 card grid, CMS-driven */}
    </section>
  );
}
