import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type SiteAction = { label: string; url: string }

const styles = {
  primary:
    'bg-emerald-800 text-white transition hover:bg-emerald-700 focus-visible:outline-emerald-700',
  secondary:
    'border border-emerald-800 text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-emerald-700',
  inverse: 'border border-white/30 text-white transition hover:bg-white/10',
  light: 'bg-white text-emerald-950 transition hover:bg-stone-100',
}

const isExternal = (url: string) => /^(https?:)?\/\/|^mailto:|^tel:/.test(url)

/**
 * A call-to-action button. Site Administrators enter either a site path or a full
 * address, so the destination decides whether this is a routed link or a plain one.
 */
export const Action: React.FC<{
  action?: SiteAction | null
  children?: React.ReactNode
  className?: string
  variant?: keyof typeof styles
}> = ({ action, children, className, variant = 'primary' }) => {
  if (!action?.url) return null

  const classes = cn(
    'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:text-base',
    styles[variant],
    className,
  )

  if (isExternal(action.url)) {
    return (
      <a className={classes} href={action.url} rel="noreferrer" target="_blank">
        {action.label}
        <span className="sr-only"> (opens in a new tab)</span>
        {children}
      </a>
    )
  }

  return (
    <Link className={classes} href={action.url}>
      {action.label}
      {children}
    </Link>
  )
}
