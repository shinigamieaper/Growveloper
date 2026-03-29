import { cn } from "@/lib/utils";

interface HighlightTextProps {
  text: string;
  className?: string;
}

export function CanvasText({ text, className = "" }: HighlightTextProps) {
  return (
    <span
      className={cn(
        "inline overflow-visible highlight-text-gradient",
        className,
      )}
    >
      {text}
    </span>
  );
}
