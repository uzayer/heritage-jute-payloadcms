import React from 'react'

import type { Page } from '@/payload-types'

import { Action } from './Action'

type Cta = NonNullable<Page['home']>['cta']

/** The closing "get in touch" banner shared by the Home and About Site Pages. */
export const CallToActionSection: React.FC<{ cta: Cta }> = ({ cta }) => (
  <section className="bg-stone-100 px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{cta.heading}</h2>
      <p className="mt-4 leading-7 text-stone-600">{cta.description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Action action={cta.primaryAction} />
        <Action action={cta.secondaryAction} variant="secondary" />
      </div>
    </div>
  </section>
)
