import type { Hero } from '@/types/content'

import { site } from './site'

/**
 * Homepage hero content. Rotates through `images` automatically.
 */
export const hero: Hero = {
  headline: 'Expert Hair Services for the Whole Family',
  subheadline:
    'Free consultations · Expert stylists · Sensory-friendly appointments available by request',
  images: [
    {
      src: '/media/hair-stylist-at-work--t3chat--1-1200x630.jpg',
      alt: 'Stylist at work inside Dynamic Stylz Salon',
      width: 1200,
      height: 630,
    },
    {
      src: '/media/womens-haircut-1200x630.jpg',
      alt: "A women's haircut in progress",
      width: 1200,
      height: 630,
    },
    {
      src: '/media/shannon-1920x1440.jpg',
      alt: 'Salon chair and natural light',
      width: 1920,
      height: 1440,
    },
  ],
  ctas: [
    {
      label: 'Book Now',
      href: `tel:${site.phone.tel}`,
      primary: true,
    },
    {
      label: 'View Services',
      href: '#services',
    },
  ],
}
