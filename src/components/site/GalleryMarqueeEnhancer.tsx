'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

import type { Page } from '@/payload-types'

type GalleryImages = NonNullable<NonNullable<Page['about']>['gallery']['images']>

// Embla and its auto-scroll plugin are useful only after this below-the-fold
// enhancement is eligible. Keeping them in this chunk removes them from the
// initial About-page client bundle and avoids work for reduced-motion users.
const GalleryMarqueeCarousel = dynamic(
  () => import('./GalleryMarqueeCarousel').then((module) => module.GalleryMarqueeCarousel),
  { ssr: false },
)

export function GalleryMarqueeEnhancer({ images }: { images: GalleryImages }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mountNode = mountRef.current
    if (!mountNode) return

    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const staticFallback = mountNode.previousElementSibling as HTMLElement | null

    const updateEnabled = (isIntersecting: boolean) => {
      const canEnhance = isIntersecting && mediaQuery.matches && !motionQuery.matches
      setEnabled(canEnhance)

      if (staticFallback) {
        staticFallback.classList.toggle('pointer-events-none', canEnhance)
        staticFallback.classList.toggle('opacity-0', canEnhance)
        staticFallback.setAttribute('aria-hidden', canEnhance ? 'true' : 'false')
      }
    }

    const observer = new IntersectionObserver(([entry]) => updateEnabled(entry.isIntersecting), {
      rootMargin: '200px 0px',
    })

    observer.observe(mountNode)

    const handleChange = () => {
      const entry = mountNode.getBoundingClientRect()
      const inView = entry.top < window.innerHeight + 200 && entry.bottom > -200
      updateEnabled(inView)
    }

    mediaQuery.addEventListener('change', handleChange)
    motionQuery.addEventListener('change', handleChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleChange)
      motionQuery.removeEventListener('change', handleChange)

      if (staticFallback) {
        staticFallback.classList.remove('pointer-events-none', 'opacity-0')
        staticFallback.setAttribute('aria-hidden', 'false')
      }
    }
  }, [])

  return (
    <div ref={mountRef} className="absolute inset-0 hidden md:block">
      {enabled ? <GalleryMarqueeCarousel images={images} /> : null}
    </div>
  )
}
