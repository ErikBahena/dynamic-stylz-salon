import clsx from 'clsx'
import React from 'react'

import { Logo } from './Logo'

interface Props {
  className?: string
  /**
   * Visual tone of the lockup.
   * - `dark` (default): ink text + black tree mark — use on ivory/paper backgrounds.
   * - `light`: ivory text + inverted tree mark — use on ink backgrounds.
   */
  variant?: 'dark' | 'light'
  /**
   * Overall sizing preset for the lockup.
   * - `sm`: header-scale compact mark.
   * - `md`: hero/body-scale — the default brand moment.
   * - `lg`: oversized editorial display.
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Optional subtitle line shown beneath the wordmark. Defaults to
   * `Elma, WA`. Pass `null` to omit entirely.
   */
  subtitle?: string | null
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

const sizeMap = {
  sm: {
    // Header lockup — noticeably more present than the old 36px mark, still
    // a tier below the footer's `lg` treatment. Three tiers:
    //   • default (phones ≥380px, the common case): 48px icon / 1.3rem name
    //   • md (≥768px desktop): 50px icon / 1.35rem name
    //   • max-[380px] (very narrow phones — SE 1st gen 320, iPhone Mini 360):
    //     tapers to 42px / 1.18rem so the hamburger doesn't clip.
    icon: 'h-12 w-12 max-[380px]:h-[42px] max-[380px]:w-[42px] md:h-[50px] md:w-[50px]',
    gap: 'gap-3 max-[380px]:gap-2.5 md:gap-3.5',
    name: 'text-[1.3rem] max-[380px]:text-[1.18rem] md:text-[1.35rem]',
    // Subtitle rarely renders here (the nav passes `subtitle={null}`) but we
    // still scale it for anywhere else that opts into the small preset with
    // a subtitle.
    subtitle: 'text-[0.58rem] max-[380px]:text-[0.54rem] md:text-[0.6rem]',
    subtitleTracking: '0.36em',
  },
  md: {
    icon: 'h-14 w-14 md:h-16 md:w-16',
    gap: 'gap-3 md:gap-4',
    name: 'text-2xl md:text-3xl',
    subtitle: 'text-[0.6rem] md:text-[0.64rem]',
    subtitleTracking: '0.44em',
  },
  lg: {
    icon: 'h-20 w-20 md:h-24 md:w-24',
    gap: 'gap-4 md:gap-5',
    name: 'text-3xl md:text-4xl',
    subtitle: 'text-[0.68rem] md:text-[0.72rem]',
    subtitleTracking: '0.5em',
  },
} as const

/**
 * Dynamic Stylz lockup — the tree mark paired with a Playfair wordmark.
 *
 * The original logo has text baked into the glyph, but at the icon sizes used
 * here that embedded text reads as part of the tree's silhouette. The Playfair
 * wordmark beside it carries the brand naming clearly in our display face.
 */
export const Wordmark: React.FC<Props> = ({
  className,
  variant = 'dark',
  size = 'md',
  subtitle = 'Elma, WA',
  loading,
  priority,
}) => {
  const s = sizeMap[size]

  return (
    <div className={clsx('inline-flex items-center', s.gap, className)}>
      <Logo
        className={clsx(s.icon, 'shrink-0')}
        loading={loading}
        priority={priority}
        variant={variant}
      />
      <div className="flex flex-col leading-[0.95]">
        <span
          className={clsx('font-heading tracking-tight', s.name)}
          style={{ letterSpacing: '0.005em' }}
        >
          Dynamic Stylz Salon
        </span>
        {subtitle && (
          <span
            className={clsx('mt-1.5 font-medium uppercase opacity-70', s.subtitle)}
            style={{ letterSpacing: s.subtitleTracking }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
