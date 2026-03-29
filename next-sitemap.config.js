const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kalindayapi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*', '/icon.png', '/icon*', '/*.png', '/*.ico'],
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
      // Farklı olası yolları dene
      const possiblePaths = [
        path.join(process.cwd(), 'data', 'blog-posts.json'),
        path.join(__dirname, 'data', 'blog-posts.json'),
        './data/blog-posts.json',
      ];

      let blogData = null;
      for (const blogPath of possiblePaths) {
        try {
          if (fs.existsSync(blogPath)) {
            blogData = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
            console.log('Blog posts bulundu:', blogPath);
            break;
          }
        } catch (e) {
          // Devam et
        }
      }

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
    } catch (error) {
      console.error('Blog posts yuklenemedi:', error);
    }

    return paths;
  },
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/ilanlar') {
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
