"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 3 | 4;
  priorityCount?: number;
}

export function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
}: ProductGridProps) {
  const reduce = useReducedMotion();

  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-[var(--color-muted)]">
        <p className="font-display text-2xl mb-2">
          No encontramos prendas con esos filtros.
        </p>
        <p className="text-sm">Prueba quitando alguno o explora otra categoría.</p>
      </div>
    );
  }

  const colsClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.ul
      className={`grid gap-x-6 gap-y-12 ${colsClass}`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {products.map((p, idx) => (
        <motion.li key={p.slug} variants={item}>
          <ProductCard product={p} priority={idx < priorityCount} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
