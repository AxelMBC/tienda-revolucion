import { PrismaPg } from "@prisma/adapter-pg";
import { config as loadEnv } from "dotenv";
import { PrismaClient } from "../lib/generated/prisma/client";
import type { Prisma } from "../lib/generated/prisma/client";
import { PRODUCTS } from "../lib/products";

const asJson = <T,>(value: T | undefined): Prisma.InputJsonValue | undefined =>
  value === undefined ? undefined : (value as unknown as Prisma.InputJsonValue);

loadEnv({ path: ".env.local" });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({ adapter: new PrismaPg(url) });

async function main() {
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        featured: p.featured,
        status: p.status,
        edition: p.edition,
        material: p.material,
        finish: p.finish,
        lede: p.lede,
        images: p.images,
        imageLabels: p.imageLabels ?? [],
        specs: asJson(p.specs),
        shipping: asJson(p.shipping),
        story: asJson(p.story),
        quote: asJson(p.quote),
        variants: {
          create: p.sizes.map((size) => ({
            size,
            stock: p.stock,
            isDefault: size === p.defaultSize,
          })),
        },
      },
    });
  }
  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
