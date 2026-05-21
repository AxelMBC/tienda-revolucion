import Image from "next/image";
import Link from "next/link";
import type { CardStatus, Category, Product } from "@/lib/types";
import styles from "./CatalogCard.module.css";

const CATEGORY_SINGULAR: Record<Category, string> = {
  playeras: "Playera",
  camisas: "Camisa",
  pantalones: "Pantalón",
  chaquetas: "Chaqueta",
  accesorios: "Accesorio",
};

const STATUS_LABEL: Record<CardStatus, string> = {
  agotado: "Agotado",
  ultima: "Última",
  nuevo: "Nuevo",
};

const STATUS_CLASS: Record<CardStatus, string> = {
  agotado: "badgeAgotado",
  ultima: "badgeUltima",
  nuevo: "badgeNuevo",
};

function formatPrice(n: number): string {
  return `$${n.toLocaleString("es-MX")}`;
}

function formatSizes(sizes: Product["sizes"]): string {
  if (sizes.length === 0) return "";
  if (sizes.length === 1) return sizes[0];
  return `${sizes[0]} — ${sizes[sizes.length - 1]}`;
}

interface CatalogCardProps {
  product: Product;
  number: number;
  status?: CardStatus | null;
  priority?: boolean;
}

export function CatalogCard({
  product,
  number,
  status,
  priority = false,
}: CatalogCardProps) {
  const numberLabel = `Nº ${String(number).padStart(2, "0")}`;

  return (
    <Link href={`/producto/${product.slug}`} className={styles.card}>
      <div className={styles.frame}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 32vw, 90vw"
          priority={priority}
          className={styles.img}
        />
        <span className={styles.number}>{numberLabel}</span>
        {status && (
          <span className={`${styles.badge} ${styles[STATUS_CLASS[status]]}`}>
            {STATUS_LABEL[status]}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.caption}>
          <span className={styles.captionCategory}>
            {CATEGORY_SINGULAR[product.category]}
          </span>
          {product.material ? ` · ${product.material}` : ""}
        </p>
        <h3 className={styles.title}>{product.name}</h3>
        {product.finish && <p className={styles.finish}>{product.finish}</p>}
        <div className={styles.foot}>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.sizes}>{formatSizes(product.sizes)}</p>
        </div>
      </div>
    </Link>
  );
}
