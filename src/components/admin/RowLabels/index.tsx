'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

/**
 * Array rows in Payload default to a positional label — "Product Variant 01", and so on
 * up to 19 on Jute Yarn — which makes a collapsed list unreadable and, in practice, led
 * to the same specification being entered twice on ten of the eleven products. Every
 * repeating row below labels itself from its own content instead.
 */

const fallback = (singular: string, rowNumber?: number) =>
  `${singular} ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max).trimEnd()}…` : text

export const NamedRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()

  return <span>{data?.name?.trim() || fallback('Row', rowNumber)}</span>
}

export const SpecificationRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{
    highlight?: boolean
    label?: string
    value?: string
  }>()

  const label = data?.label?.trim()
  const value = data?.value?.trim()

  if (!label) return <span>{fallback('Specification', rowNumber)}</span>

  return (
    <span>
      {data?.highlight ? '★ ' : ''}
      {label}
      {value ? ` — ${truncate(value, 48)}` : ''}
    </span>
  )
}

export const OverviewRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{ paragraph?: string }>()

  const paragraph = data?.paragraph?.trim()

  return <span>{paragraph ? truncate(paragraph, 70) : fallback('Paragraph', rowNumber)}</span>
}
