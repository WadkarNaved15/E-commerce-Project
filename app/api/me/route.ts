export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
    return NextResponse.json({
      user: { id: decoded.userId.toString(), role: decoded.role },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
