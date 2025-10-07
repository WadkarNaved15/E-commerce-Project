import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  console.log("🔥 Middleware hit:", req.nextUrl.pathname);
  const token = req.cookies.get('token')?.value;

  // If there's no token and user tries to access admin route
  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If no token but not admin route → allow
  if (!token) return NextResponse.next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
      role: string;
    };

    // ✅ Allow only admin users to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
      console.warn('Unauthorized access attempt by non-admin');
      return NextResponse.redirect(new URL('/', req.url)); // redirect to home or 403 page
    }

    // ✅ Pass user info to next handler via headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', decoded.userId.toString());
    requestHeaders.set('x-user-role', decoded.role);
    console.log("The requested role is:", decoded.role); 
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error('JWT Verification Failed:', error);

    // If token invalid → clear cookie and redirect
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('token');
    return response;
  }
}

// ✅ Apply middleware only to admin routes and protected APIs
export const config = {
  matcher: ['/admin/:path*', '/api/protected/:path*'],
};
