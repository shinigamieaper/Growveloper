import { cn } from "@/lib/utils";

interface Step1Props extends React.ComponentPropsWithoutRef<"div"> {}

export function Step1({ className, ...props }: Step1Props) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Stage 5 — Step 1: About You (name, email, company, website URL) */}
    </div>
  );
}
