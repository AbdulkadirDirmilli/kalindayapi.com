const fs = require('fs');
const path = require('path');

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
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://www.kalindayapi.com/server-sitemap.xml',
    ],
  },
  additionalPaths: async (config) => {
    const paths = [];

    // Blog yazılarını ekle
    try {
      const blogPath = path.join(process.cwd(), 'data', 'blog-posts.json');
      if (fs.existsSync(blogPath)) {
        const blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
        if (blogData && blogData.yazilar) {
          for (const post of blogData.yazilar) {
            paths.push({
              loc: `/blog/${post.slug}`,
              changefreq: 'weekly',
              priority: 0.7,
              lastmod: post.yayinTarihi ? new Date(post.yayinTarihi).toISOString() : new Date().toISOString(),
            });
          }
          console.log(`${paths.length} blog yazisi sitemap'e eklendi`);
        }
      }
    } catch (error) {
      console.error('Blog posts yuklenemedi:', error);
    }

    // Rehber sayfalarını ekle
    const ilceSlugs = [
      'ortaca', 'dalyan', 'koycegiz', 'dalaman', 'fethiye', 'marmaris',
      'bodrum', 'milas', 'mentese', 'datca', 'ula', 'yatagan',
      'kavaklidere', 'seydikemer',
    ];

    // Ana rehber sayfası
    paths.push({
      loc: '/rehber',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    });

    // İlçe rehber sayfaları
    for (const slug of ilceSlugs) {
      paths.push({
        loc: `/rehber/${slug}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    }

    console.log(`Toplam ${paths.length} ek sayfa sitemap'e eklendi`);
    return paths;
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/ilanlar' || path === '/doviz-kurlari') {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/ilanlar/')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/hizmetler')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/blog') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path === '/iletisim' || path === '/hakkimizda') {
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
