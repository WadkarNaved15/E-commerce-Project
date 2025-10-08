/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://heeriya.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,

  // Exclude API routes and any other pages you don't want Google to index
  exclude: [
    '/api/*',        // all API routes
    '/login',        // optional: you may want to exclude login/register pages
    '/register',
    '/account',      // optional: user-specific pages
    '/admin/*',      // optional: admin pages
  ],

   // Override priority for specific pages
  transform: async (config, path) => {
    return {
      loc: path,            // URL
      changefreq: 'daily',  // crawl frequency
      priority: path === '/' ? 1.0 : 0.7, // homepage = 1.0
      lastmod: new Date().toISOString(),
    };
  },
};
