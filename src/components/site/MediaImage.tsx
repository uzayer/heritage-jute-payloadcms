import React from 'react'

import type { Media } from '@/payload-types'

import { cn } from '@/utilities/ui'

/**
 * Renders a Media Asset chosen in the CMS.
 *
 * These are intentionally plain images: R2 serves the public Media Asset URL
 * directly, matching how Product images are rendered.
 */
export const MediaImage: React.FC<{
  alt?: string
  className?: string
  loading?: 'eager' | 'lazy'
  media?: (number | null) | Media
  ref?: React.Ref<HTMLImageElement>
}> = ({ alt, className, loading = 'lazy', media, ref }) => {
  const resource = typeof media === 'object' ? media : null

  if (!resource?.url) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? resource.alt ?? ''}
      className={cn('h-full w-full object-cover', className)}
      height={resource.height ?? undefined}
      loading={loading}
      ref={ref}
      src={resource.url}
      width={resource.width ?? undefined}
    />
  )
}
