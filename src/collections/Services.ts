import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    defaultColumns: ['title', 'category', 'priceType', 'price'],
    group: 'Content',
    useAsTitle: 'title',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      name: 'slug',
      admin: {
        position: 'sidebar',
        description: 'Used for anchors and filtering in the UI.',
      },
    }),
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Women', value: 'women' },
        { label: 'Men', value: 'men' },
        { label: 'Kids', value: 'kids' },
        { label: 'Color', value: 'color' },
        { label: 'Specialty', value: 'specialty' },
        { label: 'Treatment', value: 'treatment' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        rows: 4,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional image or texture used next to the service details.',
      },
    },
    {
      name: 'priceType',
      label: 'Pricing',
      type: 'radio',
      defaultValue: 'fixed',
      options: [
        {
          label: 'Fixed price',
          value: 'fixed',
        },
        {
          label: 'Call for consultation',
          value: 'consultation',
        },
      ],
      required: true,
      admin: {
        layout: 'horizontal',
      },
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.priceType === 'fixed',
        width: '50%',
        description: 'Flat rate shown on the site.',
      },
    },
    {
      name: 'priceLabel',
      label: 'Price label',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.priceType === 'fixed',
        width: '50%',
        description: 'Optional override such as “$45+”.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Optional duration or timing note shown under the price.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Highlight this service on the homepage',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Manual order',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

