/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 90, 95],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '.*\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
};

module.exports = nextConfig;
