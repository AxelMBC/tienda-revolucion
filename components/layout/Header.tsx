"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { useCart, useCartCount } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { getCategories } from "@/lib/products";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const categories = getCategories();

export function Header() {
  const mounted = useHasMounted();
  const count = useCartCount();
  const openCart = useCart((s) => s.open);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-0 z-40 border-b border-[var(--color-border-soft)] bg-[var(--color-obsidian)]/85 backdrop-blur-md"
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center text-bone hover:text-[var(--color-gold)] transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 6h16M3 11h16M3 16h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>

            {/* Wordmark */}
            <Link
              href="/"
              className="md:flex-none"
              aria-label="Revolución — Inicio"
            >
              <Wordmark size="md" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-medium">
              <Link
                href="/"
                className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/catalogo"
                className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors"
              >
                Catálogo
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button
                  type="button"
                  className="text-[var(--color-cream)] hover:text-[var(--color-gold)] transition-colors uppercase tracking-[0.18em] cursor-pointer"
                  onFocus={() => setCatOpen(true)}
                  aria-expanded={catOpen}
                  aria-haspopup="true"
                >
                  Categorías
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-opacity duration-150",
                    catOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none",
                  )}
                >
                  <div className="min-w-[200px] border border-[var(--color-border-soft)] bg-[var(--color-obsidian-2)] rounded-sm py-2 shadow-lg">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/catalogo?category=${c.slug}`}
                        className="block px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-cream)] hover:text-[var(--color-gold)] hover:bg-[var(--color-obsidian)] transition-colors"
                        onClick={() => setCatOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Cart icon */}
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center text-bone hover:text-[var(--color-gold)] transition-colors cursor-pointer"
              aria-label="Abrir carrito"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 5h2.5l1.6 10.2a1.5 1.5 0 0 0 1.5 1.3h7.4a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                <circle cx="9" cy="19" r="1.2" fill="currentColor" />
                <circle cx="16" cy="19" r="1.2" fill="currentColor" />
              </svg>
              <AnimatePresence>
                {mounted && count > 0 && (
                  <motion.span
                    key={count}
                    initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={reduce ? undefined : { scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 520, damping: 22 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center rounded-full bg-[var(--color-oxblood)] text-[10px] font-semibold text-bone tracking-normal"
                    aria-label={`${count} artículos en el carrito`}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </motion.header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
