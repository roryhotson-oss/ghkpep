/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'via.placeholder.com', 'raw.githubusercontent.com'],
  },
  // Disable experimental features that might cause issues
  experimental: {
    // ppr: false,
    // serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
