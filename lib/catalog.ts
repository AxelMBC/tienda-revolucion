import { prisma } from "@/lib/prisma";
import type {
  Product as DbProduct,
  ProductVariant as DbProductVariant,
} from "@/lib/generated/prisma/client";
import type {
  Category,
  Product,
  ProductQuote,
  ProductShipping,
  ProductSpecs,
  ProductStory,
  Size,
  SortKey,
} from "@/lib/types";

export {
  ALL_SIZES,
  categorySingular,
  deriveCardStatus,
  getCategories,
  getCategoryMeta,
} from "@/lib/products";

type DbProductWithVariants = DbProduct & { variants: DbProductVariant[] };

const SIZE_ORDER: Record<Size, number> = {
  S: 0,
  M: 1,
  L: 2,
  XL: 3,
  XXL: 4,
};

function mapDbProduct(row: DbProductWithVariants): Product {
  const variants = [...row.variants].sort(
    (a, b) => SIZE_ORDER[a.size] - SIZE_ORDER[b.size],
  );
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    price: row.price,
    images: row.images,
    imageLabels: row.imageLabels.length > 0 ? row.imageLabels : undefined,
    category: row.category,
    sizes: variants.map((v) => v.size),
    defaultSize: variants.find((v) => v.isDefault)?.size,
    stock: variants.reduce((sum, v) => sum + v.stock, 0),
    featured: row.featured,
    material: row.material ?? undefined,
    finish: row.finish ?? undefined,
    lede: row.lede ?? undefined,
    status: row.status ?? undefined,
    edition: row.edition ?? undefined,
    specs: (row.specs as unknown as ProductSpecs | null) ?? undefined,
    shipping: (row.shipping as unknown as ProductShipping | null) ?? undefined,
    story: (row.story as unknown as ProductStory | null) ?? undefined,
    quote: (row.quote as unknown as ProductQuote | null) ?? undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapDbProduct);
}

export async function getFeatured(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { featured: true },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapDbProduct);
}

// "Ofertas" is an editorial bench, not a discount list — same shape as featured.
export async function getPicks(): Promise<Product[]> {
  return getFeatured();
}

export async function getBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });
  return row ? mapDbProduct(row) : undefined;
}

export async function getByCategory(cat: Category): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category: cat },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapDbProduct);
}

export async function filterProducts(opts: {
  category?: Category;
  size?: Size;
  sort?: SortKey;
}): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      ...(opts.category ? { category: opts.category } : {}),
      ...(opts.size ? { variants: { some: { size: opts.size } } } : {}),
    },
    include: { variants: true },
    orderBy:
      opts.sort === "precio"
        ? { price: "asc" }
        : { createdAt: "asc" },
  });
  return rows.map(mapDbProduct);
}

export async function getRelatedPieces(
  slug: string,
  max = 3,
): Promise<Product[]> {
  const current = await prisma.product.findUnique({
    where: { slug },
    select: { category: true },
  });
  if (!current) return [];

  const rows = await prisma.product.findMany({
    where: { slug: { not: slug } },
    include: { variants: true },
    orderBy: { createdAt: "asc" },
  });
  const mapped = rows.map(mapDbProduct);
  const different = mapped.filter((p) => p.category !== current.category);
  const same = mapped.filter((p) => p.category === current.category);
  return [...different, ...same].slice(0, max);
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
  const counts: Record<Category, number> = {
    camisas: 0,
    playeras: 0,
    pantalones: 0,
    chaquetas: 0,
    accesorios: 0,
  };
  const grouped = await prisma.product.groupBy({
    by: ["category"],
    _count: { _all: true },
  });
  for (const row of grouped) {
    counts[row.category] = row._count._all;
  }
  return counts;
}
