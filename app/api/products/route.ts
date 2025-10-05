import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { popularity: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    // Validate required fields
    if (!body.name || !body.price || !body.Category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      );
    }

    // Ensure images array exists and has at least one image
    if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      );
    }

    // Ensure sizes array exists
    if (!body.sizes || !Array.isArray(body.sizes) || body.sizes.length === 0) {
      return NextResponse.json(
        { error: 'At least one size is required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({ 
      data: {
        name: body.name,
        price: parseFloat(body.price),
        category: body.Category,
        description: body.description || '',
        features: body.features || [],
        images: body.images, // Array of image URLs from local storage
        sizes: body.sizes,
        rating: parseFloat(body.rating) || 0,
        popularity: parseInt(body.popularity) || 0,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
