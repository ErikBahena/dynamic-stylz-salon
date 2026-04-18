import { ImageResponse } from 'next/og'

import { site } from '@/data/site'

export const alt = `${site.name} — ${site.address.city}, ${site.address.state}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Dynamic Open Graph image rendered at build time.
 *
 * Composition: ink background, oversize serif "Dynamic Stylz Salon" wordmark,
 * an italic tagline, and a baseline meta row (address · hours · phone).
 * Text-safe — everything stays well inside the 1200×630 frame so crops on
 * various platforms (Twitter summary, Slack, iMessage, LinkedIn) don't clip
 * anything critical.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 88px',
          background: site.brand.ink,
          color: site.brand.ivory,
          fontFamily: 'serif',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'sans-serif',
            fontSize: 20,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.7)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 1,
              background: 'rgba(247,243,236,0.45)',
            }}
          />
          Hair Salon · {site.address.city}, {site.address.state}
        </div>

        {/* Wordmark + italic tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 0.95,
              letterSpacing: -2,
              color: site.brand.ivory,
              fontWeight: 500,
            }}
          >
            Dynamic Stylz
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 0.95,
              letterSpacing: -1,
              color: 'rgba(247,243,236,0.85)',
              fontStyle: 'italic',
            }}
          >
            Salon
          </div>
        </div>

        {/* Bottom meta row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'sans-serif',
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'rgba(247,243,236,0.8)',
            borderTop: '1px solid rgba(247,243,236,0.15)',
            paddingTop: 28,
          }}
        >
          <span>
            {site.address.street} · {site.address.city}, {site.address.state}
          </span>
          <span style={{ color: site.brand.ivory }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
