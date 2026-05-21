import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CatalogFilters } from "@/components/filters/CatalogFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { filterProducts, getCategoryMeta } from "@/lib/products";
import type { Category, Size } from "@/lib/types";

const VALID_CATEGORIES: Category[] = [
  "camisas",
  "pantalones",
  "chaquetas",
  "accesorios",
];
const VALID_SIZES: Size[] = ["S", "M", "L", "XL"];

function parseCategory(v: string | undefined): Category | undefined {
  return v && VALID_CATEGORIES.includes(v as Category)
    ? (v as Category)
    : undefined;
}

function parseSize(v: string | undefined): Size | undefined {
  return v && VALID_SIZES.includes(v as Size) ? (v as Size) : undefined;
}

interface CatalogPageProps {
  searchParams: Promise<{ category?: string; size?: string }>;
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
    : "Catálogo completo de Revolución: camisas, pantalones, chaquetas y accesorios para hombre.";
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
  const products = filterProducts({ category, size });
  const categoryMeta = category ? getCategoryMeta(category) : undefined;

  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-4 max-w-2xl">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
          {categoryMeta ? "Categoría" : "Catálogo completo"}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-bone">
          {categoryMeta ? categoryMeta.label : "Catálogo"}
        </h1>
        {categoryMeta && (
          <p className="mt-4 text-base text-[var(--color-cream)] leading-relaxed">
            {categoryMeta.tagline}
          </p>
        )}
      </header>
      <CatalogFilters />
      <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] mb-8">
        {products.length} {products.length === 1 ? "pieza" : "piezas"}
      </p>
      <ProductGrid products={products} columns={4} priorityCount={4} />
    </Container>
  );
}
