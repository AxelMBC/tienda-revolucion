import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { CategoryCards } from "@/components/home/CategoryCards";
import { ValueProps } from "@/components/home/ValueProps";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Revolución: ropa urbana de lujo para hombre. Camisas, pantalones, chaquetas y accesorios de edición limitada. Pide por WhatsApp y recoge en tienda.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedGrid />
      <CategoryCards />
      <ValueProps />
    </>
  );
}
