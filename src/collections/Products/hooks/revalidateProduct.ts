import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

import type { Product } from '../../../payload-types'

const cataloguePath = '/products'

export const revalidateProduct: CollectionAfterChangeHook<Product> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  revalidatePath(cataloguePath)

  if (doc._status === 'published') {
    payload.logger.info(`Revalidating Product at path: /products/${doc.slug}`)
    revalidatePath(`/products/${doc.slug}`)
  }

  if (previousDoc?._status === 'published' && previousDoc.slug !== doc.slug) {
    revalidatePath(`/products/${previousDoc.slug}`)
  }

  return doc
}

export const revalidateProductDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(cataloguePath)
    revalidatePath(`/products/${doc.slug}`)
  }

  return doc
}
