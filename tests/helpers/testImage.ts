import path from 'node:path'

import type { File } from 'payload'

const onePixelPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL6MwAAAABJRU5ErkJggg==',
  'base64',
)

/**
 * Stands in for the Astro site's images so importer tests never touch the filesystem
 * or the network. The filename is derived from the source path, so an import still
 * produces one Media Asset per distinct image, exactly as a real run does.
 */
export const loadTestImage = async (_sourceDirectory: string, src: string): Promise<File> => ({
  data: onePixelPng,
  mimetype: 'image/png',
  name: `${path.basename(src.split('?')[0], path.extname(src.split('?')[0])) || 'image'}.png`,
  size: onePixelPng.byteLength,
})
