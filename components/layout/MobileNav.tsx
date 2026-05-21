"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getCategories } from "@/lib/products";
import { Wordmark } from "@/components/ui/Wordmark";

const categories = getCategories();

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" aria-modal role="dialog">
          <motion.div
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-[var(--color-obsidian-2)] border-r border-[var(--color-border-soft)] flex flex-col"
            initial={{ x: reduce ? 0 : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "-100%" }}
            transition={{
              type: "tween",
              duration: reduce ? 0 : 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-soft)]">
              <Wordmark size="sm" />
              <button
                type="button"
                onClick={onClose}
                className="h-10 w-10 inline-flex items-center justify-center text-bone hover:text-[var(--color-gold)] cursor-pointer"
                aria-label="Cerrar menú"
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
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1 text-sm uppercase tracking-[0.16em]">
              <Link
                href="/"
                onClick={onClose}
                className="block py-3 border-b border-[var(--color-border-soft)] text-[var(--color-bone)] hover:text-[var(--color-gold)]"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                onClick={onClose}
                className="block py-3 border-b border-[var(--color-border-soft)] text-[var(--color-bone)] hover:text-[var(--color-gold)]"
              >
                Catálogo
              </Link>
              <div className="pt-6 pb-2 text-[10px] tracking-[0.22em] text-[var(--color-muted)]">
                Categorías
              </div>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/catalogo?category=${c.slug}`}
                  onClick={onClose}
                  className="block py-3 border-b border-[var(--color-border-soft)] text-[var(--color-cream)] hover:text-[var(--color-gold)]"
                >
                  {c.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
