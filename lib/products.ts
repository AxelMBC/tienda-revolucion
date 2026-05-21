import type {
  CardStatus,
  Category,
  CategoryMeta,
  Product,
  Size,
  SortKey,
} from "./types";

const CATEGORIES: CategoryMeta[] = [
  {
    slug: "playeras",
    label: "Playeras",
    cover: "/Products/playera-elVitor.png",
    tagline: "Gráficas de autor, algodón con peso.",
  },
  {
    slug: "camisas",
    label: "Camisas",
    cover: "/Products/camisa-morada.png",
    tagline: "Cortes sastreros, telas que respiran.",
  },
  {
    slug: "chaquetas",
    label: "Chaquetas",
    cover: "/Products/hoodie.png",
    tagline: "Capas que cuentan historia.",
  },
  {
    slug: "pantalones",
    label: "Pantalones",
    cover: "/images/categories/pantalones.svg",
    tagline: "Sastrería urbana, presencia diaria.",
  },
  {
    slug: "accesorios",
    label: "Accesorios",
    cover: "/images/categories/accesorios.svg",
    tagline: "Hardware con peso. Detalle con intención.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "playera-boss-heritage",
    name: "Playera Boss Heritage",
    description:
      "Algodón pesado en negro absoluto. Gráfica Boss bordada al frente. Corte recto, cuello reforzado. Una pieza diaria con presencia.",
    price: 890,
    images: [
      "/Products/playera-boss.png",
      "/Products/playera-boss1.png",
    ],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    featured: true,
    material: "Algodón pesado",
    finish: "Negro absoluto · Bordado Boss",
  },
  {
    slug: "playera-boss-vintage",
    name: "Playera Boss Vintage",
    description:
      "Edición lavada en algodón orgánico. Bordado vintage al pecho, costuras envejecidas a mano. Lote corto.",
    price: 990,
    images: [
      "/Products/playera-boss-2.png",
      "/Products/playera-boss3.png",
    ],
    category: "playeras",
    sizes: ["M", "L", "XL"],
    stock: 8,
    featured: true,
    material: "Algodón orgánico",
    finish: "Lavado piedra · Bordado vintage",
  },
  {
    slug: "playera-el-vitor",
    name: "Playera El Vitor",
    description:
      "Gráfica de autor en algodón peinado. Negro profundo, impresión a mano. Colaboración limitada.",
    price: 790,
    images: ["/Products/playera-elVitor.png"],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    stock: 11,
    featured: false,
    material: "Algodón peinado",
    finish: "Negro profundo · Impresión a mano",
  },
  {
    slug: "playera-off-white-essential",
    name: "Playera Off White Essential",
    description:
      "Blanco hueso, algodón mercerizado. Cuello redondo limpio, cae suelta sin perder forma. La base del uniforme.",
    price: 690,
    images: ["/Products/playera-offWhite.png"],
    category: "playeras",
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    featured: false,
    material: "Algodón mercerizado",
    finish: "Blanco hueso · Cuello redondo",
  },
  {
    slug: "camisa-morada-noche",
    name: "Camisa Morada Noche",
    description:
      "Camisa en morado profundo, tejido satinado con caída pesada. Cuello cubano abierto, botonadura discreta. Pieza de noche con presencia inequívoca.",
    price: 2290,
    images: ["/Products/camisa-morada.png"],
    category: "camisas",
    sizes: ["S", "M", "L"],
    stock: 5,
    featured: true,
    material: "Seda jacquard",
    finish: "Morado profundo · Jacquard geom.",
  },
  {
    slug: "camisa-lino-obsidiana",
    name: "Camisa Lino Obsidiana",
    description:
      "Lino italiano teñido en negro profundo. Botonadura de hueso pulido y costuras a mano en el cuello. Cae limpia, respira en climas cálidos.",
    price: 1490,
    images: [
      "/images/products/camisa-lino-obsidiana-1.svg",
      "/images/products/camisa-lino-obsidiana-2.svg",
    ],
    category: "camisas",
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    featured: false,
    material: "Lino italiano",
    finish: "Negro tinta · Botón de hueso",
  },
  {
    slug: "camisa-oxford-espresso",
    name: "Camisa Oxford Espresso",
    description:
      "Oxford pesado en marrón espresso. Construcción heritage, puños reforzados. Pensada para durar décadas.",
    price: 1290,
    images: [
      "/images/products/camisa-oxford-espresso-1.svg",
      "/images/products/camisa-oxford-espresso-2.svg",
    ],
    category: "camisas",
    sizes: ["M", "L", "XL"],
    stock: 9,
    featured: false,
    material: "Oxford pesado",
    finish: "Marrón espresso · Puños reforzados",
  },
  {
    slug: "pantalon-sastre-noche",
    name: "Pantalón Sastre Noche",
    description:
      "Lana fría con caída arquitectónica. Pinzas profundas, dobladillo limpio. El estándar para ocasiones donde no hay ensayo.",
    price: 2490,
    images: [
      "/images/products/pantalon-sastre-noche-1.svg",
      "/images/products/pantalon-sastre-noche-2.svg",
    ],
    category: "pantalones",
    sizes: ["S", "M", "L", "XL"],
    stock: 10,
    featured: false,
    material: "Lana fría",
    finish: "Negro · Pinzas profundas",
  },
  {
    slug: "pantalon-cargo-utility",
    name: "Pantalón Cargo Utility",
    description:
      "Algodón ripstop reforzado, bolsillos de cargo profundos con cierres ocultos. Silueta cónica, pegada a la bota.",
    price: 1790,
    images: [
      "/images/products/pantalon-cargo-utility-1.svg",
      "/images/products/pantalon-cargo-utility-2.svg",
    ],
    category: "pantalones",
    sizes: ["S", "M", "L", "XL"],
    stock: 14,
    featured: false,
    material: "Algodón ripstop",
    finish: "Verde militar · Bolsillos cargo",
  },
  {
    slug: "pantalon-lino-bone",
    name: "Pantalón Lino Hueso",
    description:
      "Lino crudo en tono hueso. Cordón interior, caída suelta. Veranos largos, ciudades calurosas.",
    price: 1390,
    images: [
      "/images/products/pantalon-lino-bone-1.svg",
      "/images/products/pantalon-lino-bone-2.svg",
    ],
    category: "pantalones",
    sizes: ["M", "L", "XL"],
    stock: 7,
    featured: false,
    material: "Lino crudo",
    finish: "Tono hueso · Cordón interior",
  },
  {
    slug: "hoodie-negro-heritage",
    name: "Hoodie Negro Heritage",
    description:
      "Felpa pesada en negro absoluto, forro interior cepillado. Capucha estructurada con cordón de algodón crudo. La capa diaria para los meses fríos.",
    price: 1690,
    images: ["/Products/hoodie.png"],
    category: "chaquetas",
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    featured: true,
    material: "Felpa pesada",
    finish: "Negro humo · 480 gsm",
  },
  {
    slug: "chaqueta-cuero-corsario",
    name: "Chaqueta Cuero Corsario",
    description:
      "Piel napa curtida vegetal, forro de raso oxblood. Hardware en latón envejecido. Pieza única, número limitado.",
    price: 4990,
    images: [
      "/images/products/chaqueta-cuero-corsario-1.svg",
      "/images/products/chaqueta-cuero-corsario-2.svg",
    ],
    category: "chaquetas",
    sizes: ["S", "M", "L"],
    stock: 4,
    featured: false,
    material: "Piel napa",
    finish: "Curtido vegetal · Forro oxblood",
  },
  {
    slug: "chaqueta-bomber-dorado",
    name: "Chaqueta Bomber Dorado",
    description:
      "Nylon italiano con interior acolchado. Cremallera de oro cepillado. Línea de hombro caída, corte oversize medido.",
    price: 2890,
    images: [
      "/images/products/chaqueta-bomber-dorado-1.svg",
      "/images/products/chaqueta-bomber-dorado-2.svg",
    ],
    category: "chaquetas",
    sizes: ["M", "L", "XL"],
    stock: 5,
    featured: false,
    material: "Nylon italiano",
    finish: "Dorado cepillado · Interior acolchado",
  },
  {
    slug: "cinturon-piel-hardware",
    name: "Cinturón Piel Hardware",
    description:
      "Piel vacuna en marrón espresso, hebilla de latón cepillado con grabado discreto. Hecho para envejecer con el portador.",
    price: 990,
    images: [
      "/images/products/cinturon-piel-hardware-1.svg",
      "/images/products/cinturon-piel-hardware-2.svg",
    ],
    category: "accesorios",
    sizes: ["M", "L", "XL"],
    stock: 18,
    featured: false,
    material: "Piel vacuna",
    finish: "Marrón espresso · Hebilla latón",
  },
  {
    slug: "gorra-revolucion",
    name: "Gorra Revolución",
    description:
      "Pana negra, bordado en hilo dorado sobre el frente. Visera curva, ajuste de hebilla metálica. Discreta pero firmada.",
    price: 690,
    images: [
      "/images/products/gorra-revolucion-1.svg",
      "/images/products/gorra-revolucion-2.svg",
    ],
    category: "accesorios",
    sizes: ["M", "L"],
    stock: 22,
    featured: false,
    material: "Pana negra",
    finish: "Bordado hilo dorado · Hebilla metálica",
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function getCategories(): CategoryMeta[] {
  return CATEGORIES;
}

export function getCategoryMeta(slug: Category): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function filterProducts(opts: {
  category?: Category;
  size?: Size;
  sort?: SortKey;
}): Product[] {
  const filtered = PRODUCTS.filter((p) => {
    if (opts.category && p.category !== opts.category) return false;
    if (opts.size && !p.sizes.includes(opts.size)) return false;
    return true;
  });
  if (opts.sort === "precio") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  return filtered;
}

export function getCategoryCounts(): Record<Category, number> {
  const counts = {
    camisas: 0,
    playeras: 0,
    pantalones: 0,
    chaquetas: 0,
    accesorios: 0,
  } satisfies Record<Category, number>;
  for (const p of PRODUCTS) counts[p.category] += 1;
  return counts;
}

export function deriveCardStatus(
  stock: number,
  featured: boolean,
): CardStatus | null {
  if (stock === 0) return "agotado";
  if (stock <= 3) return "ultima";
  if (featured && stock >= 8) return "nuevo";
  return null;
}

export const ALL_SIZES: Size[] = ["S", "M", "L", "XL"];
