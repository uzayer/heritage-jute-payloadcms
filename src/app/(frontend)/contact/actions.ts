'use server'

import { getPayload } from 'payload'
import { Resend } from 'resend'
import { z } from 'zod'

import config from '@payload-config'

const inquirySchema = z.object({
  company: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email(),
  fullName: z.string().min(1),
  message: z.string().min(1),
  portOfDestination: z.string().optional(),
  preferredIncoterm: z.string().optional(),
  productOfInterest: z.string().optional(),
})

/**
 * Delivers an inquiry through Resend, addressed to the Company global's contact
 * email. Buyers never get a CMS-managed record of their submission — this is
 * deliberately the only place the inquiry is stored.
 */
export async function submitContactInquiry(raw: unknown) {
  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) throw new Error('Invalid form fields')

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !fromEmail) throw new Error('Contact form is not configured')

  const { fullName, email, company, productOfInterest, preferredIncoterm, portOfDestination, country, message } =
    parsed.data

  const payload = await getPayload({ config })
  const { email: toEmail } = await payload.findGlobal({ slug: 'company' })

  const details = [
    message,
    company ? `\nCompany: ${company}` : '',
    productOfInterest ? `\nProduct of interest: ${productOfInterest}` : '',
    preferredIncoterm ? `\nPreferred Incoterm: ${preferredIncoterm}` : '',
    portOfDestination ? `\nPort of destination: ${portOfDestination}` : '',
    country ? `\nCountry: ${country}` : '',
  ]
    .filter(Boolean)
    .join('')

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: fromEmail,
    replyTo: email,
    subject: `Website inquiry — ${fullName}`,
    text: details,
    to: toEmail,
  })

  if (error) throw new Error(error.message ?? 'Could not deliver your message')
}
