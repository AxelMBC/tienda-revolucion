import type { Metadata } from "next";
import { CrumbBar, PagerLink } from "@/components/layout/CrumbBar";
import { Room } from "@/components/ui/Room";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Hairline } from "@/components/ui/Hairline";
import { CatalogCard } from "@/components/product/CatalogCard";
import { deriveCardStatus, getPicks } from "@/lib/products";
import styles from "./ofertas.module.css";

export const metadata: Metadata = {
  title: "Ofertas",
  description:
    "Lo que el comprador está empujando este mes. Selección corta, escogida una por una.",
  alternates: { canonical: "/ofertas" },
};

export default function OfertasPage() {
  const picks = getPicks();
  const countLabel = picks.length === 1 ? "1 pieza" : `${picks.length} piezas`;

  return (
    <>
      <CrumbBar
        crumbs={[{ label: "Revolución", href: "/" }, { label: "Ofertas" }]}
        pager={
          <PagerLink href="/catalogo" direction="back">
            Volver al catálogo
          </PagerLink>
        }
      />

      <Room tone="ivory" id="ofertas" compactTop>
        <header className={styles.head}>
          <Eyebrow>Lo escogido · Mayo MMXXVI</Eyebrow>
          <h1 className={styles.title}>
            Las piezas que el comprador está empujando este mes.
          </h1>
        </header>

        <Hairline />

        {picks.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No hay selección esta semana.</p>
            <p className={styles.emptyBody}>
              Vuelve en unos días o explora el catálogo completo.
            </p>
          </div>
        ) : (
          <>
            <p className={styles.meta} aria-live="polite">
              <span className={styles.metaCount}>
                <em>{picks.length}</em> · {countLabel}
              </span>
              <span>Selección curada · sin descuentos</span>
            </p>
            <div className={styles.grid}>
              {picks.map((product, i) => (
                <CatalogCard
                  key={product.slug}
                  product={product}
                  number={i + 1}
                  status={deriveCardStatus(product.stock, product.featured)}
                  priority={i < 4}
                />
              ))}
            </div>
          </>
        )}
      </Room>
    </>
  );
}
