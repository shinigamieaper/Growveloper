import { cn } from "@/lib/utils";

interface GlassSectionProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

export function GlassSection({ children, className, ...props }: GlassSectionProps) {
  return (
    <div
      className={cn(
        "border-y border-glass-border bg-bg-secondary/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
