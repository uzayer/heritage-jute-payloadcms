'use client'

import AutoScroll from 'embla-carousel-auto-scroll'

import type { Page } from '@/payload-types'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

import { MediaImage } from './MediaImage'

type GalleryImages = NonNullable<NonNullable<Page['about']>['gallery']['images']>

/** Loaded only after the gallery is eligible for its motion enhancement. */
export function GalleryMarqueeCarousel({ images }: { images: GalleryImages }) {
  return (
    <Carousel opts={{ loop: true }} plugins={[AutoScroll({ speed: 0.9 })]} className="pointer-events-none h-full">
      <CarouselContent className="-ml-3 h-full">
        {images.map((entry, index) => (
          <CarouselItem key={entry.id ?? index} className="basis-auto pl-3">
            <div className={`relative h-72 w-52 overflow-hidden rounded-md sm:h-80 sm:w-60 ${index % 2 === 0 ? 'mt-10' : 'mt-4'}`}>
              <MediaImage className="h-full w-full object-cover" media={entry.image} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
