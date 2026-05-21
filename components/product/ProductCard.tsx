"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/types";
import { formatMXN } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block focus:outline-none"
    >
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-obsidian-2)] rounded-sm"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] will-change-transform"
        />
        {product.featured && (
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
          >
            <Badge tone="gold">Destacado</Badge>
          </motion.div>
        )}
        {product.stock <= 5 && (
          <motion.div
            className="absolute top-3 right-3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
          >
            <Badge tone="oxblood">Últimas piezas</Badge>
          </motion.div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-obsidian)]/85 to-transparent pointer-events-none" />
      </motion.div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-xl text-bone leading-tight group-hover:text-[var(--color-gold)] transition-colors">
            {product.name}
          </h3>
        </div>
        <span className="font-sans text-sm font-medium text-[var(--color-gold-2)] whitespace-nowrap pt-1">
          {formatMXN(product.price)}
        </span>
      </div>
    </Link>
  );
}
