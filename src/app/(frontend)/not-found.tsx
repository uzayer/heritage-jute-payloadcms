import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  robots: { follow: false, index: false },
  title: 'Page Not Found — Heritage Jute Fibers',
}

export default function NotFound() {
  return (
    <div className="container max-w-6xl py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
