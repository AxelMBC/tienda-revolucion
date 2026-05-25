import { z } from "zod";

export const CategoryEnum = z.enum([
  "camisas",
  "playeras",
  "pantalones",
  "chaquetas",
  "accesorios",
]);

export const SizeEnum = z.enum(["S", "M", "L", "XL", "XXL"]);

const ProductSpecs = z.object({
  material: z.string(),
  corte: z.string(),
  hechura: z.string(),
  color: z.string(),
  cuidado: z.string(),
  procedencia: z.string(),
});

const ProductShipping = z.object({
  local: z.string(),
  localNote: z.string(),
  pickup: z.string(),
  pickupNote: z.string(),
});

const ProductStory = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  lede: z.string(),
  paragraphs: z.array(z.string()),
  author: z.string(),
});

const ProductQuote = z.object({
  mark: z.string(),
  text: z.string(),
  attribution: z.string(),
});

const VariantInput = z.object({
  size: SizeEnum,
  stock: z.number().int().nonnegative(),
  isDefault: z.boolean().default(false),
});

export const ProductCreate = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  category: CategoryEnum,
  featured: z.boolean().default(false),
  status: z.string().optional(),
  edition: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  lede: z.string().optional(),
  images: z.array(z.string()).min(1),
  imageLabels: z.array(z.string()).default([]),
  specs: ProductSpecs.optional(),
  shipping: ProductShipping.optional(),
  story: ProductStory.optional(),
  quote: ProductQuote.optional(),
  variants: z.array(VariantInput).min(1),
});

export const ProductUpdate = ProductCreate.partial();

export const ProductListQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(24),
  category: CategoryEnum.optional(),
});

export type ProductCreateInput = z.infer<typeof ProductCreate>;
export type ProductUpdateInput = z.infer<typeof ProductUpdate>;
