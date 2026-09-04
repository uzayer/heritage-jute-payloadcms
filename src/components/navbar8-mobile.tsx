'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle } from '@/components/ui/sheet'

type MobileGroup = NonNullable<Header['mobileGroups']>[number]

const MOBILE_BREAKPOINT = 1024

export function Navbar8Mobile({
  mobileGroups,
  socialLinks,
}: {
  mobileGroups: MobileGroup[]
  socialLinks: { label: string; url: string }[]
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  return (
    <>
      <div className="lg:hidden">
        <Button onClick={() => setOpen((value) => !value)} size="icon" variant="ghost">
          <Menu className="size-5.5" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetContent
          aria-describedby={undefined}
          className="inset-0 z-600 h-dvh w-full bg-primary text-primary-foreground [&>button]:hidden"
          side="top"
        >
          <div className="flex-1 overflow-y-auto">
            <div className="container pb-12">
              <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
                <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
              </div>
              <div className="flex justify-end pt-5">
                <SheetClose asChild>
                  <Button className="size-9 rounded-full bg-muted/20 hover:bg-muted/20" size="icon">
                    <X className="size-5.5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
              <div className="mt-16 grid gap-10 sm:grid-cols-2">
                {mobileGroups.map((group) => (
                  <MobileMenuItem group={group} key={group.id ?? group.title} />
                ))}
              </div>
              {socialLinks.length > 0 ? (
                <div className="mt-auto pt-10">
                  <div className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">Social</div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {socialLinks.map((link) => (
                      <a
                        aria-label={`${link.label} (opens in a new tab)`}
                        className="text-sm font-medium text-primary-foreground/88 underline-offset-4 hover:text-white hover:underline"
                        href={link.url}
                        key={link.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

function MobileMenuItem({ group }: { group: MobileGroup }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">{group.title}</div>
        {group.url ? (
          <SheetClose asChild>
            <Link
              className="text-xs font-semibold tracking-[0.16em] text-primary-foreground/88 uppercase underline-offset-4 hover:text-white hover:underline"
              href={group.url}
            >
              See all
            </Link>
          </SheetClose>
        ) : null}
      </div>
      <ul className="flex flex-col gap-3">
        {group.links?.map((link) => (
          <li key={link.id ?? link.url}>
            <SheetClose asChild>
              <Link
                className="block rounded-[1rem] px-4 py-3 text-base font-medium text-primary-foreground/92 hover:bg-white/10 hover:text-white sm:text-lg"
                href={link.url}
              >
                {link.label}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </div>
  )
}
