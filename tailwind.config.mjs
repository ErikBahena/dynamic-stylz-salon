import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '90rem',
      },
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) + 2px)',
        sm: 'calc(var(--radius))',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        ring: 'var(--ring)',
        // New editorial palette — use these going forward.
        ivory: 'var(--ivory)',
        paper: 'var(--paper)',
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
        },
        line: 'var(--line)',
        bronze: {
          DEFAULT: 'var(--bronze)',
          dark: 'var(--accent-dark)',
        },
        sage: 'var(--sage)',
        // Legacy brand-* kept so old classes still resolve.
        brand: {
          cream: 'var(--brand-cream)',
          parchment: 'var(--brand-parchment)',
          wood: 'var(--brand-wood)',
          brown: 'var(--brand-brown)',
          taupe: 'var(--brand-taupe)',
          sage: 'var(--brand-sage)',
          charcoal: 'var(--brand-charcoal)',
          warmGray: 'var(--brand-warm-gray)',
          bronze: 'var(--brand-bronze)',
          ivory: 'var(--brand-ivory)',
          line: 'var(--brand-line)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Playfair Display', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.025em',
        tighter: '-0.015em',
        tight: '-0.01em',
      },
      maxWidth: {
        'prose-sm': '38ch',
        'prose-md': '56ch',
        'prose-lg': '72ch',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--ink)',
            '--tw-prose-headings': 'var(--ink)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-links': 'var(--bronze)',
            fontFamily: 'var(--font-sans)',
          },
        },
      }),
    },
  },
}

export default config
