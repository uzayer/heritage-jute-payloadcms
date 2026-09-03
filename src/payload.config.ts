import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Products } from './collections/Products'
import { Users } from './collections/Users/index'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isVercelDeployment = Boolean(process.env.VERCEL)
const databaseURL = process.env.DATABASE_URL ?? 'file:./heritage-jute-development.db'
const r2Environment = {
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  bucket: process.env.R2_BUCKET,
  endpoint: process.env.R2_ENDPOINT,
  publicURL: process.env.R2_PUBLIC_URL,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
}
const hasR2Configuration = Object.values(r2Environment).every(Boolean)

if (isVercelDeployment && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required for Vercel deployments.')
}

if (isVercelDeployment && !hasR2Configuration) {
  throw new Error('All R2 environment variables are required for Vercel deployments.')
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: sqliteAdapter({
    client: {
      url: databaseURL,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    transactionOptions: {},
  }),
  collections: [Pages, Posts, Products, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    s3Storage({
      enabled: hasR2Configuration,
      collections: {
        [Media.slug]: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${r2Environment.publicURL}/${key}`
          },
        },
      },
      bucket: r2Environment.bucket ?? '',
      config: {
        credentials: {
          accessKeyId: r2Environment.accessKeyId ?? '',
          secretAccessKey: r2Environment.secretAccessKey ?? '',
        },
        endpoint: r2Environment.endpoint,
        forcePathStyle: true,
        region: 'auto',
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
