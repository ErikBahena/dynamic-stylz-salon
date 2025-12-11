'use client'

import type { RequiredDataFromCollectionSlug } from 'payload'

import { Media } from '@/components/Media'
import React, { useMemo, useState, useEffect, useRef } from 'react'

type Service = RequiredDataFromCollectionSlug<'services'>

interface Props {
  services: Service[]
}

const formatPrice = (service: Service) => {
  if (service.priceType === 'consultation') {
    return 'Call for consultation'
  }

  if (service.priceLabel) {
    return service.priceLabel
  }

  if (typeof service.price === 'number') {
    return Intl.NumberFormat('en-US', {
      currency: 'USD',
      style: 'currency',
    }).format(service.price)
  }

  return 'Call for consultation'
}

const categoryLabels: Record<string, string> = {
  women: 'Women',
  men: 'Men',
  kids: 'Kids',
  color: 'Colour',
  specialty: 'Specialty',
  treatment: 'Treatment',
}

export const ServicesShowcase: React.FC<Props> = ({ services }) => {
  // Default to showing all services
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection observer for scroll-triggered animation
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

  // Re-trigger card animations when category changes
  useEffect(() => {
    setAnimateCards(false)
    const timer = setTimeout(() => setAnimateCards(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  // Get unique categories from services in the order they appear (based on service order)
  const categories = useMemo(() => {
    const categoryOrder: string[] = []
    const seen = new Set<string>()
    
    // Services are already sorted by order field, so iterate through them
    // and add categories in the order they first appear
    services.forEach((service) => {
      if (service.category && !seen.has(service.category)) {
        seen.add(service.category)
        categoryOrder.push(service.category)
      }
    })
    
    return categoryOrder
  }, [services])

  // Filter services by selected category, maintaining order
  const filteredServices = useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? services 
      : services.filter((service) => service.category === selectedCategory)
    
    // Ensure services are sorted by order field
    return [...filtered].sort((a, b) => {
      const orderA = typeof a.order === 'number' ? a.order : 999
      const orderB = typeof b.order === 'number' ? b.order : 999
      return orderA - orderB
    })
  }, [services, selectedCategory])

  if (!services?.length) return null

  return (
    <section ref={sectionRef} id="services" className="scroll-mt-20 bg-white py-16">
      <div className="container space-y-10">
        <div 
          className="flex flex-col items-center gap-2 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">Signature services</p>
          <h2 className="font-heading text-3xl text-brand-charcoal md:text-4xl">Cuts, color, and care</h2>
        </div>

        {/* Category Chip Navigation */}
        <div 
          className="flex flex-wrap justify-center gap-3 transition-all duration-700 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-6 py-2 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-brand-sage text-white shadow-md scale-105'
                : 'bg-gray-100 text-brand-charcoal hover:bg-gray-200 hover:scale-105'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-sage text-white shadow-md scale-105'
                  : 'bg-gray-100 text-brand-charcoal hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Services List */}
        {filteredServices.length > 0 ? (
          filteredServices.length === 1 ? (
            // Single service - centered detailed layout
            <div className="flex justify-center">
              <article 
                className="group w-full max-w-4xl overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-white via-gray-50 to-gray-100/70 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                style={{
                  opacity: animateCards ? 1 : 0,
                  transform: animateCards ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
                }}
              >
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-stretch md:gap-8">
                  {filteredServices[0].image && typeof filteredServices[0].image === 'object' && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 md:w-80 md:shrink-0">
                      <Media
                        fill
                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                        resource={filteredServices[0].image}
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-6">
                    <div className="space-y-6 text-center md:text-left">
                      <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.3em] text-brand-warm-gray">
                          {categoryLabels[filteredServices[0].category] || filteredServices[0].category}
                        </p>
                        <h3 className="font-heading text-3xl text-brand-charcoal md:text-4xl">
                          {filteredServices[0].title}
                        </h3>
                      </div>

                      <p className="text-lg leading-relaxed text-brand-charcoal/80 md:text-xl">
                        {filteredServices[0].description}
                      </p>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-brand-wood/20 pt-4 md:justify-start">
                        <span className="rounded-full border border-brand-charcoal/15 bg-white px-3 py-1 font-heading text-sm tracking-wide text-brand-charcoal md:text-base">
                          {formatPrice(filteredServices[0])}
                        </span>
                        {filteredServices[0].duration && (
                          <span className="flex items-center gap-1.5 rounded-full border border-brand-wood/30 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-brand-charcoal/70">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            {filteredServices[0].duration}
                          </span>
                        )}
                      </div>
                    </div>

                    {filteredServices[0].featured && (
                      <div className="flex justify-center md:justify-start">
                        <span className="text-sm uppercase tracking-[0.25em] text-brand-sage">Featured service</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </div>
          ) : (
            // Multiple services - grid layout
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredServices.map((service, index) => (
                <article
                  key={service.id}
                  className="group overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-white via-gray-50 to-gray-100/70 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                  style={{
                    opacity: animateCards ? 1 : 0,
                    transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-stretch lg:gap-6">
                    {service.image && typeof service.image === 'object' && (
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-square lg:w-36 lg:shrink-0">
                        <Media
                          fill
                          imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                          resource={service.image}
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-[0.7rem] uppercase tracking-[0.3em] text-brand-warm-gray">
                          {categoryLabels[service.category] || service.category}
                        </p>
                        <h3 className="font-heading text-xl text-brand-charcoal lg:text-2xl">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed text-brand-charcoal/80">{service.description}</p>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-brand-charcoal/15 bg-white px-3 py-1 font-heading text-sm tracking-wide text-brand-charcoal">
                          {formatPrice(service)}
                        </span>
                        {service.duration && (
                          <span className="flex items-center gap-1.5 rounded-full border border-brand-wood/30 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-brand-charcoal/70">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                            {service.duration}
                          </span>
                        )}
                        {service.featured && (
                          <span className="text-xs uppercase tracking-[0.25em] text-brand-sage">Featured</span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          <div className="py-12 text-center text-brand-warm-gray">
            <p>No services found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

