import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// The GET function for a dynamic route receives the route parameters
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productId = parseInt(params.id, 10); // Convert the string ID to an integer

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId, // Query the database for a single product by its ID
      },
      // You can also include related data if needed, e.g.,
      // include: {
      //   reviews: true,
      // }
    });

    if (!product) {
      // If the product is not found, return a 404 response
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the single product
    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
