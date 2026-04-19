import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Supported locales
const locales = ['tr', 'en', 'ar'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'tr'

// Route translations (localized → original)
// Keys are original Turkish routes, values are translations per locale
const routeRewrites: Record<string, Record<Locale, string>> = {
  ilanlar: { tr: 'ilanlar', en: 'listings', ar: 'عقارات' },
  hizmetler: { tr: 'hizmetler', en: 'services', ar: 'خدمات' },
  blog: { tr: 'blog', en: 'blog', ar: 'مدونة' },
  hakkimizda: { tr: 'hakkimizda', en: 'about', ar: 'حول' },
  iletisim: { tr: 'iletisim', en: 'contact', ar: 'اتصل' },
  sss: { tr: 'sss', en: 'faq', ar: 'الأسئلة-الشائعة' },
  gizlilik: { tr: 'gizlilik', en: 'privacy', ar: 'الخصوصية' },
  'kullanim-kosullari': { tr: 'kullanim-kosullari', en: 'terms', ar: 'الشروط' },
  'doviz-kurlari': { tr: 'doviz-kurlari', en: 'exchange-rates', ar: 'أسعار-الصرف' },
  rehber: { tr: 'rehber', en: 'guide', ar: 'دليل' },
  kurumsal: { tr: 'kurumsal', en: 'corporate', ar: 'الشركة' },
  // Alt sayfalar
  'emlak-danismanligi': { tr: 'emlak-danismanligi', en: 'real-estate-consulting', ar: 'استشارات-عقارية' },
  'tadilat-dekorasyon': { tr: 'tadilat-dekorasyon', en: 'renovation-decoration', ar: 'تجديد-ديكور' },
  'taahhut-insaat': { tr: 'taahhut-insaat', en: 'construction-contracting', ar: 'المقاولات-البناء' },
  'plan-proje': { tr: 'plan-proje', en: 'planning-design', ar: 'التخطيط-التصميم' },
  'vizyon-misyon': { tr: 'vizyon-misyon', en: 'vision-mission', ar: 'الرؤية-المهمة' },
  referanslar: { tr: 'referanslar', en: 'references', ar: 'المراجع' },
  belgeler: { tr: 'belgeler', en: 'certificates', ar: 'الشهادات' },
}

// Convert localized route to original Turkish route
function getOriginalRoute(localizedRoute: string, locale: Locale): string {
  for (const [original, translations] of Object.entries(routeRewrites)) {
    if (translations[locale] === localizedRoute) {
      return original
    }
  }
  return localizedRoute // No translation found, return as-is
}

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

  // SEO URL normalization — tek bir 301 redirect'te trailing slash + double slash
  // duzeltilir. Locale eksikse, normalize + locale-ekleme ayni redirect'te yapilir
  // (chain onlenir). Assets/API icin skip.
  let normalized = pathname
  if (!shouldSkipI18n) {
    if (/\/{2,}/.test(normalized)) normalized = normalized.replace(/\/{2,}/g, '/')
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.replace(/\/+$/, '')
    }
  }

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

  // i18n: Extract locale from normalized path
  const { locale: pathLocale } = extractLocaleFromPath(normalized)

  if (pathLocale) {
    // Locale var → yalnizca normalize gerekiyorsa tek 301 redirect
    if (normalized !== pathname) {
      const url = request.nextUrl.clone()
      url.pathname = normalized
      return NextResponse.redirect(url, 301)
    }

    // Route rewrite: localize edilmis URL'yi dahili Turkce rotaya map et
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length > 1) {
      const localizedRoute = segments[1]
      const originalRoute = getOriginalRoute(localizedRoute, pathLocale)
      if (localizedRoute !== originalRoute) {
        const remainingSegments = segments.slice(2).join('/')
        const newPath = `/${segments[0]}/${originalRoute}${remainingSegments ? '/' + remainingSegments : ''}`
        const url = request.nextUrl.clone()
        url.pathname = newPath
        return NextResponse.rewrite(url)
      }
    }
    return NextResponse.next()
  }

  // Locale YOK → normalize + locale-ekleme TEK redirect'te (chain yok)
  const preferredLocale = getLocaleFromCookie(request) || getLocaleFromHeader(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${normalized === '/' ? '' : normalized}`

  const response = NextResponse.redirect(url, 301)
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
