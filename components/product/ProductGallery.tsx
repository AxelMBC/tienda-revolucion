"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight")
        setActive((i) => (i + 1) % images.length);
      else if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  const thumbContainer = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.15 } },
  };
  const thumbItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.4, ease: EASE },
    },
  };

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-obsidian-2)] rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.99 }}
            transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <motion.div
          className="mt-4 grid grid-cols-4 gap-3"
          variants={thumbContainer}
          initial="hidden"
          animate="show"
        >
          {images.map((src, i) => (
            <motion.button
              key={src}
              variants={thumbItem}
              type="button"
              onClick={() => setActive(i)}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm border transition-colors cursor-pointer",
                i === active
                  ? "border-[var(--color-gold)]"
                  : "border-[var(--color-border-soft)] hover:border-[var(--color-espresso-2)]",
              )}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === active}
            >
              <Image
                src={src}
                alt={`${alt} vista ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
