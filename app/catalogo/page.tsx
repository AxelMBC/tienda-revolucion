import type { Metadata } from "next";
import { Room } from "@/components/ui/Room";
import { Hairline } from "@/components/ui/Hairline";
import { CatalogFilters } from "@/components/filters/CatalogFilters";
import { CatalogCard } from "@/components/product/CatalogCard";
import {
  deriveCardStatus,
  filterProducts,
  getCategoryMeta,
} from "@/lib/products";
import type { Category, Size, SortKey } from "@/lib/types";
import styles from "./catalogo.module.css";

const VALID_CATEGORIES: Category[] = [
  "camisas",
  "playeras",
  "pantalones",
  "chaquetas",
  "accesorios",
];
const VALID_SIZES: Size[] = ["S", "M", "L", "XL"];
const VALID_SORTS: SortKey[] = ["llegada", "precio"];

function parseCategory(v: string | undefined): Category | undefined {
  return v && VALID_CATEGORIES.includes(v as Category)
    ? (v as Category)
    : undefined;
}

function parseSize(v: string | undefined): Size | undefined {
  return v && VALID_SIZES.includes(v as Size) ? (v as Size) : undefined;
}

function parseSort(v: string | undefined): SortKey {
  return v && VALID_SORTS.includes(v as SortKey) ? (v as SortKey) : "llegada";
}

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    size?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: CatalogPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const category = parseCategory(sp.category);
  const meta = category ? getCategoryMeta(category) : undefined;
  const title = meta ? meta.label : "Catálogo";
  const description = meta
    ? `${meta.label} de Revolución. ${meta.tagline}`
    : "Catálogo de Revolución. Pocas piezas, escogidas una por una.";
  return {
    title,
    description,
    alternates: { canonical: "/catalogo" },
  };
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const sp = await searchParams;
  const category = parseCategory(sp.category);
  const size = parseSize(sp.size);
  const sort = parseSort(sp.sort);
  const products = filterProducts({ category, size, sort });

  const countLabel =
    products.length === 1 ? "1 pieza" : `${products.length} piezas`;

  return (
    <Room tone="ivory" id="catalogo">
      <div className={styles.head}>
        <CatalogFilters filteredCount={products.length} />
      </div>

      <Hairline />

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>
            No encontramos piezas con esos filtros.
          </p>
          <p className={styles.emptyBody}>
            Prueba quitando alguno o explora otra categoría.
          </p>
        </div>
      ) : (
        <>
          <p className={styles.count} aria-live="polite">
            {countLabel}
          </p>
          <div className={styles.grid}>
            {products.map((product, i) => (
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
  );
}
