'use server'

import { z } from 'zod'

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
 * Delivers an inquiry through Web3Forms. Buyers never get a CMS-managed record of
 * their submission — this is deliberately the only place the inquiry is stored.
 */
export async function submitContactInquiry(raw: unknown) {
  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) throw new Error('Invalid form fields')

  const key = process.env.WEB3FORMS_ACCESS_KEY
  if (!key) throw new Error('Contact form is not configured')

  const { fullName, email, company, productOfInterest, preferredIncoterm, portOfDestination, country, message } =
    parsed.data
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

  const res = await fetch('https://api.web3forms.com/submit', {
    body: JSON.stringify({
      access_key: key,
      email,
      from_name: fullName,
      message: details,
      subject: `Website inquiry — ${fullName}`,
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  })

  const data = (await res.json()) as { message?: string; success?: boolean }

  if (!res.ok || !data.success) throw new Error(data.message ?? 'Could not deliver your message')
}
