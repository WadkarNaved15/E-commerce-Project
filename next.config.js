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
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
      ],
    },
    {
      source: '/sitemap-0.xml',
      headers: [
        { key: 'Content-Type', value: 'application/xml' },
        { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
      ],
    },
  ];
  },
};

module.exports = nextConfig;
