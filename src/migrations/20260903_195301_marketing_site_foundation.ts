import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_home_product_range_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_product_range_items_order_idx\` ON \`pages_home_product_range_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_product_range_items_parent_id_idx\` ON \`pages_home_product_range_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_home_global_reach_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`description_lead\` text,
  	\`description_rest\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_global_reach_stats_order_idx\` ON \`pages_home_global_reach_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_global_reach_stats_parent_id_idx\` ON \`pages_home_global_reach_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_home_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_compliance_items_order_idx\` ON \`pages_home_compliance_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_compliance_items_parent_id_idx\` ON \`pages_home_compliance_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_home_countries_regions_countries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`flag\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_home_countries_regions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_countries_regions_countries_order_idx\` ON \`pages_home_countries_regions_countries\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_countries_regions_countries_parent_id_idx\` ON \`pages_home_countries_regions_countries\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_home_countries_regions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_countries_regions_order_idx\` ON \`pages_home_countries_regions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_countries_regions_parent_id_idx\` ON \`pages_home_countries_regions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_home_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_home_faqs_items_order_idx\` ON \`pages_home_faqs_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_faqs_items_parent_id_idx\` ON \`pages_home_faqs_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_intro_achievements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_achievements_order_idx\` ON \`pages_about_intro_achievements\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_achievements_parent_id_idx\` ON \`pages_about_intro_achievements\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_intro_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_sections_order_idx\` ON \`pages_about_intro_sections\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_sections_parent_id_idx\` ON \`pages_about_intro_sections\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_gallery_images_order_idx\` ON \`pages_about_gallery_images\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_gallery_images_parent_id_idx\` ON \`pages_about_gallery_images\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_gallery_images_image_idx\` ON \`pages_about_gallery_images\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_numbers_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_numbers_stats_order_idx\` ON \`pages_about_numbers_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_numbers_stats_parent_id_idx\` ON \`pages_about_numbers_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_reasons_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_reasons_items_order_idx\` ON \`pages_about_reasons_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_reasons_items_parent_id_idx\` ON \`pages_about_reasons_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_about_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_about_compliance_items_order_idx\` ON \`pages_about_compliance_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_compliance_items_parent_id_idx\` ON \`pages_about_compliance_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_contact_form_incoterms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_contact_form_incoterms_order_idx\` ON \`pages_contact_form_incoterms\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_contact_form_incoterms_parent_id_idx\` ON \`pages_contact_form_incoterms\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_product_range_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_product_range_items_order_idx\` ON \`_pages_v_version_home_product_range_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_product_range_items_parent_id_idx\` ON \`_pages_v_version_home_product_range_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_global_reach_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`suffix\` text,
  	\`description_lead\` text,
  	\`description_rest\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_global_reach_stats_order_idx\` ON \`_pages_v_version_home_global_reach_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_global_reach_stats_parent_id_idx\` ON \`_pages_v_version_home_global_reach_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_compliance_items_order_idx\` ON \`_pages_v_version_home_compliance_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_compliance_items_parent_id_idx\` ON \`_pages_v_version_home_compliance_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_countries_regions_countries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`flag\` text,
  	\`name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_version_home_countries_regions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_countries_regions_countries_order_idx\` ON \`_pages_v_version_home_countries_regions_countries\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_countries_regions_countries_parent_id_idx\` ON \`_pages_v_version_home_countries_regions_countries\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_countries_regions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_countries_regions_order_idx\` ON \`_pages_v_version_home_countries_regions\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_countries_regions_parent_id_idx\` ON \`_pages_v_version_home_countries_regions\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_faqs_items_order_idx\` ON \`_pages_v_version_home_faqs_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_faqs_items_parent_id_idx\` ON \`_pages_v_version_home_faqs_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_intro_achievements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_achievements_order_idx\` ON \`_pages_v_version_about_intro_achievements\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_achievements_parent_id_idx\` ON \`_pages_v_version_about_intro_achievements\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_intro_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_sections_order_idx\` ON \`_pages_v_version_about_intro_sections\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_sections_parent_id_idx\` ON \`_pages_v_version_about_intro_sections\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_gallery_images_order_idx\` ON \`_pages_v_version_about_gallery_images\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_gallery_images_parent_id_idx\` ON \`_pages_v_version_about_gallery_images\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_gallery_images_image_idx\` ON \`_pages_v_version_about_gallery_images\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_numbers_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_numbers_stats_order_idx\` ON \`_pages_v_version_about_numbers_stats\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_numbers_stats_parent_id_idx\` ON \`_pages_v_version_about_numbers_stats\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_reasons_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`icon\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_reasons_items_order_idx\` ON \`_pages_v_version_about_reasons_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_reasons_items_parent_id_idx\` ON \`_pages_v_version_about_reasons_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_about_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_compliance_items_order_idx\` ON \`_pages_v_version_about_compliance_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_compliance_items_parent_id_idx\` ON \`_pages_v_version_about_compliance_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_contact_form_incoterms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_contact_form_incoterms_order_idx\` ON \`_pages_v_version_contact_form_incoterms\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_contact_form_incoterms_parent_id_idx\` ON \`_pages_v_version_contact_form_incoterms\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`header_nav_items_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`description\` text,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`header_nav_items_links_order_idx\` ON \`header_nav_items_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`header_nav_items_links_parent_id_idx\` ON \`header_nav_items_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(
    sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`company_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`network\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`company_social_links_order_idx\` ON \`company_social_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`company_social_links_parent_id_idx\` ON \`company_social_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`company\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`address_line1\` text NOT NULL,
  	\`address_line2\` text NOT NULL,
  	\`address_locality\` text NOT NULL,
  	\`address_postal_code\` text NOT NULL,
  	\`address_country_code\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`phone_e164\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`website_label\` text NOT NULL,
  	\`website_url\` text NOT NULL,
  	\`whatsapp_url\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`page_type\` text,
  	\`slug\` text,
  	\`title\` text,
  	\`description\` text,
  	\`share_image_id\` integer,
  	\`home_hero_eyebrow\` text,
  	\`home_hero_heading\` text,
  	\`home_hero_subtext\` text,
  	\`home_hero_primary_action_label\` text,
  	\`home_hero_primary_action_url\` text,
  	\`home_hero_secondary_action_label\` text,
  	\`home_hero_secondary_action_url\` text,
  	\`home_product_range_heading\` text,
  	\`home_product_range_lede\` text,
  	\`home_product_range_image_id\` integer,
  	\`home_global_reach_eyebrow\` text,
  	\`home_global_reach_heading\` text,
  	\`home_global_reach_description\` text,
  	\`home_global_reach_map_image_id\` integer,
  	\`home_ordering_heading\` text,
  	\`home_ordering_first_paragraph\` text,
  	\`home_ordering_second_paragraph_prefix\` text,
  	\`home_ordering_second_paragraph_emphasis\` text,
  	\`home_ordering_second_paragraph_suffix\` text,
  	\`home_ordering_primary_action_label\` text,
  	\`home_ordering_primary_action_url\` text,
  	\`home_compliance_heading\` text,
  	\`home_compliance_description\` text,
  	\`home_compliance_credentials_heading\` text,
  	\`home_compliance_credentials_description\` text,
  	\`home_countries_eyebrow\` text,
  	\`home_countries_heading\` text,
  	\`home_countries_description\` text,
  	\`home_faqs_heading\` text,
  	\`home_faqs_intro\` text,
  	\`home_cta_heading\` text,
  	\`home_cta_description\` text,
  	\`home_cta_primary_action_label\` text,
  	\`home_cta_primary_action_url\` text,
  	\`home_cta_secondary_action_label\` text,
  	\`home_cta_secondary_action_url\` text,
  	\`about_intro_eyebrow\` text,
  	\`about_intro_heading\` text,
  	\`about_intro_description\` text,
  	\`about_intro_main_image_id\` integer,
  	\`about_intro_secondary_image_id\` integer,
  	\`about_intro_breakout_title\` text,
  	\`about_intro_breakout_description\` text,
  	\`about_intro_breakout_primary_action_label\` text,
  	\`about_intro_breakout_primary_action_url\` text,
  	\`about_intro_achievements_heading\` text,
  	\`about_intro_achievements_description\` text,
  	\`about_gallery_heading\` text,
  	\`about_gallery_primary_action_label\` text,
  	\`about_gallery_primary_action_url\` text,
  	\`about_numbers_heading\` text,
  	\`about_numbers_description_prefix\` text,
  	\`about_numbers_description_emphasis\` text,
  	\`about_numbers_description_suffix\` text,
  	\`about_numbers_intro_text\` text,
  	\`about_numbers_testimonial_quote\` text,
  	\`about_numbers_testimonial_author\` text,
  	\`about_numbers_testimonial_role\` text,
  	\`about_reasons_heading\` text,
  	\`about_reasons_description\` text,
  	\`about_compliance_heading\` text,
  	\`about_compliance_description\` text,
  	\`about_compliance_credentials_heading\` text,
  	\`about_compliance_credentials_description\` text,
  	\`about_cta_heading\` text,
  	\`about_cta_description\` text,
  	\`about_cta_primary_action_label\` text,
  	\`about_cta_primary_action_url\` text,
  	\`about_cta_secondary_action_label\` text,
  	\`about_cta_secondary_action_url\` text,
  	\`contact_heading\` text,
  	\`contact_intro\` text,
  	\`contact_office_heading\` text,
  	\`contact_contact_heading\` text,
  	\`contact_social_heading\` text,
  	\`contact_form_heading\` text,
  	\`contact_form_intro\` text,
  	\`contact_form_submit_label\` text,
  	\`contact_form_submitting_label\` text,
  	\`contact_form_success_message\` text,
  	\`contact_form_error_message\` text,
  	\`legal_updated\` text,
  	\`legal_content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`share_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`home_product_range_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`home_global_reach_map_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_intro_main_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_intro_secondary_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // Site Pages become fixed-purpose here, so a page-builder Page has no shape to be
  // carried across: its layout blocks, hero, and arbitrary slug have no column in the
  // new table. No rows are copied. `pnpm import:marketing-site` re-establishes the five
  // fixed Site Pages from the current Astro content, and a Redirect that pointed at one
  // of the old Pages loses its target along with them.
  //
  // Note that Payload runs a migration inside a transaction and SQLite ignores
  // `PRAGMA foreign_keys` there, so the drops below cascade rather than being isolated
  // by the pragmas the generator wrapped them in. Cascading is what we want; the
  // dependent rows describe Pages that are going away.
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_page_type_idx\` ON \`pages\` (\`page_type\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_share_image_idx\` ON \`pages\` (\`share_image_id\`);`)
  await db.run(
    sql`CREATE INDEX \`pages_home_product_range_home_product_range_image_idx\` ON \`pages\` (\`home_product_range_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_home_global_reach_home_global_reach_map_image_idx\` ON \`pages\` (\`home_global_reach_map_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_about_intro_main_image_idx\` ON \`pages\` (\`about_intro_main_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_about_intro_about_intro_secondary_image_idx\` ON \`pages\` (\`about_intro_secondary_image_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_page_type\` text,
  	\`version_slug\` text,
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_share_image_id\` integer,
  	\`version_home_hero_eyebrow\` text,
  	\`version_home_hero_heading\` text,
  	\`version_home_hero_subtext\` text,
  	\`version_home_hero_primary_action_label\` text,
  	\`version_home_hero_primary_action_url\` text,
  	\`version_home_hero_secondary_action_label\` text,
  	\`version_home_hero_secondary_action_url\` text,
  	\`version_home_product_range_heading\` text,
  	\`version_home_product_range_lede\` text,
  	\`version_home_product_range_image_id\` integer,
  	\`version_home_global_reach_eyebrow\` text,
  	\`version_home_global_reach_heading\` text,
  	\`version_home_global_reach_description\` text,
  	\`version_home_global_reach_map_image_id\` integer,
  	\`version_home_ordering_heading\` text,
  	\`version_home_ordering_first_paragraph\` text,
  	\`version_home_ordering_second_paragraph_prefix\` text,
  	\`version_home_ordering_second_paragraph_emphasis\` text,
  	\`version_home_ordering_second_paragraph_suffix\` text,
  	\`version_home_ordering_primary_action_label\` text,
  	\`version_home_ordering_primary_action_url\` text,
  	\`version_home_compliance_heading\` text,
  	\`version_home_compliance_description\` text,
  	\`version_home_compliance_credentials_heading\` text,
  	\`version_home_compliance_credentials_description\` text,
  	\`version_home_countries_eyebrow\` text,
  	\`version_home_countries_heading\` text,
  	\`version_home_countries_description\` text,
  	\`version_home_faqs_heading\` text,
  	\`version_home_faqs_intro\` text,
  	\`version_home_cta_heading\` text,
  	\`version_home_cta_description\` text,
  	\`version_home_cta_primary_action_label\` text,
  	\`version_home_cta_primary_action_url\` text,
  	\`version_home_cta_secondary_action_label\` text,
  	\`version_home_cta_secondary_action_url\` text,
  	\`version_about_intro_eyebrow\` text,
  	\`version_about_intro_heading\` text,
  	\`version_about_intro_description\` text,
  	\`version_about_intro_main_image_id\` integer,
  	\`version_about_intro_secondary_image_id\` integer,
  	\`version_about_intro_breakout_title\` text,
  	\`version_about_intro_breakout_description\` text,
  	\`version_about_intro_breakout_primary_action_label\` text,
  	\`version_about_intro_breakout_primary_action_url\` text,
  	\`version_about_intro_achievements_heading\` text,
  	\`version_about_intro_achievements_description\` text,
  	\`version_about_gallery_heading\` text,
  	\`version_about_gallery_primary_action_label\` text,
  	\`version_about_gallery_primary_action_url\` text,
  	\`version_about_numbers_heading\` text,
  	\`version_about_numbers_description_prefix\` text,
  	\`version_about_numbers_description_emphasis\` text,
  	\`version_about_numbers_description_suffix\` text,
  	\`version_about_numbers_intro_text\` text,
  	\`version_about_numbers_testimonial_quote\` text,
  	\`version_about_numbers_testimonial_author\` text,
  	\`version_about_numbers_testimonial_role\` text,
  	\`version_about_reasons_heading\` text,
  	\`version_about_reasons_description\` text,
  	\`version_about_compliance_heading\` text,
  	\`version_about_compliance_description\` text,
  	\`version_about_compliance_credentials_heading\` text,
  	\`version_about_compliance_credentials_description\` text,
  	\`version_about_cta_heading\` text,
  	\`version_about_cta_description\` text,
  	\`version_about_cta_primary_action_label\` text,
  	\`version_about_cta_primary_action_url\` text,
  	\`version_about_cta_secondary_action_label\` text,
  	\`version_about_cta_secondary_action_url\` text,
  	\`version_contact_heading\` text,
  	\`version_contact_intro\` text,
  	\`version_contact_office_heading\` text,
  	\`version_contact_contact_heading\` text,
  	\`version_contact_social_heading\` text,
  	\`version_contact_form_heading\` text,
  	\`version_contact_form_intro\` text,
  	\`version_contact_form_submit_label\` text,
  	\`version_contact_form_submitting_label\` text,
  	\`version_contact_form_success_message\` text,
  	\`version_contact_form_error_message\` text,
  	\`version_legal_updated\` text,
  	\`version_legal_content\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_share_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_home_product_range_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_home_global_reach_map_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_intro_main_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_about_intro_secondary_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // Site Pages become fixed-purpose here, so a page-builder Page has no shape to be
  // carried across: its layout blocks, hero, and arbitrary slug have no column in the
  // new table. No rows are copied. `pnpm import:marketing-site` re-establishes the five
  // fixed Site Pages from the current Astro content, and a Redirect that pointed at one
  // of the old Pages loses its target along with them.
  //
  // Note that Payload runs a migration inside a transaction and SQLite ignores
  // `PRAGMA foreign_keys` there, so the drops below cascade rather than being isolated
  // by the pragmas the generator wrapped them in. Cascading is what we want; the
  // dependent rows describe Pages that are going away.
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_page_type_idx\` ON \`_pages_v\` (\`version_page_type\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_share_image_idx\` ON \`_pages_v\` (\`version_share_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_product_range_version_home_product_idx\` ON \`_pages_v\` (\`version_home_product_range_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_home_global_reach_version_home_global_r_idx\` ON \`_pages_v\` (\`version_home_global_reach_map_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_version_about_intro_main_im_idx\` ON \`_pages_v\` (\`version_about_intro_main_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_about_intro_version_about_intro_seconda_idx\` ON \`_pages_v\` (\`version_about_intro_secondary_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  // `header` and `footer` change shape rather than gain columns. The template's link
  // groups and nav items have no equivalent in the branded navigation, and SQLite cannot
  // add the new NOT NULL columns to a global that already holds a row. Both globals are
  // rebuilt empty, exactly as `pages` is above; `pnpm import:marketing-site` re-establishes
  // their content from the current Astro site.
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`cta_label\` text NOT NULL,
  	\`cta_url\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`credentials\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(
    sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`,
  )
  // Products were added to the document-lock relationships by `ALTER TABLE ADD COLUMN`,
  // which SQLite can only give an inline foreign key: `products_id` ended up without the
  // `ON DELETE cascade` every other relationship there has, so deleting a locked Product
  // would fail instead of clearing its lock. Rebuilt here with the constraint Payload
  // expects, which also stops the development schema push from rewriting the table.
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`products_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	\`payload_folders_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_folders_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id", "products_id", "media_id", "categories_id", "users_id", "redirects_id", "forms_id", "form_submissions_id", "search_id", "payload_folders_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id", "products_id", "media_id", "categories_id", "users_id", "redirects_id", "forms_id", "form_submissions_id", "search_id", "payload_folders_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_media_block_media_idx\` ON \`pages_blocks_media_block\` (\`media_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`);`)
  await db.run(
    sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_media_block_media_idx\` ON \`_pages_v_blocks_media_block\` (\`media_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`DROP TABLE \`pages_home_product_range_items\`;`)
  await db.run(sql`DROP TABLE \`pages_home_global_reach_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_home_compliance_items\`;`)
  await db.run(sql`DROP TABLE \`pages_home_countries_regions_countries\`;`)
  await db.run(sql`DROP TABLE \`pages_home_countries_regions\`;`)
  await db.run(sql`DROP TABLE \`pages_home_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`pages_about_intro_achievements\`;`)
  await db.run(sql`DROP TABLE \`pages_about_intro_sections\`;`)
  await db.run(sql`DROP TABLE \`pages_about_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_about_numbers_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_about_reasons_items\`;`)
  await db.run(sql`DROP TABLE \`pages_about_compliance_items\`;`)
  await db.run(sql`DROP TABLE \`pages_contact_form_incoterms\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_product_range_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_global_reach_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_compliance_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_countries_regions_countries\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_countries_regions\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_home_faqs_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_intro_achievements\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_intro_sections\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_numbers_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_reasons_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_about_compliance_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_contact_form_incoterms\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`company_social_links\`;`)
  await db.run(sql`DROP TABLE \`company\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_rich_text\` text,
  	\`hero_media_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // The reverse of the note in `up`: a fixed Site Page has no page-builder layout to be
  // restored into, so no rows are copied back.
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_rich_text\` text,
  	\`version_hero_media_id\` integer,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  // The reverse of the note in `up`: a fixed Site Page has no page-builder layout to be
  // restored into, so no rows are copied back.
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v\` (\`version_hero_media_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`,
  )
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`__new_header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_header\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`header\`;`,
  )
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`ALTER TABLE \`__new_header\` RENAME TO \`header\`;`)
  // Safe only because the `header` drop above cascades `header_nav_items` empty:
  // SQLite refuses a NOT NULL column with no default on a table that has rows.
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`link_type\` text DEFAULT 'reference';`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`link_new_tab\` integer;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`link_url\` text;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` ADD \`link_label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`header_nav_items\` DROP COLUMN \`url\`;`)
  await db.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`credentials\`;`)
}
