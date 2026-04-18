'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { Wordmark } from '@/components/Logo/Wordmark'
import { site } from '@/data/site'
import { cn } from '@/utilities/ui'

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Stylists', href: '/#team' },
  { label: 'Visit', href: '/#visit' },
]

/**
 * `navTheme` mirrors the `data-nav-theme` attribute each section declares:
 *  - `"light"` → section bg is dark, so nav text should be ivory/white
 *  - `"dark"`  → section bg is light, so nav text should be ink/black
 */
type NavTheme = 'light' | 'dark'

export const HeaderClient: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navTheme, setNavTheme] = useState<NavTheme>('light')
  const lastScrollY = useRef(0)

  useEffect(() => {
    // Resolve which themed section is currently sitting under the header
    // so we can flip nav colors accordingly.
    const resolveTheme = (): NavTheme => {
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]')
      // Sample point just below the nav bar, at the top-center of the viewport.
      const sampleY = 24
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= sampleY && rect.bottom > sampleY) {
          const value = section.getAttribute('data-nav-theme')
          if (value === 'dark' || value === 'light') return value
        }
      }
      return 'light'
    }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current

      setScrolled(y > 40)

      // Hide-on-scroll: always show near the top; hide on downward scroll,
      // reveal on upward scroll past a small threshold.
      if (y < 80) {
        setHidden(false)
      } else if (delta > 6) {
        setHidden(true)
      } else if (delta < -6) {
        setHidden(false)
      }

      setNavTheme(resolveTheme())

      lastScrollY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isLight = navTheme === 'light'

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,color,transform] duration-500 ease-out will-change-transform',
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
        // Background + border: transparent at the top, solid-with-blur once
        // scrolled so nav text never fights whatever section shows through.
        scrolled
          ? isLight
            ? 'border-b border-ivory/10 bg-ink/90 backdrop-blur-md'
            : 'border-b border-line bg-ivory/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
        // Text color always follows the current section's theme
        isLight ? 'text-ivory' : 'text-ink',
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Brand lockup — always visible, sits in line with the nav */}
        <Link
          aria-label="Dynamic Stylz Salon — home"
          className="leading-none transition-opacity duration-500 hover:opacity-80"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          <Wordmark
            loading="eager"
            priority="high"
            size="sm"
            subtitle={null}
            variant={isLight ? 'light' : 'dark'}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.72rem] font-medium uppercase transition-opacity hover:opacity-60"
              style={{ letterSpacing: '0.28em' }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone.tel}`}
            className={cn(
              'inline-flex items-center rounded-full border px-5 py-2.5 text-[0.72rem] font-medium uppercase transition-colors',
              isLight
                ? 'border-ivory/70 text-ivory hover:bg-ivory hover:text-ink'
                : 'border-ink text-ink hover:bg-ink hover:text-ivory',
            )}
            style={{ letterSpacing: '0.28em' }}
          >
            Book
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          type="button"
        >
          <span
            className={cn(
              'block h-px w-6 bg-current transition-transform duration-300',
              menuOpen && 'translate-y-[3px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block h-px w-6 bg-current transition-transform duration-300',
              menuOpen && '-translate-y-[3px] -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'absolute inset-x-0 top-full origin-top overflow-hidden border-b border-line bg-ivory text-ink transition-[max-height,opacity] duration-500 md:hidden',
          menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="container flex flex-col gap-1 py-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-t border-line py-5 font-heading text-2xl tracking-tight text-ink"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone.tel}`}
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-between border-t border-line py-5 text-[0.78rem] font-medium uppercase text-ink"
            style={{ letterSpacing: '0.28em' }}
          >
            <span>Call to book</span>
            <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
