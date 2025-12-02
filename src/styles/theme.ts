export const palette = {
  warmWhite: '#FFFEF7',
  cream: '#F5F5DC',
  parchment: '#FFF9ED',
  wood: '#D2B48C',
  brown: '#6B4E3D',
  taupe: '#8B6F47',
  sage: '#9CAF88',
  charcoal: '#4A4A4A',
  warmGray: '#A8A8A8',
  black: '#1F1A17',
}

export const typography = {
  heading: '"Playfair Display", "Times New Roman", serif',
  body: '"Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
}

export const shadows = {
  card: '0 15px 35px rgba(156, 175, 136, 0.12)',
  subtle: '0 6px 18px rgba(32, 26, 23, 0.08)',
}

export const transitions = {
  base: '200ms ease',
}

export const radii = {
  sm: '6px',
  md: '12px',
  pill: '999px',
}

export const theme = {
  palette,
  typography,
  shadows,
  transitions,
  radii,
}

export type Theme = typeof theme

