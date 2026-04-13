const fs = require('fs');
const path = require('path');

// Supported locales
const locales = ['tr', 'en', 'ar'];
const defaultLocale = 'tr';

// Route translations for SEO-friendly URLs
const routeTranslations = {
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
};

function getLocalizedRoute(route, locale) {
  return routeTranslations[route]?.[locale] || route;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kalindayapi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  autoLastmod: true,
  exclude: [
    '/admin/*',
    '/api/*',
    '/icon.png',
    '/icon*',
    '/*.png',
    '/*.ico',
    '/server-sitemap.xml',
    '/_not-found',
    // Exclude non-localized routes (redirect to /tr/)
    '/',
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
  additionalPaths: async (config) => {
    const paths = [];
    const siteUrl = 'https://www.kalindayapi.com';

    // Helper to generate alternates for a path
    function generateAlternates(basePath, locale) {
      const alternates = {};
      for (const loc of locales) {
        // For homepage
        if (basePath === '') {
          alternates[loc] = `${siteUrl}/${loc}`;
        } else {
          // Parse the path and localize each segment
          const segments = basePath.split('/').filter(Boolean);
          const localizedSegments = segments.map(seg => getLocalizedRoute(seg, loc));
          alternates[loc] = `${siteUrl}/${loc}/${localizedSegments.join('/')}`;
        }
      }
      alternates['x-default'] = alternates[defaultLocale];
      return alternates;
    }

    // Static pages for each locale
    const staticPages = [
      { path: '', priority: 1.0, changefreq: 'daily' },
      { path: 'ilanlar', priority: 0.9, changefreq: 'daily' },
      { path: 'hizmetler', priority: 0.8, changefreq: 'monthly' },
      { path: 'blog', priority: 0.8, changefreq: 'weekly' },
      { path: 'hakkimizda', priority: 0.6, changefreq: 'monthly' },
      { path: 'iletisim', priority: 0.6, changefreq: 'monthly' },
      { path: 'sss', priority: 0.5, changefreq: 'monthly' },
      { path: 'doviz-kurlari', priority: 0.7, changefreq: 'daily' },
      { path: 'rehber', priority: 0.7, changefreq: 'weekly' },
    ];

    // Add static pages for each locale
    for (const page of staticPages) {
      for (const locale of locales) {
        const localizedPath = page.path ? getLocalizedRoute(page.path, locale) : '';
        const loc = localizedPath ? `/${locale}/${localizedPath}` : `/${locale}`;
        const alternates = generateAlternates(page.path, locale);

        paths.push({
          loc,
          changefreq: page.changefreq,
          priority: page.priority,
          lastmod: new Date().toISOString(),
          alternateRefs: Object.entries(alternates).map(([hreflang, href]) => ({
            hreflang,
            href,
          })),
        });
      }
    }

    // Blog posts (currently only Turkish, but structure supports multi-lang)
    try {
      const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      if (fs.existsSync(blogPath)) {
        const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
        if (blogData && blogData.yazilar) {
          for (const post of blogData.yazilar) {
            // For now, only add Turkish blog posts
            paths.push({
              loc: `/tr/blog/${post.slug}`,
              changefreq: 'weekly',
              priority: 0.7,
              lastmod: post.yayinTarihi ? new Date(post.yayinTarihi).toISOString() : new Date().toISOString(),
            });
          }
          console.log(`${blogData.yazilar.length} blog yazisi sitemap'e eklendi`);
        }
      }
    } catch (error) {
      console.error('Blog posts yuklenemedi:', error);
    }

    // Rehber pages for each locale
    const ilceSlugs = [
      'ortaca', 'dalyan', 'koycegiz', 'dalaman', 'fethiye', 'marmaris',
      'bodrum', 'milas', 'mentese', 'datca', 'ula', 'yatagan',
      'kavaklidere', 'seydikemer',
    ];

    for (const locale of locales) {
      const rehberRoute = getLocalizedRoute('rehber', locale);

      for (const slug of ilceSlugs) {
        paths.push({
          loc: `/${locale}/${rehberRoute}/${slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        });
      }
    }

    console.log(`Toplam ${paths.length} sayfa sitemap'e eklendi`);
    return paths;
  },
  transform: async (config, path) => {
    // Skip non-localized paths (they are excluded)
    if (!path.match(/^\/(tr|en|ar)(\/|$)/)) {
      return null;
    }

    // Custom priority for different pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Extract locale and actual path
    const pathMatch = path.match(/^\/(tr|en|ar)(\/.*)?$/);
    const locale = pathMatch ? pathMatch[1] : 'tr';
    const actualPath = pathMatch ? (pathMatch[2] || '') : path;

    // Check patterns for priority
    if (actualPath === '' || actualPath === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (actualPath.includes('ilanlar') || actualPath.includes('listings') || actualPath.includes('عقارات')) {
      if (actualPath.split('/').filter(Boolean).length > 1) {
        priority = 0.8; // Detail page
      } else {
        priority = 0.9; // List page
      }
      changefreq = 'weekly';
    } else if (actualPath.includes('doviz') || actualPath.includes('exchange')) {
      priority = 0.7;
      changefreq = 'daily';
    } else if (actualPath.includes('hizmetler') || actualPath.includes('services') || actualPath.includes('خدمات')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (actualPath.includes('blog') || actualPath.includes('مدونة')) {
      if (actualPath.split('/').filter(Boolean).length > 1) {
        priority = 0.7; // Detail page
      } else {
        priority = 0.8; // List page
      }
      changefreq = 'weekly';
    } else if (actualPath.includes('iletisim') || actualPath.includes('contact') || actualPath.includes('hakkimizda') || actualPath.includes('about')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
