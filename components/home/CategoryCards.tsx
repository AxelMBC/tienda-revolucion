"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getCategories } from "@/lib/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CategoryCards() {
  const categories = getCategories();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE },
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-[var(--color-obsidian-2)] border-y border-[var(--color-border-soft)]">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
              Categorías
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-bone">
              Recorre la colección
            </h2>
          </div>
        </Reveal>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((c) => (
            <motion.div key={c.slug} variants={item}>
              <Link
                href={`/catalogo?category=${c.slug}`}
                className="group relative aspect-[3/4] block overflow-hidden rounded-sm bg-[var(--color-obsidian)]"
              >
                <Image
                  src={c.cover}
                  alt={c.label}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-85 group-hover:opacity-100 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.06] will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)]/90 via-[var(--color-obsidian)]/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display text-3xl text-bone mb-2">
                    {c.label}
                  </h3>
                  <p className="text-xs text-[var(--color-cream)] mb-4 leading-relaxed">
                    {c.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] group-hover:text-[var(--color-gold-2)] transition-colors">
                    Explorar
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
