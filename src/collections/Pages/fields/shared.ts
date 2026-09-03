import type { ArrayField, Field, GroupField, SelectField, TextField } from 'payload'

/** The five fixed Site Pages. Each one owns a group of fields and nothing else. */
export type PageType = 'home' | 'about' | 'contact' | 'privacy' | 'terms'

/**
 * Shows a group only while the matching Site Page is being edited.
 *
 * Payload propagates `skipValidation` down from a field whose `admin.condition`
 * is false, so the `required` markers inside these groups apply to the page type
 * that owns them and are ignored on every other page.
 */
export const forPageType = (pageType: PageType): GroupField['admin'] => ({
  condition: (data) => data?.pageType === pageType,
})

/** A labelled link rendered as a button. */
export const action = (name: string, label: string): GroupField => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'label', type: 'text', required: true },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'A path such as /products, or a full https:// address.' },
    },
  ],
})

/** The icon names each section's renderer knows how to draw. */
export const iconField = (options: string[]): SelectField => ({
  name: 'icon',
  type: 'select',
  required: true,
  options: options.map((value) => ({ label: value, value })),
})

/** The small line of text above a section heading. */
export const eyebrowField = (): TextField => ({
  name: 'eyebrow',
  type: 'text',
  required: true,
  admin: { description: 'The small line above the heading.' },
})

export const headingField = (description?: string): TextField => ({
  name: 'heading',
  type: 'text',
  required: true,
  ...(description ? { admin: { description } } : {}),
})

/** The closing "get in touch" banner. Every Site Page that has one uses this shape. */
export const callToAction: GroupField = {
  name: 'cta',
  type: 'group',
  label: 'Closing call to action',
  fields: [
    headingField(),
    { name: 'description', type: 'textarea', required: true },
    action('primaryAction', 'Primary button'),
    action('secondaryAction', 'Secondary button'),
  ],
}

/**
 * The certifications section. Home and About show the same four credentials with
 * their own wording, so each page keeps its own copy rather than sharing one global.
 */
export const compliance: GroupField = {
  name: 'compliance',
  type: 'group',
  label: 'Certifications',
  fields: [
    headingField(),
    { name: 'description', type: 'textarea', required: true },
    { name: 'credentialsHeading', type: 'text', required: true },
    { name: 'credentialsDescription', type: 'textarea', required: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Certification', plural: 'Certifications' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

/** An image chosen from the Media Assets library, with the alt text it is stored with. */
export const mediaField = (name: string, label: string): Field => ({
  name,
  type: 'upload',
  label,
  relationTo: 'media',
})

export const linkedList = (name: string, fields: Field[], singular: string): ArrayField => ({
  name,
  type: 'array',
  minRows: 1,
  labels: { singular, plural: `${singular}s` },
  fields,
})
