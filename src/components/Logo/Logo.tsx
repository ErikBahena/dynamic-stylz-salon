import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  /**
   * Visual tone of the logo.
   * - `dark` (default): black line art — use on light backgrounds (ivory, paper).
   * - `light`: inverts the black art to ivory — use on dark (ink) backgrounds.
   */
  variant?: 'dark' | 'light'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    variant = 'dark',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Dynamic Stylz Salon logo"
      width={160}
      height={160}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx(
        'shrink-0 select-none',
        // Invert black → ivory for dark backgrounds. `brightness(0) invert(1)` pushes
        // the black art fully white; combined with a slight opacity on the parent it
        // settles as the ivory tone the rest of the site uses.
        variant === 'light' && '[filter:brightness(0)_invert(1)]',
        className,
      )}
      src="/branding/dynamic-stylz-logo.svg"
    />
  )
}
