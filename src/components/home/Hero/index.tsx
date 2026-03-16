import { cn } from "@/lib/utils";

interface HeroProps extends React.ComponentPropsWithoutRef<"section"> {}

export function Hero({ className, ...props }: HeroProps) {
  return (
    <section className={cn("relative min-h-screen", className)} {...props}>
      {/* Stage 2 — Hero section: social proof pill, headline, sub-statement, CTAs, scroll cue */}
    </section>
  );
}
