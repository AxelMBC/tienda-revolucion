import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getFeatured } from "@/lib/products";
import type { Category, Product } from "@/lib/types";

const SINGULAR: Record<Category, string> = {
  playeras: "Playera",
  camisas: "Camisa",
  pantalones: "Pantalón",
  chaquetas: "Chaqueta",
  accesorios: "Accesorio",
};

const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

function PieceRow({ product, index }: { product: Product; index: number }) {
  const imageOnLeft = index % 2 === 0;
  return (
    <Reveal>
      <article
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center py-20 sm:py-28"
      >
        <Link
          href={`/producto/${product.slug}`}
          className={`relative block lg:col-span-7 group ${
            imageOnLeft ? "" : "lg:order-2"
          }`}
        >
          <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-[var(--color-canvas)]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-[0.94]"
            />
          </div>
        </Link>

        <div
          className={`lg:col-span-5 ${imageOnLeft ? "" : "lg:order-1"}`}
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-bronze)] mb-5">
            {SINGULAR[product.category]}
          </p>
          <Link
            href={`/producto/${product.slug}`}
            className="group inline-block"
          >
            <h3 className="font-display text-2xl sm:text-3xl text-onyx leading-tight">
              {product.name}
            </h3>
            <span
              aria-hidden
              className="block h-px bg-[var(--color-bronze)] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 mt-1"
            />
          </Link>
          <p className="mt-5 text-onyx/75 leading-relaxed max-w-md">
            {product.description}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <span className="text-[12px] uppercase tracking-[0.18em] text-[var(--color-smoke)]">
              {formatMXN(product.price)}
            </span>
            <Link
              href={`/producto/${product.slug}`}
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-onyx"
            >
              <span className="relative pb-1">
                Detalles
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--color-bronze)] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </span>
              <span
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ThePieces() {
  const featured = getFeatured().slice(0, 4);

  return (
    <section id="piezas" className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 pt-24 sm:pt-32">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-smoke)] mb-4">
            Las piezas
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-onyx max-w-xl">
            Pocas, escogidas una por una.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 divide-y divide-[var(--color-smoke)]/30">
        {featured.map((product, i) => (
          <PieceRow key={product.slug} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
