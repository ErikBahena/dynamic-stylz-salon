import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

// Skip static optimization during build - render all pages on-demand
export const dynamic = 'force-dynamic'

import { homeStatic } from '@/endpoints/seed/home-static'
import {
  AccommodationsNote,
  HeroSection,
  ServicesShowcase,
  TeamSpotlight,
  TestimonialsSection,
} from '@/sections/home'
import { generateMeta } from '@/utilities/generateMeta'

type PageDoc = RequiredDataFromCollectionSlug<'pages'>
type ServiceDoc = RequiredDataFromCollectionSlug<'services'>
type TeamDoc = RequiredDataFromCollectionSlug<'team-members'>
type ReviewDoc = RequiredDataFromCollectionSlug<'reviews'>

async function fetchHomePage(): Promise<PageDoc | null> {
  const payload = await getPayload({ config: configPromise })

  const pageResponse = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    depth: 2,
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  if (pageResponse.docs?.[0]) {
    return pageResponse.docs[0]
  }

  return null
}

export async function generateMetadata() {
  const page = await fetchHomePage()
  return generateMeta({ doc: page || homeStatic })
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [page, servicesResponse, teamResponse, reviewsResponse] = await Promise.all([
    fetchHomePage(),
    payload.find({
      collection: 'services',
      limit: 100,
      pagination: false,
      sort: 'order',
    }),
    payload.find({
      collection: 'team-members',
      limit: 100,
      pagination: false,
    }),
    payload.find({
      collection: 'reviews',
      limit: 12,
      pagination: false,
    }),
  ])

  const services = ((servicesResponse.docs as ServiceDoc[]) || []).sort(
    (a, b) => (a.order || 999) - (b.order || 999),
  )

  const team = ((teamResponse.docs as TeamDoc[]) || []).sort(
    (a, b) => (a.order || 999) - (b.order || 999),
  )
  const reviews = ((reviewsResponse.docs as ReviewDoc[]) || []).sort((a, b) => {
    if (a.featured === b.featured) return 0
    return a.featured ? -1 : 1
  })

  return (
    <main className="flex flex-col gap-0">
      <HeroSection hero={page?.hero || homeStatic.hero} />
      <ServicesShowcase services={services.slice(0, 6)} />
      <TestimonialsSection reviews={reviews} />
      <TeamSpotlight team={team.slice(0, 6)} />
      <AccommodationsNote />
    </main>
  )
}
