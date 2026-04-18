import Link from 'next/link'
import React from 'react'

import { Wordmark } from '@/components/Logo/Wordmark'
import { Reveal } from '@/components/Reveal'
import { site } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-nav-theme="light" className="mt-auto bg-ink text-ivory">
      <div className="container pt-24 pb-10 md:pt-32 md:pb-12">
        {/* Large editorial mark */}
        <Reveal>
          <div className="flex flex-col items-center gap-8 border-b border-ivory/15 pb-16 text-center md:pb-20">
            <Wordmark size="lg" variant="light" />
            <h2 className="font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-tightest text-ivory">
              <span className="block">Come in.</span>
              <span className="display-italic block">Sit a while.</span>
            </h2>
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex items-center gap-3 border-b border-ivory pb-1 font-heading text-lg text-ivory transition-colors hover:border-bronze hover:text-bronze md:text-xl"
            >
              {site.phone.display}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>

        {/* Three-column info */}
        <div className="grid gap-10 pt-16 md:grid-cols-3 md:gap-12 md:pt-20">
          <Reveal>
            <div>
              <p
                className="text-[0.68rem] font-medium uppercase text-ivory/50"
                style={{ letterSpacing: '0.32em' }}
              >
                Visit
              </p>
              <p className="mt-4 font-heading text-lg leading-snug text-ivory">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p
                className="text-[0.68rem] font-medium uppercase text-ivory/50"
                style={{ letterSpacing: '0.32em' }}
              >
                Hours
              </p>
              <ul className="mt-4 space-y-1 text-[0.95rem] text-ivory/80">
                {site.hours.schedule.map((item) => (
                  <li key={item.day} className="flex justify-between gap-6">
                    <span>{item.day}</span>
                    <span className="text-ivory/60">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <p
                className="text-[0.68rem] font-medium uppercase text-ivory/50"
                style={{ letterSpacing: '0.32em' }}
              >
                Elsewhere
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-[0.95rem]">
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-bronze"
                    href={site.social.google}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Google
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-bronze"
                    href={site.social.facebook}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Facebook
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
                <li>
                  <Link
                    className="inline-flex items-center gap-2 text-ivory/80 transition-colors hover:text-bronze"
                    href="/contact"
                  >
                    Contact
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Baseline */}
        <div className="mt-20 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-[0.7rem] text-ivory/50 md:flex-row md:items-center md:justify-between md:mt-28">
          <p style={{ letterSpacing: '0.1em' }}>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="uppercase" style={{ letterSpacing: '0.32em' }}>
            Crafted with care in {site.address.city}, {site.address.state}
          </p>
        </div>
      </div>
    </footer>
  )
}
