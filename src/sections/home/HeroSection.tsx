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

/**
 * The "Hair Salon · Elma, WA" ruler line. Rendered twice in the hero — once
 * at the top of the desktop composition (where it anchors the editorial
 * top-edge of the left column) and once at the bottom of the mobile content
 * stack (where having it glued to the H1 keeps the dead-zone negative space
 * above the entire stack, not between eyebrow and H1). Using a single
 * helper keeps the markup in sync.
 */
const Eyebrow: React.FC = () => (
  <div className="flex items-center gap-3">
    <span aria-hidden="true" className="inline-block h-px w-8 bg-ivory/40 md:w-10" />
    <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ivory/80 md:tracking-[0.35em]">
      Hair Salon · Elma, WA
    </p>
  </div>
)

export const HeroSection: React.FC<Props> = ({ hero }) => {
  return (
    <>
      <section
        data-nav-theme="light"
        // `100svh` on mobile = the smallest-state viewport (Safari URL bar
        // visible). Pins the section to what the user can actually see so the
        // CTAs live inside the fold instead of hiding behind the browser chrome.
        // Desktop keeps the legacy `min-h-screen` since there's no chrome to
        // fight.
        //
        // `pt-16` on mobile reserves the top 64px (the fixed `h-16` nav
        // height) as dark bg-ink — the wordmark and hamburger sit on solid
        // ink instead of fighting bright hair highlights in the photo. On
        // desktop the nav overlays the image's left fade gradient, so no
        // top reserve is needed (`md:pt-0`).
        //
        // The meta bar (address/hours) lives OUTSIDE this section so the
        // hero stays exactly 100svh and the bar only appears once the user
        // starts scrolling — it doesn't eat the fold.
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-16 text-ivory md:min-h-screen md:pt-0"
      >
        {/* Main split layout — text left, photography right */}
        <div className="flex flex-1 flex-col md:grid md:grid-cols-12 md:gap-0">
          {/* Photography column. Responsive height: short viewports (iPhone
              SE, ~585svh) stay at 40svh so the content stack below still
              fits; taller viewports (iPhone 14 Pro and up) bump to 46svh for
              more editorial presence — the photograph gets to breathe on
              modern phones without crowding out the CTAs on compact ones.
              Desktop ignores this and fills the full-height right column
              (`md:min-h-screen`). */}
          <div className="relative order-first h-[40svh] [@media(min-height:720px)]:h-[46svh] md:order-last md:col-span-5 md:h-auto md:min-h-screen lg:col-span-5">
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

            {/* Mobile scrims are intentionally NOT rendered — the image now
                sits as a clean rectangle between the nav reserve (bg-ink
                above) and the text rectangle (bg-ink below). Gradient blends
                muddied that "two stacked rectangles" composition. */}

            {/* Fine photo credit */}
            <p
              className="absolute bottom-4 right-4 hidden text-[0.6rem] uppercase text-ivory/70 md:block"
              style={{ letterSpacing: '0.3em', writingMode: 'vertical-rl' }}
            >
              The craft · Est. 2009
            </p>
          </div>

          {/* Text column. `flex-1` on mobile makes this column absorb the
            remaining viewport height after the nav reserve (64px) and the
            image (40–46svh, see above), so the content's `mt-auto` has room
            to push the CTAs down to the bottom of the hero — "Book Now"
            sits at the bottom of 100svh instead of floating in the middle
            of a dark empty block. On desktop the parent switches to
            `md:grid`, which ignores flex properties, so sizing still comes
            from `md:col-span-7`. */}
          <div className="relative flex flex-1 flex-col md:col-span-7 lg:col-span-7">
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

            {/* Desktop-only eyebrow — anchors the top of the left column in the
              editorial composition. On mobile the eyebrow is rendered INSIDE
              the content stack below (see `md:hidden` copy) so it sits glued
              to the H1 and the inevitable empty space between image and text
              pools above the stack instead of between the eyebrow and H1. */}
            <div className="container hidden pt-32 md:block">
              <Eyebrow />
            </div>

            {/* Editorial content — on mobile everything (eyebrow + H1 + copy +
              CTAs) is one stack pushed to the bottom by `mt-auto`, so the
              stack stays visually cohesive no matter how tall the viewport
              is. On desktop the eyebrow lives at the top (see above) and
              only H1/copy/CTAs are in this stack. */}
            <div className="container mt-auto pb-6 md:pb-20">
              {/* Mobile-only eyebrow — kept with the H1 so there's never a
                dead gap between "Hair Salon · Elma, WA" and "The craft of".
                Negative space pools above the whole stack instead. */}
              <div className="mb-5 md:hidden">
                <Eyebrow />
              </div>

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
                  — Dynamic Stylz Salon, a hair salon in Elma, WA serving Grays Harbor County.
                </span>
              </h1>

              <p className="mt-4 max-w-sm text-[0.82rem] leading-relaxed text-ivory/80 md:mt-8 md:text-base">
                Cuts, color, and quiet consultations at our Elma, WA salon — serving Montesano,
                Satsop, McCleary, and the wider Grays Harbor County.
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
      </section>

      {/* Address / hours ruler — lives OUTSIDE the hero section so it sits
          just past the 100svh fold. On mobile the user sees the hero card
          spanning the full viewport, and a short scroll reveals this strip;
          on desktop it acts as a full-width editorial ruler between the
          hero and the next section. `data-nav-theme="light"` keeps the
          sticky nav in its ivory variant while this dark strip is behind
          it. */}
      <div data-nav-theme="light" className="border-t border-ivory/15 bg-ink text-ivory">
        <div className="container py-3 md:py-4">
          <div className="flex flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/70 md:flex-row md:justify-between md:gap-2 md:text-[0.7rem] md:tracking-[0.24em]">
            <span>
              {site.address.street} · {site.address.city}, {site.address.state}
            </span>
            <span>Appointments by request</span>
            <span>{site.hours.summary}</span>
          </div>
        </div>
      </div>
    </>
  )
}
