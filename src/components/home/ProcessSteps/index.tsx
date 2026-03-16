import { cn } from "@/lib/utils";

interface ProcessStepsProps extends React.ComponentPropsWithoutRef<"section"> {}

export function ProcessSteps({ className, ...props }: ProcessStepsProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      {/* Stage 2 — How It Works: 4-step sticky scroll reveal */}
    </section>
  );
}
