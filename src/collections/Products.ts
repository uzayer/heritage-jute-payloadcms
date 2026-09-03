import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { revalidateProduct, revalidateProductDelete } from './Products/hooks/revalidateProduct'

const specificationFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'value',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'highlight',
    type: 'checkbox' as const,
    defaultValue: false,
  },
]

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'category', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Buyer-facing content',
          fields: [
            {
              name: 'overview',
              type: 'array',
              minRows: 1,
              fields: [{ name: 'paragraph', type: 'textarea', required: true }],
            },
            {
              name: 'applications',
              type: 'array',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'buyerChecklist',
              type: 'array',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'customization',
              type: 'array',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Specifications',
          fields: [
            {
              name: 'specificationGroups',
              type: 'array',
              minRows: 1,
              labels: {
                singular: 'Specification group',
                plural: 'Specification groups',
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'specifications',
                  type: 'array',
                  minRows: 1,
                  fields: specificationFields,
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              labels: {
                singular: 'Product Variant',
                plural: 'Product Variants',
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                {
                  name: 'specifications',
                  type: 'array',
                  minRows: 1,
                  fields: specificationFields,
                },
              ],
            },
          ],
        },
      ],
    },
    slugField({ useAsSlug: 'name' }),
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
}
