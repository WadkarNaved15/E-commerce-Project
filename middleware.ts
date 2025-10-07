import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!token) return NextResponse.next();

  try {
    const { payload } = await jwtVerify(token, secret);
    const { userId, role } = payload as { userId: number; role: string };

    if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
      console.warn('Unauthorized access attempt by non-admin');
      const response = NextResponse.redirect(new URL('/', req.url));
      return response;
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', userId.toString());
    requestHeaders.set('x-user-role', role);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error('JWT Verification Failed:', error);
    const response = NextResponse.redirect(new URL('/', req.url));
    response.cookies.delete('token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/protected/:path*'],
};
