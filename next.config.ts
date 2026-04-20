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

      // 5. İngilizce blog'da Türkçe slug varsa Türkçe'ye yönlendir
      // Türkçe karakterler içeren slug'lar
      {
        source: "/en/blog/:slug(.*[ıİğĞüÜşŞöÖçÇ].*)",
        destination: "/tr/blog/:slug",
        permanent: true,
      },

      // 6. Eski Arapça route'ları Türkçe route'lara yönlendir
      {
        source: "/ar/عقارات/:path*",
        destination: "/ar/ilanlar/:path*",
        permanent: true,
      },
      {
        source: "/ar/مدونة/:path*",
        destination: "/ar/blog/:path*",
        permanent: true,
      },
      {
        source: "/ar/خدمات/:path*",
        destination: "/ar/hizmetler/:path*",
        permanent: true,
      },
      {
        source: "/ar/حول",
        destination: "/ar/hakkimizda",
        permanent: true,
      },
      {
        source: "/ar/اتصل",
        destination: "/ar/iletisim",
        permanent: true,
      },
      {
        source: "/ar/دليل/:path*",
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
    // Uploaded files are served by nginx, skip optimization for them
    unoptimized: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
};

export default nextConfig;
