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
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Thumbnail shown next to this link in the dropdown.' },
            },
          ],
        },
      ],
    },
    {
      name: 'mobileGroups',
      type: 'array',
      labels: { singular: 'Mobile navigation group', plural: 'Mobile navigation groups' },
      admin: {
        description:
          'The grouped links shown in the mobile menu (e.g. "Company" grouping About/Certifications/Contact). Rendered instead of navItems on small screens.',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text' },
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
      name: 'ctaLabel',
      type: 'text',
      required: true,
      admin: { description: 'The button at the right of the header.' },
    },
    { name: 'ctaUrl', type: 'text', required: true },
  ],
  hooks: { afterChange: [revalidateHeader] },
}
