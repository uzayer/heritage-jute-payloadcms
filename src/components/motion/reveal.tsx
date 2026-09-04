'use client'

import * as React from 'react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Animation direction. `none` will only fade. */
  direction?: RevealDirection
  /** Distance in pixels for directional offset. */
  distance?: number
  /** Delay in seconds. */
  delay?: number
  /** Only animate once when entering viewport. */
  once?: boolean
  /**
   * How much of the element should be visible before triggering.
   * Use a number (0..1) or `"some"` / `"all"`.
   */
  amount?: number | 'some' | 'all'
  /** Root margin for viewport trigger, e.g. `"-80px 0px"`. */
  margin?: string
  /**
   * When set (> 0), each direct child is wrapped with staggered animation
   * (seconds between children).
   */
  stagger?: number
  /** Extra delay before the stagger sequence starts (seconds). */
  staggerDelay?: number
  /**
   * When true, skip all animation and render children immediately.
   * Use for above-the-fold content to avoid hiding LCP elements.
   */
  eager?: boolean
}

function getOffset(direction: RevealDirection, distance: number): string {
  switch (direction) {
    case 'up':
      return `translateY(${distance}px)`
    case 'down':
      return `translateY(-${distance}px)`
    case 'left':
      return `translateX(${distance}px)`
    case 'right':
      return `translateX(-${distance}px)`
    case 'none':
    default:
      return 'none'
  }
}

export function Reveal({
  children,
  className,
  direction = 'up',
  distance = 16,
  delay = 0,
  once = true,
  amount = 'some',
  margin = '-80px 0px',
  stagger,
  staggerDelay = 0,
  eager = false,
}: RevealProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const threshold = typeof amount === 'number' ? amount : amount === 'all' ? 1 : 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = 'visible'
          // :scope > ensures only direct child wrappers are updated,
          // not any nested Reveal components deeper in the tree.
          el.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((child) => {
            child.dataset.reveal = 'visible'
          })
          if (once) observer.disconnect()
        }
      },
      { rootMargin: margin, threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, amount, margin])

  if (eager) {
    return <div className={className}>{children}</div>
  }

  const offset = getOffset(direction, distance)

  if (stagger && stagger > 0) {
    return (
      <div ref={rootRef} className={className}>
        {React.Children.map(children, (child, i) => {
          const key =
            React.isValidElement(child) && child.key != null ? String(child.key) : `reveal-stagger-${i}`
          return (
            <div
              key={key}
              data-reveal="hidden"
              style={
                {
                  '--reveal-delay': `${staggerDelay + delay + i * stagger}s`,
                  '--reveal-offset': offset,
                } as React.CSSProperties
              }
            >
              {child}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      data-reveal="hidden"
      className={className}
      style={
        {
          '--reveal-delay': `${delay}s`,
          '--reveal-offset': offset,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}
