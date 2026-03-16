import { cn } from "@/lib/utils";

interface Step2Props extends React.ComponentPropsWithoutRef<"div"> {}

export function Step2({ className, ...props }: Step2Props) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Stage 5 — Step 2: What You Need (multi-select checkboxes) */}
    </div>
  );
}
