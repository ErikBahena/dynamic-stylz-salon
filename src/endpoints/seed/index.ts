import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'services',
  'team-members',
  'reviews',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding services...`)

  const demoServices = [
    {
      title: "Women's Cut & Finish",
      category: 'women',
      description:
        'Customized cut, relaxing wash, and farmhouse blowout finished with soft lived-in styling.',
      priceType: 'fixed',
      price: 65,
      priceLabel: '$65+',
      duration: '60–75 min',
      order: 10,
      slug: 'womens-cut-finish',
      featured: true,
    },
    {
      title: "Men's Precision Cut",
      category: 'men',
      description: 'Tapered cut finished with hot towel and product coaching for at-home styling.',
      priceType: 'fixed',
      price: 35,
      duration: '30–45 min',
      order: 20,
      slug: 'mens-precision-cut',
    },
    {
      title: 'Kids Cut (Under 10)',
      category: 'kids',
      description: 'Gentle stylist paired with patient pacing and optional quiet appointment blocks.',
      priceType: 'fixed',
      price: 28,
      duration: '30 min',
      order: 30,
      slug: 'kids-cut',
    },
    {
      title: 'Lived-in Color + Gloss',
      category: 'color',
      description: 'Balayage-inspired placement for soft grow-out plus custom gloss and mini trim.',
      priceType: 'consultation',
      duration: '2.5+ hrs',
      featured: true,
      order: 40,
      slug: 'lived-in-color',
    },
    {
      title: 'Blonding Session',
      category: 'color',
      description: 'Foil or open-air lightening focused on maximum brightness with healthy finish.',
      priceType: 'consultation',
      duration: '3+ hrs',
      order: 50,
      slug: 'blonding-session',
    },
    {
      title: 'Event Styling & Updos',
      category: 'specialty',
      description:
        'Half-up, braids, or full updos for weddings, prom, and special occasions. Trial available.',
      priceType: 'consultation',
      duration: 'By appointment',
      order: 60,
      slug: 'event-styling',
    },
  ]

  await Promise.all(
    demoServices.map((service) =>
      payload.create({
        collection: 'services',
        depth: 0,
        data: service,
      }),
    ),
  )

  payload.logger.info(`— Seeding team members...`)

  const demoTeam = [
    {
      name: 'Amber',
      role: 'Owner & Lead Stylist',
      experienceYears: 15,
      headshot: imageHomeDoc.id,
      bio: 'Color-correction specialist known for calm energy, honest consultations, and Pinterest-worthy blonding.',
      specialties: [{ specialty: 'Lived-in color' }, { specialty: 'Bridal styling' }],
      featured: true,
      order: 10,
    },
    {
      name: 'Katie',
      role: 'Stylist',
      experienceYears: 8,
      headshot: image1Doc.id,
      bio: 'Precision cutting and men’s grooming pro who keeps Elma’s beards and fades dialed.',
      specialties: [{ specialty: 'Fades' }, { specialty: 'Texture cuts' }],
      order: 20,
    },
    {
      name: 'Nikita',
      role: 'Colorist',
      experienceYears: 6,
      headshot: image2Doc.id,
      bio: 'Obsessed with creative color, copper moments, and ensuring every guest feels heard.',
      specialties: [{ specialty: 'Coppers' }, { specialty: 'Hand-painted blends' }],
      order: 30,
    },
  ]

  await Promise.all(
    demoTeam.map((member) =>
      payload.create({
        collection: 'team-members',
        depth: 0,
        data: member,
      }),
    ),
  )

  payload.logger.info(`— Seeding reviews...`)

  const demoReviews = [
    {
      reviewerName: 'Astrid D.',
      rating: 5,
      source: 'facebook',
      body: 'First time at Dynamic Stylz for cut and color and it was perfect—exactly what I’d pinned. Amber is a magician.',
      image: image1Doc.id,
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      reviewerName: 'Megan S.',
      rating: 5,
      source: 'facebook',
      body: 'I always walk out feeling like a million bucks. The whole team is friendly and attentive.',
      image: image2Doc.id,
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      reviewerName: 'Georgia B.',
      rating: 5,
      source: 'google',
      body: 'They are true color experts—my blonde is always natural and healthy.',
      featured: false,
      publishedAt: new Date().toISOString(),
    },
  ]

  await Promise.all(
    demoReviews.map((review) =>
      payload.create({
        collection: 'reviews',
        depth: 0,
        data: review,
      }),
    ),
  )

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {},
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
