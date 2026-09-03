import { cache } from 'react'
import { getPayload } from 'payload'

import config from '@payload-config'

export const getPublishedProducts = cache(async () => {
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
})

export const getPublishedProductBySlug = cache(async (slug: string) => {
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
})
