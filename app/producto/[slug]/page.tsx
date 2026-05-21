import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { PRODUCTS, getBySlug } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
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
    <Container className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Migas de pan"
        className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-10"
      >
        <Link href="/" className="hover:text-[var(--color-gold)]">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/catalogo?category=${product.category}`}
          className="hover:text-[var(--color-gold)]"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-cream)]">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={product.name} />
        <ProductPurchasePanel product={product} />
      </div>
    </Container>
  );
}
