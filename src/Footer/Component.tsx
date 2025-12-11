import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterClient } from './FooterClient'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-brand-wood/30 bg-white text-brand-charcoal">
      <FooterClient>
      <div className="container grid gap-8 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Link aria-label="Back to home" className="inline-flex items-center gap-3" href="/">
            <Logo />
            <span className="font-heading text-lg tracking-[0.3em] uppercase">Dynamic Stylz</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-brand-warm-gray">
            Full-service family salon rooted in Elma, WA—bringing modern cuts, color, and kindness to
            every appointment.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-base uppercase tracking-[0.2em] text-brand-sage">
            Visit
          </h3>
          <p className="mt-3 text-sm leading-relaxed">
            410 W Main St Suite B
            <br />
            Elma, WA 98541
          </p>
          <p className="mt-3 text-sm">
            <span className="font-semibold">Hours:</span> Mon–Thu 9am–7pm · Fri 9am–5pm
          </p>
        </div>

        <div>
          <h3 className="font-heading text-base uppercase tracking-[0.2em] text-brand-sage">
            Connect
          </h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            {navItems.map(({ link }, i) => {
              return (
                    <CMSLink
                      className="hover:text-brand-sage transition-colors"
                      key={i}
                      {...link}
                    />
                  )
                })}
                <a className="hover:text-brand-sage transition-colors" href="tel:13605812428">
                  (360) 581-2428
                </a>
                <a
                  className="hover:text-brand-sage transition-colors"
                  href="https://www.facebook.com/dynamicstylz"
                  rel="noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
                <a
                  className="hover:text-brand-sage transition-colors"
              href="https://maps.app.goo.gl/"
              rel="noreferrer"
              target="_blank"
            >
              Google Business Profile
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-brand-wood/20 bg-white/60">
        <div className="container flex flex-col gap-3 py-4 text-xs text-brand-warm-gray md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dynamic Stylz Salon LLC. All rights reserved.</p>
          <p className="text-[0.7rem] uppercase tracking-[0.3em]">Crafted with care in Elma, WA</p>
        </div>
      </div>
      </FooterClient>
    </footer>
  )
}
