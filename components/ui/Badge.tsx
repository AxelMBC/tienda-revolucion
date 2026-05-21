import { cn } from "@/lib/utils";

type Tone = "gold" | "oxblood" | "muted";

const tones: Record<Tone, string> = {
  gold: "bg-[var(--color-gold)]/15 text-[var(--color-gold-2)] border-[var(--color-gold)]/30",
  oxblood:
    "bg-[var(--color-oxblood)]/20 text-[var(--color-bone)] border-[var(--color-oxblood)]/40",
  muted:
    "bg-[var(--color-obsidian-2)] text-[var(--color-muted)] border-[var(--color-border-soft)]",
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

export function Badge({ children, tone = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 border rounded-sm text-[10px] uppercase tracking-[0.18em] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
