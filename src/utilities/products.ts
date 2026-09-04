import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'

const findPublishedProducts = async () => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'products',
    depth: 1,
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    sort: 'name',
  })
}

const findProductBySlug = async (slug: string, draft: boolean) => {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft,
    limit: 1,
    // Draft mode is only enabled by the authenticated preview route. It can therefore
    // bypass the public-only read constraint without exposing drafts to buyers.
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return products.docs[0] ?? null
}

// Product data is public and read on several routes. Pair the shared data cache
// with React.cache below: the former avoids repeat database reads across requests,
// while the latter also deduplicates metadata and page rendering in one request.
const getCachedPublishedProducts = unstable_cache(findPublishedProducts, ['published-products'], {
  tags: ['products'],
})

const getCachedPublishedProductBySlug = unstable_cache(
  (slug: string) => findProductBySlug(slug, false),
  ['published-product-by-slug'],
  { tags: ['products'] },
)

export const getPublishedProducts = cache(getCachedPublishedProducts)
export const getProductBySlug = cache(async (slug: string, draft?: boolean) => {
  const isDraft = draft ?? (await draftMode()).isEnabled

  return isDraft ? findProductBySlug(slug, true) : getCachedPublishedProductBySlug(slug)
})
