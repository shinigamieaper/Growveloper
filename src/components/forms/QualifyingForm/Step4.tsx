import { cn } from "@/lib/utils";

interface Step4Props extends React.ComponentPropsWithoutRef<"div"> {}

export function Step4({ className, ...props }: Step4Props) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Stage 5 — Step 4: Confirm (contact method, additional context, submit) */}
    </div>
  );
}
