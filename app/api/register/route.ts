import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // ✅ Define your admin email(s)
    const ADMIN_EMAILS = ["admin@gmail.com", "yourname@company.com"];

    // ✅ Determine role based on email
    const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create the user with role
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ message: "User registered successfully", role: user.role }, { status: 201 });
    res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" });

    return res;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
