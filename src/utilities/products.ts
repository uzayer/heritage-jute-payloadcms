import { cache } from 'react'
import { unstable_cache } from 'next/cache'
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

const findPublishedProductBySlug = async (slug: string) => {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    depth: 1,
    draft: false,
    limit: 1,
    overrideAccess: false,
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

const getCachedPublishedProductBySlug = unstable_cache(findPublishedProductBySlug, ['published-product-by-slug'], {
  tags: ['products'],
})

export const getPublishedProducts = cache(getCachedPublishedProducts)
export const getPublishedProductBySlug = cache(getCachedPublishedProductBySlug)
