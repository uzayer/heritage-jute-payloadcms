import { ArrowRight, ChevronRight, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import type { Page } from '@/payload-types'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { buttonVariants } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/utilities/ui'

import { Action } from './Action'
import { MediaImage } from './MediaImage'
import { SectionIcon } from './SectionIcon'

type Home = NonNullable<Page['home']>

export const HomeHero: React.FC<{ hero: Home['hero'] }> = ({ hero }) => (
  <section className="dark relative -mt-24 flex h-svh max-h-[1400px] w-full overflow-hidden font-sans md:h-svh">
    <Image
      alt=""
      className="absolute inset-0 z-0 size-full object-cover object-center"
      fill
      priority
      sizes="100vw"
      src="/images/gallery/hero-home.webp"
    />
    <div aria-hidden className="absolute inset-0 z-10 bg-black/45" />
    <div className="relative z-30 m-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-5 lg:max-w-4xl">
      <Reveal direction="none" eager>
        <h1 className="text-center text-4xl font-semibold leading-tight text-white md:text-6xl xl:text-[4.4rem]">
          {hero.heading}
        </h1>
      </Reveal>
      <Reveal delay={0.05} direction="none" eager>
        <p className="text-center text-base text-white/90 md:text-lg">{hero.subtext}</p>
      </Reveal>
      <Reveal className="flex flex-wrap justify-center gap-3" delay={0.1} direction="none" eager>
        {hero.primaryAction?.url ? (
          <Action
            action={hero.primaryAction}
            className="min-w-[13rem] rounded-full border-white/20 bg-white text-stone-900 shadow-[0_22px_44px_rgba(0,0,0,0.18)] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/96 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_28px_54px_rgba(0,0,0,0.22)] focus-visible:ring-white/60 focus-visible:ring-offset-0"
          >
            <ArrowRight aria-hidden className="size-4" />
          </Action>
        ) : null}
        {hero.secondaryAction?.url ? (
          <Action
            action={hero.secondaryAction}
            className="min-w-[13rem] rounded-full border-white/35 bg-white/12 text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/50 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/18 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white focus-visible:ring-white/55 focus-visible:ring-offset-0"
            variant="outline"
          >
            <MessageCircleMore aria-hidden className="size-4" />
          </Action>
        ) : null}
      </Reveal>
    </div>
  </section>
)

export const HomeProductRange: React.FC<{ productRange: Home['productRange'] }> = ({
  productRange,
}) => (
  <section>
    <div className="border-t">
      <div>
        <div className="relative container overflow-hidden border-x border-muted-foreground/20 py-32">
          <div className="isolate mx-auto flex max-w-3xl flex-col gap-20">
            <div
              aria-hidden
              className="bg absolute -top-1 -left-[1px] -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:64px_64px] opacity-20 [clip-path:inset(0px_0px_50%_0px)] [mask-image:radial-gradient(ellipse_100%_120%_at_50%_50%,transparent_20%,#000_100%)]"
            />
            <Reveal direction="none" eager>
              <h2 className="text-center text-3xl md:text-5xl">{productRange.heading}</h2>
            </Reveal>
            {productRange.image ? (
              <Reveal delay={0.05} direction="none" eager>
                <MediaImage
                  className="max-h-64 w-full rounded-xl border border-border/60 bg-muted object-cover shadow-sm grayscale"
                  media={productRange.image}
                />
              </Reveal>
            ) : null}
            <Reveal delay={0.1} eager>
              <p className="text-center text-xl md:text-3xl">{productRange.lede}</p>
            </Reveal>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20">
          <div className="container border-x border-muted-foreground/20 px-0">
            <div className="grid gap-px bg-muted-foreground/20 md:grid-cols-2 lg:grid-cols-3">
              {productRange.items?.map((item) => (
                <div
                  className="flex gap-4 bg-muted px-6 pt-8 pb-8 md:flex-col md:gap-0 md:px-8 md:pt-16"
                  key={item.id ?? item.title}
                >
                  <SectionIcon
                    className="size-7 shrink-0 md:size-8"
                    name={item.icon}
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 md:mt-6 md:text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="border-x border-t border-muted-foreground/20">
            <div className="container border-x border-muted-foreground/20 py-16" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const HomeGlobalReach: React.FC<{ globalReach: Home['globalReach'] }> = ({
  globalReach,
}) => (
  <section className="@container">
    <div className="border-t border-muted-foreground/20">
      <div className="container border-x border-muted-foreground/20 py-12 md:py-20">
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-16">
          <Reveal className="relative z-10 mx-auto max-w-xl space-y-6 text-center" direction="none">
            <h2 className="text-4xl font-semibold lg:text-5xl">{globalReach.heading}</h2>
            <p>{globalReach.description}</p>
          </Reveal>

          {globalReach.mapImage ? (
            <Reveal className="mask-y-from-75% mx-auto max-w-4xl" delay={0.05} direction="none">
              <MediaImage className="dark:invert" media={globalReach.mapImage} />
            </Reveal>
          ) : null}

          <div className="relative mx-auto max-w-3xl">
            <span className="@2xl:block bg-border pointer-events-none absolute inset-y-4 left-1/3 hidden w-px" />
            <span className="@2xl:block bg-border pointer-events-none absolute inset-y-4 left-2/3 hidden w-px" />
            <div className="**:text-center @max-2xl:max-w-2xs @max-2xl:mx-auto @max-2xl:gap-6 @2xl:grid-cols-3 grid *:px-6">
              {globalReach.stats?.map((stat, index) => (
                <Reveal
                  className="space-y-4 *:block"
                  delay={index * 0.05}
                  key={stat.id ?? stat.value}
                >
                  <span className="text-5xl font-semibold">
                    {stat.value}{' '}
                    {stat.suffix ? (
                      <span className="text-2xl text-muted-foreground">{stat.suffix}</span>
                    ) : null}
                  </span>
                  <p className="text-balance text-sm text-muted-foreground">
                    <strong className="font-medium text-foreground">{stat.descriptionLead}</strong>
                    {stat.descriptionRest}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const HomeOrdering: React.FC<{ ordering: Home['ordering'] }> = ({ ordering }) => (
  <section>
    <div className="border-t border-muted-foreground/20">
      <div className="container border-x border-muted-foreground/20 py-16 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <Reveal direction="none">
              <h2 className="text-4xl font-medium">{ordering.heading}</h2>
            </Reveal>
            <Reveal className="space-y-6" delay={0.05}>
              <p>{ordering.firstParagraph}</p>
              <p>
                {ordering.secondParagraphPrefix}
                <span className="font-bold">{ordering.secondParagraphEmphasis}</span>
                {ordering.secondParagraphSuffix}
              </p>
              {ordering.primaryAction?.url ? (
                <Action
                  action={ordering.primaryAction}
                  className="gap-1 pr-1.5"
                  size="sm"
                  variant="secondary"
                >
                  <ChevronRight className="size-3" />
                </Action>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export const HomeCountries: React.FC<{ countries: Home['countries'] }> = ({ countries }) => (
  <div className="border-t border-muted-foreground/20">
    <div className="container max-w-6xl border-x border-muted-foreground/20 py-16 md:py-20">
      <Reveal direction="none">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {countries.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
          {countries.heading}
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">{countries.description}</p>
      </Reveal>

      <div className="mt-10 space-y-8">
        {countries.regions?.map((region) => (
          <div key={region.id ?? region.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {region.label}
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {region.countries?.map((country) => (
                <span
                  className="flex items-center gap-1.5 text-sm text-foreground"
                  key={country.id ?? country.name}
                >
                  <span aria-hidden className="text-base leading-none">
                    {country.flag}
                  </span>
                  {country.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export const HomeFaqs: React.FC<{ faqs: Home['faqs'] }> = ({ faqs }) => (
  <section>
    <div className="border-t border-muted-foreground/20">
      <div className="container border-x border-muted-foreground/20 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto max-w-xl text-center" direction="none">
            <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
              {faqs.heading}
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">{faqs.intro}</p>
          </Reveal>

          <div className="mx-auto mt-12 max-w-xl">
            <Reveal direction="none">
              <Accordion
                className="w-full rounded-2xl border bg-card px-5 py-3 shadow-sm ring-4 ring-muted sm:px-8 dark:ring-0"
                collapsible
                defaultValue={faqs.items?.[0]?.id ?? undefined}
                type="single"
              >
                {faqs.items?.map((item) => (
                  <AccordionItem
                    className="border-dashed"
                    key={item.id ?? item.question}
                    value={item.id ?? item.question}
                  >
                    <AccordionTrigger className="text-base">
                      <span className="flex-1 text-pretty">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-base leading-7 text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-6 px-2 text-muted-foreground sm:px-8">
                Have a different question?{' '}
                <a className={cn(buttonVariants({ variant: 'link' }))} href="/contact">
                  <span>Send us an inquiry</span>
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
)
