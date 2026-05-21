"use client";

import type { Size } from "@/lib/types";
import { cn } from "@/lib/utils";

const ORDER: Size[] = ["S", "M", "L", "XL"];

interface SizePickerProps {
  available: Size[];
  value: Size | null;
  onChange: (size: Size) => void;
}

export function SizePicker({ available, value, onChange }: SizePickerProps) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-3">
        Talla
      </p>
      <div className="flex gap-2 flex-wrap">
        {ORDER.map((s) => {
          const isAvailable = available.includes(s);
          const isActive = value === s;
          return (
            <button
              key={s}
              type="button"
              disabled={!isAvailable}
              onClick={() => onChange(s)}
              className={cn(
                "h-11 min-w-11 px-3 rounded-sm border text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer",
                isActive
                  ? "bg-[var(--color-bone)] text-[var(--color-obsidian)] border-[var(--color-bone)]"
                  : "border-[var(--color-border-soft)] text-[var(--color-bone)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
                !isAvailable && "opacity-30 cursor-not-allowed line-through hover:border-[var(--color-border-soft)] hover:text-[var(--color-bone)]",
              )}
              aria-label={`Talla ${s}${!isAvailable ? " (no disponible)" : ""}`}
              aria-pressed={isActive}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
