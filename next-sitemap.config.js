/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kalindayapi.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://www.kalindayapi.com/sitemap.xml',
    ],
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
