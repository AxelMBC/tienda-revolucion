export type Size = "S" | "M" | "L" | "XL" | "XXL";

export type Category =
  | "camisas"
  | "playeras"
  | "pantalones"
  | "chaquetas"
  | "accesorios";

export interface ProductSpecs {
  material: string;
  corte: string;
  hechura: string;
  color: string;
  cuidado: string;
  procedencia: string;
}

export interface ProductShipping {
  local: string;
  localNote: string;
  pickup: string;
  pickupNote: string;
}

export interface ProductStory {
  eyebrow: string;
  heading: string;
  lede: string;
  paragraphs: string[];
  author: string;
}

export interface ProductQuote {
  mark: string;
  text: string;
  attribution: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  imageLabels?: string[];
  category: Category;
  sizes: Size[];
  defaultSize?: Size;
  stock: number;
  featured: boolean;
  material?: string;
  finish?: string;
  lede?: string;
  status?: string;
  edition?: string;
  specs?: ProductSpecs;
  shipping?: ProductShipping;
  story?: ProductStory;
  quote?: ProductQuote;
}

export type SortKey = "llegada" | "precio";

export type CardStatus = "agotado" | "ultima" | "nuevo";

export interface CartItem {
  slug: string;
  name: string;
  size: Size;
  qty: number;
  unitPrice: number;
  image: string;
}

export interface CategoryMeta {
  slug: Category;
  label: string;
  cover: string;
  tagline: string;
}
