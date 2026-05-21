import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "gold" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-[0.14em] text-xs rounded-sm transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-oxblood)] text-[var(--color-bone)] hover:bg-[var(--color-oxblood-2)]",
  ghost:
    "border border-[var(--color-border-soft)] text-[var(--color-bone)] hover:bg-[var(--color-obsidian-2)] hover:border-[var(--color-gold)]",
  gold:
    "border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]",
  dark:
    "bg-[var(--color-obsidian-2)] text-[var(--color-bone)] hover:bg-[var(--color-espresso)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-11 px-6",
  lg: "h-14 px-8 text-[13px]",
};

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, type = "button", ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      />
    );
  },
);
