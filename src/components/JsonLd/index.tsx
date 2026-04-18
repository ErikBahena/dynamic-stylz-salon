import { faqs } from '@/data/faqs'
import { services } from '@/data/services'
import { site } from '@/data/site'
import { team } from '@/data/team'
import React from 'react'

/**
 * Schema.org structured data as JSON-LD.
 *
 * We emit a single `<script type="application/ld+json">` with a `@graph`
 * containing every entity (business, services, people, FAQs, breadcrumbs,
 * website). Google accepts the graph form and it's easier to keep in sync
 * than emitting many small scripts.
 *
 * Schema choices:
 * - `HairSalon` is a recognized subtype of `LocalBusiness` with extra fields
 *   Google honors (priceRange, openingHoursSpecification, geo, etc.).
 * - `OfferCatalog` with nested `Service` entities lets the business page
 *   surface in Google's "Services" carousel on mobile SERPs.
 * - `Person` entries are marked `worksFor` the business so Google can resolve
 *   the stylist in entity-search.
 * - `WebSite` with a `SearchAction` enables the sitelinks search box.
 * - `BreadcrumbList` is provided for the root as a canonical anchor.
 * - `FAQPage` feeds AI Overviews / voice answers even after Google deprecated
 *   FAQ rich-result stars in 2023 — still the highest-ROI schema for salons.
 *
 * Explicitly NOT emitted:
 * - `AggregateRating` / `Review` on the business. Google banned self-serving
 *   review markup in 2019 — stars won't render from owned sites, and heavy
 *   self-markup can trigger a manual spam review. Ratings should come from
 *   Google Business Profile, not our JSON-LD.
 */
export const JsonLd: React.FC = () => {
  const businessId = `${site.canonicalOrigin}/#business`
  const websiteId = `${site.canonicalOrigin}/#website`
  const orgId = `${site.canonicalOrigin}/#org`

  // ------ Business (HairSalon) ------
  const business = {
    '@type': ['HairSalon', 'LocalBusiness'],
    '@id': businessId,
    name: site.name,
    legalName: site.legalName,
    url: site.canonicalOrigin,
    description: site.description,
    image: `${site.canonicalOrigin}/opengraph-image`,
    logo: `${site.canonicalOrigin}/icon.png`,
    telephone: site.phone.tel,
    email: undefined,
    priceRange: site.priceRange,
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    foundingDate: String(site.foundingYear),
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areasServed.map((city) => ({
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: site.address.county,
      },
    })),
    openingHoursSpecification: site.hours.structured.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.dayOfWeek,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [site.social.facebookPage, site.social.google].filter(Boolean),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
    )}`,
    isAccessibleForFree: true,
    publicAccess: true,
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sensory-friendly appointments',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Walk-ins welcome',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Kid-friendly',
        value: true,
      },
    ],
    knowsAbout: [
      'Haircut',
      'Hair Color',
      'Balayage',
      'Highlights',
      'Perm',
      "Men's haircut",
      "Women's haircut",
      "Kids' haircut",
      'Wash and style',
      'Updo',
      'Special occasion hair',
    ],
    employee: team.map((m) => ({ '@id': `${businessId}/person/${m.id}` })),
    makesOffer: services.map((s) => ({
      '@id': `${businessId}/service/${s.id}`,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Salon Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@id': `${businessId}/service/${s.id}` },
        ...(s.priceType === 'fixed' && typeof s.price === 'number'
          ? {
              price: s.price,
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: s.price,
                priceCurrency: 'USD',
                valueAddedTaxIncluded: false,
              },
            }
          : { price: 'Consultation', priceCurrency: 'USD' }),
      })),
    },
  }

  // ------ Individual Service entities ------
  const serviceEntities = services.map((s) => ({
    '@type': 'Service',
    '@id': `${businessId}/service/${s.id}`,
    name: s.title,
    description: s.description,
    serviceType: s.title,
    category: humanizeCategory(s.category),
    provider: { '@id': businessId },
    areaServed: site.areasServed.map((c) => ({ '@type': 'City', name: c })),
    ...(s.image
      ? {
          image: absolutize(s.image.src),
        }
      : {}),
    ...(s.duration ? { estimatedDuration: s.duration } : {}),
    ...(s.priceType === 'fixed' && typeof s.price === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            price: s.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${site.canonicalOrigin}/#services`,
          },
        }
      : {
          offers: {
            '@type': 'Offer',
            price: 'Consultation',
            priceCurrency: 'USD',
            url: `${site.canonicalOrigin}/#services`,
          },
        }),
  }))

  // ------ Person entities (stylists) ------
  const personEntities = team.map((m) => ({
    '@type': 'Person',
    '@id': `${businessId}/person/${m.id}`,
    name: m.name,
    jobTitle: m.role,
    description: m.bio,
    ...(m.headshot ? { image: absolutize(m.headshot.src) } : {}),
    ...(m.specialties ? { knowsAbout: m.specialties } : {}),
    worksFor: { '@id': businessId },
    ...(typeof m.experienceYears === 'number'
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'experience',
            name: `${m.experienceYears}+ years behind the chair`,
          },
        }
      : {}),
  }))

  // ------ FAQPage (still fuels AI Overviews + voice answers even though
  // Google sunset the old FAQ rich-result stars in 2023). Cheapest schema
  // with the highest remaining ROI for a hyperlocal salon page. ------
  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${site.canonicalOrigin}/#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  // ------ Organization (separate from the HairSalon so we can reference
  // the publishing entity even if the business itself ever moves/reforms). ------
  const organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: site.legalName,
    url: site.canonicalOrigin,
    logo: `${site.canonicalOrigin}/icon.png`,
    sameAs: [site.social.facebookPage, site.social.google],
    founder: team[0]
      ? { '@id': `${businessId}/person/${team[0].id}` }
      : undefined,
    foundingDate: String(site.foundingYear),
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        addressCountry: site.address.country,
      },
    },
  }

  // ------ WebSite (gives Google a sitelinks SearchAction hook) ------
  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.canonicalOrigin,
    name: site.name,
    publisher: { '@id': orgId },
    inLanguage: 'en-US',
  }

  // ------ BreadcrumbList (root only; grows if we add interior pages) ------
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    '@id': `${site.canonicalOrigin}/#breadcrumbs`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.canonicalOrigin,
      },
    ],
  }

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      business,
      ...serviceEntities,
      ...personEntities,
      faqPage,
      organization,
      website,
      breadcrumbs,
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Strip undefined values for clean output
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph, stripUndefined),
      }}
    />
  )
}

// ---- helpers ----

function humanizeCategory(category: string) {
  const map: Record<string, string> = {
    women: "Women's Hair Services",
    men: "Men's Hair Services",
    kids: "Kids' Hair Services",
    color: 'Hair Color',
    specialty: 'Specialty Services',
    treatment: 'Hair Treatment',
  }
  return map[category] ?? category
}

function absolutize(path: string) {
  if (/^https?:\/\//.test(path)) return path
  return `${site.canonicalOrigin}${path.startsWith('/') ? path : `/${path}`}`
}

function stripUndefined(_key: string, value: unknown) {
  return value === undefined ? undefined : value
}
