import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/products";

export function CategoryCards() {
  const categories = getCategories();

  return (
    <section className="py-20 sm:py-28 bg-[var(--color-obsidian-2)] border-y border-[var(--color-border-soft)]">
      <Container>
        <div className="mb-12 max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold-2)] mb-3">
            Categorías
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-bone">
            Recorre la colección
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo?category=${c.slug}`}
              className="group relative aspect-[3/4] block overflow-hidden rounded-sm bg-[var(--color-obsidian)]"
            >
              <Image
                src={c.cover}
                alt={c.label}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-obsidian)]/90 via-[var(--color-obsidian)]/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="font-display text-3xl text-bone mb-2">
                  {c.label}
                </h3>
                <p className="text-xs text-[var(--color-cream)] mb-4 leading-relaxed">
                  {c.tagline}
                </p>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] group-hover:text-[var(--color-gold-2)]">
                  Explorar →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
