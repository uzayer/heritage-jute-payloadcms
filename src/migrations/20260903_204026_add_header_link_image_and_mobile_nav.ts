import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`header_mobile_groups_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_mobile_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_mobile_groups_links_order_idx\` ON \`header_mobile_groups_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_mobile_groups_links_parent_id_idx\` ON \`header_mobile_groups_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header_mobile_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_mobile_groups_order_idx\` ON \`header_mobile_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_mobile_groups_parent_id_idx\` ON \`header_mobile_groups\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`header_nav_items_links\` ADD \`image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_image_idx\` ON \`header_nav_items_links\` (\`image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`header_mobile_groups_links\`;`)
  await db.run(sql`DROP TABLE \`header_mobile_groups\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_header_nav_items_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`description\` text,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_nav_items_links\`("_order", "_parent_id", "id", "label", "description", "url") SELECT "_order", "_parent_id", "id", "label", "description", "url" FROM \`header_nav_items_links\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_links\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_nav_items_links\` RENAME TO \`header_nav_items_links\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_order_idx\` ON \`header_nav_items_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_parent_id_idx\` ON \`header_nav_items_links\` (\`_parent_id\`);`)
}
