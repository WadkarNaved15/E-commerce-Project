import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      shippingData,
      paymentData, // optional, not stored fully for security
      items,
      subtotal,
      tax,
      shipping,
      total,
    } = body;

    if (!userId || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create new order
    const order = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        totalAmount: total,
        taxAmount: tax,
        shippingAmount: shipping,
        shippingName: shippingData.name,
        shippingAddress: shippingData.address,
        shippingCity: shippingData.city,
        shippingZip: shippingData.zip,
        shippingCountry: shippingData.country,
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            quantity: item.quantity,
            size: item.selectedSize || null,
            color: item.selectedColor || null,
            price: item.product.price,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
