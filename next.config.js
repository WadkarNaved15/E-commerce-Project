/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
      {
        source: '/sitemap-0.xml',
        headers: [
          { key: 'Content-Type', value: 'application/xml' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
