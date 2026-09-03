import type { Page } from '@/payload-types'

/**
 * The public path each fixed Site Page is served from.
 *
 * Deliberately free of imports: both the Payload config and the public routes read it,
 * so it must not pull the config back in through a utility.
 */
export const sitePagePaths: Record<Page['pageType'], string> = {
  home: '/',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
}
