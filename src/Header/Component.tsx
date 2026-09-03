import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Action } from '@/components/site/Action'
import { MediaImage } from '@/components/site/MediaImage'
import { getCachedGlobal } from '@/utilities/getGlobals'

/**
 * The shared public navigation.
 *
 * Dropdown links are rendered inside a `<details>` element rather than a hydrated
 * menu: the whole marketing shell is a server component, and a disclosure gives
 * keyboard and touch users the same behaviour with no client JavaScript.
 */
export async function Header() {
  const [header, company] = await Promise.all([
    getCachedGlobal('header', 1)(),
    getCachedGlobal('company')(),
  ])

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-2 text-base font-bold tracking-tight text-emerald-950 sm:text-lg"
          href="/"
        >
          {header.logo ? (
            <MediaImage
              alt={company.name}
              className="h-8 w-auto object-contain"
              loading="eager"
              media={header.logo}
            />
          ) : (
            company.name
          )}
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
          {header.navItems?.map((item) =>
            item.links?.length ? (
              <details className="group relative" key={item.id ?? item.url} name="site-nav">
                <summary className="cursor-pointer list-none rounded px-2 py-1 text-sm font-medium text-stone-700 marker:content-none hover:text-emerald-800">
                  {item.label}
                </summary>
                <div className="absolute right-0 z-40 mt-2 w-72 rounded-xl border border-stone-200 bg-white p-2 shadow-lg sm:left-0 sm:right-auto">
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-stone-50"
                    href={item.url}
                  >
                    All {item.label.toLowerCase()}
                  </Link>
                  {item.links.map((link) => (
                    <Link
                      className="block rounded-lg px-3 py-2 hover:bg-stone-50"
                      href={link.url}
                      key={link.id ?? link.url}
                    >
                      <span className="text-sm font-medium text-stone-900">{link.label}</span>
                      {link.description ? (
                        <span className="mt-1 block text-xs leading-5 text-stone-600">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                className="rounded px-2 py-1 text-sm font-medium text-stone-700 hover:text-emerald-800"
                href={item.url}
                key={item.id ?? item.url}
              >
                {item.label}
              </Link>
            ),
          )}

          <Action
            action={{ label: header.ctaLabel, url: header.ctaUrl }}
            className="hidden px-4 py-2 text-sm sm:inline-flex"
          >
            <MessageCircle aria-hidden className="size-4" />
          </Action>
        </nav>
      </div>
    </header>
  )
}
