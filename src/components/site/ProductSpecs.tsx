import React from 'react'

import type { Product } from '@/payload-types'

import { Reveal } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'

type SpecificationGroup = NonNullable<Product['specificationGroups']>[number]
type Variant = NonNullable<Product['variants']>[number]
type Specification = NonNullable<SpecificationGroup['specifications']>[number]

const SpecRow: React.FC<{ spec: Specification }> = ({ spec }) => (
  <div
    className={cn(
      'grid gap-1 px-4 py-3 sm:grid-cols-[minmax(150px,0.85fr)_1.15fr] sm:gap-5 md:px-5',
      spec.highlight ? 'bg-muted/35' : undefined,
    )}
  >
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{spec.label}</span>
      {spec.highlight ? (
        <Badge className="h-5 rounded-sm px-1.5 text-[10px] font-normal" variant="secondary">
          key
        </Badge>
      ) : null}
    </div>
    <div className="flex min-w-0 items-center text-sm font-medium leading-6 text-foreground">{spec.value}</div>
  </div>
)

/** The highlighted-spec strip shown right under the product hero heading. */
export const ProductHeroSpecs: React.FC<{ specificationGroups?: SpecificationGroup[] | null }> = ({
  specificationGroups,
}) => {
  const heroSpecs = (specificationGroups ?? [])
    .flatMap((group) => group.specifications ?? [])
    .filter((spec) => spec.highlight)
    .slice(0, 4)

  return heroSpecs.length > 0 ? (
    <div className="mt-7 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
      {heroSpecs.map((spec) => (
        <div className="bg-background p-4" key={spec.id ?? spec.label}>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{spec.label}</p>
          <p className="mt-2 text-base font-semibold">{spec.value}</p>
        </div>
      ))}
    </div>
  ) : null
}

const SpecGroupsGrid: React.FC<{ specificationGroups: SpecificationGroup[] }> = ({ specificationGroups }) => (
  <Reveal className="mt-10 grid gap-5 lg:grid-cols-2" stagger={0.03} staggerDelay={0.05}>
    {specificationGroups.map((group) => (
      <article className="h-full overflow-hidden rounded-lg border border-border bg-background" key={group.id ?? group.name}>
        <div className="border-b border-border bg-muted/20 px-5 py-4">
          <h3 className="text-lg font-semibold tracking-tight">{group.name}</h3>
          {group.description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{group.description}</p> : null}
        </div>
        <div className="divide-y divide-border">
          {group.specifications?.map((spec) => <SpecRow key={spec.id ?? spec.label} spec={spec} />)}
        </div>
      </article>
    ))}
  </Reveal>
)

const VariantsGrid: React.FC<{ variants: Variant[] }> = ({ variants }) => (
  <Reveal className="mt-14" delay={0.1} direction="none">
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Available variants</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">{variants.length} selectable variants</h2>
      </div>
      <p className="max-w-md text-sm leading-6 text-muted-foreground">
        Each variant lists its own specs below. Contact us once you have identified the variant you need.
      </p>
    </div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((variant) => (
        <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background" key={variant.id ?? variant.name}>
          <div className="border-b border-border bg-muted/20 px-5 py-4">
            <h3 className="text-base font-semibold tracking-tight">{variant.name}</h3>
            {variant.description ? (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{variant.description}</p>
            ) : null}
          </div>
          <div className="divide-y divide-border">
            {variant.specifications?.map((spec) => <SpecRow key={spec.id ?? spec.label} spec={spec} />)}
          </div>
        </article>
      ))}
    </div>
  </Reveal>
)

/** The technical "Export Sheet" section: spec-group cards plus, when present, buyer-selectable variants. */
export const ProductSpecsSection: React.FC<{
  specificationGroups?: SpecificationGroup[] | null
  variants?: Variant[] | null
}> = ({ specificationGroups, variants }) => {
  const hasVariants = Boolean(variants && variants.length > 0)

  return (
    <section className="border-t border-muted-foreground/20">
      <div className="container max-w-6xl border-x border-muted-foreground/20 py-16 md:py-24">
        <Reveal direction="none">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Export Sheet</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Technical Specifications</h2>
            </div>
            {hasVariants ? (
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                {variants!.length} buyer-selectable variants with exact packing and loading data.
              </p>
            ) : null}
          </div>
        </Reveal>

        <SpecGroupsGrid specificationGroups={specificationGroups ?? []} />

        {hasVariants ? <VariantsGrid variants={variants!} /> : null}
      </div>
    </section>
  )
}
