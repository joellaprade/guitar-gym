import { NextResponse, NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  const cookie = req.headers.get('cookie');
  const { pathname } = req.nextUrl;
  const unprotectedRoutes = ['/', '/login', '/signup', '/verify-account', '/change-password', '/change-password/request'];
  const isProtectedRoute = !unprotectedRoutes.includes(pathname);

  if (!cookie && isProtectedRoute) return NextResponse.redirect(new URL('/', req.url));

  // Use http:// for internal server-to-server fetch — the Next.js server speaks
  // plain HTTP even when the client connects via https (e.g. reverse proxy / dev testing).
  const internalOrigin = `http://${req.nextUrl.hostname}:${req.nextUrl.port || '3000'}`;
  const result = await fetch(`${internalOrigin}/api/validate-session`, {
    headers: { cookie: cookie || '' },
  });
  const { isValidSession } = await result.json();

  if (!isValidSession && isProtectedRoute) return NextResponse.redirect(new URL('/', req.url));

  if (isValidSession && pathname == '/') return NextResponse.redirect(new URL('/home', req.url));
}

export const config = {
  matcher: ['/((?!_next/|api/|assets/|.well-known/|favicon).*)'],
};
