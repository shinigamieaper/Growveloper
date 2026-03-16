import { cn } from "@/lib/utils";

interface LiveFeedProps extends React.ComponentPropsWithoutRef<"section"> {}

export function LiveFeed({ className, ...props }: LiveFeedProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      {/* Stage 2 — What We're Up To: 3 latest items card grid */}
    </section>
  );
}
