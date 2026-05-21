"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  ALL_SIZES,
  getCategories,
  getCategoryCounts,
} from "@/lib/products";
import type { Category, Size, SortKey } from "@/lib/types";
import styles from "./CatalogFilters.module.css";

const categories = getCategories();
const categoryCounts = getCategoryCounts();
const totalCount = Object.values(categoryCounts).reduce((s, n) => s + n, 0);

const SORTS: { key: SortKey; label: string }[] = [
  { key: "llegada", label: "Llegada" },
  { key: "precio", label: "Precio" },
];

interface CatalogFiltersProps {
  filteredCount: number;
}

export function CatalogFilters({ filteredCount }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams.get("category") ?? "") as Category | "";
  const currentSize = (searchParams.get("size") ?? "") as Size | "";
  const currentSort = (searchParams.get("sort") ?? "llegada") as SortKey;

  const setParam = useCallback(
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

  const categoryOptionCount = (slug: Category | "") =>
    slug === "" ? (currentCategory === "" ? filteredCount : totalCount) : categoryCounts[slug];

  return (
    <div className={styles.bar}>
      <div className={`${styles.row} ${styles.rowSplit}`}>
        <div className={styles.group}>
          <span className={styles.label}>Categoría</span>
          <button
            type="button"
            className={`${styles.option} ${currentCategory === "" ? styles.optionActive : ""}`}
            onClick={() => setParam("category", null)}
            aria-pressed={currentCategory === ""}
          >
            <span>Todo</span>
            <span className={styles.count}>· {String(categoryOptionCount("")).padStart(2, "0")}</span>
          </button>
          {categories.map((c) => {
            const active = currentCategory === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ""}`}
                onClick={() => setParam("category", active ? null : c.slug)}
                aria-pressed={active}
              >
                <span>{c.label}</span>
                <span className={styles.count}>
                  · {String(categoryCounts[c.slug]).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.group}>
          <span className={styles.label}>Talla</span>
          <button
            type="button"
            className={`${styles.option} ${currentSize === "" ? styles.optionActive : ""}`}
            onClick={() => setParam("size", null)}
            aria-pressed={currentSize === ""}
          >
            <span>Todo</span>
          </button>
          {ALL_SIZES.map((s) => {
            const active = currentSize === s;
            return (
              <button
                key={s}
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ""}`}
                onClick={() => setParam("size", active ? null : s)}
                aria-pressed={active}
              >
                <span>{s}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <span className={styles.label}>Orden</span>
          {SORTS.map(({ key, label }) => {
            const active = currentSort === key;
            return (
              <button
                key={key}
                type="button"
                className={`${styles.option} ${active ? styles.optionActive : ""}`}
                onClick={() => setParam("sort", key === "llegada" ? null : key)}
                aria-pressed={active}
              >
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
