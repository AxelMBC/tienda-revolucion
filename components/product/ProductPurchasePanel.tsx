"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Product, Size } from "@/lib/types";
import { useCart } from "@/lib/cart-store";
import { formatMXN } from "@/lib/utils";
import { SizePicker } from "./SizePicker";
import { AddToCartButton } from "./AddToCartButton";

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<Size | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const handleAdd = () => {
    if (!size) return;
    add({
      slug: product.slug,
      name: product.name,
      size,
      qty: 1,
      unitPrice: product.price,
      image: product.images[0],
    });
    setConfirmed(true);
    open();
    setTimeout(() => setConfirmed(false), 1800);
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
          {product.category}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.05] mb-4">
          {product.name}
        </h1>
        <p className="font-display text-2xl text-[var(--color-gold-2)]">
          {formatMXN(product.price)}
        </p>
      </div>

      <p className="text-[var(--color-cream)] leading-relaxed text-[15px] max-w-prose">
        {product.description}
      </p>

      <SizePicker
        available={product.sizes}
        value={size}
        onChange={setSize}
      />

      <div className="space-y-3">
        <AddToCartButton
          onClick={handleAdd}
          disabled={!size}
          label={size ? "Agregar al carrito" : "Selecciona una talla"}
        />
        <AnimatePresence>
          {confirmed && (
            <motion.p
              initial={{ opacity: 0, y: reduce ? 0 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold)] text-center"
            >
              ✓ Añadido al carrito
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 pt-6 border-t border-[var(--color-border-soft)] text-xs">
        <dt className="text-[var(--color-muted)] uppercase tracking-[0.16em]">
          Disponibilidad
        </dt>
        <dd className="text-[var(--color-cream)]">
          {product.stock > 5
            ? "En existencia"
            : product.stock > 0
              ? `Solo ${product.stock} piezas`
              : "Agotado"}
        </dd>
        <dt className="text-[var(--color-muted)] uppercase tracking-[0.16em]">
          Recolección
        </dt>
        <dd className="text-[var(--color-cream)]">En tienda física</dd>
        <dt className="text-[var(--color-muted)] uppercase tracking-[0.16em]">
          Pago
        </dt>
        <dd className="text-[var(--color-cream)]">Coordinado por WhatsApp</dd>
      </dl>
    </div>
  );
}
