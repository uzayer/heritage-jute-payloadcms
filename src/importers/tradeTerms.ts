/**
 * Terms that were byte-identical on all eleven product documents in the Astro source —
 * seventy-seven of the two hundred and twenty-nine specification rows. They are not
 * product attributes, so they live on the Company global and are appended to every
 * product's specification sheet at render time. Changing "Payment Terms" is now one
 * edit rather than eleven.
 *
 * `label` is matched against the product source when importing, so a term listed here is
 * removed from every product's specification groups.
 */
export const SHARED_TRADE_TERMS: { label: string; value: string }[] = [
  { label: 'Origin', value: 'Made in Bangladesh' },
  { label: 'Port of Loading', value: 'Chittagong (CTG), Bangladesh' },
  { label: 'Incoterms', value: 'FOB, CFR, CIF, EXW' },
  { label: 'Payment Terms', value: 'LC at Sight, T/T, CAD' },
  { label: 'Sample Lead Time', value: '5–7 days' },
  { label: 'Bulk Lead Time', value: '3–6 weeks from order confirmation' },
  { label: 'Export Basis', value: 'Container-load supply' },
]

export const SHARED_TRADE_TERM_LABELS = new Set(
  SHARED_TRADE_TERMS.map((term) => term.label.toLowerCase()),
)
