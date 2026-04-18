import type { Metadata, Viewport } from 'next'

import { Inter, Playfair_Display } from 'next/font/google'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { JsonLd } from '@/components/JsonLd'
import { site } from '@/data/site'
import { cn } from '@/utilities/ui'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  // We only actually render 400 (body display), 500 (wordmark/eyebrows),
  // and the italic variants. Dropping 600 + 700 shaves ~60KB off the
  // initial font payload without changing a single glyph on-screen.
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(playfair.variable, inter.variable)} lang="en-US">
      <head>
        {/* Google Maps is embedded on the Visit section; preconnect so the
            iframe starts resolving before it scrolls into view. next/font
            already handles its own fonts.gstatic.com preconnect, so we
            don't duplicate it. */}
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* Safari pinned-tab monochrome icon — Apple still reads this on
            macOS Safari even in 2025. Falls back gracefully if the SVG is
            missing. Color matches our editorial ink tone. */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1f1a17" />

        {/* Explicit hint that both schemes are supported; some browsers
            (Firefox in particular) render form controls darker when this is
            set, which pairs better with our ink palette. */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

/**
 * Viewport + color-scheme hints. Next 16 splits these out of `metadata` —
 * `themeColor` lives here, and we surface a light + dark pair so browser
 * chrome (mobile address bar, PWA title bar) matches the editorial palette.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: site.brand.ivory },
    { media: '(prefers-color-scheme: dark)', color: site.brand.ink },
  ],
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalOrigin),
  applicationName: site.name,
  generator: 'Next.js',
  title: {
    default: `${site.name} — Hair Salon in ${site.address.city}, ${site.address.state}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.legalName, url: site.canonicalOrigin }],
  creator: site.legalName,
  publisher: site.legalName,
  category: 'Hair Salon',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: '/',
    // When we add `/services`, `/blog`, etc. they'll auto-inherit canonical.
    types: {
      'application/rss+xml': [],
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    title: `${site.name} — Hair Salon in ${site.address.city}, ${site.address.state}`,
    description: site.ogDescription,
    url: site.canonicalOrigin,
    // OG image is auto-picked up from `app/opengraph-image.tsx`.
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Hair Salon in ${site.address.city}, ${site.address.state}`,
    description: site.ogDescription,
    // Twitter image auto-picked up from `app/twitter-image.tsx`.
  },
  facebook: {
    // If a Facebook App ID is ever created, drop it here. Leaving empty for now.
  },
  icons: {
    // Next auto-wires app/icon.png & app/apple-icon.png, but explicit entries
    // also help some crawlers (LinkedIn, older clients).
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    // ACTION REQUIRED — drop these tokens in after claiming ownership in:
    //   • Google Search Console (https://search.google.com/search-console)
    //     → "Add property" → https://dynamicstylz.com → "HTML tag" method
    //     → copy the `content="..."` value into `google` below.
    //   • Bing Webmaster Tools (https://www.bing.com/webmasters)
    //     → "Add site" → HTML Meta Tag method → drop into `other.msvalidate.01`.
    // Until these are set, the <meta> tags simply aren't emitted — nothing
    // breaks, just no crawler-ownership claim.
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  other: {
    // Editorial + branding hints that some crawlers pick up.
    'business:contact_data:street_address': site.address.street,
    'business:contact_data:locality': site.address.city,
    'business:contact_data:region': site.address.state,
    'business:contact_data:postal_code': site.address.zip,
    'business:contact_data:country_name': site.address.countryName,
    'business:contact_data:phone_number': site.phone.display,
    'business:contact_data:website': site.canonicalOrigin,
    'geo.region': `${site.address.country}-${site.address.state}`,
    'geo.placename': `${site.address.city}, ${site.address.state}`,
    'geo.position': `${site.geo.latitude};${site.geo.longitude}`,
    ICBM: `${site.geo.latitude}, ${site.geo.longitude}`,
  },
}
