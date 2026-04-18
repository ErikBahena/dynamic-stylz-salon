import React from 'react'

import {
  AccommodationsNote,
  HeroSection,
  ServicesShowcase,
  TeamSpotlight,
  TestimonialsSection,
  VisitSection,
} from '@/sections/home'
import { hero } from '@/data/hero'
import { reviews } from '@/data/reviews'
import { services } from '@/data/services'
import { team } from '@/data/team'

export default function HomePage() {
  const sortedServices = [...services].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  const sortedTeam = [...team].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.featured === b.featured) return 0
    return a.featured ? -1 : 1
  })

  return (
    <main className="flex flex-col gap-0">
      <HeroSection hero={hero} />
      <ServicesShowcase services={sortedServices.slice(0, 6)} />
      <TestimonialsSection reviews={sortedReviews} />
      <TeamSpotlight team={sortedTeam.slice(0, 6)} />
      <VisitSection />
      <AccommodationsNote />
    </main>
  )
}
