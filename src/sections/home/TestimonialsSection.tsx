'use client'

import type { RequiredDataFromCollectionSlug } from 'payload'

import { Media } from '@/components/Media'
import React, { useEffect, useRef, useState } from 'react'

type Review = RequiredDataFromCollectionSlug<'reviews'>

interface Props {
  reviews: Review[]
}

export const TestimonialsSection: React.FC<Props> = ({ reviews }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateCards(true), 200)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!reviews?.length) return null

  // Calculate estimated size for each review
  const reviewsWithSize = reviews.map((review) => {
    const imageCount = Array.isArray(review.images) ? review.images.length : 0
    const descriptionLength = review.body?.length || 0
    // Weight: images are more impactful, so multiply by 100, description by 1
    const estimatedSize = imageCount * 100 + descriptionLength
    return { review, estimatedSize }
  })

  // Sort by size (smallest first)
  const sortedBySize = [...reviewsWithSize].sort((a, b) => a.estimatedSize - b.estimatedSize)
  const sorted = sortedBySize.map((item) => item.review)
  const limit = Math.min(6, sorted.length)

  // Rearrange for balanced layout: shorter on sides, longer in middle
  // Grid positions: [0=left, 1=middle, 2=right, 3=left, 4=middle, 5=right]
  // Mapping: 0->0(smallest), 1->5(largest), 2->1(2nd small), 3->2(3rd small), 4->4(2nd large), 5->3(4th small)
  const arranged: (typeof reviews)[number][] = []
  
  for (let i = 0; i < limit; i++) {
    const isMiddleColumn = i % 3 === 1 // Positions 1 and 4 (middle column)
    
    if (isMiddleColumn) {
      // Middle column: use larger items
      // Position 1 -> index (limit-1), Position 4 -> index (limit-2)
      const largeIndex = limit - 1 - Math.floor(i / 3)
      if (largeIndex >= 0 && largeIndex < sorted.length) {
        arranged.push(sorted[largeIndex])
      }
    } else {
      // Left/right columns: use smaller items
      // Count how many side positions we've filled
      const sideCount = Math.floor(i / 3) * 2 + (i % 3 === 0 ? 0 : 1)
      if (sideCount < sorted.length) {
        arranged.push(sorted[sideCount])
      }
    }
  }

  const prioritized = arranged.length === limit ? arranged : sorted.slice(0, limit)

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="container space-y-10">
        <div 
          className="flex flex-col items-center gap-2 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">With love from Elma</p>
          <h2 className="font-heading text-3xl text-brand-charcoal md:text-4xl">What our clients say</h2>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {prioritized.slice(0, 6).map((review, index) => {
            const rating = Math.min(Math.max(review.rating || 5, 1), 5)
            return (
              <figure
                className="flex flex-col justify-center gap-4 rounded-2xl border border-brand-wood/40 bg-white p-5 shadow-[0_15px_30px_rgba(32,26,23,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                key={review.id}
                style={{
                  opacity: animateCards ? 1 : 0,
                  transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${index * 100}ms`,
                }}
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
                  <blockquote className="text-sm leading-relaxed text-brand-charcoal/90 sm:text-base">
                    &quot;{review.body}&quot;
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
