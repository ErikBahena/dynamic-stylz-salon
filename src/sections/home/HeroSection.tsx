'use client'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import React, { useEffect, useState } from 'react'

type Props = {
  hero?: Page['hero']
}


export const HeroSection: React.FC<Props> = ({ hero }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Use images array if available, otherwise fall back to single media or empty
  const heroImages =
    hero?.images && hero.images.length > 0
      ? hero.images.map((item) => (typeof item.image === 'object' ? item.image : null)).filter(Boolean)
      : hero?.media && typeof hero.media === 'object'
        ? [hero.media]
        : []

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (heroImages.length <= 1) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroImages.length])

  if (!hero) return null

  const { links, richText } = hero


  return (
    <section className="relative flex h-[85vh] min-h-[600px] flex-col overflow-hidden bg-white md:h-[90vh] md:min-h-[700px]">
      {/* Hero Image - Full Width Background */}
      <div className="absolute inset-0 h-full w-full">
        {heroImages.length > 0 ? (
          heroImages.map((img, index) => (
            <div
              key={index}
              className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: index === currentSlide ? 1 : 0,
                zIndex: index === currentSlide ? 10 : 0,
              }}
            >
              <Media
                fill
                imgClassName="h-full w-full object-cover object-center"
                priority={index === 0}
                resource={img}
              />
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-charcoal/5">
            <p className="text-brand-charcoal/50">Add images in CMS</p>
          </div>
        )}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content Overlay - Centered on Image */}
      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          {/* Decorative accent line */}
          <div 
            className="mx-auto h-1 w-20 bg-brand-sage transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />

          {/* Main heading */}
          {richText && (
            <div 
              className="space-y-6 transition-all duration-700 delay-100"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <RichText
                className="text-balance font-heading text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
                data={richText}
                enableGutter={false}
              />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
                Expert hair services for the whole family • Free consultations • Sensory-friendly
                appointments available
              </p>
            </div>
          )}

          {/* CTA buttons */}
          <div 
            className="flex flex-wrap justify-center gap-4 transition-all duration-700 delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            {Array.isArray(links) && links.length > 0 ? (
              links.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  appearance={i === 0 ? 'default' : 'outline'}
                  className={
                    i === 0
                      ? 'rounded-full bg-brand-sage px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-brand-sage/90 hover:shadow-xl hover:scale-105'
                      : 'rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-105'
                  }
                  {...link}
                />
              ))
            ) : (
              <>
                <a
                  href="tel:+13604826019"
                  className="rounded-full bg-brand-sage px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-brand-sage/90 hover:shadow-xl hover:scale-105"
                >
                  Book Now
                </a>
                <a
                  href="#services"
                  className="rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-105"
                >
                  View Services
                </a>
              </>
            )}
          </div>

          {/* Location & Hours */}
          <div 
            className="flex flex-col items-center gap-4 border-t border-white/30 pt-8 text-sm font-medium text-white/90 transition-all duration-700 delay-500 sm:flex-row sm:justify-center sm:gap-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 shrink-0 text-brand-sage"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Elma, WA</span>
            </div>
            <div className="hidden h-4 w-px bg-white/40 sm:block" />
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 shrink-0 text-brand-sage"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Mon–Thu 9am–7pm • Fri 9am–5pm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
