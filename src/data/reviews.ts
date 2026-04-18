import type { Review } from '@/types/content'

/**
 * Testimonials shown on the homepage. Mix Facebook/Google/Direct reviews.
 * `featured: true` prioritizes a review in the layout.
 *
 * Add photos to `images[]` when the reviewer shared a photo of their
 * finished look — the testimonials section will display them alongside
 * the quote.
 */
export const reviews: Review[] = [
  {
    id: 'review-shannon-j',
    reviewerName: 'Shannon J.',
    rating: 5,
    source: 'facebook',
    body: 'Amber is absolutely amazing. She took my hair from a grown-out mess to exactly what I had in mind. The salon is warm and welcoming—you can tell everyone genuinely loves what they do.',
    images: [
      {
        src: '/media/shannon-j-2-900x1200.jpg',
        alt: 'Shannon with her finished look',
        width: 900,
        height: 1200,
      },
    ],
    featured: true,
    publishedAt: '2024-09-18',
  },
  {
    id: 'review-karna',
    reviewerName: 'Karna M.',
    rating: 5,
    source: 'google',
    body: 'Best haircut I have had in years. Fair pricing, honest consultation, and the color came out exactly how we talked about. I drive in from out of town and it is 100% worth it.',
    images: [
      {
        src: '/media/karna-600x800.jpg',
        alt: 'Karna with her new color',
        width: 600,
        height: 800,
      },
    ],
    featured: true,
    publishedAt: '2024-07-05',
  },
  {
    id: 'review-family',
    reviewerName: 'Jessica R.',
    rating: 5,
    source: 'facebook',
    body: 'My whole family goes here. Great with the kids, patient with my teenager, and I always leave feeling like myself. Can’t recommend Dynamic Stylz enough.',
    images: [
      {
        src: '/media/kids-cut-600x804.jpg',
        alt: 'A kid-friendly cut at Dynamic Stylz',
        width: 600,
        height: 804,
      },
    ],
    publishedAt: '2024-05-22',
  },
  {
    id: 'review-sensory',
    reviewerName: 'Megan T.',
    rating: 5,
    source: 'direct',
    body: 'The team worked with me on a quiet, low-sensory appointment and it made all the difference. So grateful for a salon that actually listens.',
    featured: true,
    publishedAt: '2024-08-11',
  },
  {
    id: 'review-color',
    reviewerName: 'Brianna L.',
    rating: 5,
    source: 'google',
    body: 'I brought in a Pinterest photo and walked out with that exact color. Amber really knows what she is doing. Already booked my next appointment.',
    images: [
      {
        src: '/media/womens-haircut-600x804.jpg',
        alt: 'Fresh color on a women\u2019s haircut',
        width: 600,
        height: 804,
      },
    ],
    publishedAt: '2024-10-02',
  },
  {
    id: 'review-regular',
    reviewerName: 'Dana K.',
    rating: 5,
    source: 'facebook',
    body: 'Been going here for years. Always professional, always kind, and every cut leaves me feeling confident. Small-town salon with big-city skills.',
    publishedAt: '2024-06-30',
  },
]
