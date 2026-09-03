import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Company details reach the header, the footer, and the structured data in the layout,
 * so the whole shell is revalidated alongside the cached global itself.
 */
export const revalidateCompany: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating company details`)

    revalidateTag('global_company', 'max')
    revalidatePath('/', 'layout')
  }

  return doc
}
