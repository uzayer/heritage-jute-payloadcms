import { readFile } from 'node:fs/promises'
import path from 'node:path'

import type { File, Payload } from 'payload'
import YAML from 'yaml'

/**
 * Reading side of the migration importers. The current Astro site is the reference for
 * every piece of content, so each importer reads that checkout rather than carrying its
 * own copy of the wording — a re-run always matches the live site.
 *
 * The one exception is wording an Astro component holds inline rather than in a content
 * file, which has nowhere to be read from; `siteContent.ts` keeps those strings together
 * in `componentCopy` and says so.
 */

const defaultSourceDirectory = path.resolve(process.cwd(), '../heritage-jute')

export const resolveSourceDirectory = (override?: string): string =>
  override ?? process.env.HERITAGE_JUTE_SOURCE_DIR ?? defaultSourceDirectory

/** Splits an Astro content file into its YAML frontmatter and its Markdown body. */
export const parseContentFile = <T>(raw: string): { body: string; data: T } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) throw new Error('Astro content file is missing YAML frontmatter.')

  return { body: match[2].trim(), data: YAML.parse(match[1]) as T }
}

export const readContentFile = async <T>(
  sourceDirectory: string,
  relativePath: string,
): Promise<{ body: string; data: T }> =>
  parseContentFile<T>(await readFile(path.join(sourceDirectory, relativePath), 'utf8'))

export const readDataFile = async <T>(sourceDirectory: string, relativePath: string): Promise<T> =>
  JSON.parse(await readFile(path.join(sourceDirectory, relativePath), 'utf8')) as T

const mimetypes: Record<string, string> = {
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const extensionsByMimetype = Object.fromEntries(
  Object.entries(mimetypes).map(([extension, mimetype]) => [mimetype, extension]),
)

/**
 * Downloads an image the Astro site links to rather than serves. A handful of
 * marketing photographs are hosted remotely; the migration copies them into Media
 * Assets so the CMS owns every image the public site renders.
 */
const fetchImageFile = async (src: string): Promise<File> => {
  const response = await fetch(src)

  if (!response.ok) throw new Error(`Could not download ${src}: HTTP ${response.status}.`)

  const mimetype = response.headers.get('content-type')?.split(';')[0] ?? ''
  const extension = extensionsByMimetype[mimetype]

  if (!extension) throw new Error(`Unsupported image type ${mimetype} for ${src}.`)

  const data = Buffer.from(await response.arrayBuffer())
  const basename = path.basename(new URL(src).pathname)
  const name = basename.toLowerCase().endsWith(extension) ? basename : `${basename}${extension}`

  return { data, mimetype, name, size: data.byteLength }
}

/** Loads an image the Astro site serves from its `public` directory, or links to. */
export const readImageFile = async (sourceDirectory: string, src: string): Promise<File> => {
  if (/^https?:\/\//.test(src)) return fetchImageFile(src)

  const imagePath = path.join(sourceDirectory, 'public', src.replace(/^\//, ''))
  const extension = path.extname(imagePath).toLowerCase()
  const mimetype = mimetypes[extension]

  if (!mimetype) throw new Error(`Unsupported image type for ${src}.`)

  const data = Buffer.from(await readFile(imagePath))

  return { data, mimetype, name: path.basename(imagePath), size: data.byteLength }
}

/** Supplies the bytes for an image. Tests replace it so imports stay off the filesystem. */
export type ImageLoader = (sourceDirectory: string, src: string) => Promise<File>

/**
 * Reuses the Media Asset already holding this filename so an import can be re-run
 * without filling the library with duplicates. The alt text is still written through,
 * so an image the Astro site describes differently in two places ends up with the
 * description of whichever source the importer reads last, and a re-run is stable.
 */
export const upsertMediaAsset = async (
  payload: Payload,
  { alt, file }: { alt: string; file: File },
): Promise<number> => {
  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    where: { filename: { equals: file.name } },
  })

  if (existing.docs[0]) {
    if (existing.docs[0].alt !== alt) {
      await payload.update({
        collection: 'media',
        context: { disableRevalidate: true },
        data: { alt },
        id: existing.docs[0].id,
      })
    }

    return existing.docs[0].id
  }

  const created = await payload.create({
    collection: 'media',
    context: { disableRevalidate: true },
    data: { alt },
    file,
  })

  return created.id
}
