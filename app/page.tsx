import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ThePieces } from "@/components/home/ThePieces";
import { About } from "@/components/home/About";
import { Visit } from "@/components/home/Visit";

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
      <ThePieces />
      <About />
      <Visit />
    </>
  );
}
