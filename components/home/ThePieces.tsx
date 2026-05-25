import { Room } from "@/components/ui/Room";
import { Piece } from "@/components/ui/Piece";
import { Reveal } from "@/components/ui/Reveal";
import { getFeatured } from "@/lib/catalog";
import type { Category, Size } from "@/lib/types";
import styles from "./ThePieces.module.css";

const SINGULAR: Record<Category, string> = {
  playeras: "Playera",
  camisas: "Camisa",
  pantalones: "Pantalón",
  chaquetas: "Chaqueta",
  accesorios: "Accesorio",
};

const RATIOS = ["tall", "square", "wide", "tall"] as const;

const formatPrice = (n: number) => `$${n.toLocaleString("es-MX")} mxn`;

const formatSizes = (sizes: Size[]) =>
  sizes.length > 1 ? `${sizes[0]} — ${sizes[sizes.length - 1]}` : sizes[0];

export async function ThePieces() {
  const featured = (await getFeatured()).slice(0, 4);

  return (
    <Room tone="ink" id="piezas">
      <Reveal y={20} duration={0.9}>
        <Room.Head
          eyebrow="Las piezas · Selección OI 26"
          title={
            <>
              Seis piezas, escogidas porque sí.
              <br />
              El resto, en la tienda.
            </>
          }
          lede="No es catálogo. Es lo que estamos colgando esta semana en la pared del fondo. Si te interesa, escríbenos por Instagram o pasa por la tienda — todo está en talla y se puede probar."
        />
      </Reveal>

      <div className={styles.pieces}>
        {featured.map((product, i) => (
          <Reveal key={product.slug} y={24} duration={1} delay={i * 0.05}>
            <Piece
              number={String(i + 1).padStart(2, "0")}
              category={SINGULAR[product.category]}
              sizes={formatSizes(product.sizes)}
              title={product.name}
              brief={product.description}
              price={formatPrice(product.price)}
              image={product.images[0]}
              alt={product.name}
              ratio={RATIOS[i % RATIOS.length]}
              href={`/producto/${product.slug}`}
            />
          </Reveal>
        ))}
      </div>
    </Room>
  );
}
