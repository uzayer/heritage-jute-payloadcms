import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import {
  revalidateProductCategory,
  revalidateProductCategoryDelete,
} from './hooks/revalidateProductCategory'

/**
 * The catalogue taxonomy. This used to live as a hard-coded array in
 * `ProductCategoryGrid`, mirroring Astro's `categories.json`, which meant a product
 * whose free-text category did not match a name character for character silently
 * vanished from `/products`. Products now point at these documents instead.
 *
 * The slug doubles as the section anchor on `/products` (`/products#raw-materials`),
 * which the header navigation links to — so renaming a slug breaks those links.
 */
export const ProductCategories: CollectionConfig<'product-categories'> = {
  slug: 'product-categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'order', 'slug', 'updatedAt'],
    group: 'Product Catalog',
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Product category',
    plural: 'Product categories',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'The heading shown above this section on the catalogue page.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'One or two sentences below the heading. Shown only on the catalogue page.',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Sections run low to high on the catalogue page.',
        position: 'sidebar',
        step: 1,
      },
    },
    slugField({ useAsSlug: 'title' }),
  ],
  hooks: {
    afterChange: [revalidateProductCategory],
    afterDelete: [revalidateProductCategoryDelete],
  },
}
