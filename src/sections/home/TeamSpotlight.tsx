import type { RequiredDataFromCollectionSlug } from 'payload'

import { Media } from '@/components/Media'
import React from 'react'

type TeamMember = RequiredDataFromCollectionSlug<'team-members'>

interface Props {
  team: TeamMember[]
}

export const TeamSpotlight: React.FC<Props> = ({ team }) => {
  if (!team?.length) return null

  return (
    <section className="bg-white py-16">
      <div className="container space-y-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">The stylists</p>
            <h2 className="font-heading text-3xl text-brand-charcoal">Rooted in experience</h2>
          </div>
          <p className="max-w-xl text-sm text-brand-warm-gray">
            Friendly faces you’ve seen on Facebook—now with a place on the site.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <article
              className="group relative flex flex-col rounded-3xl border border-brand-wood/30 bg-white/80 p-6 shadow-[0_20px_45px_rgba(156,175,136,0.12)]"
              key={member.id}
            >
              {member.headshot && typeof member.headshot === 'object' && (
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl border border-brand-wood/40">
                  <Media
                    fill
                    imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={member.featured || false}
                    resource={member.headshot}
                  />
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl text-brand-charcoal">{member.name}</h3>
                <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">{member.role}</p>
                {member.experienceYears && (
                  <p className="text-xs font-medium text-brand-sage">
                    {member.experienceYears}+ years behind the chair
                  </p>
                )}
                <p className="text-sm leading-relaxed text-brand-charcoal/80">{member.bio}</p>
                {member.specialties && member.specialties.length > 0 && (
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-warm-gray">
                    {member.specialties
                      .map(({ specialty }) => specialty)
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

