import type { Review } from '@/types/content'

import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import React from 'react'

type Props = {
  reviews: Review[]
}

const sourceLabel: Record<string, string> = {
  facebook: 'Facebook',
  google: 'Google',
  direct: 'Direct',
}

/**
 * Editorial testimonials — visual, magazine-style.
 * Two featured reviews with photos displayed in an alternating spread;
 * a tight wall of short quotes underneath for breadth.
 */
export const TestimonialsSection: React.FC<Props> = ({ reviews }) => {
  if (!reviews?.length) return null

  // Pull reviews that have photos first — those anchor the spread.
  const withImages = reviews.filter((r) => r.images && r.images.length > 0)
  const featured = withImages.slice(0, 2)
  const rest = reviews.filter((r) => !featured.includes(r)).slice(0, 3)

  if (featured.length === 0) {
    // Fallback: original pull-quote layout if no photos exist.
    return <QuotesOnly reviews={reviews.slice(0, 2)} />
  }

  return (
    <section
      data-nav-theme="light"
      className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-16 text-ivory md:py-20"
    >
      <div className="container">
        {/* Eyebrow header */}
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-7">
              <p
                className="text-[0.68rem] font-medium uppercase text-ivory/60 mb-3"
                style={{ letterSpacing: '0.35em' }}
              >
                In Their Words
              </p>
              <h2 className="font-heading text-[2.5rem] leading-[1.05] tracking-tightest text-ivory md:text-[3.5rem]">
                The chair is the <span className="display-italic">testimonial.</span>
                <span className="sr-only">
                  {' '}
                  — What clients say about Dynamic Stylz Salon in Elma, WA.
                </span>
              </h2>
            </div>
            <p
              className="text-[0.9rem] leading-relaxed text-ivory/70 md:col-span-5 md:ml-auto md:max-w-prose-sm md:text-right"
            >
              Real photos, real words — straight from the people who leave our chairs with a look
              they love.
            </p>
          </div>
        </Reveal>

        {/* Featured spreads */}
        <div className="mt-10 grid gap-10 md:mt-14 md:gap-12 lg:gap-16">
          {featured.map((review, index) => {
            const image = review.images?.[0]
            if (!image) return null
            const reverse = index % 2 === 1
            return (
              <Reveal key={review.id} delay={index * 140}>
                <article className="grid gap-6 md:grid-cols-12 md:items-center md:gap-10">
                  <div
                    className={`md:col-span-5 ${
                      reverse ? 'md:col-start-8 md:row-start-1' : ''
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory/5">
                      <Media
                        fill
                        imgClassName="h-full w-full object-cover object-center"
                        resource={image}
                        sizes="(min-width: 768px) 40vw, 100vw"
                      />
                    </div>
                  </div>

                  <figure
                    className={`md:col-span-7 ${
                      reverse ? 'md:col-start-1 md:row-start-1' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="display-italic mb-3 block select-none text-[3.5rem] leading-none text-ivory/25"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="font-heading text-xl leading-[1.3] tracking-tight text-ivory md:text-2xl lg:text-[1.65rem]">
                      {review.body}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-4 border-t border-ivory/15 pt-4">
                      <span className="font-heading text-base text-ivory">
                        {review.reviewerName}
                      </span>
                      <span
                        className="text-[0.66rem] uppercase text-ivory/55"
                        style={{ letterSpacing: '0.3em' }}
                      >
                        {sourceLabel[review.source] ?? review.source}
                      </span>
                    </figcaption>
                  </figure>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Short quotes strip */}
        {rest.length > 0 && (
          <Reveal delay={240}>
            <div className="mt-12 grid gap-6 border-t border-ivory/10 pt-10 md:mt-16 md:grid-cols-3 md:gap-10">
              {rest.map((review) => (
                <figure key={review.id}>
                  <p className="text-[0.95rem] leading-relaxed text-ivory/80">
                    &ldquo;
                    {review.body.length > 140 ? `${review.body.slice(0, 140).trim()}…` : review.body}
                    &rdquo;
                  </p>
                  <figcaption className="mt-3 flex items-center gap-3">
                    <span className="font-heading text-sm text-ivory">{review.reviewerName}</span>
                    <span
                      className="text-[0.6rem] uppercase text-ivory/50"
                      style={{ letterSpacing: '0.3em' }}
                    >
                      {sourceLabel[review.source] ?? review.source}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}

        {/* Footer links */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-start gap-3 border-t border-ivory/10 pt-6 md:mt-14 md:flex-row md:items-baseline md:justify-between">
            <p
              className="text-[0.66rem] uppercase text-ivory/55"
              style={{ letterSpacing: '0.3em' }}
            >
              More on Google & Facebook
            </p>
            <div className="flex gap-6">
              <a
                href="https://share.google/Xkcxld1KoMv3huCpK"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[0.75rem] uppercase text-ivory transition-opacity hover:opacity-70"
                style={{ letterSpacing: '0.24em' }}
              >
                Read on Google →
              </a>
              <a
                href="https://www.facebook.com/AmberStuderStylist/photos"
                rel="noopener noreferrer"
                target="_blank"
                className="text-[0.75rem] uppercase text-ivory transition-opacity hover:opacity-70"
                style={{ letterSpacing: '0.24em' }}
              >
                Read on Facebook →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Fallback when no reviews have images: show two pull quotes only. */
const QuotesOnly: React.FC<{ reviews: Review[] }> = ({ reviews }) => (
  <section
    data-nav-theme="light"
    className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-16 text-ivory md:py-20"
  >
    <div className="container">
      <Reveal>
        <p
          className="text-[0.68rem] font-medium uppercase text-ivory/60 mb-6"
          style={{ letterSpacing: '0.35em' }}
        >
          In Their Words · Elma, WA
        </p>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 120}>
            <figure>
              <span
                aria-hidden="true"
                className="display-italic mb-2 block select-none text-[4rem] leading-none text-ivory/25"
              >
                &ldquo;
              </span>
              <blockquote className="font-heading text-2xl leading-[1.25] tracking-tight text-ivory md:text-3xl">
                {review.body}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-ivory/15 pt-4">
                <span className="font-heading text-base text-ivory">{review.reviewerName}</span>
                <span
                  className="text-[0.66rem] uppercase text-ivory/55"
                  style={{ letterSpacing: '0.3em' }}
                >
                  {sourceLabel[review.source] ?? review.source}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)
