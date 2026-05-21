"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

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

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-obsidian-2)] rounded-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduce ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
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
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
