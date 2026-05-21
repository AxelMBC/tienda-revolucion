export type Size = "S" | "M" | "L" | "XL";

export type Category =
  | "camisas"
  | "playeras"
  | "pantalones"
  | "chaquetas"
  | "accesorios";

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  sizes: Size[];
  stock: number;
  featured: boolean;
  material?: string;
  finish?: string;
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
