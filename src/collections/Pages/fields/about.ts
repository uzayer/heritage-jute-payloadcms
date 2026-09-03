import type { GroupField } from 'payload'

import {
  action,
  callToAction,
  compliance,
  eyebrowField,
  forPageType,
  headingField,
  iconField,
  linkedList,
  mediaField,
} from './shared'

const reasonIcons = ['award', 'factory', 'settings-2', 'truck', 'shield', 'globe']

/** The About Site Page, section by section in the order buyers read them. */
export const about: GroupField = {
  name: 'about',
  type: 'group',
  label: 'About page',
  admin: forPageType('about'),
  fields: [
    {
      name: 'intro',
      type: 'group',
      label: 'Introduction',
      fields: [
        eyebrowField(),
        headingField(),
        { name: 'description', type: 'textarea', required: true },
        mediaField('mainImage', 'Main image'),
        mediaField('secondaryImage', 'Secondary image'),
        {
          name: 'breakout',
          type: 'group',
          label: 'Highlight panel',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            action('primaryAction', 'Button'),
          ],
        },
        { name: 'achievementsHeading', type: 'text', required: true },
        { name: 'achievementsDescription', type: 'textarea', required: true },
        linkedList(
          'achievements',
          [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
          'Achievement',
        ),
        linkedList(
          'sections',
          [
            { name: 'title', type: 'text', required: true },
            {
              name: 'content',
              type: 'textarea',
              required: true,
              admin: { description: 'Leave a blank line between paragraphs.' },
            },
          ],
          'Written section',
        ),
      ],
    },
    {
      name: 'gallery',
      type: 'group',
      label: 'Product gallery',
      fields: [
        headingField(),
        action('primaryAction', 'Link below the heading'),
        {
          name: 'images',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Gallery image', plural: 'Gallery images' },
          fields: [mediaField('image', 'Image')],
        },
      ],
    },
    {
      name: 'numbers',
      type: 'group',
      label: 'Heritage Jute in numbers',
      fields: [
        headingField(),
        {
          name: 'descriptionPrefix',
          type: 'text',
          required: true,
          admin: { description: 'Text before the emphasised phrase.' },
        },
        {
          name: 'descriptionEmphasis',
          type: 'text',
          required: true,
          admin: { description: 'The phrase shown in bold.' },
        },
        {
          name: 'descriptionSuffix',
          type: 'text',
          admin: { description: 'Text after the emphasised phrase.' },
        },
        { name: 'introText', type: 'textarea', required: true },
        linkedList(
          'stats',
          [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
          'Statistic',
        ),
        {
          name: 'testimonial',
          type: 'group',
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'author', type: 'text', required: true },
            { name: 'role', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'reasons',
      type: 'group',
      label: 'Why partner with Heritage Jute',
      fields: [
        headingField(),
        { name: 'description', type: 'textarea', required: true },
        linkedList(
          'items',
          [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            iconField(reasonIcons),
          ],
          'Reason',
        ),
      ],
    },
    compliance,
    callToAction,
  ],
}
