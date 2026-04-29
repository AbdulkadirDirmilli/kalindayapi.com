import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // SEO: tek format → trailing slash YOK. Proxy ek olarak 301 ile normalize ediyor.
  trailingSlash: false,
  skipTrailingSlashRedirect: false,

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
        source: "/:lang1(tr|en|ar)/:path1/:lang2(tr|en|ar)/:path2",
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
        source: "/:lang(tr|en|ar)/blog/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar)/مدونة/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar)/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug(.*)-ar",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 4. Blog slug'larında -en suffix'ini kaldır
      {
        source: "/:lang(tr|en|ar)/blog/:slug(.*)-en",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar)/مدونة/:slug(.*)-en",
        destination: "/tr/blog/:slug",
        permanent: true,
      },
      {
        source: "/:lang(tr|en|ar)/%D9%85%D8%AF%D9%88%D9%86%D8%A9/:slug(.*)-en",
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
      // مدونة (blog)
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
      // دليل (rehber)
      {
        source: "/ar/دليل/:path*",
        destination: "/ar/rehber/:path*",
        permanent: true,
      },
      {
        source: "/ar/%D8%AF%D9%84%D9%8A%D9%84/:path*",
        destination: "/ar/rehber/:path*",
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
      {
        source: "/en/guide/:path*",
        destination: "/en/rehber/:path*",
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

      // 10. Locale prefix'siz URL'leri varsayılan dile (TR) yönlendir
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
        source: "/en/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      {
        source: "/ar/rehber",
        destination: "/tr/rehber",
        permanent: true,
      },
      // SSS sayfası - artık çoklu dil desteği var, redirect kaldırıldı
      // Gizlilik sayfası (çevirisi yok)
      {
        source: "/en/gizlilik",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      {
        source: "/ar/gizlilik",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      {
        source: "/en/privacy",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      {
        source: "/ar/الخصوصية",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      {
        source: "/ar/%D8%A7%D9%84%D8%AE%D8%B5%D9%88%D8%B5%D9%8A%D8%A9",
        destination: "/tr/gizlilik",
        permanent: true,
      },
      // Kullanım koşulları (çevirisi yok)
      {
        source: "/en/kullanim-kosullari",
        destination: "/tr/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/ar/kullanim-kosullari",
        destination: "/tr/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/en/terms",
        destination: "/tr/kullanim-kosullari",
        permanent: true,
      },
      {
        source: "/ar/الشروط",
        destination: "/tr/kullanim-kosullari",
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
