import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

/**
 * `/sitemap.xml` — single-page marketing site, so the sitemap has exactly
 * one URL: the canonical origin. Google explicitly ignores fragment-only
 * URLs (e.g. `/#services`) in sitemaps — they're deduplicated against the
 * root document at indexing time, so declaring them inflates the sitemap
 * without any ranking benefit. Re-introduce additional entries only when
 * we ship real, separately-addressable pages (`/services`, `/blog/*`, etc).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const origin = site.canonicalOrigin

  return [
    {
      url: `${origin}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
