"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ALL_SIZES, getCategories } from "@/lib/products";
import { cn } from "@/lib/utils";

const categories = getCategories();

export function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentSize = searchParams.get("size");
  const hasAny = Boolean(currentCategory || currentSize);

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && params.get(key) !== value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearAll = () => router.replace(pathname, { scroll: false });

  return (
    <div className="border-y border-[var(--color-border-soft)] py-6 mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-x-2 gap-y-3 items-center">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mr-2">
          Categoría
        </span>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() =>
              updateParam("category", currentCategory === c.slug ? null : c.slug)
            }
            className={cn(
              "h-8 px-3 text-[11px] uppercase tracking-[0.16em] rounded-sm border transition-colors cursor-pointer",
              currentCategory === c.slug
                ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                : "border-[var(--color-border-soft)] text-[var(--color-cream)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
            )}
            aria-pressed={currentCategory === c.slug}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-3 items-center">
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mr-2">
          Talla
        </span>
        {ALL_SIZES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() =>
              updateParam("size", currentSize === s ? null : s)
            }
            className={cn(
              "h-8 min-w-9 px-2 text-[11px] uppercase tracking-[0.16em] rounded-sm border transition-colors cursor-pointer",
              currentSize === s
                ? "border-[var(--color-bone)] bg-[var(--color-bone)] text-[var(--color-obsidian)]"
                : "border-[var(--color-border-soft)] text-[var(--color-cream)] hover:border-[var(--color-bone)]",
            )}
            aria-pressed={currentSize === s}
          >
            {s}
          </button>
        ))}

        {hasAny && (
          <button
            type="button"
            onClick={clearAll}
            className="ml-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-oxblood-2)] cursor-pointer"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
