/**
 * Site-wide constants: business info, hours, contact, SEO metadata.
 * Update these values to change the info shown across the site.
 *
 * NOTE: These values also feed structured data (JSON-LD / schema.org)
 * and metadata (OG tags, sitemap, canonical URL) — keep them accurate.
 */

export const site = {
  name: 'Dynamic Stylz Salon',
  legalName: 'Dynamic Stylz Salon LLC',
  tagline: 'Full-service family salon in Elma, WA',
  shortTagline: 'Full-service family salon — Elma, WA',
  description:
    'Full-service family hair salon in Elma, WA. Expert cuts, color, balayage, highlights, perms, kids cuts, and sensory-friendly appointments. Serving Grays Harbor County for 15+ years.',
  /** Short blurb for social/OG — <200 chars, complete sentence. */
  ogDescription:
    'Modern cuts, color, and kindness — a family salon rooted in Elma, WA. Expert stylists, fair pricing, and sensory-friendly appointments by request.',
  url: 'https://dynamicstylz.com',
  /** Canonical production URL origin — no trailing slash. */
  canonicalOrigin: 'https://dynamicstylz.com',
  foundingYear: 2009,
  priceRange: '$20–$85+',
  /**
   * Keywords help inform OG tag hints and internal content strategy. Google's
   * crawler doesn't use meta-keywords directly any more, but we surface these
   * through natural copy and structured data.
   */
  keywords: [
    'hair salon Elma WA',
    'haircut Elma WA',
    'hair color Elma',
    'balayage Grays Harbor',
    'highlights Elma WA',
    "kids haircut Elma",
    "men's haircut Elma WA",
    "women's haircut Elma WA",
    'perm Elma WA',
    'salon near me',
    'Dynamic Stylz Salon',
    'Amber Studer stylist',
    'sensory friendly salon',
    'family salon Elma',
    'Grays Harbor hair stylist',
  ],
  address: {
    street: '313 W Main St',
    city: 'Elma',
    state: 'WA',
    stateName: 'Washington',
    zip: '98541',
    country: 'US',
    countryName: 'United States',
    county: 'Grays Harbor County',
  },
  /** Approx geo coordinates of 313 W Main St, Elma, WA. Used for JSON-LD geo. */
  geo: {
    latitude: 47.00378,
    longitude: -123.40797,
  },
  /** Nearby towns served — helps capture hyperlocal "near me" intent. */
  areasServed: [
    'Elma',
    'Montesano',
    'McCleary',
    'Aberdeen',
    'Hoquiam',
    'Satsop',
    'Oakville',
    'Malone',
    'Porter',
  ],
  phone: {
    display: '(360) 581-2428',
    tel: '+13605812428',
  },
  hours: {
    summary: 'Mon–Thu 10am–6pm · Fri 10am–5pm',
    /** Human-readable schedule for the site UI. */
    schedule: [
      { day: 'Monday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Tuesday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Thursday', hours: '10:00 AM – 6:00 PM' },
      { day: 'Friday', hours: '10:00 AM – 5:00 PM' },
      { day: 'Saturday', hours: 'Closed' },
      { day: 'Sunday', hours: 'Closed' },
    ] as const,
    /**
     * Schema.org-compatible opening hours specification.
     * Use 24-hour times, days-of-week as two-letter Mo/Tu/We/Th/Fr/Sa/Su.
     */
    structured: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '10:00',
        closes: '18:00',
      },
      {
        dayOfWeek: ['Friday'],
        opens: '10:00',
        closes: '17:00',
      },
    ] as const,
  },
  social: {
    facebook: 'https://www.facebook.com/AmberStuderStylist/photos',
    facebookPage: 'https://www.facebook.com/AmberStuderStylist',
    google: 'https://share.google/Xkcxld1KoMv3huCpK',
  },
  /**
   * Brand colors surfaced to the browser (Chrome address bar, Safari pinned
   * tab, PWA manifest, dark/light color scheme meta). Kept minimal — Google
   * does not read these for ranking, but they affect visible polish in
   * browsers + search previews on mobile.
   */
  brand: {
    ink: '#1F1A17', // editorial near-black
    ivory: '#F7F3EC', // page base
    bronze: '#8B6F47', // accent
  },
} as const
