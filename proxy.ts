import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Supported locales
const locales = ['tr', 'en', 'ar'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'tr'

// Get locale from Accept-Language header
function getLocaleFromHeader(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('Accept-Language')
  if (!acceptLanguage) return defaultLocale

  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, priority = 'q=1'] = lang.trim().split(';')
      const q = parseFloat(priority.replace('q=', '')) || 1
      return { code: code.split('-')[0].toLowerCase(), q }
    })
    .sort((a, b) => b.q - a.q)

  for (const { code } of languages) {
    if (locales.includes(code as Locale)) {
      return code as Locale
    }
  }

  return defaultLocale
}

// Get locale from cookie
function getLocaleFromCookie(request: NextRequest): Locale | null {
  const localeCookie = request.cookies.get('NEXT_LOCALE')
  if (localeCookie && locales.includes(localeCookie.value as Locale)) {
    return localeCookie.value as Locale
  }
  return null
}

// Extract locale from path
function extractLocaleFromPath(pathname: string): { locale: Locale | null; pathWithoutLocale: string } {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return {
      locale: segments[0] as Locale,
      pathWithoutLocale: '/' + segments.slice(1).join('/'),
    }
  }

  return { locale: null, pathWithoutLocale: pathname }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // non-www to www redirect (SEO & favicon icin onemli)
  if (hostname === 'kalindayapi.com' || hostname.startsWith('kalindayapi.com:')) {
    const redirectUrl = `https://www.kalindayapi.com${pathname}${request.nextUrl.search}`
    return NextResponse.redirect(redirectUrl, 301)
  }

  // Skip i18n for admin, api, static files
  const shouldSkipI18n =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.json' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/sitemap-0.xml' ||
    pathname === '/server-sitemap.xml'

  // Admin rotalarini kontrol et
  if (pathname.startsWith('/admin')) {
    // Login sayfasi haric
    if (pathname === '/admin/giris') {
      // Zaten giris yapmissa admin paneline yonlendir
      const token = await getToken({ req: request })
      if (token) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.next()
    }

    // Diger admin sayfalari icin auth kontrolu
    const token = await getToken({ req: request })
    if (!token) {
      const loginUrl = new URL('/admin/giris', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // Skip i18n for non-page routes
  if (shouldSkipI18n) {
    return NextResponse.next()
  }

  // i18n: Extract locale from path
  const { locale: pathLocale } = extractLocaleFromPath(pathname)

  // If path has valid locale, continue
  if (pathLocale) {
    return NextResponse.next()
  }

  // No locale prefix - redirect to preferred locale
  const preferredLocale = getLocaleFromCookie(request) || getLocaleFromHeader(request)

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`

  // 301 redirect for SEO
  const response = NextResponse.redirect(url, { status: 301 })

  // Save locale preference in cookie
  response.cookies.set('NEXT_LOCALE', preferredLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: [
    // www redirect icin tum path'ler (static dosyalar ve upload API haric)
    '/((?!_next/static|_next/image|favicon.ico|api/upload|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
