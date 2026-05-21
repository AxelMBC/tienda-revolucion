import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/lib/types";
import { deriveCardStatus } from "@/lib/products";
import { CatalogCard } from "./CatalogCard";
import styles from "./PiezaRelated.module.css";

interface PiezaRelatedProps {
  items: Product[];
  startNumber?: number;
}

export function PiezaRelated({ items, startNumber = 1 }: PiezaRelatedProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <Eyebrow>También en la pared</Eyebrow>
          <Link href="/catalogo" className={styles.headLink}>
            Ver el catálogo completo →
          </Link>
        </div>

        <Reveal y={28} duration={1.2} className={styles.grid}>
          {items.map((p, i) => (
            <CatalogCard
              key={p.slug}
              product={p}
              number={startNumber + i}
              status={deriveCardStatus(p.stock, p.featured)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
