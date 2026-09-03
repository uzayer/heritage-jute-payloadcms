import 'dotenv/config'
import config from '@payload-config'
import { getPayload } from 'payload'
import { importMarketingSite } from './siteContent'

const payload = await getPayload({ config })
await importMarketingSite(payload)
payload.logger.info('Imported Heritage Jute marketing site content.')
