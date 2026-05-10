// Çok dilli site konfigürasyonu

export const locales = ['tr', 'en', 'ar', 'de', 'ru'] as const;
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
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪',
    hreflang: 'de',
  },
  ru: {
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
    flag: '🇷🇺',
    hreflang: 'ru',
  },
};

// URL slug çevirileri (SEO için lokalize edilmiş URL'ler)
export const routeTranslations: Record<string, Record<Locale, string>> = {
  // Ana sayfalar
  ilanlar: { tr: 'ilanlar', en: 'listings', ar: 'عقارات', de: 'immobilien', ru: 'недвижимость' },
  hizmetler: { tr: 'hizmetler', en: 'services', ar: 'خدمات', de: 'dienstleistungen', ru: 'услуги' },
  blog: { tr: 'blog', en: 'blog', ar: 'مدونة', de: 'blog', ru: 'блог' },
  hakkimizda: { tr: 'hakkimizda', en: 'about', ar: 'حول', de: 'ueber-uns', ru: 'о-нас' },
  iletisim: { tr: 'iletisim', en: 'contact', ar: 'اتصل', de: 'kontakt', ru: 'контакты' },
  sss: { tr: 'sss', en: 'faq', ar: 'الأسئلة-الشائعة', de: 'faq', ru: 'чаво' },
  gizlilik: { tr: 'gizlilik', en: 'privacy', ar: 'الخصوصية', de: 'datenschutz', ru: 'конфиденциальность' },
  'kullanim-kosullari': { tr: 'kullanim-kosullari', en: 'terms', ar: 'الشروط', de: 'nutzungsbedingungen', ru: 'условия' },
  'doviz-kurlari': { tr: 'doviz-kurlari', en: 'exchange-rates', ar: 'أسعار-الصرف', de: 'wechselkurse', ru: 'курсы-валют' },
  rehber: { tr: 'rehber', en: 'guide', ar: 'دليل', de: 'ratgeber', ru: 'гид' },
  kurumsal: { tr: 'kurumsal', en: 'corporate', ar: 'الشركة', de: 'unternehmen', ru: 'компания' },

  // Hizmet alt sayfaları
  'emlak-danismanligi': { tr: 'emlak-danismanligi', en: 'real-estate-consulting', ar: 'استشارات-عقارية', de: 'immobilienberatung', ru: 'консультации-по-недвижимости' },
  'tadilat-dekorasyon': { tr: 'tadilat-dekorasyon', en: 'renovation-decoration', ar: 'تجديد-ديكور', de: 'renovierung-dekoration', ru: 'ремонт-декор' },
  'taahhut-insaat': { tr: 'taahhut-insaat', en: 'construction-contracting', ar: 'المقاولات-البناء', de: 'bauunternehmen', ru: 'строительство' },
  'plan-proje': { tr: 'plan-proje', en: 'planning-design', ar: 'التخطيط-التصميم', de: 'planung-design', ru: 'планирование-дизайн' },

  // Kurumsal alt sayfalar
  'vizyon-misyon': { tr: 'vizyon-misyon', en: 'vision-mission', ar: 'الرؤية-المهمة', de: 'vision-mission', ru: 'миссия-видение' },
  referanslar: { tr: 'referanslar', en: 'references', ar: 'المراجع', de: 'referenzen', ru: 'рекомендации' },
  belgeler: { tr: 'belgeler', en: 'certificates', ar: 'الشهادات', de: 'zertifikate', ru: 'сертификаты' },

  // SEO Landing Pages
  'ortaca-satilik-daire': { tr: 'ortaca-satilik-daire', en: 'ortaca-apartments-for-sale', ar: 'شقق-للبيع-أورتاجا', de: 'ortaca-wohnungen-kaufen', ru: 'квартиры-на-продажу-ортаджа' },
  'ortaca-kiralik-daire': { tr: 'ortaca-kiralik-daire', en: 'ortaca-apartments-for-rent', ar: 'شقق-للإيجار-أورتاجا', de: 'ortaca-wohnungen-mieten', ru: 'квартиры-в-аренду-ортаджа' },
  'dalaman-satilik-ev': { tr: 'dalaman-satilik-ev', en: 'dalaman-houses-for-sale', ar: 'منازل-للبيع-دالامان', de: 'dalaman-haeuser-kaufen', ru: 'дома-на-продажу-даламан' },
  'ortaca-ogrenci-kiralik': { tr: 'ortaca-ogrenci-kiralik', en: 'ortaca-student-rentals', ar: 'إيجار-طلاب-أورتاجا', de: 'ortaca-studentenwohnungen', ru: 'аренда-для-студентов-ортаджа' },
  'dalyan-satilik-villa': { tr: 'dalyan-satilik-villa', en: 'dalyan-villas-for-sale', ar: 'فلل-للبيع-دالان', de: 'dalyan-villen-kaufen', ru: 'виллы-на-продажу-дальян' },
  'ortaca-emlak-ofisi': { tr: 'ortaca-emlak-ofisi', en: 'ortaca-real-estate-office', ar: 'مكتب-عقارات-أورتاجا', de: 'ortaca-immobilienbuero', ru: 'агентство-недвижимости-ортаджа' },
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

// Çevrilmemesi gereken route'lar (klasör adları)
// Bu route'lar tüm dillerde aynı kalır
const nonTranslatableRoutes = [
  'rehber',
  // SEO Landing Pages - Türkçe klasör adları kullanılıyor
  'ortaca-satilik-daire',
  'ortaca-kiralik-daire',
  'dalaman-satilik-ev',
  'dalyan-satilik-villa',
  'ortaca-ogrenci-kiralik',
  'ortaca-emlak-ofisi',
];

// Orijinal route'u dil bazlı route'a çevir
export function getLocalizedRoute(originalRoute: string, locale: Locale): string {
  // Çevrilmemesi gereken route'lar için direkt döndür
  if (nonTranslatableRoutes.includes(originalRoute)) {
    return originalRoute;
  }
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
