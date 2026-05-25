import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProductListQuery } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  const parsed = ProductListQuery.safeParse(
    Object.fromEntries(request.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_query", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { page, pageSize, category } = parsed.data;
  const where = category ? { category } : {};

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { variants: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
}
