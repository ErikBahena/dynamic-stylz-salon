import type { RequiredDataFromCollectionSlug } from 'payload'

import { Media } from '@/components/Media'
import React from 'react'

type Review = RequiredDataFromCollectionSlug<'reviews'>

interface Props {
  reviews: Review[]
}

export const TestimonialsSection: React.FC<Props> = ({ reviews }) => {
  if (!reviews?.length) return null

  const prioritized = [...reviews].sort((a, b) => {
    const aImages = Array.isArray(a.images) ? a.images.length : 0
    const bImages = Array.isArray(b.images) ? b.images.length : 0
    const imageScore = bImages - aImages
    if (imageScore !== 0) return imageScore
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  })

  return (
    <section className="bg-white py-16 max-h-[calc(100vh-8rem)] overflow-hidden flex flex-col">
      <div className="container space-y-10 flex-1 flex flex-col min-h-0">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">With love from Elma</p>
          <h2 className="font-heading text-3xl text-brand-charcoal md:text-4xl">What our clients say</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
          {prioritized.slice(0, 6).map((review) => {
            const rating = Math.min(Math.max(review.rating || 5, 1), 5)
            return (
            <figure
              className="flex flex-col justify-center gap-4 rounded-2xl border border-brand-wood/40 bg-white p-6 shadow-[0_15px_30px_rgba(32,26,23,0.08)]"
              key={review.id}
            >
              {Array.isArray(review.images) && review.images.length > 0 ? (
                <div className="grid gap-1 overflow-hidden rounded-xl border border-brand-wood/50">
                  {review.images.length === 1 ? (
                    <div className="relative aspect-[4/3] w-full">
                      {typeof review.images[0].image === 'object' && (
                        <Media fill imgClassName="object-cover" loading="lazy" resource={review.images[0].image} />
                      )}
                    </div>
                  ) : review.images.length === 2 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {review.images.map((item, idx) => (
                        <div key={idx} className="relative aspect-square w-full">
                          {typeof item.image === 'object' && (
                            <Media fill imgClassName="object-cover" loading="lazy" resource={item.image} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : review.images.length === 3 ? (
                    <div className="grid grid-cols-2 gap-1">
                      <div className="relative col-span-2 aspect-[2/1] w-full">
                        {typeof review.images[0].image === 'object' && (
                          <Media fill imgClassName="object-cover" loading="lazy" resource={review.images[0].image} />
                        )}
                      </div>
                      {review.images.slice(1).map((item, idx) => (
                        <div key={idx + 1} className="relative aspect-square w-full">
                          {typeof item.image === 'object' && (
                            <Media fill imgClassName="object-cover" loading="lazy" resource={item.image} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : review.images.length === 4 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {review.images.map((item, idx) => (
                        <div key={idx} className="relative aspect-square w-full">
                          {typeof item.image === 'object' && (
                            <Media fill imgClassName="object-cover" loading="lazy" resource={item.image} />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {review.images.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="relative aspect-square w-full">
                          {typeof item.image === 'object' && (
                            <Media fill imgClassName="object-cover" loading="lazy" resource={item.image} />
                          )}
                        </div>
                      ))}
                      {review.images.length > 4 && (
                        <div className="relative aspect-square w-full bg-black/50">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">+{review.images.length - 4}</span>
                          </div>
                          {typeof review.images[4].image === 'object' && (
                            <Media fill imgClassName="object-cover opacity-50" loading="lazy" resource={review.images[4].image} />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
              {review.body && (
                <blockquote className="text-base leading-relaxed text-brand-charcoal/90">
                  "{review.body}"
                </blockquote>
              )}
              <figcaption className="space-y-1 text-sm">
                <p className="font-semibold text-brand-charcoal">{review.reviewerName}</p>
                <p className="text-yellow-500">
                  {'★'.repeat(rating)}
                  <span className="text-brand-warm-gray">{'☆'.repeat(5 - rating)}</span>
                </p>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-sage">
                  {review.source?.toUpperCase()}
                </p>
              </figcaption>
            </figure>
          )
        })}
        </div>
      </div>
    </section>
  )
}

