import type { CollectionConfig, Field } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct'

/**
 * A label/value row in a specification table. Label and value sit side by side because
 * a specification is a table row, not a paragraph: Jute Yarn alone carries fifty-one of
 * them, and stacking each pair vertically turned the Specifications tab into a tower.
 */
const specificationFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
      { name: 'value', type: 'text', required: true, admin: { width: '60%' } },
    ],
  },
  {
    name: 'highlight',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description:
        'Shades this row in the specification table. The first four highlighted rows, in the order they appear here, also fill the summary strip under the product name.',
    },
  },
]

/**
 * Specification groups and variants share this shape but are not the same thing. A group
 * is a dictionary — one product, a set of named attributes, sectioned. A variant is a row
 * in a matrix: Hessian Cloth's eight variants all carry the same six labels. They render
 * differently for that reason, as cards and as a table.
 */
const specificationTableFields: Field[] = [
  { name: 'name', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
  {
    name: 'specifications',
    type: 'array',
    minRows: 1,
    labels: { singular: 'Specification', plural: 'Specifications' },
    admin: {
      components: { RowLabel: '@/components/admin/RowLabels#SpecificationRowLabel' },
    },
    fields: specificationFields,
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
    defaultColumns: ['name', 'image', 'category', '_status', 'updatedAt'],
    group: 'Product Catalog',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          collection: 'products',
          req,
          slug: data?.slug,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        collection: 'products',
        req,
        slug: data?.slug as string,
      }),
    useAsTitle: 'name',
  },
  fields: [
    // Short, at-a-glance fields live in the sidebar so the main column keeps its width
    // for the specification tables, which need it.
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      admin: {
        description: 'Decides which section of the catalogue page this product appears under.',
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Used on the catalogue card, the product hero, and link previews.',
        position: 'sidebar',
      },
    },
    slugField({ useAsSlug: 'name' }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product',
          description: 'What this product is. Written once, rarely changed.',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'One sentence. Shown under the product name, on the catalogue card, and as the search-result description.',
              },
            },
            {
              name: 'overview',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Paragraph', plural: 'Paragraphs' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabels#OverviewRowLabel' },
                description: 'Rendered in order as the Product Overview section.',
              },
              fields: [{ name: 'paragraph', type: 'textarea', required: true }],
            },
          ],
        },
        {
          label: 'Selling points',
          description: 'The three short lists either side of the overview.',
          fields: [
            {
              name: 'applications',
              type: 'text',
              hasMany: true,
              admin: { description: 'What buyers use this product for.' },
            },
            {
              name: 'buyerChecklist',
              type: 'text',
              hasMany: true,
              admin: { description: 'What a buyer should settle before asking for a price.' },
            },
            {
              name: 'customization',
              type: 'text',
              hasMany: true,
              admin: { description: 'What can be changed to order. Hidden when empty.' },
            },
          ],
        },
        {
          label: 'Specifications',
          description:
            'Attributes of the product itself. Shared trade terms — Incoterms, payment, lead times, port of loading — are held once under Site content → Company details and appended to every product automatically.',
          fields: [
            {
              name: 'specificationGroups',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Specification group', plural: 'Specification groups' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabels#NamedRowLabel' },
                initCollapsed: true,
              },
              fields: specificationTableFields,
            },
          ],
        },
        {
          label: 'Variants',
          description:
            'The range or size table. Every variant of a product should carry the same specification labels so the table reads as columns.',
          fields: [
            {
              name: 'variants',
              type: 'array',
              labels: { singular: 'Variant', plural: 'Variants' },
              admin: {
                components: { RowLabel: '@/components/admin/RowLabels#NamedRowLabel' },
                initCollapsed: true,
              },
              fields: specificationTableFields,
            },
          ],
        },
      ],
    },
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
