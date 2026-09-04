import { ArrowRight, MessageCircleMore } from 'lucide-react'
import React from 'react'

import type { Page } from '@/payload-types'

import { Reveal } from '@/components/motion/reveal'

import { Action } from './Action'

type Cta = NonNullable<Page['home']>['cta']

/** The closing "get in touch" banner shared by the Home and About Site Pages. */
export const CallToActionSection: React.FC<{ cta: Cta }> = ({ cta }) => (
  <section className="py-16">
    <div className="mx-auto max-w-5xl rounded-[2rem] border border-border/80 bg-linear-to-br from-secondary/80 via-background to-accent/30 px-6 py-12 shadow-[var(--interaction-shadow)] md:py-20 lg:py-32">
      <div className="text-center">
        <Reveal direction="none">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">{cta.heading}</h2>
          <p className="mt-4">{cta.description}</p>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap justify-center gap-4" delay={0.05} direction="none">
          <Action action={cta.primaryAction} size="lg">
            <MessageCircleMore aria-hidden className="size-4" />
          </Action>
          <Action action={cta.secondaryAction} size="lg" variant="outline">
            <ArrowRight aria-hidden className="size-4" />
          </Action>
        </Reveal>
      </div>
    </div>
  </section>
)
