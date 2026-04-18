import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

/**
 * Web App Manifest — lightweight PWA hint that also influences how the
 * site shows up when pinned / added to home screen on iOS and Android.
 *
 * Not strictly required for SEO, but well-formed manifests help Google
 * render richer mobile previews and mark the site as "installable" in
 * Chrome's address bar.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.address.city}, ${site.address.state}`,
    short_name: site.name,
    description: site.ogDescription,
    start_url: '/',
    display: 'standalone',
    background_color: site.brand.ivory,
    theme_color: site.brand.ink,
    orientation: 'portrait',
    categories: ['lifestyle', 'beauty', 'local'],
    lang: 'en-US',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
