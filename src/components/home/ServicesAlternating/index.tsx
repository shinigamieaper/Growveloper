import { cn } from "@/lib/utils";

interface ServicesAlternatingProps extends React.ComponentPropsWithoutRef<"section"> {}

export function ServicesAlternating({ className, ...props }: ServicesAlternatingProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      {/* Stage 2 — What We Can Do For You: alternating rows per service pillar */}
    </section>
  );
}
