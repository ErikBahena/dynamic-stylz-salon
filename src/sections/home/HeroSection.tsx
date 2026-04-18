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
  width: 1536,
  height: 2048,
}

export const HeroSection: React.FC<Props> = ({ hero }) => {
  return (
    <section
      data-nav-theme="light"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-ink text-ivory"
    >
      {/* Main split layout — text left, photography right */}
      <div className="flex flex-1 flex-col md:grid md:grid-cols-12 md:gap-0">
        {/* Photography column */}
        <div className="relative order-first h-[45vh] md:order-last md:col-span-5 md:h-auto md:min-h-screen lg:col-span-5">
          <Media
            fill
            // Push focus down onto the hair, away from the wall decor at the
            // top of the original photo.
            imgClassName="h-full w-full object-cover [object-position:center_72%]"
            priority
            resource={heroImage}
            sizes="(min-width: 768px) 42vw, 100vw"
          />
          {/* Soft blend gradient into the text side */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-ink to-transparent md:block"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent md:hidden"
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
               lockup itself lives in the header, aligned with the nav) */}
          <div className="container pt-28 md:pt-32">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-10 bg-ivory/40"
              />
              <p
                className="text-[0.68rem] font-medium uppercase text-ivory/80"
                style={{ letterSpacing: '0.35em' }}
              >
                Hair Salon · Elma, WA
              </p>
            </div>
          </div>

          {/* Editorial content */}
          <div className="container mt-auto pb-12 md:pb-20">
            {/* Single H1 for the page — opens with the editorial display
                line and ends with a screen-reader/SEO-only locality phrase.
                Google reads the full text but only the first two lines
                render, so the editorial composition stays clean. */}
            <h1 className="max-w-[14ch] font-heading text-[clamp(2.75rem,7.5vw,6rem)] leading-[0.95] tracking-tightest text-ivory">
              <span className="block">The craft of</span>
              <span className="block italic">a signature look.</span>
              <span className="sr-only">
                {' '}
                — Dynamic Stylz Salon, a hair salon in Elma, WA serving Grays Harbor
                County.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/80 md:mt-8 md:text-base">
              Cuts, color, and quiet consultations at our Elma, WA salon — serving Montesano,
              Satsop, McCleary, and the wider Grays Harbor County. Every appointment starts
              with a free chat about what you want.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
              {hero.ctas.map((cta, i) => {
                const primary = cta.primary ?? i === 0
                const className = primary
                  ? 'inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.24em] text-ink hover:bg-ivory/90'
                  : 'inline-flex items-center gap-2 rounded-full border border-ivory/50 px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.24em] text-ivory hover:border-ivory hover:bg-ivory/10'

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

      {/* Fine bottom meta bar — spans full width */}
      <div className="border-t border-ivory/15 bg-ink/60 backdrop-blur-sm">
        <div className="container py-4 text-[0.7rem] text-ivory/70">
          <div className="flex flex-col gap-2 uppercase tracking-[0.24em] md:flex-row md:items-center md:justify-between">
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
