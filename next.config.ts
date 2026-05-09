import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // SEO: tek format → trailing slash YOK. Proxy ek olarak 301 ile normalize ediyor.
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

  // Güvenlik başlıkları
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
    ];
  },

  // SEO: Tüm trafiği https://www.kalindayapi.com'a yönlendir
  async redirects() {
    return [
      // non-www → www (HTTPS)
      {
        source: "/:path*",
        has: [{ type: "host", value: "kalindayapi.com" }],
        destination: "https://www.kalindayapi.com/:path*",
        permanent: true,
      },

      // =====================================================
      // 404 DÜZELTME REDİRECT'LERİ
      // =====================================================

      // 1. İç içe locale path'leri düzelt (en/contact/tr/iletisim gibi)
      {
        source: "/:lang1(tr|en|ar|de|ru)/:path1/:lang2(tr|en|ar|de|ru)/:path2",
        destination: "/:lang2/:path2",
        permanent: true,
      },

      // 2. Arapça blog route'unda Türkçe slug → Türkçe sayfaya yönlendir
      // /ar/مدونة/turkce-slug → /tr/blog/turkce-slug
      {
        source: "/ar/مدونة/:slug",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/ar/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 3. Blog slug'larında -ar suffix'ini kaldır
      {
        source: "/:lang(tr|en|ar|de|ru)/blog/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar|de|ru)/مدونة/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar|de|ru)/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 4. Blog slug'larında -en suffix'ini kaldır
      {
        source: "/:lang(tr|en|ar|de|ru)/blog/:slug(.*)-en",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar|de|ru)/مدونة/:slug(.*)-en",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar|de|ru)/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug(.*)-en",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 5. İngilizce blog'da Türkçe slug varsa Türkçe'ye yönlendir
      // Türkçe karakterler içeren slug'lar
      {
        source: "/en/blog/:slug(.*[ıİğĞüÜşŞöÖçÇ].*)",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 6. Eski Arapça route'ları Türkçe route'lara yönlendir (literal + URL-encoded)
      // عقارات (ilanlar)
      {
        source: "/ar/عقارات/:path*",
        destination: "/ar/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA/:path*",
        destination: "/ar/ilanlar/:path*",
        permanent: true,
      },
      // مدونة (blog): Türkçe slug'lar için doğrudan /tr'ye yönlendir (chain önleme)
      // Arapça çevirisi olan slug'lar /ar/blog/:slug formatında olacak
      {
        source: "/ar/مدونة/:path*",
        destination: "/ar/blog/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:path*",
        destination: "/ar/blog/:path*",
        permanent: true,
      },
      // خدمات (hizmetler)
      {
        source: "/ar/خدمات/:path*",
        destination: "/ar/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA/:path*",
        destination: "/ar/hizmetler/:path*",
        permanent: true,
      },
      // حول (hakkimizda)
      {
        source: "/ar/حول",
        destination: "/ar/hakkimizda",
        permanent: true,
      },
      {
        source: "/ar/%D8%AD%D9%88%D9%84",
        destination: "/ar/hakkimizda",
        permanent: true,
      },
      // اتصل (iletisim)
      {
        source: "/ar/اتصل",
        destination: "/ar/iletisim",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D8%AA%D8%B5%D9%84",
        destination: "/ar/iletisim",
        permanent: true,
      },
      // دليل (rehber): Rehber sadece Türkçe olduğu için doğrudan /tr'ye yönlendir (chain önleme)
      {
        source: "/ar/دليل/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ar/دليل",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/ar/%D8%AF%D9%84%D9%8A%D9%84/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D8%AF%D9%84%D9%8A%D9%84",
        destination: "/tr/rehber",
        permanent: true,
      },

      // 7. Eski İngilizce route'ları Türkçe route'lara yönlendir
      {
        source: "/en/listings/:path*",
        destination: "/en/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/en/services/:path*",
        destination: "/en/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/en/about",
        destination: "/en/hakkimizda",
        permanent: true,
      },
      {
        source: "/en/contact",
        destination: "/en/iletisim",
        permanent: true,
      },
      // guide → rehber: Rehber sadece Türkçe olduğu için doğrudan /tr'ye yönlendir (chain önleme)
      {
        source: "/en/guide/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/en/guide",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/en/faq",
        destination: "/en/sss",
        permanent: true,
      },

      // 8. İngilizce corporate route'larını Türkçe'ye yönlendir
      {
        source: "/en/corporate",
        destination: "/en/kurumsal",
        permanent: true,
      },
      {
        source: "/en/corporate/certificates",
        destination: "/en/kurumsal/belgeler",
        permanent: true,
      },
      {
        source: "/en/corporate/references",
        destination: "/en/kurumsal/referanslar",
        permanent: true,
      },
      {
        source: "/en/corporate/vision-mission",
        destination: "/en/kurumsal/vizyon-misyon",
        permanent: true,
      },

      // 9. Arapça corporate route'larını Türkçe'ye yönlendir (literal + URL-encoded)
      // الشركة (kurumsal)
      {
        source: "/ar/الشركة",
        destination: "/ar/kurumsal",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9",
        destination: "/ar/kurumsal",
        permanent: true,
      },
      {
        source: "/ar/الشركة/:path*",
        destination: "/ar/kurumsal/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D9%84%D8%B4%D8%B1%D9%83%D8%A9/:path*",
        destination: "/ar/kurumsal/:path*",
        permanent: true,
      },

      // 10. Almanca (de) route'larını Türkçe slug'lara yönlendir
      // immobilien (ilanlar)
      {
        source: "/de/immobilien/:path*",
        destination: "/de/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/de/immobilien",
        destination: "/de/ilanlar",
        permanent: true,
      },
      // dienstleistungen (hizmetler)
      {
        source: "/de/dienstleistungen/:path*",
        destination: "/de/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/de/dienstleistungen",
        destination: "/de/hizmetler",
        permanent: true,
      },
      // ueber-uns (hakkimizda)
      {
        source: "/de/ueber-uns",
        destination: "/de/hakkimizda",
        permanent: true,
      },
      // kontakt (iletisim)
      {
        source: "/de/kontakt",
        destination: "/de/iletisim",
        permanent: true,
      },
      // wechselkurse (doviz-kurlari)
      {
        source: "/de/wechselkurse",
        destination: "/de/doviz-kurlari",
        permanent: true,
      },
      // ratgeber (rehber): Rehber sadece Türkçe olduğu için doğrudan /tr'ye yönlendir (chain önleme)
      {
        source: "/de/ratgeber/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/de/ratgeber",
        destination: "/tr/rehber",
        permanent: true,
      },
      // unternehmen (kurumsal)
      {
        source: "/de/unternehmen/:path*",
        destination: "/de/kurumsal/:path*",
        permanent: true,
      },
      {
        source: "/de/unternehmen",
        destination: "/de/kurumsal",
        permanent: true,
      },
      // faq (sss)
      {
        source: "/de/faq",
        destination: "/de/sss",
        permanent: true,
      },

      // 11. Rusça (ru) route'larını Türkçe slug'lara yönlendir
      // недвижимость (ilanlar)
      {
        source: "/ru/недвижимость/:path*",
        destination: "/ru/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/ru/недвижимость",
        destination: "/ru/ilanlar",
        permanent: true,
      },
      {
        source: "/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C/:path*",
        destination: "/ru/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/ru/%D0%BD%D0%B5%D0%B4%D0%B2%D0%B8%D0%B6%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D1%8C",
        destination: "/ru/ilanlar",
        permanent: true,
      },
      // услуги (hizmetler)
      {
        source: "/ru/услуги/:path*",
        destination: "/ru/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/ru/услуги",
        destination: "/ru/hizmetler",
        permanent: true,
      },
      {
        source: "/ru/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8/:path*",
        destination: "/ru/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/ru/%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8",
        destination: "/ru/hizmetler",
        permanent: true,
      },
      // блог (blog)
      {
        source: "/ru/блог/:path*",
        destination: "/ru/blog/:path*",
        permanent: true,
      },
      {
        source: "/ru/блог",
        destination: "/ru/blog",
        permanent: true,
      },
      {
        source: "/ru/%D0%B1%D0%BB%D0%BE%D0%B3/:path*",
        destination: "/ru/blog/:path*",
        permanent: true,
      },
      {
        source: "/ru/%D0%B1%D0%BB%D0%BE%D0%B3",
        destination: "/ru/blog",
        permanent: true,
      },
      // о-нас (hakkimizda)
      {
        source: "/ru/о-нас",
        destination: "/ru/hakkimizda",
        permanent: true,
      },
      {
        source: "/ru/%D0%BE-%D0%BD%D0%B0%D1%81",
        destination: "/ru/hakkimizda",
        permanent: true,
      },
      // контакты (iletisim)
      {
        source: "/ru/контакты",
        destination: "/ru/iletisim",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D1%8B",
        destination: "/ru/iletisim",
        permanent: true,
      },
      // курсы-валют (doviz-kurlari)
      {
        source: "/ru/курсы-валют",
        destination: "/ru/doviz-kurlari",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D1%83%D1%80%D1%81%D1%8B-%D0%B2%D0%B0%D0%BB%D1%8E%D1%82",
        destination: "/ru/doviz-kurlari",
        permanent: true,
      },
      // гид (rehber): Rehber sadece Türkçe olduğu için doğrudan /tr'ye yönlendir (chain önleme)
      {
        source: "/ru/гид/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ru/гид",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/ru/%D0%B3%D0%B8%D0%B4/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ru/%D0%B3%D0%B8%D0%B4",
        destination: "/tr/rehber",
        permanent: true,
      },
      // компания (kurumsal)
      {
        source: "/ru/компания/:path*",
        destination: "/ru/kurumsal/:path*",
        permanent: true,
      },
      {
        source: "/ru/компания",
        destination: "/ru/kurumsal",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F/:path*",
        destination: "/ru/kurumsal/:path*",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D1%8F",
        destination: "/ru/kurumsal",
        permanent: true,
      },
      // чаво (sss)
      {
        source: "/ru/чаво",
        destination: "/ru/sss",
        permanent: true,
      },
      {
        source: "/ru/%D1%87%D0%B0%D0%B2%D0%BE",
        destination: "/ru/sss",
        permanent: true,
      },
      // конфиденциальность (gizlilik)
      {
        source: "/ru/конфиденциальность",
        destination: "/ru/gizlilik",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C",
        destination: "/ru/gizlilik",
        permanent: true,
      },
      // условия (kullanim-kosullari)
      {
        source: "/ru/условия",
        destination: "/ru/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/ru/%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F",
        destination: "/ru/kullanim-kosullari",
        permanent: true,
      },

      // 12. Locale prefix'siz URL'leri varsayılan dile (TR) yönlendir
      // Bu eski indexlenmiş URL'ler için gerekli
      {
        source: "/sss",
        destination: "/tr/sss",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/tr/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/tr/blog/:slug*",
        permanent: true,
      },
      {
        source: "/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/rehber/:slug*",
        destination: "/tr/rehber/:slug*",
        permanent: true,
      },
      {
        source: "/ilanlar",
        destination: "/tr/ilanlar",
        permanent: true,
      },
      {
        source: "/ilanlar/:slug*",
        destination: "/tr/ilanlar/:slug*",
        permanent: true,
      },
      {
        source: "/hizmetler",
        destination: "/tr/hizmetler",
        permanent: true,
      },
      {
        source: "/hizmetler/:slug*",
        destination: "/tr/hizmetler/:slug*",
        permanent: true,
      },
      {
        source: "/hakkimizda",
        destination: "/tr/hakkimizda",
        permanent: true,
      },
      {
        source: "/iletisim",
        destination: "/tr/iletisim",
        permanent: true,
      },
      {
        source: "/doviz-kurlari",
        destination: "/tr/doviz-kurlari",
        permanent: true,
      },
      {
        source: "/kurumsal",
        destination: "/tr/kurumsal",
        permanent: true,
      },
      {
        source: "/kurumsal/:slug*",
        destination: "/tr/kurumsal/:slug*",
        permanent: true,
      },
      {
        source: "/gizlilik",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      {
        source: "/kullanim-kosullari",
        destination: "/tr/kullanim-kosullari",
        permanent: true,
      },

      // 11. Sadece Türkçe içerik olan sayfaları TR'ye yönlendir
      // Rehber sayfaları (çevirisi yok)
      {
        source: "/en/rehber/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ar/rehber/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/de/rehber/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ru/rehber/:path*",
        destination: "/tr/rehber/:path*",
        permanent: true,
      },
      {
        source: "/en/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/ar/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/de/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/ru/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      // SSS sayfası - artık çoklu dil desteği var, redirect kaldırıldı
      // Gizlilik sayfası - artık çoklu dil desteği var
      // Çevrilen path'leri kendi dillerindeki Türkçe path'e yönlendir
      {
        source: "/en/privacy",
        destination: "/en/gizlilik",
        permanent: true,
      },
      {
        source: "/de/datenschutz",
        destination: "/de/gizlilik",
        permanent: true,
      },
      {
        source: "/ar/الخصوصية",
        destination: "/ar/gizlilik",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9",
        destination: "/ar/gizlilik",
        permanent: true,
      },
      {
        source: "/ru/конфиденциальность",
        destination: "/ru/gizlilik",
        permanent: true,
      },
      {
        source: "/ru/%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D1%8C",
        destination: "/ru/gizlilik",
        permanent: true,
      },
      // Kullanım koşulları - artık çoklu dil desteği var
      // Çevrilen path'leri kendi dillerindeki Türkçe path'e yönlendir
      {
        source: "/en/terms",
        destination: "/en/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/de/nutzungsbedingungen",
        destination: "/de/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/ar/الشروط",
        destination: "/ar/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D8%B7",
        destination: "/tr/kullanim-kosullari",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kalindayapi.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.kalindayapi.com",
        pathname: "/uploads/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/*.png",
      },
      {
        pathname: "/*.jpg",
      },
      {
        pathname: "/*.svg",
      },
    ],
    // Uploaded files are served by nginx with proper caching
    // Skip Next.js image optimization as it doesn't work in standalone mode
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
