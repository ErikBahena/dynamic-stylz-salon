import Link from 'next/link'
import React from 'react'

import { Wordmark } from '@/components/Logo/Wordmark'
import { Reveal } from '@/components/Reveal'
import { site } from '@/data/site'

/**
 * Quiet footer — the practical details (address, hours, contact) live in the
 * VisitSection above. Here we keep only the signature, a small social strip,
 * and a baseline copyright line.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer data-nav-theme="light" className="mt-auto bg-ink text-ivory">
      <div className="container pt-20 pb-10 md:pt-24 md:pb-12">
        {/* Wordmark + signature line */}
        <Reveal>
          <div className="flex flex-col items-center gap-6 border-b border-ivory/10 pb-14 text-center md:pb-16">
            <Wordmark size="md" variant="light" />
            <p
              className="text-[0.66rem] uppercase text-ivory/55"
              style={{ letterSpacing: '0.42em' }}
            >
              {site.tagline}
            </p>
          </div>
        </Reveal>

        {/* Social + quick links strip */}
        <div className="flex flex-col items-center gap-6 pt-12 md:flex-row md:items-baseline md:justify-between md:pt-14">
          <Reveal>
            <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.72rem]">
              <Link
                href="/#services"
                className="uppercase text-ivory/70 transition-colors hover:text-ivory"
                style={{ letterSpacing: '0.28em' }}
              >
                Services
              </Link>
              <Link
                href="/#team"
                className="uppercase text-ivory/70 transition-colors hover:text-ivory"
                style={{ letterSpacing: '0.28em' }}
              >
                Stylists
              </Link>
              <Link
                href="/#visit"
                className="uppercase text-ivory/70 transition-colors hover:text-ivory"
                style={{ letterSpacing: '0.28em' }}
              >
                Visit
              </Link>
            </nav>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-6 text-[0.72rem]">
              <a
                className="inline-flex items-center gap-2 uppercase text-ivory/70 transition-colors hover:text-bronze"
                href={site.social.google}
                rel="noreferrer"
                target="_blank"
                style={{ letterSpacing: '0.28em' }}
              >
                Google
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="inline-flex items-center gap-2 uppercase text-ivory/70 transition-colors hover:text-bronze"
                href={site.social.facebook}
                rel="noreferrer"
                target="_blank"
                style={{ letterSpacing: '0.28em' }}
              >
                Facebook
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-[0.7rem] text-ivory/50 md:flex-row md:items-center md:justify-between md:mt-16">
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
