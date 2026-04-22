// src/proxy.ts
import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

// Inisialisasi TANPA adapter untuk Proxy
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  console.log('[Proxy Log] Path:', nextUrl.pathname, '| User:', isLoggedIn);

  // 1. Definisikan Whitelist (Rute yang boleh diakses tanpa login)
  const PUBLIC_ROUTES = [
    '/',
    '/auth/login',
    '/auth/registration',
    '/api/auth/signin' // Halaman default Auth.js
  ];

  const ADMIN_ROUTES = ['/dashboard/react-query'];

  // 2. Cek apakah rute saat ini ada di dalam whitelist
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname);

  // Jika user mencoba akses halaman privat (seperti /dashboard) tapi belum login
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  // Jika user sudah login tapi mencoba akses halaman auth (login/register)
  if (isLoggedIn && isPublicRoute && nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/dashboard/overview', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
