import React from 'react'

export const AccommodationsNote: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container rounded-3xl border border-dashed border-brand-sage/60 bg-gray-50 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-brand-sage">Accommodations</p>
        <h3 className="mt-2 font-heading text-2xl text-brand-charcoal">
          Need a quieter appointment?
        </h3>
        <p className="mt-3 text-sm text-brand-charcoal/80">
          We happily offer sensory-friendly appointments by request. Mention it when you book and
          we’ll make sure the space and timing feel comfortable.
        </p>
      </div>
    </section>
  )
}

