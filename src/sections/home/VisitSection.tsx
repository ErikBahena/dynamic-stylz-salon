import { Reveal } from '@/components/Reveal'
import { site } from '@/data/site'
import React from 'react'

/**
 * Visit / wayfinding section — an editorial address card with a live map.
 *
 * Two-column spread: directional content on the left (address, hours, note,
 * calls to action); a warmly-framed Google Maps card on the right with an
 * overlaid business info strip so the card itself reads like an old-world
 * calling card.
 */
export const VisitSection: React.FC = () => {
  const mapQuery = encodeURIComponent(
    `${site.address.street} ${site.address.city} ${site.address.state} ${site.address.zip}`,
  )
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&hl=en&z=16&output=embed`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`

  return (
    <section
      id="visit"
      data-nav-theme="dark"
      className="relative isolate scroll-mt-20 overflow-hidden bg-paper py-20 md:py-28"
    >
      {/* Warm ambient blooms tying this into the team section above */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute right-[-12%] top-[-10%] h-[60vh] w-[60vh] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(222,180,190,0.22) 0%, rgba(222,180,190,0.06) 45%, rgba(253,250,246,0) 75%)',
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[-10%] h-[55vh] w-[55vh] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(205,170,185,0.18) 0%, rgba(205,170,185,0.05) 45%, rgba(253,250,246,0) 75%)',
          }}
        />
      </div>

      <div className="container">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14 lg:gap-20">
          {/* LEFT — directional copy */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4">Visit the Chair</p>
              <h2 className="font-heading text-[2.5rem] leading-[1.02] tracking-tightest text-ink md:text-[3.75rem]">
                {site.address.street}
                <span className="display-italic mt-1 block text-ink-muted">
                  {site.address.city}, {site.address.state}
                </span>
                <span className="sr-only">
                  {' '}
                  — Visit Dynamic Stylz Salon in Elma, WA. Serving Elma, Montesano,
                  Satsop, McCleary, and the greater Grays Harbor County area.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 max-w-prose-md text-[1rem] leading-relaxed text-ink-muted md:text-[1.05rem]">
                Third door down from Dollar Tree on Main Street. Park right out front or
                pull around to the alley behind the building — either way, the door&rsquo;s
                open and the kettle&rsquo;s on.
              </p>
            </Reveal>

            {/* Hours + Contact — editorial two-up */}
            <div className="mt-10 grid gap-10 border-t border-line pt-8 sm:grid-cols-2 sm:gap-12">
              <Reveal delay={180}>
                <div>
                  <p
                    className="text-[0.66rem] font-medium uppercase text-ink-muted"
                    style={{ letterSpacing: '0.32em' }}
                  >
                    Hours
                  </p>
                  <ul className="mt-4 space-y-1.5 text-[0.95rem] text-ink">
                    {site.hours.schedule.map((item) => (
                      <li key={item.day} className="flex justify-between gap-6">
                        <span className="text-ink">{item.day}</span>
                        <span className="text-ink-muted">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div>
                  <p
                    className="text-[0.66rem] font-medium uppercase text-ink-muted"
                    style={{ letterSpacing: '0.32em' }}
                  >
                    Contact
                  </p>
                  <ul className="mt-4 space-y-3 text-[0.95rem] text-ink">
                    <li>
                      <a
                        href={`tel:${site.phone.tel}`}
                        className="inline-flex items-center gap-2 border-b border-ink/30 pb-0.5 font-heading text-lg text-ink transition-colors hover:border-bronze hover:text-bronze"
                      >
                        {site.phone.display}
                        <span aria-hidden="true">→</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`sms:${site.phone.tel}`}
                        className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-bronze"
                      >
                        Text Amber directly
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.social.facebook}
                        rel="noreferrer"
                        target="_blank"
                        className="inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-bronze"
                      >
                        Message on Facebook
                        <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Note card — pull quote style, pink-tinted */}
            <Reveal delay={300}>
              <aside
                className="mt-10 rounded-2xl px-6 py-6 md:px-8"
                style={{
                  background: 'rgba(222,180,190,0.18)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(205,170,185,0.55)',
                }}
              >
                <p
                  className="text-[0.62rem] font-medium uppercase text-ink-muted"
                  style={{ letterSpacing: '0.32em' }}
                >
                  A small note
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink md:text-base">
                  Appointments preferred; walk-ins welcome when the chair is open.
                  We&rsquo;re currently booking a few weeks out — reach out early for
                  weekends and events.
                </p>
              </aside>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`sms:${site.phone.tel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.72rem] font-medium uppercase text-ivory transition-colors hover:bg-bronze"
                  style={{ letterSpacing: '0.28em' }}
                >
                  Text to book
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-[0.72rem] font-medium uppercase text-ink transition-colors hover:bg-ink hover:text-ivory"
                  style={{ letterSpacing: '0.28em' }}
                >
                  Call the salon
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — map card */}
          <Reveal className="md:col-span-5" delay={120}>
            <div className="sticky top-28 flex flex-col gap-5">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-ivory shadow-[0_30px_60px_-25px_rgba(31,26,23,0.25)]">
                {/* Map iframe — no API key needed */}
                <div className="relative aspect-[4/5] w-full bg-muted md:aspect-[4/5]">
                  <iframe
                    title={`Map of ${site.name} · ${site.address.street}, ${site.address.city}`}
                    src={mapSrc}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, filter: 'grayscale(0.2) contrast(0.95)' }}
                  />
                  {/* Soft gradient overlay along the bottom so the info strip reads cleanly on busy map edges */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(253,250,246,0.9) 0%, rgba(253,250,246,0) 100%)',
                    }}
                  />
                </div>

                {/* Info strip inside the card */}
                <div className="flex flex-col gap-3 border-t border-line bg-ivory px-6 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-heading text-lg leading-tight text-ink md:text-xl">
                        {site.name}
                      </p>
                      <p className="mt-1 text-[0.82rem] leading-snug text-ink-muted">
                        {site.address.street}
                        <br className="sm:hidden" />
                        <span className="sm:ml-1">
                          {site.address.city}, {site.address.state} {site.address.zip}
                        </span>
                      </p>
                    </div>
                    <a
                      href={directionsHref}
                      rel="noreferrer"
                      target="_blank"
                      className="shrink-0 text-[0.68rem] font-medium uppercase text-ink transition-colors hover:text-bronze"
                      style={{ letterSpacing: '0.28em' }}
                    >
                      Directions →
                    </a>
                  </div>
                </div>
              </div>

              {/* Caption under the card */}
              <p
                className="text-center text-[0.66rem] uppercase text-ink-muted"
                style={{ letterSpacing: '0.32em' }}
              >
                Third door from Dollar Tree · alley parking
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
