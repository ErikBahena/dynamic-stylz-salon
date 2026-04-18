/**
 * Shared content types for the static site.
 * All data lives in `src/data/*` — edit those files to update content.
 */

export type ImageRef = {
  src: string
  alt: string
  width: number
  height: number
}

export type ServiceCategory =
  | 'women'
  | 'men'
  | 'kids'
  | 'color'
  | 'specialty'
  | 'treatment'

export type Service = {
  id: string
  title: string
  category: ServiceCategory
  description: string
  image?: ImageRef
  /** Fixed-price service, or "Call for consultation" */
  priceType: 'fixed' | 'consultation'
  /** Numeric USD price, used when priceType === 'fixed' */
  price?: number
  /** Optional override label like "$45+" */
  priceLabel?: string
  /** Optional duration note like "60–75 min" */
  duration?: string
  featured?: boolean
  /** Lower numbers sort first */
  order: number
}

export type TeamMember = {
  id: string
  name: string
  role: string
  experienceYears?: number
  bio: string
  headshot?: ImageRef
  specialties?: string[]
  featured?: boolean
  order: number
}

export type ReviewSource = 'facebook' | 'google' | 'direct'

export type Review = {
  id: string
  reviewerName: string
  rating: 1 | 2 | 3 | 4 | 5
  source: ReviewSource
  body: string
  images?: ImageRef[]
  featured?: boolean
  publishedAt?: string
}

export type HeroCTA = {
  label: string
  href: string
  primary?: boolean
  external?: boolean
}

export type Hero = {
  headline: string
  subheadline?: string
  images: ImageRef[]
  ctas: HeroCTA[]
}
