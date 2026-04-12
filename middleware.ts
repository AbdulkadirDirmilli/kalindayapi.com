import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Desteklenen diller
const locales = ['tr', 'en', 'ar'] as const
const defaultLocale = 'tr'

// Middleware'in çalışmayacağı yollar
const publicPaths = [
  '/api',
  '/admin',
  '/_next',
  '/favicon',
  '/images',
  '/logo',
  '/og-image',
  '/manifest',
  '/robots',
  '/sitemap',
  '/icon',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public paths'i atla
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Statik dosyaları atla
  if (pathname.includes('.') && !pathname.endsWith('/')) {
    return NextResponse.next()
  }

  // URL'de zaten bir locale var mı kontrol et
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Locale yoksa, varsayılan locale'e yönlendir
  // Cookie'den tercih edilen dili al
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  const preferredLocale = locales.includes(cookieLocale as typeof locales[number])
    ? cookieLocale
    : defaultLocale

  // Yeni URL oluştur
  const newUrl = new URL(`/${preferredLocale}${pathname}`, request.url)

  // Query parametrelerini koru
  newUrl.search = request.nextUrl.search

  return NextResponse.redirect(newUrl)
}

export const config = {
  // Middleware'in çalışacağı yollar
  matcher: [
    // Tüm yolları yakala ama bazılarını hariç tut
    '/((?!api|admin|_next/static|_next/image|favicon|images|.*\\..*).*)',
  ],
}
