import * as migration_20260903_175934_initial_sqlite_schema from './20260903_175934_initial_sqlite_schema'
import * as migration_20260903_181306_add_products from './20260903_181306_add_products'
import * as migration_20260903_195301_marketing_site_foundation from './20260903_195301_marketing_site_foundation'

export const migrations = [
  {
    up: migration_20260903_175934_initial_sqlite_schema.up,
    down: migration_20260903_175934_initial_sqlite_schema.down,
    name: '20260903_175934_initial_sqlite_schema',
  },
  {
    up: migration_20260903_181306_add_products.up,
    down: migration_20260903_181306_add_products.down,
    name: '20260903_181306_add_products',
  },
  {
    up: migration_20260903_195301_marketing_site_foundation.up,
    down: migration_20260903_195301_marketing_site_foundation.down,
    name: '20260903_195301_marketing_site_foundation',
  },
]
