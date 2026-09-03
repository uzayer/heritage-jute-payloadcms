import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateFooter } from './hooks/revalidateFooter'

/**
 * Shared Site Content: the footer every public page renders. The company address,
 * phone, and email come from Company details rather than being repeated here.
 */
export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Site content' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Footer column', plural: 'Footer columns' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'credentials',
      type: 'text',
      required: true,
      admin: { description: 'The certification line shown beside the copyright notice.' },
    },
  ],
  hooks: { afterChange: [revalidateFooter] },
}
