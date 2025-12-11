'use client'

import type { RequiredDataFromCollectionSlug } from 'payload'

import { Media } from '@/components/Media'
import React, { useEffect, useRef, useState } from 'react'

type TeamMember = RequiredDataFromCollectionSlug<'team-members'>

interface Props {
  team: TeamMember[]
}

export const TeamSpotlight: React.FC<Props> = ({ team }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateCards(true), 200)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!team?.length) return null

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="container space-y-10">
        <div 
          className="flex flex-col items-center gap-2 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">The stylists</p>
          <h2 className="font-heading text-3xl text-brand-charcoal md:text-4xl">Rooted in experience</h2>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {team.map((member, index) => (
            <article
              className="group relative flex flex-col rounded-3xl border border-brand-wood/30 bg-white/80 p-5 shadow-[0_20px_45px_rgba(156,175,136,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-6"
              key={member.id}
              style={{
                opacity: animateCards ? 1 : 0,
                transform: animateCards ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 150}ms`,
              }}
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
                <h3 className="font-heading text-xl text-brand-charcoal sm:text-2xl">{member.name}</h3>
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
