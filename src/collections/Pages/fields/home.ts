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

const rangeIcons = ['wheat', 'scissors', 'layers', 'shopping-bag', 'archive', 'settings-2']

/** The Home Site Page, section by section in the order buyers read them. */
export const home: GroupField = {
  name: 'home',
  type: 'group',
  label: 'Home page',
  admin: forPageType('home'),
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        eyebrowField(),
        headingField(),
        { name: 'subtext', type: 'textarea', required: true },
        action('primaryAction', 'Primary button'),
        action('secondaryAction', 'Secondary button'),
      ],
    },
    {
      name: 'productRange',
      type: 'group',
      label: 'Product range',
      fields: [
        headingField(),
        { name: 'lede', type: 'textarea', required: true },
        mediaField('image', 'Section image'),
        linkedList(
          'items',
          [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            iconField(rangeIcons),
          ],
          'Range item',
        ),
      ],
    },
    {
      name: 'globalReach',
      type: 'group',
      label: 'Global reach',
      fields: [
        eyebrowField(),
        headingField(),
        { name: 'description', type: 'textarea', required: true },
        mediaField('mapImage', 'Map image'),
        linkedList(
          'stats',
          [
            { name: 'value', type: 'text', required: true },
            {
              name: 'suffix',
              type: 'text',
              admin: { description: 'Shown after the number, such as "countries".' },
            },
            {
              name: 'descriptionLead',
              type: 'text',
              required: true,
              admin: { description: 'The emphasised opening of the caption.' },
            },
            {
              name: 'descriptionRest',
              type: 'text',
              admin: { description: 'The rest of the caption, in normal weight.' },
            },
          ],
          'Statistic',
        ),
      ],
    },
    {
      name: 'ordering',
      type: 'group',
      label: 'How ordering works',
      fields: [
        headingField(),
        { name: 'firstParagraph', type: 'textarea', required: true },
        {
          name: 'secondParagraphPrefix',
          type: 'text',
          required: true,
          admin: { description: 'Text before the emphasised phrase.' },
        },
        {
          name: 'secondParagraphEmphasis',
          type: 'text',
          required: true,
          admin: { description: 'The phrase shown in bold.' },
        },
        {
          name: 'secondParagraphSuffix',
          type: 'text',
          required: true,
          admin: { description: 'Text after the emphasised phrase.' },
        },
        action('primaryAction', 'Button'),
      ],
    },
    compliance,
    {
      name: 'countries',
      type: 'group',
      label: 'Export countries',
      fields: [
        eyebrowField(),
        headingField(),
        { name: 'description', type: 'textarea', required: true },
        linkedList(
          'regions',
          [
            { name: 'label', type: 'text', required: true },
            linkedList(
              'countries',
              [
                { name: 'flag', type: 'text', required: true },
                { name: 'name', type: 'text', required: true },
              ],
              'Country',
            ),
          ],
          'Region',
        ),
      ],
    },
    {
      name: 'faqs',
      type: 'group',
      label: 'Buyer questions',
      fields: [
        headingField(),
        { name: 'intro', type: 'textarea', required: true },
        linkedList(
          'items',
          [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
          'Question',
        ),
      ],
    },
    callToAction,
  ],
}
