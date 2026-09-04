import Link from 'next/link'
import React from 'react'

import { buttonVariants, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type SiteAction = { label: string; url: string }

const isExternal = (url: string) => /^(https?:)?\/\/|^mailto:|^tel:/.test(url)

/**
 * A call-to-action button. Site Administrators enter either a site path or a full
 * address, so the destination decides whether this is a routed link or a plain one.
 */
export const Action: React.FC<{
  action?: SiteAction | null
  children?: React.ReactNode
  className?: string
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
}> = ({ action, children, className, size = 'lg', variant = 'default' }) => {
  if (!action?.url) return null

  const classes = cn(buttonVariants({ size, variant }), className)

  if (isExternal(action.url)) {
    return (
      <a className={classes} href={action.url} rel="noreferrer" target="_blank">
        <span>{action.label}</span>
        <span className="sr-only"> (opens in a new tab)</span>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} href={action.url}>
      <span>{action.label}</span>
      {children}
    </Link>
  )
}
