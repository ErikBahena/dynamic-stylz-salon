'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  /** Delay in ms before the reveal plays once in view. */
  delay?: number
  /** Optional element tag — defaults to div. */
  as?: React.ElementType
  className?: string
  /** How much of the element must be visible (0–1). Defaults to 0.12. */
  threshold?: number
  /** Reveal every time it enters view instead of once. */
  repeat?: boolean
}

/**
 * Minimal scroll-reveal wrapper. Adds `.in` once the element enters view
 * so the CSS transition defined in `globals.css` plays. Designed to be
 * the ONLY reveal pattern on the site — no bespoke opacity hacks in components.
 */
export const Reveal: React.FC<Props> = ({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
  threshold = 0.12,
  repeat = false,
}) => {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const node = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (!repeat) observer.disconnect()
        } else if (repeat) {
          setInView(false)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, repeat])

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn('reveal', inView && 'in', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
