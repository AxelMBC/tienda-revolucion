"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border-soft)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(184,137,59,0.10),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(107,15,23,0.18),_transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,_transparent_0%,_rgba(11,11,12,0.85)_100%)]"
      />

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold-2)] mb-6"
        >
          Otoño / Invierno 2026
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display font-semibold text-[15vw] sm:text-[10vw] lg:text-[8.5rem] leading-[0.92] text-bone max-w-5xl"
        >
          Revolución no se viste.
          <span className="block text-[var(--color-gold-2)] italic">
            Se carga.
          </span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-base sm:text-lg text-[var(--color-cream)] leading-relaxed"
        >
          Sastrería urbana, materiales que pesan y hardware con intención. Una
          edición limitada para el hombre que entra a un lugar y lo cambia.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/catalogo"
            className="inline-flex h-14 px-8 items-center justify-center bg-[var(--color-oxblood)] hover:bg-[var(--color-oxblood-2)] text-bone text-[13px] font-medium uppercase tracking-[0.18em] rounded-sm transition-colors"
          >
            Explorar catálogo
          </Link>
          <Link
            href="/catalogo?category=chaquetas"
            className="inline-flex h-14 px-8 items-center justify-center border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)] text-[13px] font-medium uppercase tracking-[0.18em] rounded-sm transition-colors"
          >
            Ver chaquetas
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
