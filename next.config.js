/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization: serve AVIF first (~50% smaller than JPEG at equal
  // quality), fall back to WebP, then the original format. Sizes aligned to
  // the viewports this site actually targets so `next/image` generates a
  // tight srcset rather than a dozen near-duplicates. The cache TTL is set
  // to a year — image URLs are content-addressed, so long TTL is safe.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 600, 800],
  },

  // Long-cache immutable static assets in /public/media. These file names
  // are stable; when we change an image we change the filename.
  async headers() {
    return [
      {
        source: '/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/branding/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
