import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateHeader } from './hooks/revalidateHeader'

/** Shared Site Content: the navigation every public page renders. */
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Site content' },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. The company name is shown when no logo is set.' },
    },
    {
      name: 'navItems',
      type: 'array',
      labels: { singular: 'Navigation item', plural: 'Navigation items' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Dropdown link', plural: 'Dropdown links' },
          admin: { description: 'Leave empty for a plain link with no dropdown.' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      required: true,
      admin: { description: 'The button at the right of the header.' },
    },
    { name: 'ctaUrl', type: 'text', required: true },
  ],
  hooks: { afterChange: [revalidateHeader] },
}
