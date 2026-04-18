/**
 * Site-wide constants: business info, hours, contact.
 * Update these values to change the info shown across the site.
 */

export const site = {
  name: 'Dynamic Stylz Salon',
  legalName: 'Dynamic Stylz Salon LLC',
  tagline: 'Full-service family salon in Elma, WA',
  description:
    'Full-service family salon rooted in Elma, WA—bringing modern cuts, color, and kindness to every appointment.',
  url: 'https://dynamicstylzsalon.com',
  address: {
    street: '313 W Main St',
    city: 'Elma',
    state: 'WA',
    zip: '98541',
  },
  phone: {
    display: '(360) 581-2428',
    tel: '+13605812428',
  },
  hours: {
    summary: 'Mon–Thu 10am–6pm · Fri 10am–5pm',
    schedule: [
      { day: 'Monday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Tuesday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Thursday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Friday', hours: '10:00 AM – 5:00 PM' },
      { day: 'Saturday', hours: 'Closed' },
      { day: 'Sunday', hours: 'Closed' },
    ] as const,
  },
  social: {
    facebook: 'https://www.facebook.com/AmberStuderStylist/photos',
    google: 'https://share.google/Xkcxld1KoMv3huCpK',
  },
} as const
