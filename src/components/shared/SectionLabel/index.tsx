import { cn } from "@/lib/utils";

interface SectionLabelProps extends React.ComponentPropsWithoutRef<"span"> {
  text: string | null;
}

export function SectionLabel({ text, className, ...props }: SectionLabelProps) {
  if (!text) return null;

  return (
    <span
      className={cn(
        "mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-brand-mid",
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
