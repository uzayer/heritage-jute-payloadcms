import Link from 'next/link'
import React from 'react'

import { Action } from '@/components/site/Action'
import { MediaImage } from '@/components/site/MediaImage'
import { Navbar8Desktop } from '@/components/navbar8-desktop'
import { Navbar8Mobile } from '@/components/navbar8-mobile'
import { getCachedGlobal } from '@/utilities/getGlobals'

/**
 * The shared public navigation: a desktop mega-menu with dropdown thumbnails and a
 * mobile slide-down sheet with a grouped "Company" section, both fed by the Header
 * and Company globals so editors can change the whole site's navigation from the CMS.
 */
export async function Header() {
  const [header, company] = await Promise.all([
    getCachedGlobal('header', 2)(),
    getCachedGlobal('company')(),
  ])

  const navItems = header.navItems ?? []
  const mobileGroups = header.mobileGroups ?? []
  const socialLinks = (company.socialLinks ?? []).map(({ network, url }) => ({ label: network, url }))

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="container">
        <div className="flex items-center justify-between gap-3.5 py-4">
          <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground sm:text-lg">
            {header.logo ? (
              <MediaImage alt={company.name} className="h-11 w-auto object-contain sm:h-12" loading="eager" media={header.logo} />
            ) : (
              company.name
            )}
          </Link>

          <nav aria-label="Main navigation">
            <Navbar8Desktop navItems={navItems} />
          </nav>
          <div className="flex items-center gap-3.5">
            <Action
              action={{ label: header.ctaLabel, url: header.ctaUrl }}
              className="hidden h-10 rounded-[0.95rem] px-4 text-sm font-medium sm:inline-flex"
              size="sm"
            />
            <Navbar8Mobile mobileGroups={mobileGroups} socialLinks={socialLinks} />
          </div>
        </div>
      </div>
    </header>
  )
}
