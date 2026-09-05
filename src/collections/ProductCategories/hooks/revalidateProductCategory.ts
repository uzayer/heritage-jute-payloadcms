import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { ProductCategory } from '../../../payload-types'

const cataloguePath = '/products'

/**
 * The catalogue page groups products into category sections, so a category edit
 * changes that page even though no product document was touched.
 */
const revalidateCatalogue = () => {
  revalidatePath(cataloguePath)
  revalidateTag('products', 'max')
  revalidateTag('product-categories', 'max')
}

export const revalidateProductCategory: CollectionAfterChangeHook<ProductCategory> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) revalidateCatalogue()

  return doc
}

export const revalidateProductCategoryDelete: CollectionAfterDeleteHook<ProductCategory> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) revalidateCatalogue()

  return doc
}
