import type { Metadata } from "next";
import { Newsreader, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const serif = Newsreader({
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const mono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Revolución — Ropa de Hombre",
    template: "%s · Revolución",
  },
  description:
    "Revolución: ropa urbana de lujo para hombre. Camisas, pantalones, chaquetas y accesorios con carácter. Pide por WhatsApp y recoge en tienda.",
  applicationName: "Revolución",
  keywords: [
    "ropa de hombre",
    "moda urbana",
    "lujo",
    "camisas",
    "chaquetas",
    "Revolución",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Revolución",
    title: "Revolución — Ropa de Hombre",
    description:
      "Ropa urbana de lujo para hombre. Pide por WhatsApp y recoge en tienda.",
    images: ["/og-home.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revolución — Ropa de Hombre",
    description: "Ropa urbana de lujo para hombre.",
    images: ["/og-home.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
