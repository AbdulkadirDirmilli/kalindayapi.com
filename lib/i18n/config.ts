// Çok dilli site konfigürasyonu

export const locales = ['tr', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export const localeConfig: Record<Locale, {
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  hreflang: string;
}> = {
  tr: {
    name: 'Turkish',
    nativeName: 'Türkçe',
    dir: 'ltr',
    flag: '🇹🇷',
    hreflang: 'tr',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    hreflang: 'en',
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    hreflang: 'ar',
  },
};

// URL slug çevirileri (SEO için lokalize edilmiş URL'ler)
export const routeTranslations: Record<string, Record<Locale, string>> = {
  // Ana sayfalar
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

  // Hizmet alt sayfaları
  'emlak-danismanligi': { tr: 'emlak-danismanligi', en: 'real-estate-consulting', ar: 'استشارات-عقارية' },
  'tadilat-dekorasyon': { tr: 'tadilat-dekorasyon', en: 'renovation-decoration', ar: 'تجديد-ديكور' },
  'taahhut-insaat': { tr: 'taahhut-insaat', en: 'construction-contracting', ar: 'المقاولات-البناء' },
  'plan-proje': { tr: 'plan-proje', en: 'planning-design', ar: 'التخطيط-التصميم' },

  // Kurumsal alt sayfalar
  'vizyon-misyon': { tr: 'vizyon-misyon', en: 'vision-mission', ar: 'الرؤية-المهمة' },
  referanslar: { tr: 'referanslar', en: 'references', ar: 'المراجع' },
  belgeler: { tr: 'belgeler', en: 'certificates', ar: 'الشهادات' },

  // SEO Landing Pages
  'ortaca-satilik-daire': { tr: 'ortaca-satilik-daire', en: 'ortaca-apartments-for-sale', ar: 'شقق-للبيع-أورتاجا' },
  'ortaca-kiralik-daire': { tr: 'ortaca-kiralik-daire', en: 'ortaca-apartments-for-rent', ar: 'شقق-للإيجار-أورتاجا' },
  'dalaman-satilik-ev': { tr: 'dalaman-satilik-ev', en: 'dalaman-houses-for-sale', ar: 'منازل-للبيع-دالامان' },
  'ortaca-ogrenci-kiralik': { tr: 'ortaca-ogrenci-kiralik', en: 'ortaca-student-rentals', ar: 'إيجار-طلاب-أورتاجا' },
  'dalyan-satilik-villa': { tr: 'dalyan-satilik-villa', en: 'dalyan-villas-for-sale', ar: 'فلل-للبيع-دالان' },
  'ortaca-emlak-ofisi': { tr: 'ortaca-emlak-ofisi', en: 'ortaca-real-estate-office', ar: 'مكتب-عقارات-أورتاجا' },
};

// Dil bazlı route'u orijinal route'a çevir
export function getOriginalRoute(localizedRoute: string, locale: Locale): string {
  for (const [original, translations] of Object.entries(routeTranslations)) {
    if (translations[locale] === localizedRoute) {
      return original;
    }
  }
  return localizedRoute;
}

// Orijinal route'u dil bazlı route'a çevir
export function getLocalizedRoute(originalRoute: string, locale: Locale): string {
  const translation = routeTranslations[originalRoute];
  return translation ? translation[locale] : originalRoute;
}

// Full path'i lokalize et
export function localizePath(path: string, locale: Locale): string {
  // Admin ve API yollarını atla
  if (path.startsWith('/admin') || path.startsWith('/api')) {
    return path;
  }

  // Path'i parçala
  const segments = path.split('/').filter(Boolean);

  // Eğer zaten bir dil öneki varsa kaldır
  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  // Her segmenti lokalize et
  const localizedSegments = segments.map(segment => getLocalizedRoute(segment, locale));

  return `/${locale}/${localizedSegments.join('/')}`;
}

// Lokalize edilmiş path'i orijinal path'e çevir
export function getOriginalPath(localizedPath: string, locale: Locale): string {
  const segments = localizedPath.split('/').filter(Boolean);

  // Dil önekini kaldır
  if (locales.includes(segments[0] as Locale)) {
    segments.shift();
  }

  // Her segmenti orijinal haline çevir
  const originalSegments = segments.map(segment => getOriginalRoute(segment, locale));

  return `/${originalSegments.join('/')}`;
}

// Not: `generateAlternateUrls` kaldirildi. Canonical/hreflang icin `lib/seo.ts`
// `buildSeoAlternates` / `buildLocalizedUrl` kullanilir (tek kaynak).
