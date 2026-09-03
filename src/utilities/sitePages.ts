import type { Page } from '@/payload-types'

import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

const findSitePage = cache(
  async (pageType: Page['pageType'], draft: boolean): Promise<Page | null> => {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      depth: 1,
      draft,
      limit: 1,
      // A buyer's own read: without this an unpublished Site Page would be served to
      // the public. In draft mode the preview route has already authenticated the
      // Site Administrator, so the same check lets their draft through.
      overrideAccess: false,
      pagination: false,
      where: { pageType: { equals: pageType } },
    })

    return pages.docs[0] ?? null
  },
)

/**
 * Reads one of the five fixed Site Pages for a public route, honouring Next's draft
 * mode so the Site Administrator can preview an unpublished change.
 */
export const getSitePage = async (pageType: Page['pageType']): Promise<Page | null> => {
  const { isEnabled } = await draftMode()

  return findSitePage(pageType, isEnabled)
}

/**
 * The same read, but throwing when the page is missing. Every public route this backs
 * is a fixed page the importer establishes, so an absent one means the database was
 * migrated without `pnpm import:marketing-site` having been run — a broken deployment
 * rather than a 404 a buyer should ever see.
 */
export const requireSitePage = async (pageType: Page['pageType']): Promise<Page> => {
  const page = await getSitePage(pageType)

  if (!page) {
    throw new Error(
      `The ${pageType} Site Page is missing or unpublished. Run \`pnpm import:marketing-site\` against this database.`,
    )
  }

  return page
}
