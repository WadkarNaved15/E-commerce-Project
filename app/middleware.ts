import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // If no token, redirect to login
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number; role: string };

    // You can attach user info to request headers (for API routes or pages)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', decoded.userId.toString());
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('JWT Verification Failed:', error);

    // If token invalid → clear cookie and redirect
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}

// ✅ Apply middleware only to specific routes
export const config = {
  matcher: ['/admin/:path*', '/api/protected/:path*'], // You can adjust this
};
