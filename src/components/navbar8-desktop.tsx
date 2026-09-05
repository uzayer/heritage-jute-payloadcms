'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'

import { buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
      <NavigationMenuList className="gap-3 xl:gap-6">
        {navItems.map((item) => (
          <DesktopMenuItem item={item} key={item.id ?? item.url} pathname={pathname} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function DesktopMenuItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(`${item.url}/`))

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={triggerClassName}>
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
