'use client'

import React, { useEffect, useRef, useState } from 'react'

export const AccommodationsNote: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-12">
      <div 
        className="container rounded-3xl border border-dashed border-brand-sage/60 bg-gray-50 p-8 text-center transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
        }}
      >
        <p 
          className="text-sm uppercase tracking-[0.4em] text-brand-sage transition-all duration-500 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
          }}
        >
          Accommodations
        </p>
        <h3 
          className="mt-2 font-heading text-2xl text-brand-charcoal transition-all duration-500 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          Need a quieter appointment?
        </h3>
        <p 
          className="mt-3 text-sm text-brand-charcoal/80 transition-all duration-500 delay-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          We happily offer sensory-friendly appointments by request. Mention it when you book and
          we&apos;ll make sure the space and timing feel comfortable.
        </p>
      </div>
    </section>
  )
}
