/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 512],
    qualities: [100],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    const longCacheHeaders = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ];

    return [
      {
        source: '/images/:path*',
        headers: longCacheHeaders,
      },
      {
        source: '/videos/:path*',
        headers: longCacheHeaders,
      },
    ];
  },
  // Tắt X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
