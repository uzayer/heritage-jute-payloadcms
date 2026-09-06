import type { GroupField } from 'payload'

import { forPageType, headingField, linkedList } from './shared'

/** The Contact Site Page. The inquiry itself is delivered by Resend, not stored here. */
export const contact: GroupField = {
  name: 'contact',
  type: 'group',
  label: 'Contact page',
  admin: forPageType('contact'),
  fields: [
    headingField(),
    { name: 'intro', type: 'textarea', required: true },
    {
      name: 'officeHeading',
      type: 'text',
      required: true,
      admin: { description: 'Heading above the postal address.' },
    },
    {
      name: 'contactHeading',
      type: 'text',
      required: true,
      admin: { description: 'Heading above the phone, email, and website links.' },
    },
    {
      name: 'socialHeading',
      type: 'text',
      required: true,
      admin: { description: 'Heading above the social links.' },
    },
    {
      name: 'form',
      type: 'group',
      label: 'Inquiry form',
      fields: [
        headingField(),
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          admin: { description: 'The prompt shown above the form fields.' },
        },
        { name: 'submitLabel', type: 'text', required: true },
        { name: 'submittingLabel', type: 'text', required: true },
        {
          name: 'successMessage',
          type: 'text',
          required: true,
          admin: { description: 'Shown after an inquiry is delivered.' },
        },
        {
          name: 'errorMessage',
          type: 'text',
          required: true,
          admin: { description: 'Shown when an inquiry could not be delivered.' },
        },
        linkedList(
          'incoterms',
          [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
          'Incoterm option',
        ),
      ],
    },
  ],
}

/** Privacy and Terms. Both are one dated body of prose. */
export const legal: GroupField = {
  name: 'legal',
  type: 'group',
  label: 'Legal content',
  admin: {
    condition: (data) => data?.pageType === 'privacy' || data?.pageType === 'terms',
  },
  fields: [
    {
      name: 'updated',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
    { name: 'content', type: 'richText', required: true },
  ],
}
