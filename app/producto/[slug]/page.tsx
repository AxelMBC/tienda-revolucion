import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CrumbBar, PagerLink } from "@/components/layout/CrumbBar";
import { PiezaMedia } from "@/components/product/PiezaMedia";
import { PiezaInfo } from "@/components/product/PiezaInfo";
import { PiezaStory } from "@/components/product/PiezaStory";
import { PiezaQuote } from "@/components/product/PiezaQuote";
import { PiezaRelated } from "@/components/product/PiezaRelated";
import {
  categorySingular,
  getAllProducts,
  getBySlug,
  getRelatedPieces,
} from "@/lib/catalog";
import { prisma } from "@/lib/prisma";
import type { Product, Size } from "@/lib/types";
import styles from "./producto.module.css";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rows = await prisma.product.findMany({ select: { slug: true } });
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.lede ?? product.description,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.lede ?? product.description,
      images: [product.images[0]],
      type: "website",
    },
  };
}

function formatNumber(idx: number): string {
  return String(idx + 1).padStart(2, "0");
}

function pickDefaultSize(product: Product): Size {
  if (product.defaultSize && product.sizes.includes(product.defaultSize)) {
    return product.defaultSize;
  }
  return product.sizes[0] ?? "M";
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getBySlug(slug),
    getAllProducts(),
  ]);
  if (!product) notFound();

  const allIdx = allProducts.findIndex((p) => p.slug === product.slug);
  const number = formatNumber(allIdx);
  const next = allProducts[(allIdx + 1) % allProducts.length];
  const nextNumber = formatNumber((allIdx + 1) % allProducts.length);

  const categoryLabel = product.material
    ? `${categorySingular(product.category)} · ${product.material}`
    : categorySingular(product.category);

  const specs = product.specs ?? {
    material: product.material ?? "Especificación pendiente.",
    corte: "Especificación pendiente.",
    hechura: "Especificación pendiente.",
    color: product.finish ?? "Especificación pendiente.",
    cuidado: "Lavar en frío. Plancha tibia. Sin secadora.",
    procedencia: "Hecho en México.",
  };

  const shipping = product.shipping ?? {
    local: "Nayarit · 24–48 h",
    localNote: "Resto del país: 3–5 días hábiles.",
    pickup: "En la tienda, mismo día",
    pickupNote: "Av. México 234, Centro · Tepic.",
  };

  const imageLabels = product.imageLabels ?? [
    "Vista frontal",
    "Espalda",
    "Detalle",
    "Caída",
  ];

  const related = await getRelatedPieces(product.slug, 3);
  const defaultSize = pickDefaultSize(product);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.lede ?? product.description,
    image: product.images.map((img) => `${siteUrl}${img}`),
    sku: product.slug,
    brand: { "@type": "Brand", name: "Revolución" },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/producto/${product.slug}`,
      priceCurrency: "MXN",
      price: product.price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CrumbBar
        crumbs={[
          { label: "Revolución", href: "/" },
          { label: "Catálogo", href: "/catalogo" },
          { label: `${categorySingular(product.category)} Nº ${number}` },
        ]}
        pager={
          <>
            <PagerLink href="/catalogo" direction="back">
              Volver al catálogo
            </PagerLink>
            <PagerLink href={`/producto/${next.slug}`} direction="forward">
              Nº {nextNumber} {next.name.split(" ")[0]}
            </PagerLink>
          </>
        }
      />

      <div className={styles.split}>
        <PiezaMedia
          number={`Nº ${number} · OI MMXXVI`}
          numberCaption={`${categorySingular(product.category)} nº ${number} · vista`}
          edition={product.edition}
          images={product.images}
          imageLabels={imageLabels}
          alt={product.name}
        />
        <PiezaInfo
          product={product}
          number={number}
          categoryLabel={categoryLabel}
          specs={specs}
          shipping={shipping}
          defaultSize={defaultSize}
        />
      </div>

      {product.story && <PiezaStory story={product.story} />}

      {product.quote && <PiezaQuote quote={product.quote} />}

      <PiezaRelated items={related} />
    </div>
  );
}
