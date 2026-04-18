/**
 * Frequently-asked questions, mined from Google "People Also Ask" patterns
 * for hair-salon and local-services queries. Drives both the on-page FAQ
 * section and the `FAQPage` JSON-LD (which in 2025 no longer renders stars
 * but still feeds AI Overviews and voice answers).
 *
 * Keep answers concise (1–3 sentences) and include the location / service
 * name naturally — Google quotes these directly in AI summaries.
 */
export type Faq = {
  id: string
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    id: 'where-located',
    question: 'Where is Dynamic Stylz Salon located?',
    answer:
      'Dynamic Stylz Salon is at 313 W Main St in downtown Elma, WA — third door from Dollar Tree, with free alley parking behind the building. We serve Elma, Montesano, Satsop, McCleary, and the greater Grays Harbor County area.',
  },
  {
    id: 'hours',
    question: 'What are your hours?',
    answer:
      'We are open Monday through Thursday 10am–6pm and Friday 10am–5pm. We are closed Saturday and Sunday. Call or text (360) 581-2428 to book.',
  },
  {
    id: 'walk-ins',
    question: 'Do you accept walk-ins?',
    answer:
      'Walk-ins are welcome whenever a stylist is available, but appointments are strongly recommended — especially for color, balayage, and perms. Text (360) 581-2428 and we will find the next open chair.',
  },
  {
    id: 'pricing',
    question: 'How much does a haircut cost?',
    answer:
      "Women's cut & style starts at $45, men's cuts are $25, and kids' cuts are $20. Single-process color starts at $85; highlights, balayage, and updos are priced by consultation based on length and density.",
  },
  {
    id: 'balayage',
    question: 'Do you do balayage and highlights?',
    answer:
      'Yes. Amber specializes in dimensional, lived-in color — hand-painted balayage and traditional foiled highlights. A short consultation is always free so we can match the technique and pricing to your hair.',
  },
  {
    id: 'sensory-friendly',
    question: 'Do you offer sensory-friendly appointments?',
    answer:
      'Yes. Mention it when you book and we will dim the lights, skip the music, and pace the appointment around what you need. Kids and adults both welcome.',
  },
  {
    id: 'kids-cuts',
    question: 'Do you cut kids’ hair?',
    answer:
      'Absolutely — kids’ cuts are $20 and we keep the appointment quick, friendly, and as fun as possible. First-time haircuts are a specialty.',
  },
  {
    id: 'payment',
    question: 'What forms of payment do you accept?',
    answer:
      'We take cash, debit, and all major credit cards.',
  },
  {
    id: 'booking',
    question: 'How do I book an appointment?',
    answer:
      'The fastest way is to text or call (360) 581-2428. You can also message us on our Facebook page and we will get back to you the same business day.',
  },
]
