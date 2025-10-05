import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };
    return NextResponse.json({
      user: { id: decoded.userId.toString(), role: decoded.role },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
