/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kalindayapi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  exclude: [
    // Tüm sayfaları hariç tut - server-sitemap.xml'den sunulacak
    '/admin/*',
    '/api/*',
    '/icon.png',
    '/icon*',
    '/*.png',
    '/*.ico',
    '/server-sitemap.xml',
    '/_not-found',
    // Root path
    '/',
    // Tüm localized path'leri hariç tut (server-sitemap.xml'de mevcut)
    '/tr',
    '/tr/*',
    '/en',
    '/en/*',
    '/ar',
    '/ar/*',
    // Non-localized routes
    '/ilanlar',
    '/ilanlar/*',
    '/hizmetler',
    '/hizmetler/*',
    '/blog',
    '/blog/*',
    '/hakkimizda',
    '/iletisim',
    '/sss',
    '/gizlilik',
    '/kullanim-kosullari',
    '/doviz-kurlari',
    '/rehber',
    '/rehber/*',
    '/kurumsal/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/.next/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://www.kalindayapi.com/server-sitemap.xml',
    ],
  },
  // Tüm sayfalar server-sitemap.xml'den sunuluyor (doğru hreflang desteği için)
  // Bu dosya sadece robots.txt ve sitemap index üretir
  additionalPaths: async () => [],
};
