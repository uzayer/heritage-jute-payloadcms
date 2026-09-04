import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Page } from '@/payload-types'

import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/utilities/ui'

import { Action } from './Action'
import { GalleryMarquee } from './GalleryMarquee'
import { MediaImage } from './MediaImage'
import { SectionIcon } from './SectionIcon'

type About = NonNullable<Page['about']>

export const AboutIntro: React.FC<{ intro: About['intro'] }> = ({ intro }) => (
  <section>
    <div className="border-muted-foreground/20">
      <div className="container border-x border-muted-foreground/20 py-32">
        <Reveal className="mb-14 flex flex-col gap-5 lg:w-2/3" direction="none" eager>
          <h1 className="text-5xl font-semibold tracking-tighter lg:text-6xl">{intro.heading}</h1>
          <p className="text-lg text-muted-foreground md:text-xl">{intro.description}</p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-3">
          <div className="relative aspect-[3/2] max-h-[620px] overflow-hidden rounded-xl lg:col-span-2">
            {intro.mainImage ? (
              <MediaImage className="absolute inset-0 size-full object-cover" loading="eager" media={intro.mainImage} />
            ) : null}
          </div>
          <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
            <Reveal
              className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto"
              delay={0.1}
            >
              <Image
                alt="Heritage Jute Fibers"
                className="mr-auto h-12 w-auto dark:invert"
                height={48}
                src="/logo.svg"
                width={300}
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{intro.breakout.title}</p>
                <p className="text-muted-foreground">{intro.breakout.description}</p>
              </div>
              {intro.breakout.primaryAction?.url ? (
                <Link className={cn(buttonVariants({ variant: 'outline' }), 'mr-auto')} href={intro.breakout.primaryAction.url}>
                  {intro.breakout.primaryAction.label}
                </Link>
              ) : null}
            </Reveal>
            <Reveal className="relative aspect-[3/2] w-full overflow-hidden rounded-xl md:w-1/2 lg:min-h-0 lg:w-full" delay={0.15} direction="none">
              {intro.secondaryImage ? (
                <MediaImage className="absolute inset-0 size-full object-cover" media={intro.secondaryImage} />
              ) : null}
            </Reveal>
          </div>
        </div>

        <Reveal className="relative mt-8 overflow-hidden rounded-xl bg-muted p-7 md:mt-10 md:p-16" direction="none">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-3xl font-medium md:text-4xl">{intro.achievementsHeading}</h2>
            <p className="max-w-xl text-muted-foreground">{intro.achievementsDescription}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:flex-wrap md:justify-between">
            {intro.achievements?.map((achievement) => (
              <div className="flex flex-col gap-2 text-center md:text-left" key={achievement.id ?? achievement.label}>
                <span className="font-mono text-4xl font-semibold md:text-5xl">{achievement.value}</span>
                <p className="text-sm md:text-base">{achievement.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-5xl gap-16 py-28 md:grid-cols-2 md:gap-28">
          {intro.sections?.map((section, index) => (
            <Reveal delay={index * 0.05} key={section.id ?? section.title}>
              <h2 className="mb-5 text-4xl font-medium">{section.title}</h2>
              <p className="text-lg leading-7 whitespace-pre-line text-muted-foreground">{section.content}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export const AboutGallery: React.FC<{ gallery: About['gallery'] }> = ({ gallery }) => (
  <section aria-labelledby="gallery7-heading" className="border-t border-muted-foreground/20">
    <div className="container border-x border-muted-foreground/20 px-6 py-10 md:py-14">
      <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-x-12 md:gap-y-4">
        <Reveal className="flex flex-col gap-6" direction="none">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl" id="gallery7-heading">
            {gallery.heading}
          </h2>
          {gallery.primaryAction?.url ? (
            <Link className={cn(buttonVariants({ variant: 'link' }), 'w-fit font-medium')} href={gallery.primaryAction.url}>
              {gallery.primaryAction.label}
            </Link>
          ) : null}
        </Reveal>
        <Reveal delay={0.08} direction="none">
          <p className="text-sm text-muted-foreground md:text-base">{gallery.description}</p>
        </Reveal>
      </div>
      {gallery.images?.length ? <GalleryMarquee images={gallery.images} /> : null}
    </div>
  </section>
)

export const AboutNumbers: React.FC<{ numbers: About['numbers'] }> = ({ numbers }) => (
  <section>
    <div className="border-t border-muted-foreground/20">
      <div className="mx-auto max-w-5xl space-y-8 border-x border-muted-foreground/20 px-6 py-16 md:space-y-12 md:py-32">
        <Reveal className="relative z-10 max-w-xl space-y-6" direction="none">
          <h2 className="text-4xl font-medium lg:text-5xl">{numbers.heading}</h2>
          <p>
            {numbers.descriptionPrefix}
            <span className="font-medium">{numbers.descriptionEmphasis}</span>
            {numbers.descriptionSuffix}
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <Reveal delay={0.05}>
            <p>{numbers.introText}</p>
            <div className="mt-12 mb-12 grid grid-cols-2 gap-2 md:mb-0">
              {numbers.stats?.map((stat) => (
                <div className="space-y-4" key={stat.id ?? stat.label}>
                  <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                    {stat.value}
                  </div>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative" delay={0.1}>
            <blockquote className="border-l-4 pl-4">
              <p>{numbers.testimonial.quote}</p>
              <div className="mt-6 space-y-1">
                <cite className="block font-medium not-italic">{numbers.testimonial.author}</cite>
                <p className="text-sm text-muted-foreground">{numbers.testimonial.role}</p>
              </div>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
)

export const AboutReasons: React.FC<{ reasons: About['reasons'] }> = ({ reasons }) => (
  <section>
    <div className="border-t border-muted-foreground/20">
      <div className="container border-x border-muted-foreground/20 py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-16">
          <Reveal className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12" direction="none">
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">{reasons.heading}</h2>
            <p>{reasons.description}</p>
          </Reveal>

          <div className="relative mx-auto grid max-w-4xl divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.items?.map((item, index) => (
              <Reveal className="space-y-2" delay={index * 0.05} key={item.id ?? item.title}>
                <div className="flex items-center gap-2">
                  <SectionIcon className="size-4" name={item.icon} />
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
                <p className="text-sm">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)
