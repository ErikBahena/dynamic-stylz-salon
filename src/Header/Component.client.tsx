'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'

export const HeaderClient: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className="relative z-10">
      <div className="container grid grid-cols-3 items-center gap-4 py-2 md:py-4">
        {/* Logo on left */}
        <Link 
          className="flex items-center gap-5 transition-all duration-500"
          href="/"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          }}
        >
          <Logo loading="eager" priority="high" />
          <span className="font-heading text-xl uppercase tracking-[0.3em] text-brand-charcoal hidden sm:inline">
            Dynamic Stylz Salon
          </span>
        </Link>

        {/* Book Now text link in center */}
        <div 
          className="flex justify-center transition-all duration-500 delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
          }}
        >
          <Link
            href="/contact"
            className="text-brand-charcoal transition-colors hover:text-brand-sage uppercase tracking-[0.3em]"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Social icons on right */}
        <div 
          className="flex items-center justify-end gap-4 transition-all duration-500 delay-200"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
          }}
        >
          <a
            href="https://share.google/Xkcxld1KoMv3huCpK"
            rel="noreferrer"
            target="_blank"
            className="transition-all duration-300 hover:opacity-80 hover:scale-110"
            aria-label="View Dynamic Stylz Salon on Google"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/AmberStuderStylist/photos"
            rel="noreferrer"
            target="_blank"
            className="transition-all duration-300 hover:opacity-80 hover:scale-110"
            aria-label="Visit Dynamic Stylz Salon on Facebook"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
