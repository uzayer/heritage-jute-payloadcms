'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'

import { MediaImage } from '@/components/site/MediaImage'
import { buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

type NavItem = NonNullable<Header['navItems']>[number]

const triggerClassName = cn(
  buttonVariants({ size: 'sm', variant: 'ghost' }),
  'relative h-10 rounded-[0.95rem] px-4 text-sm font-medium [&_svg]:hidden',
)

export function Navbar8Desktop({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        {navItems.map((item) => (
          <DesktopMenuItem item={item} key={item.id ?? item.url} pathname={pathname} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function DesktopMenuItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(`${item.url}/`))

  if (item.links?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className={triggerClassName}>
          <span className="relative">
            {item.label}
            {isActive ? (
              <span className="pointer-events-none absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-primary" />
            ) : null}
          </span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:bg-transparent group-data-[viewport=false]/navigation-menu:p-0 group-data-[viewport=false]/navigation-menu:shadow-none group-data-[viewport=false]/navigation-menu:ring-0">
          <div className="w-[46rem] rounded-[1.6rem] border border-border/80 bg-background/98 p-4 shadow-[0_24px_60px_rgba(71,48,29,0.18)]">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
              <NavigationMenuLink asChild className="rounded-md p-0 px-2 py-1 text-sm font-medium text-primary underline-offset-4 hover:bg-transparent hover:underline">
                <Link href={item.url}>Browse all</Link>
              </NavigationMenuLink>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {item.links.map((link) => (
                <NavigationMenuLink asChild key={link.id ?? link.url}>
                  <Link
                    className="flex gap-4 rounded-[1.15rem] border border-border/80 bg-card/92 p-3 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-card/92 hover:shadow-[0_18px_42px_rgba(92,60,35,0.12)]"
                    href={link.url}
                  >
                    <MediaImage
                      alt={link.label}
                      className="size-24 shrink-0 rounded-[0.9rem] object-cover"
                      loading="lazy"
                      media={link.image}
                    />
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-foreground">{link.label}</span>
                      <span className="text-sm leading-snug text-muted-foreground">{link.description}</span>
                    </span>
                  </Link>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={cn(triggerClassName, 'p-0')}>
        <Link href={item.url}>
          <span className="relative">
            {item.label}
            {isActive ? (
              <span className="pointer-events-none absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-primary" />
            ) : null}
          </span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
