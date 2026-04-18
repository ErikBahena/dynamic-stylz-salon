import type { Service } from '@/types/content'

import { Reveal } from '@/components/Reveal'
import { site } from '@/data/site'
import React from 'react'

type Props = {
  services: Service[]
}

/**
 * Editorial services menu — a single-viewport spread.
 * No prices (quoted in-person), no chips, no cards. Just typography,
 * hairline rules, and room to breathe.
 */
export const ServicesShowcase: React.FC<Props> = ({ services }) => {
  if (!services?.length) return null

  const sorted = [...services].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

  return (
    <section
      id="services"
      data-nav-theme="dark"
      className="scroll-mt-20 flex min-h-screen flex-col justify-center bg-ivory py-16 md:py-20"
    >
      <div className="container">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="eyebrow mb-3">The Menu</p>
            <h2 className="font-heading text-[2.5rem] leading-[1.05] tracking-tightest text-ink md:text-[3.5rem]">
              A considered list of{' '}
              <span className="display-italic">services.</span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={120}>
            <p className="max-w-prose-sm text-[0.9rem] leading-relaxed text-ink-muted md:ml-auto md:text-right">
              Every appointment begins with a free consultation. Pricing varies by hair type,
              length, and the plan we build together.
            </p>
          </Reveal>
        </div>

        {/* Menu list */}
        <ul className="mt-8 md:mt-10">
          {sorted.map((service, index) => {
            const num = String(index + 1).padStart(2, '0')
            return (
              <li key={service.id}>
                <Reveal delay={index * 50}>
                  <article className="group grid gap-2 border-t border-line py-4 md:grid-cols-12 md:items-baseline md:gap-8 md:py-5">
                    {/* Number + title */}
                    <div className="flex items-baseline gap-4 md:col-span-5 md:pr-6">
                      <span
                        className="font-heading text-xs text-ink-muted"
                        style={{ letterSpacing: '0.12em' }}
                      >
                        {num}
                      </span>
                      <h3 className="font-heading text-xl leading-tight tracking-tight text-ink md:text-2xl">
                        {service.title}
                      </h3>
                      {service.featured && (
                        <span
                          className="hidden text-[0.65rem] uppercase text-ink-muted md:inline"
                          style={{ letterSpacing: '0.28em' }}
                        >
                          · Signature
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[0.9rem] leading-relaxed text-ink-muted md:col-span-5">
                      {service.description}
                    </p>

                    {/* Duration */}
                    <div className="md:col-span-2 md:text-right">
                      {service.duration && (
                        <p
                          className="text-[0.7rem] uppercase text-ink-muted"
                          style={{ letterSpacing: '0.28em' }}
                        >
                          {service.duration}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>

        {/* Closing footnote */}
        <Reveal>
          <div className="mt-8 border-t border-line pt-6 md:mt-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
              <p className="display-italic max-w-prose-md text-base text-ink md:text-lg">
                Not sure where to start? We&rsquo;ll meet you where you are.
              </p>
              <a
                href={`tel:${site.phone.tel}`}
                className="inline-flex w-fit items-center gap-3 border-b border-ink pb-1 font-heading text-sm text-ink transition-colors hover:border-ink/50 hover:text-ink/70 md:text-base"
              >
                Book a consultation
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
