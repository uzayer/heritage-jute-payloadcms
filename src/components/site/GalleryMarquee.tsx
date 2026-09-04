import type { Page } from '@/payload-types'

import { MediaImage } from './MediaImage'
import { GalleryMarqueeEnhancer } from './GalleryMarqueeEnhancer'

type GalleryImages = NonNullable<NonNullable<Page['about']>['gallery']['images']>

/**
 * A static, always-visible image strip with a JS-enhanced auto-scrolling carousel
 * layered on top for wide, motion-friendly viewports. The static strip stays in the
 * DOM as the accessible fallback — `GalleryMarqueeEnhancer` only hides it once the
 * carousel actually takes over.
 */
export const GalleryMarquee: React.FC<{ images: GalleryImages }> = ({ images }) => {
  return (
    <div className="relative -mx-4 max-w-[100vw] sm:-mx-6">
      <div className="overflow-x-auto pb-4 transition-opacity duration-300">
        <div className="flex min-w-max gap-3 pl-4 pr-4 sm:pl-6 sm:pr-6">
          {images.map((entry, index) => (
            <div
              className={`relative h-72 w-52 shrink-0 overflow-hidden rounded-md sm:h-80 sm:w-60 ${index % 2 === 0 ? 'mt-10' : 'mt-4'}`}
              key={entry.id ?? index}
            >
              <MediaImage className="h-full w-full object-cover" loading={index < 4 ? 'eager' : 'lazy'} media={entry.image} />
            </div>
          ))}
        </div>
      </div>
      <GalleryMarqueeEnhancer images={images} />
    </div>
  )
}
