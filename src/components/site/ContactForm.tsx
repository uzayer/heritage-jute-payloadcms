'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { GlobeIcon, LoaderIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/motion/reveal'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { iconButtonVariants } from '@/components/ui/interactive'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/utilities/ui'

import { submitContactInquiry } from '@/app/(frontend)/contact/actions'

const OTHER_PRODUCT = 'Other / Multiple'

type SocialNetwork = 'facebook' | 'twitter' | 'linkedin'

const socialIconPaths: Record<SocialNetwork, string> = {
  facebook:
    'M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.026 4.388 11.03 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.017 1.792-4.687 4.533-4.687 1.312 0 2.686.236 2.686.236v2.968H15.83c-1.49 0-1.955.93-1.955 1.883v2.26h3.327l-.532 3.49h-2.795V24C19.612 23.103 24 18.099 24 12.073Z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z',
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
}

function SocialIcon({ network }: { network: SocialNetwork }) {
  return (
    <svg aria-hidden className="size-5" fill="currentColor" viewBox="0 0 24 24">
      <path d={socialIconPaths[network]} />
    </svg>
  )
}

const contactFormSchema = z.object({
  company: z.string().optional(),
  country: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  fullName: z.string().min(1, 'Full name is required'),
  message: z.string().min(1, 'Message is required'),
  portOfDestination: z.string().optional(),
  preferredIncoterm: z.string().optional(),
  productOfInterest: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm({
  title,
  description,
  corporateHeading,
  addressLine1,
  addressLine2,
  contactHeading,
  phone,
  phoneE164,
  email,
  web,
  socialHeading,
  socialLinks,
  formHeading,
  formIntro,
  successMessage,
  errorMessage,
  submitLabel,
  submittingLabel,
  incoterms,
  products,
  defaultProduct,
}: {
  title: string
  description: string
  corporateHeading: string
  addressLine1: string
  addressLine2: string
  contactHeading: string
  phone: string
  phoneE164: string
  email: string
  web: { label: string; url: string }
  socialHeading: string
  socialLinks: { network: SocialNetwork; url: string }[]
  formHeading: string
  formIntro: string
  successMessage: string
  errorMessage: string
  submitLabel: string
  submittingLabel: string
  incoterms: { label: string; value: string }[]
  products: { name: string; slug: string }[]
  defaultProduct?: string
}) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<ContactFormData>({
    defaultValues: {
      company: '',
      country: '',
      email: '',
      fullName: '',
      message: '',
      portOfDestination: '',
      preferredIncoterm: '',
      productOfInterest: defaultProduct ?? '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(contactFormSchema),
    reValidateMode: 'onSubmit',
  })

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null)
      await submitContactInquiry(data)
      setIsSubmitted(true)
      form.reset()
    } catch {
      setSubmitError(errorMessage)
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col gap-4 text-left" direction="none">
            <h1 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="text-muted-foreground lg:text-xl lg:text-balance">{description}</p>
          </Reveal>

          <div className="mt-10 flex gap-10 max-md:flex-col md:mt-16 md:gap-0 md:divide-x md:divide-border">
            <div className="space-y-10 md:pr-10">
              <Reveal direction="none" delay={0.05}>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-balance">{corporateHeading}</h2>
                  <p className="mt-3 font-medium tracking-tight text-muted-foreground">
                    {addressLine1}
                    <br />
                    {addressLine2}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-balance">{contactHeading}</h2>
                  <div className="mt-3 flex flex-col gap-6">
                    <a
                      className="group/link flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                      href={`tel:${phoneE164}`}
                    >
                      <PhoneIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover/link:underline">{phone}</span>
                    </a>
                    <a
                      className="group/link flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                      href={`mailto:${email}`}
                    >
                      <MailIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover/link:underline">{email}</span>
                    </a>
                    <a
                      aria-label={`${web.label} (opens in new tab)`}
                      className="group/link flex items-center gap-3 font-medium tracking-tight text-muted-foreground hover:text-foreground"
                      href={web.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <GlobeIcon className="size-5 shrink-0 text-muted-foreground" />
                      <span className="group-hover/link:underline">{web.label}</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {socialLinks.length > 0 ? (
                <Reveal delay={0.15}>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-balance">{socialHeading}</h2>
                    <div className="mt-3 flex gap-6">
                      {socialLinks.map((link) => (
                        <a
                          aria-label={`${link.network} (opens in new tab)`}
                          className={iconButtonVariants({ size: 'sm', tone: 'default' })}
                          href={link.url}
                          key={link.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <SocialIcon network={link.network} />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </div>

            <div className="flex-1 md:pl-10">
              <Reveal direction="none" delay={0.05}>
                <h2 className="text-lg font-semibold tracking-tight text-balance">{formHeading}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{formIntro}</p>
              </Reveal>

              {isSubmitted ? (
                <div className="mt-5 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">{successMessage}</p>
                </div>
              ) : null}

              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="mt-5">
                <FieldGroup className="gap-6">
                  <Controller
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Full name <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Jordan Rivera" className="bg-background" />
                        {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Work email address <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="you@company.com"
                          className="bg-background"
                        />
                        {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Company name</FieldLabel>
                        <Input {...field} id={field.name} placeholder="Optional" className="bg-background" />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="productOfInterest"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Product of interest</FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id={field.name} className="bg-background">
                            <SelectValue placeholder="Select a product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.slug} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                            <SelectItem value={OTHER_PRODUCT}>{OTHER_PRODUCT}</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="preferredIncoterm"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Preferred Incoterm</FieldLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id={field.name} className="bg-background">
                            <SelectValue placeholder="Select Incoterm" />
                          </SelectTrigger>
                          <SelectContent>
                            {incoterms.map((incoterm) => (
                              <SelectItem key={incoterm.value} value={incoterm.value}>
                                {incoterm.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="portOfDestination"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Port of destination</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          placeholder="e.g. Hamburg, Rotterdam, Jebel Ali"
                          className="bg-background"
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor={field.name}>Country of destination</FieldLabel>
                        <Input {...field} id={field.name} placeholder="e.g. Germany, UAE, USA" className="bg-background" />
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Your message <span className="text-destructive">*</span>
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Tell us what you are sourcing…"
                          className={cn('min-h-[120px] resize-none bg-background')}
                        />
                        {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                      </Field>
                    )}
                  />

                  {submitError !== null ? <p className="text-sm text-destructive">{submitError}</p> : null}

                  <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? <LoaderIcon className="size-4 animate-spin" aria-hidden /> : null}
                      {form.formState.isSubmitting ? submittingLabel : submitLabel}
                    </Button>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
