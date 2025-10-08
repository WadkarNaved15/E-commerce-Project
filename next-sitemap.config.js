/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://heeriya.vercel.app', // your live domain
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'], // optional: exclude certain routes
};
