import { cn } from "@/lib/utils";

interface Step3Props extends React.ComponentPropsWithoutRef<"div"> {}

export function Step3({ className, ...props }: Step3Props) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Stage 5 — Step 3: Your Situation (problem, budget, timeline) */}
    </div>
  );
}
