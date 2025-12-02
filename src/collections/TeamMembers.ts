import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    defaultColumns: ['name', 'role', 'experienceYears'],
    group: 'Content',
    useAsTitle: 'name',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Years of experience',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'headshot',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Use Facebook review imagery or behind-the-chair photos.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      admin: {
        rows: 5,
      },
    },
    {
      name: 'specialties',
      type: 'array',
      admin: {
        description: 'Highlight focus areas such as lived-in color, blonding, perms, etc.',
      },
      labels: {
        plural: 'Specialties',
        singular: 'Specialty',
      },
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'appointmentNote',
      type: 'text',
      admin: {
        description: 'Optional note like “Text Amber for bridal booking.”',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Show on homepage',
    },
  ],
}

