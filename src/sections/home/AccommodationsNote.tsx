import { Reveal } from '@/components/Reveal'
import React from 'react'

/**
 * A single quiet line at the bottom of the homepage — the kind of note
 * that reads like a considered footnote in an editorial piece.
 */
export const AccommodationsNote: React.FC = () => {
  return (
    <section data-nav-theme="dark" className="bg-ivory py-16 md:py-24">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-prose-lg border-t border-line pt-10 text-center">
            <p
              className="eyebrow mb-4"
              style={{ letterSpacing: '0.35em' }}
            >
              A quiet note
            </p>
            <p className="display-italic text-lg leading-relaxed text-ink md:text-xl">
              Sensory-friendly appointments available by request — just mention it when you book
              and we&rsquo;ll make the space feel right.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
