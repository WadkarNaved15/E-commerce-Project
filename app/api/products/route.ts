// /app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit")) || 12;
    const offset = Number(url.searchParams.get("offset")) || 0;
    const category = url.searchParams.get("category");
    const minPrice = Number(url.searchParams.get("minPrice")) || 0;
    const maxPrice = Number(url.searchParams.get("maxPrice")) || 5000;
    const sizes = url.searchParams.get("sizes")?.split(",").filter(Boolean);
    const sortBy = url.searchParams.get("sortBy") || "popularity";

    // Build where clause
    const where: any = {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    if (category && category !== "All") {
      where.category = category;
    }

    if (sizes && sizes.length > 0) {
      where.sizes = {
        hasSome: sizes,
      };
    }

    // Map sortBy to orderBy
    let orderBy: any = { popularity: "desc" };
    if (sortBy === "price-low") {
      orderBy = { price: "asc" };
    } else if (sortBy === "price-high") {
      orderBy = { price: "desc" };
    }

    // Fetch products with pagination
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ]);

    return new NextResponse(
      JSON.stringify({
        products,
        totalCount,
        hasMore: offset + products.length < totalCount,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}