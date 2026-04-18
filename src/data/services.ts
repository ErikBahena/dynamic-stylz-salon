import type { Service } from '@/types/content'

/**
 * Services shown on the homepage and services page.
 * Sorted by `order` (lower first). Set `featured: true` to highlight on homepage.
 */
export const services: Service[] = [
  {
    id: 'womens-cut',
    title: "Women's Cut & Style",
    category: 'women',
    description:
      'A full consultation, shampoo, precision cut, and blow-dry style tailored to your hair and lifestyle.',
    image: {
      src: '/media/womens-haircut-600x804.jpg',
      alt: "Women's haircut at Dynamic Stylz Salon",
      width: 600,
      height: 804,
    },
    priceType: 'fixed',
    price: 45,
    priceLabel: '$45+',
    duration: '60–75 min',
    featured: true,
    order: 10,
  },
  {
    id: 'mens-cut',
    title: "Men's Cut",
    category: 'men',
    description:
      'Classic or modern cut finished with a wash and quick style. Great for a clean, sharp look.',
    image: {
      src: '/media/mens-cut-1200x630.jpg',
      alt: "Men's haircut",
      width: 1200,
      height: 630,
    },
    priceType: 'fixed',
    price: 25,
    duration: '30 min',
    featured: true,
    order: 20,
  },
  {
    id: 'kids-cut',
    title: "Kids' Cut",
    category: 'kids',
    description:
      'Friendly, patient cuts for little ones. We make it fun and quick so everyone walks out happy.',
    image: {
      src: '/media/kids-cut-1200x630.jpg',
      alt: "Child's haircut",
      width: 1200,
      height: 630,
    },
    priceType: 'fixed',
    price: 20,
    duration: '30 min',
    featured: true,
    order: 30,
  },
  {
    id: 'color-single-process',
    title: 'Single-Process Color',
    category: 'color',
    description:
      'All-over color to refresh your base, cover grays, or shift your shade. Includes a personalized consultation.',
    priceType: 'fixed',
    price: 85,
    priceLabel: '$85+',
    duration: '90 min',
    featured: true,
    order: 40,
  },
  {
    id: 'color-highlights',
    title: 'Highlights / Balayage',
    category: 'color',
    description:
      "Dimensional, lived-in color hand-painted or foiled to suit your style. Pricing depends on length and density—let's chat first.",
    priceType: 'consultation',
    duration: '2–3 hrs',
    order: 50,
  },
  {
    id: 'perm',
    title: 'Perm',
    category: 'specialty',
    description:
      'Classic perms for lasting texture and body. Let us know your goals and we’ll pick the right technique.',
    priceType: 'fixed',
    price: 75,
    priceLabel: '$75+',
    duration: '90–120 min',
    order: 60,
  },
  {
    id: 'wash-style',
    title: 'Wash & Style',
    category: 'treatment',
    description:
      'Shampoo, condition, and professional blow-dry style—perfect for events or whenever you want to feel put together.',
    priceType: 'fixed',
    price: 30,
    duration: '30–45 min',
    order: 70,
  },
  {
    id: 'updo',
    title: 'Updo / Special Occasion',
    category: 'specialty',
    description:
      'Wedding, prom, or a night out? We’ll create a look you love. Bring inspiration photos if you have them.',
    priceType: 'consultation',
    duration: '60–90 min',
    order: 80,
  },
]
