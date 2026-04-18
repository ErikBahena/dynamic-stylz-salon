'use client'

import { Reveal } from '@/components/Reveal'
import { faqs } from '@/data/faqs'
import React from 'react'

/**
 * FAQ section — editorial accordion that pulls double-duty:
 *
 * 1. On-page Q&A that mirrors the Google "People Also Ask" queries for the
 *    local hair-salon entity.
 * 2. The same questions are emitted as `FAQPage` JSON-LD in the layout head,
 *    which (since the 2023 FAQ-rich-result deprecation) no longer shows
 *    stars in classic SERPs but is still quoted verbatim by Google's AI
 *    Overviews and voice search. Cheapest + highest-remaining-ROI schema
 *    left for a small service business.
 *
 * Uses native <details>/<summary> so it's keyboard-accessible and crawlable
 * without any client-side JS.
 */
export const FaqSection: React.FC = () => {
  return (
    <section
      id="faq"
      data-nav-theme="dark"
      className="relative isolate scroll-mt-20 bg-ivory py-20 md:py-28"
    >
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* LEFT — header / editorial frame */}
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow mb-4">Before You Book</p>
              <h2 className="font-heading text-[2.25rem] leading-[1.02] tracking-tightest text-ink md:text-[3rem]">
                Questions
                <span className="display-italic mt-1 block text-ink-muted">
                  answered.
                </span>
                <span className="sr-only">
                  {' '}
                  — Frequently asked questions about Dynamic Stylz Salon in Elma, WA.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 max-w-prose-md text-[0.95rem] leading-relaxed text-ink-muted md:text-base">
                The quick answers most first-time guests ask — hours,
                pricing, walk-ins, and what to expect. Still not sure?
                Text (360) 581-2428 and we&rsquo;ll sort it out together.
              </p>
            </Reveal>
          </div>

          {/* RIGHT — Q&A list */}
          <div className="md:col-span-8">
            <ul className="flex flex-col border-t border-line">
              {faqs.map((faq, i) => (
                <Reveal key={faq.id} delay={80 + i * 40}>
                  <li className="border-b border-line">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left md:py-6">
                        <h3 className="font-heading text-[1.15rem] leading-snug text-ink transition-colors group-hover:text-bronze md:text-[1.35rem]">
                          {faq.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-transform group-open:rotate-45 md:h-8 md:w-8"
                        >
                          +
                        </span>
                      </summary>
                      <div className="pb-6 pr-10">
                        <p className="max-w-prose-md text-[0.95rem] leading-relaxed text-ink-muted md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
