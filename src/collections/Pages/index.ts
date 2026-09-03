import type { CollectionConfig } from 'payload'

import type { Page } from '@/payload-types'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { about } from './fields/about'
import { home } from './fields/home'
import { contact, legal } from './fields/utility'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { sitePagePaths } from './paths'

/**
 * Where the admin's Preview and Live Preview send the Site Administrator. Fixed Site
 * Pages are served from their own routes rather than one `[slug]` route, so the path
 * comes from the page type instead of the slug.
 */
const previewPath = (data: Partial<Page>) => {
  const path = data.pageType ? sitePagePaths[data.pageType] : null

  if (!path) return null

  return `/next/preview?${new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }).toString()}`
}

/**
 * Fixed-purpose Site Pages, deliberately not a page builder: the Site Administrator
 * edits the copy inside a structure the public routes already know how to render,
 * and cannot rearrange or delete the sections those routes depend on.
 */
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'pageType', '_status', 'updatedAt'],
    description: 'The five fixed marketing pages. Each has its own form.',
    livePreview: { url: ({ data }) => previewPath(data as Partial<Page>) },
    preview: (data) => previewPath(data as Partial<Page>),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'pageType',
      type: 'select',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'Decides which form appears below and which public path this page is served from.',
      },
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Privacy policy', value: 'privacy' },
        { label: 'Terms of use', value: 'terms' },
      ],
    },
    {
      // Not `required`: the field is read-only, so the admin's create form would fail
      // its own client-side check before the hook below ever runs. The hook fills it on
      // every write, and `pageType` is required and unique, so it cannot end up empty.
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Set from the page type. Public paths never change by accident.',
      },
      hooks: {
        beforeValidate: [({ data, value }) => data?.pageType ?? value],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'The browser tab and search result title.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'The search result and social share summary.' },
    },
    {
      name: 'shareImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional. Overrides the default image used when this page is shared.',
      },
    },
    home,
    about,
    contact,
    legal,
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
