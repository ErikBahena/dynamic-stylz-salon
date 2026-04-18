import type { TeamMember } from '@/types/content'

import { Media } from '@/components/Media'
import { Reveal } from '@/components/Reveal'
import React from 'react'

type Props = {
  team: TeamMember[]
}

/**
 * Editorial portrait section — adapts to team size.
 * Single stylist → featured spread. Multiple → portrait grid.
 */
export const TeamSpotlight: React.FC<Props> = ({ team }) => {
  if (!team?.length) return null

  const solo = team.length === 1

  return (
    <section
      id="team"
      data-nav-theme="dark"
      className="relative isolate scroll-mt-20 flex min-h-screen flex-col justify-center overflow-hidden bg-paper py-16 md:py-20"
    >
      {/* Ambient warm blooms — soften the whole section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-[-10%] top-[10%] h-[70vh] w-[70vh] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(222,180,190,0.28) 0%, rgba(222,180,190,0.08) 45%, rgba(253,250,246,0) 75%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] right-[-8%] h-[55vh] w-[55vh] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(205,170,185,0.22) 0%, rgba(205,170,185,0.06) 45%, rgba(253,250,246,0) 75%)',
          }}
        />
      </div>

      <div className="container">
        {/* Header */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="eyebrow mb-3">Behind the Chair</p>
            <h2 className="font-heading text-[2.5rem] leading-[1.05] tracking-tightest text-ink md:text-[3.5rem]">
              {solo ? (
                <>
                  Meet the hands{' '}
                  <span className="display-italic">behind the work.</span>
                </>
              ) : (
                <>
                  The people you&rsquo;ll sit with —{' '}
                  <span className="display-italic">one chair at a time.</span>
                </>
              )}
              <span className="sr-only">
                {' '}
                — Meet the stylists at Dynamic Stylz Salon in Elma, WA.
              </span>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={120}>
            <p className="max-w-prose-sm text-[0.9rem] leading-relaxed text-ink-muted md:ml-auto md:text-right">
              A small, steady team. Everyone behind a chair here has earned their hours twice
              over — and still takes the time to listen before they lift a pair of shears.
            </p>
          </Reveal>
        </div>

        {solo ? (
          <SoloFeature member={team[0]} />
        ) : (
          <PortraitGrid team={team} />
        )}
      </div>
    </section>
  )
}

const SoloFeature: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="relative mt-12 md:mt-16">
    <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
      {/* Portrait — arched frame, softened with a warm halo */}
      {member.headshot && (
        <Reveal className="relative md:col-span-5">
          <div className="relative mx-auto w-full max-w-[22rem] md:max-w-none">
            {/* Warm halo directly behind the portrait */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(222,180,190,0.45) 0%, rgba(222,180,190,0.12) 55%, rgba(253,250,246,0) 80%)',
              }}
            />
            {/* Arched portrait — rounded top like a classic cameo */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-3xl bg-muted shadow-[0_30px_60px_-20px_rgba(31,26,23,0.25)]">
              <Media
                fill
                imgClassName="h-full w-full object-cover object-center"
                priority
                resource={member.headshot}
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            {/* Script signature tucked at the base */}
            <span className="display-italic absolute -bottom-2 right-4 text-xl text-ink/60 md:text-2xl">
              est. 2009
            </span>
          </div>
        </Reveal>
      )}

      {/* Bio — looser, airier, with a flourish rule */}
      <Reveal className="md:col-span-7" delay={120}>
        <div className="flex flex-col gap-4">
          {member.experienceYears && (
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-8 bg-ink/30"
              />
              <span
                className="text-[0.68rem] uppercase text-ink-muted"
                style={{ letterSpacing: '0.32em' }}
              >
                {member.experienceYears}+ years behind the chair
              </span>
            </div>
          )}
          <h3 className="font-heading text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
            {member.name}
          </h3>
          <p className="display-italic -mt-1 text-2xl leading-tight text-ink-muted md:text-3xl">
            {member.role}
          </p>

          {/* Soft flourish divider */}
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-16 bg-ink/20"
          />

          <p className="mt-1 max-w-prose-md text-[0.95rem] leading-relaxed text-ink-muted md:text-base">
            {member.bio}
          </p>
          {member.specialties && member.specialties.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {member.specialties.map((s) => (
                <span
                  key={s}
                  className="text-[0.7rem] uppercase text-ink"
                  style={{ letterSpacing: '0.28em' }}
                >
                  · {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  </div>
)

const PortraitGrid: React.FC<{ team: TeamMember[] }> = ({ team }) => (
  <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-14 md:gap-x-8 md:gap-y-14 lg:grid-cols-4">
    {team.map((member, index) => (
      <li key={member.id}>
        <Reveal delay={(index % 4) * 100}>
          <figure className="group">
            {member.headshot && (
              <div className="relative">
                {/* Soft halo */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(222,180,190,0.4) 0%, rgba(222,180,190,0.1) 55%, rgba(253,250,246,0) 80%)',
                  }}
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-2xl bg-muted shadow-[0_20px_40px_-18px_rgba(31,26,23,0.2)]">
                  <Media
                    fill
                    imgClassName="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    priority={member.featured || false}
                    resource={member.headshot}
                    sizes="(min-width: 1024px) 22vw, 44vw"
                  />
                </div>
              </div>
            )}
            <figcaption className="mt-4 flex flex-col items-center gap-1 text-center">
              {member.experienceYears && (
                <span
                  className="text-[0.65rem] uppercase text-ink-muted"
                  style={{ letterSpacing: '0.28em' }}
                >
                  {member.experienceYears}+ years
                </span>
              )}
              <h3 className="font-heading text-xl leading-tight tracking-tight text-ink md:text-2xl">
                {member.name}
              </h3>
              <p className="display-italic text-base text-ink-muted md:text-lg">
                {member.role}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </li>
    ))}
  </ul>
)
