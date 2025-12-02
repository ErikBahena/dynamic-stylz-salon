import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    // Header navigation is now hardcoded in the component
    // No editable fields needed
  ],
}
