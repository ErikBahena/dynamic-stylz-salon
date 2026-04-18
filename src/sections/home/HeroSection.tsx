import type { Hero } from '@/types/content'

import { Media } from '@/components/Media'
import { site } from '@/data/site'
import Link from 'next/link'
import React from 'react'

type Props = {
  hero: Hero
}

const heroImage = {
  src: '/media/nice_hair_1.jpg',
  alt: 'A signature look from Dynamic Stylz — hair styling in Elma, WA',
  // Source is 1200×1600 after ffmpeg compression (scale=-2:1600 q:v=6,
  // ~235KB). Next/Image derives AVIF/WebP variants down to ~30-40KB for
  // mobile — the source just needs enough headroom for retina desktop.
  width: 1200,
  height: 1600,
}

export const HeroSection: React.FC<Props> = ({ hero }) => {
  return (
    <section
      data-nav-theme="light"
      // `100svh` on mobile = the smallest-state viewport (Safari URL bar
      // visible). Pins the section to what the user can actually see so the
      // CTAs live inside the fold instead of hiding behind the browser chrome.
      // Desktop keeps the legacy `min-h-screen` since there's no chrome to
      // fight.
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-ivory md:min-h-screen"
    >
      {/* Main split layout — text left, photography right */}
      <div className="flex flex-1 flex-col md:grid md:grid-cols-12 md:gap-0">
        {/* Photography column */}
        <div className="relative order-first h-[36svh] md:order-last md:col-span-5 md:h-auto md:min-h-screen lg:col-span-5">
          <Media
            fill
            // Push focus down onto the hair, away from the wall decor at the
            // top of the original photo.
            imgClassName="h-full w-full object-cover [object-position:center_72%]"
            priority
            resource={heroImage}
            sizes="(min-width: 768px) 42vw, 100vw"
          />
          {/* Soft blend gradient into the text side (desktop) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-ink to-transparent md:block"
          />
          {/* Top scrim (mobile only) — keeps the ivory header wordmark legible
              against bright hair highlights in the photograph. Calibrated to
              fade out before it touches the eyebrow below. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/60 via-ink/25 to-transparent md:hidden"
          />
          {/* Bottom blend into the text column (mobile only) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent md:hidden"
          />

          {/* Fine photo credit */}
          <p
            className="absolute bottom-4 right-4 hidden text-[0.6rem] uppercase text-ivory/70 md:block"
            style={{ letterSpacing: '0.3em', writingMode: 'vertical-rl' }}
          >
            The craft · Est. 2009
          </p>
        </div>

        {/* Text column */}
        <div className="relative flex flex-col md:col-span-7 lg:col-span-7">
          {/* Warm feminine blooms — limited to the text side */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute -left-[15%] top-[5%] h-[70vh] w-[70vh] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(222,180,190,0.32) 0%, rgba(222,180,190,0.1) 45%, rgba(31,26,23,0) 75%)',
              }}
            />
            <div
              className="absolute -bottom-[20%] right-[5%] h-[60vh] w-[60vh] rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(205,170,185,0.25) 0%, rgba(205,170,185,0.08) 45%, rgba(31,26,23,0) 75%)',
              }}
            />
          </div>

          {/* Editorial eyebrow — anchors the top of the composition (the brand
               lockup itself lives in the header, aligned with the nav).
               Tracking tightens on mobile so "Hair Salon · Elma, WA" sits
               inside the viewport without wrapping or pushing the rule.
               `pt-8` on mobile gives just enough breathing room beneath the
               image without wasting 100vh — the old pt-28 ate ~112px of
               vertical space that we need for the CTAs to stay in view. */}
          <div className="container pt-8 md:pt-32">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-8 bg-ivory/40 md:w-10"
              />
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/80 md:tracking-[0.35em]">
                Hair Salon · Elma, WA
              </p>
            </div>
          </div>

          {/* Editorial content — tight mobile margins (mt-4 / mt-5) keep the
              whole H1 + copy + CTA stack inside 100svh. `mt-auto` still
              pushes it to the bottom of the text column on desktop where
              there's headroom. */}
          <div className="container mt-auto pb-6 md:pb-20">
            {/* Single H1 for the page — opens with the editorial display
                line and ends with a screen-reader/SEO-only locality phrase.
                Google reads the full text but only the first two lines
                render, so the editorial composition stays clean. Clamp
                minimum eased from 2.75rem → 2.35rem on phones so two
                lines of Playfair never eat more than ~80px of vertical. */}
            <h1 className="max-w-[14ch] font-heading text-[clamp(2.35rem,7.5vw,6rem)] leading-[0.95] tracking-tightest text-ivory">
              <span className="block">The craft of</span>
              <span className="block italic">a signature look.</span>
              <span className="sr-only">
                {' '}
                — Dynamic Stylz Salon, a hair salon in Elma, WA serving Grays Harbor
                County.
              </span>
            </h1>

            <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed text-ivory/80 md:mt-8 md:text-base">
              Cuts, color, and quiet consultations at our Elma, WA salon — serving
              Montesano, Satsop, McCleary, and the wider Grays Harbor County.
            </p>

            {/* CTAs. `flex-wrap` lets the second pill flow to a second row
                when the viewport is too narrow to fit both side-by-side.
                Padding + letter-spacing tighten on mobile so "VIEW SERVICES"
                (the widest label) fits inside a 320px viewport without
                clipping — the editorial 0.24em tracking is preserved on
                tablet/desktop where there's room for it. */}
            <div className="mt-5 flex flex-wrap gap-3 md:mt-10">
              {hero.ctas.map((cta, i) => {
                const primary = cta.primary ?? i === 0
                const base =
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] md:px-7 md:py-3.5 md:text-[0.78rem] md:tracking-[0.24em]'
                const className = primary
                  ? `${base} bg-ivory text-ink hover:bg-ivory/90`
                  : `${base} border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10`

                const isExternal =
                  cta.external || cta.href.startsWith('tel:') || cta.href.startsWith('mailto:')

                if (isExternal) {
                  return (
                    <a
                      key={cta.href}
                      href={cta.href}
                      className={className}
                      {...(cta.external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                    >
                      {cta.label}
                    </a>
                  )
                }
                return (
                  <Link key={cta.href} href={cta.href} className={className}>
                    {cta.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Fine bottom meta bar — spans full width. Padding + tracking ease on
          mobile so the address + hours fit comfortably inside the viewport
          at text-[0.65rem] without horizontal overflow, and the bar doesn't
          eat more than ~42px of vertical budget inside 100svh. */}
      <div className="border-t border-ivory/15 bg-ink/60 backdrop-blur-sm">
        <div className="container py-2.5 text-[0.65rem] text-ivory/70 md:py-4 md:text-[0.7rem]">
          <div className="flex flex-col gap-1 uppercase tracking-[0.16em] md:flex-row md:items-center md:justify-between md:gap-2 md:tracking-[0.24em]">
            <span>
              {site.address.street} · {site.address.city}, {site.address.state}
            </span>
            <span className="hidden md:inline">Appointments by request</span>
            <span>{site.hours.summary}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
