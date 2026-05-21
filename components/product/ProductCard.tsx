import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatMXN } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group block focus:outline-none"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-obsidian-2)] rounded-sm">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge tone="gold">Destacado</Badge>
          </div>
        )}
        {product.stock <= 5 && (
          <div className="absolute top-3 right-3">
            <Badge tone="oxblood">Últimas piezas</Badge>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-obsidian)]/85 to-transparent pointer-events-none" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-xl text-bone leading-tight group-hover:text-[var(--color-gold)] transition-colors">
            {product.name}
          </h3>
        </div>
        <span className="font-sans text-sm font-medium text-[var(--color-gold-2)] whitespace-nowrap pt-1">
          {formatMXN(product.price)}
        </span>
      </div>
    </Link>
  );
}
