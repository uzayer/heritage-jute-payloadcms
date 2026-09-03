import 'dotenv/config'

import { getPayload } from 'payload'

import { importProductCatalogue } from './products'
import config from '@payload-config'

const payload = await getPayload({ config })
const products = await importProductCatalogue(payload)

payload.logger.info(`Imported ${products.length} Products.`)
