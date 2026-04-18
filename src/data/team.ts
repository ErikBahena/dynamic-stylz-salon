import type { TeamMember } from '@/types/content'

/**
 * Stylists shown on the homepage team section.
 * Set `featured: true` to prioritize a stylist's placement.
 *
 * NOTE: Only real stylists belong here. Review photos should stay in
 * `src/data/reviews.ts`. Add new team members here as they join.
 */
export const team: TeamMember[] = [
  {
    id: 'amber',
    name: 'Amber',
    role: 'Owner & Master Stylist',
    experienceYears: 15,
    bio: 'Amber owns Dynamic Stylz and is known around Elma for precise color work, fair pricing, and taking the time to get every detail right.',
    headshot: {
      src: '/media/amber.jpg',
      alt: 'Amber, owner of Dynamic Stylz Salon',
      width: 300,
      height: 291,
    },
    specialties: ['Lived-in color', 'Balayage', 'Precision cuts'],
    featured: true,
    order: 10,
  },
]
