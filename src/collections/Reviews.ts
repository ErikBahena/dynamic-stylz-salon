import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    defaultColumns: ['reviewerName', 'rating', 'source', 'featured'],
    useAsTitle: 'reviewerName',
    group: 'Content',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  timestamps: true,
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
      admin: {
        width: '50%',
      },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'facebook',
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Google', value: 'google' },
        { label: 'Direct testimonial', value: 'direct' },
      ],
      admin: {
        width: '50%',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      admin: {
        rows: 6,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Review images',
      admin: {
        description: 'Upload multiple images to display in a grid layout (like Facebook posts).',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 0,
      maxRows: 10,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Related service',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured reviews appear in the homepage marquee.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

