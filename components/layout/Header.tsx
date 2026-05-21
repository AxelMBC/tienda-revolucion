"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  // On the home route, the hero is full-bleed; float the header on top of it.
  // Other routes still wear the old solid chrome until their own slices land.
  const overlay = pathname === "/";

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={cn(
          "z-40",
          overlay
            ? "fixed top-0 left-0 right-0 bg-transparent"
            : "sticky top-0 border-b border-[var(--color-border-soft)] bg-[var(--color-obsidian)]/85 backdrop-blur-md",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center text-[rgba(245,241,234,0.85)] hover:text-[var(--ivory)] transition-colors cursor-pointer"
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
            <nav className="hidden md:flex items-center gap-9 font-sans text-[13px] lowercase text-[rgba(245,241,234,0.7)]">
              <Link
                href="/"
                className="hover:text-[var(--ivory)] transition-colors"
                style={{ letterSpacing: "0.04em" }}
              >
                inicio
              </Link>
              <Link
                href="/catalogo"
                className="hover:text-[var(--ivory)] transition-colors"
                style={{ letterSpacing: "0.04em" }}
              >
                catálogo
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button
                  type="button"
                  className="hover:text-[var(--ivory)] transition-colors cursor-pointer"
                  style={{ letterSpacing: "0.04em" }}
                  onFocus={() => setCatOpen(true)}
                  aria-expanded={catOpen}
                  aria-haspopup="true"
                >
                  categorías
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-opacity duration-150",
                    catOpen
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none",
                  )}
                >
                  <div className="min-w-[200px] border border-[rgba(245,241,234,0.14)] bg-[rgba(10,10,10,0.92)] backdrop-blur-md py-2">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/catalogo?category=${c.slug}`}
                        className="block px-4 py-2 text-[13px] lowercase text-[rgba(245,241,234,0.7)] hover:text-[var(--ivory)] transition-colors"
                        style={{ letterSpacing: "0.04em" }}
                        onClick={() => setCatOpen(false)}
                      >
                        {c.label.toLowerCase()}
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
              className="relative inline-flex h-10 w-10 items-center justify-center text-[rgba(245,241,234,0.85)] hover:text-[var(--ivory)] transition-colors cursor-pointer"
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
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute -top-1 -right-1 font-mono text-[10px] text-[var(--bronze)]"
                    style={{ letterSpacing: "0.14em" }}
                    aria-label={`${count} artículos en el carrito`}
                  >
                    {String(count).padStart(2, "0")}
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
