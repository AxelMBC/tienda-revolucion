import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const sizes: Record<Size, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-5xl sm:text-6xl",
};

interface WordmarkProps {
  size?: Size;
  className?: string;
  withDot?: boolean;
}

export function Wordmark({
  size = "md",
  className,
  withDot = true,
}: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-display font-semibold uppercase tracking-wordmark leading-none text-[var(--color-bone)]",
        sizes[size],
        className,
      )}
      aria-label="Revolución"
    >
      REVOLUCIÓN
      {withDot && (
        <span className="text-[var(--bronze)]" aria-hidden>
          .
        </span>
      )}
    </span>
  );
}
