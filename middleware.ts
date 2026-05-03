import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, routeTranslations, getOriginalRoute, type Locale } from '@/lib/i18n/config';

// Statik sayfalar (folder-based routing kullanan)
const staticRoutes = [
  'doviz-kurlari',
  'sss',
  'gizlilik',
  'kullanim-kosullari',
  'hakkimizda',
  'iletisim',
  'rehber',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin ve API yollarını atla
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Statik dosyaları atla
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // Path'i parçala
  const segments = pathname.split('/').filter(Boolean);

  // Dil öneki kontrolü
  if (segments.length < 1) {
    return NextResponse.next();
  }

  const lang = segments[0] as Locale;

  // Geçerli dil mi kontrol et
  if (!locales.includes(lang)) {
    return NextResponse.next();
  }

  // Sadece ar, de, ru için rewrite yap (tr ve en zaten Türkçe slug kullanıyor)
  if (lang === 'tr' || lang === 'en') {
    return NextResponse.next();
  }

  // İkinci segment'i kontrol et (route slug)
  if (segments.length < 2) {
    return NextResponse.next();
  }

  const localizedSlug = segments[1];

  // Localized slug'ı orijinal Türkçe slug'a çevir
  const originalSlug = getOriginalRoute(localizedSlug, lang);

  // Eğer slug değiştiyse (yani localized bir slug'dı) ve statik bir route ise
  if (originalSlug !== localizedSlug && staticRoutes.includes(originalSlug)) {
    // URL'yi Türkçe slug ile rewrite et
    const newPathname = `/${lang}/${originalSlug}${segments.length > 2 ? '/' + segments.slice(2).join('/') : ''}`;

    const url = request.nextUrl.clone();
    url.pathname = newPathname;

    return NextResponse.rewrite(url);
  }

  // Kurumsal alt sayfaları için de rewrite yap
  if (localizedSlug === routeTranslations['kurumsal']?.[lang] || localizedSlug === 'kurumsal') {
    if (segments.length >= 3) {
      const subSlug = segments[2];
      const originalSubSlug = getOriginalRoute(subSlug, lang);

      if (originalSubSlug !== subSlug) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/kurumsal/${originalSubSlug}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  // Hizmetler alt sayfaları için de rewrite yap
  if (localizedSlug === routeTranslations['hizmetler']?.[lang] || localizedSlug === 'hizmetler') {
    if (segments.length >= 3) {
      const subSlug = segments[2];
      const originalSubSlug = getOriginalRoute(subSlug, lang);

      if (originalSubSlug !== subSlug) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/hizmetler/${originalSubSlug}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
