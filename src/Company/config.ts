import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

import { revalidateCompany } from './hooks/revalidateCompany'

/**
 * Heritage Jute's own details. Shared Site Content: the header, footer, contact page,
 * and the structured data every page publishes all read from here, so the address and
 * phone number are written down once.
 */
export const Company: GlobalConfig = {
  slug: 'company',
  label: 'Company details',
  access: { read: () => true, update: authenticated },
  admin: { group: 'Site content' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences. Used in the footer and in search results.' },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text', required: true },
        { name: 'line2', type: 'text', required: true },
        { name: 'locality', type: 'text', required: true },
        { name: 'postalCode', type: 'text', required: true },
        {
          name: 'countryCode',
          type: 'text',
          required: true,
          admin: { description: 'Two-letter country code, such as BD.' },
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: { description: 'As buyers should read it, such as +880 1841-111625.' },
    },
    {
      name: 'phoneE164',
      type: 'text',
      required: true,
      admin: { description: 'Digits only with the country code, for dial links: +8801841111625.' },
    },
    { name: 'email', type: 'email', required: true },
    {
      name: 'website',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'whatsappUrl', type: 'text', required: true },
    {
      name: 'socialLinks',
      type: 'array',
      labels: { singular: 'Social link', plural: 'Social links' },
      fields: [
        {
          name: 'network',
          type: 'select',
          required: true,
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'X (Twitter)', value: 'twitter' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'tradeTerms',
      type: 'array',
      labels: { singular: 'Trade term', plural: 'Trade terms' },
      admin: {
        components: { RowLabel: '@/components/admin/RowLabels#SpecificationRowLabel' },
        description:
          'Terms that are the same for every product — Incoterms, payment, lead times, port of loading. These were repeated on all eleven product documents; they are written down once here and appended to every product specification sheet.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'value', type: 'text', required: true, admin: { width: '60%' } },
          ],
        },
      ],
    },
  ],
  hooks: { afterChange: [revalidateCompany] },
}
