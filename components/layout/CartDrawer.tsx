"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCart, useCartSubtotal } from "@/lib/cart-store";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatMXN } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const reduce = useReducedMotion();
  const isOpen = useCart((s) => s.isOpen);
  const items = useCart((s) => s.items);
  const close = useCart((s) => s.close);
  const remove = useCart((s) => s.remove);
  const updateQty = useCart((s) => s.updateQty);
  const clear = useCart((s) => s.clear);
  const subtotal = useCartSubtotal();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const handleWhatsApp = () => {
    if (items.length === 0) return;
    try {
      const url = buildWhatsAppUrl(items);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err);
      alert(
        "El número de WhatsApp no está configurado. Avisa al administrador.",
      );
    }
  };

  const handleClear = () => {
    if (items.length === 0) return;
    if (confirm("¿Vaciar el carrito por completo?")) clear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" aria-modal role="dialog">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={close}
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full sm:w-[440px] max-w-full bg-[var(--color-obsidian-2)] border-l border-[var(--color-border-soft)] flex flex-col"
            initial={{ x: reduce ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "100%" }}
            transition={{
              type: "tween",
              duration: reduce ? 0 : 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <header className="flex items-center justify-between p-5 border-b border-[var(--color-border-soft)]">
              <h2 className="font-display text-2xl text-bone">Tu carrito</h2>
              <button
                type="button"
                onClick={close}
                className="h-10 w-10 inline-flex items-center justify-center text-bone hover:text-[var(--color-gold)] cursor-pointer"
                aria-label="Cerrar carrito"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                  <path
                    d="M4 4l14 14M18 4L4 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                  <p className="font-display text-2xl text-[var(--color-cream)]">
                    Tu carrito está vacío
                  </p>
                  <p className="text-sm text-[var(--color-muted)] max-w-[260px]">
                    Explora el catálogo y empieza a armar tu próximo conjunto.
                  </p>
                  <Link href="/catalogo" onClick={close}>
                    <Button variant="primary" size="md">
                      Ver catálogo
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.size}`}
                      className="flex gap-4 pb-5 border-b border-[var(--color-border-soft)] last:border-0 last:pb-0"
                    >
                      <div className="relative w-20 h-24 shrink-0 bg-[var(--color-obsidian)] overflow-hidden rounded-sm">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-display text-base leading-tight text-bone">
                            {item.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(item.slug, item.size)}
                            className="text-[var(--color-muted)] hover:text-[var(--color-oxblood-2)] text-lg leading-none cursor-pointer"
                            aria-label="Quitar artículo"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] mt-1">
                          Talla {item.size}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[var(--color-border-soft)] rounded-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.slug, item.size, item.qty - 1)
                              }
                              disabled={item.qty <= 1}
                              className="h-8 w-8 text-bone hover:text-[var(--color-gold)] disabled:opacity-30 cursor-pointer"
                              aria-label="Disminuir cantidad"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQty(item.slug, item.size, item.qty + 1)
                              }
                              disabled={item.qty >= 99}
                              className="h-8 w-8 text-bone hover:text-[var(--color-gold)] disabled:opacity-30 cursor-pointer"
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-medium text-[var(--color-gold-2)]">
                            {formatMXN(item.unitPrice * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-[var(--color-border-soft)] p-5 space-y-4 bg-[var(--color-obsidian)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    Subtotal estimado
                  </span>
                  <span className="font-display text-2xl text-[var(--color-gold-2)]">
                    {formatMXN(subtotal)}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleWhatsApp}
                  className="w-full"
                >
                  Pedir por WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] hover:text-[var(--color-oxblood-2)] cursor-pointer py-2"
                >
                  Vaciar carrito
                </button>
                <p className="text-[10px] text-center text-[var(--color-muted)] leading-relaxed">
                  La tienda confirmará disponibilidad y coordinará la
                  recolección por WhatsApp.
                </p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
