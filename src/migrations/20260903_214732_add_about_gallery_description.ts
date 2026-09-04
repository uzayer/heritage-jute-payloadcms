import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`about_gallery_description\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_about_gallery_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`about_gallery_description\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_about_gallery_description\`;`)
}
