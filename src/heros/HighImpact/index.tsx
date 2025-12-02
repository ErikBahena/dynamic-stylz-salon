'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-brand-charcoal text-brand-parchment">
      <div className="container relative z-10 mb-8 flex items-center justify-center">
        <div className="max-w-3xl text-center">
          {richText && (
            <RichText
              className="mb-6 text-balance font-heading text-3xl text-brand-parchment md:text-4xl"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink appearance="secondary" {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="absolute inset-0 h-full w-full object-cover opacity-50"
            priority
            resource={media}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/40 to-transparent" />
    </section>
  )
}
