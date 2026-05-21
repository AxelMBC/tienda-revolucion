import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeatured } from "@/lib/products";

export function FeaturedGrid() {
  const products = getFeatured();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
                Selección de la casa
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-bone">
                Piezas destacadas
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="hidden sm:inline-block text-[11px] uppercase tracking-[0.18em] text-[var(--color-cream)] hover:text-[var(--color-gold)] border-b border-[var(--color-border-soft)] hover:border-[var(--color-gold)] pb-1 transition-colors"
            >
              Ver todo →
            </Link>
          </div>
        </Reveal>
        <ProductGrid products={products} columns={4} priorityCount={2} />
      </Container>
    </section>
  );
}
