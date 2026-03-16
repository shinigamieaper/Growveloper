import { cn } from "@/lib/utils";

interface IndustriesGridProps extends React.ComponentPropsWithoutRef<"section"> {}

export function IndustriesGrid({ className, ...props }: IndustriesGridProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      {/* Stage 2 — Who We Work With: 2x2 industry cards + CTA card */}
    </section>
  );
}
