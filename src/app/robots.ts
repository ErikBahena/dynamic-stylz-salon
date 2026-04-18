import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

/**
 * `/robots.txt` — keeps the whole site crawlable and points to the sitemap.
 * A small marketing site has no private routes; we just want to be clean.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/'],
      },
      // Explicitly welcome search and AI crawlers. Being explicit makes audits
      // easier and documents intent for the team.
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
    ],
    sitemap: `${site.canonicalOrigin}/sitemap.xml`,
    host: site.canonicalOrigin,
  }
}
