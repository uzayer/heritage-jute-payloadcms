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
  await db.run(sql`CREATE INDEX \`pages_home_product_range_items_order_idx\` ON \`pages_home_product_range_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_product_range_items_parent_id_idx\` ON \`pages_home_product_range_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`pages_home_global_reach_stats_order_idx\` ON \`pages_home_global_reach_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_global_reach_stats_parent_id_idx\` ON \`pages_home_global_reach_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_home_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_home_compliance_items_order_idx\` ON \`pages_home_compliance_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_compliance_items_parent_id_idx\` ON \`pages_home_compliance_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_home_countries_regions_countries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`flag\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_home_countries_regions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_home_countries_regions_countries_order_idx\` ON \`pages_home_countries_regions_countries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_countries_regions_countries_parent_id_idx\` ON \`pages_home_countries_regions_countries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_home_countries_regions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_home_countries_regions_order_idx\` ON \`pages_home_countries_regions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_countries_regions_parent_id_idx\` ON \`pages_home_countries_regions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_home_faqs_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_home_faqs_items_order_idx\` ON \`pages_home_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_faqs_items_parent_id_idx\` ON \`pages_home_faqs_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_about_intro_achievements\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_about_intro_achievements_order_idx\` ON \`pages_about_intro_achievements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_intro_achievements_parent_id_idx\` ON \`pages_about_intro_achievements\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_about_intro_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_about_intro_sections_order_idx\` ON \`pages_about_intro_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_intro_sections_parent_id_idx\` ON \`pages_about_intro_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_about_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_about_gallery_images_order_idx\` ON \`pages_about_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_gallery_images_parent_id_idx\` ON \`pages_about_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_gallery_images_image_idx\` ON \`pages_about_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_about_numbers_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_about_numbers_stats_order_idx\` ON \`pages_about_numbers_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_numbers_stats_parent_id_idx\` ON \`pages_about_numbers_stats\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`pages_about_reasons_items_order_idx\` ON \`pages_about_reasons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_reasons_items_parent_id_idx\` ON \`pages_about_reasons_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_about_compliance_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_about_compliance_items_order_idx\` ON \`pages_about_compliance_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_compliance_items_parent_id_idx\` ON \`pages_about_compliance_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_contact_form_incoterms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_contact_form_incoterms_order_idx\` ON \`pages_contact_form_incoterms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_contact_form_incoterms_parent_id_idx\` ON \`pages_contact_form_incoterms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
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
  	\`about_gallery_description\` text,
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
  await db.run(sql`CREATE UNIQUE INDEX \`pages_page_type_idx\` ON \`pages\` (\`page_type\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_share_image_idx\` ON \`pages\` (\`share_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_product_range_home_product_range_image_idx\` ON \`pages\` (\`home_product_range_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_home_global_reach_home_global_reach_map_image_idx\` ON \`pages\` (\`home_global_reach_map_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_intro_about_intro_main_image_idx\` ON \`pages\` (\`about_intro_main_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_about_intro_about_intro_secondary_image_idx\` ON \`pages\` (\`about_intro_secondary_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_product_range_items_order_idx\` ON \`_pages_v_version_home_product_range_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_product_range_items_parent_id_idx\` ON \`_pages_v_version_home_product_range_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_global_reach_stats_order_idx\` ON \`_pages_v_version_home_global_reach_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_global_reach_stats_parent_id_idx\` ON \`_pages_v_version_home_global_reach_stats\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_compliance_items_order_idx\` ON \`_pages_v_version_home_compliance_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_compliance_items_parent_id_idx\` ON \`_pages_v_version_home_compliance_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_countries_regions_countries_order_idx\` ON \`_pages_v_version_home_countries_regions_countries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_countries_regions_countries_parent_id_idx\` ON \`_pages_v_version_home_countries_regions_countries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_home_countries_regions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_countries_regions_order_idx\` ON \`_pages_v_version_home_countries_regions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_countries_regions_parent_id_idx\` ON \`_pages_v_version_home_countries_regions\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_faqs_items_order_idx\` ON \`_pages_v_version_home_faqs_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_faqs_items_parent_id_idx\` ON \`_pages_v_version_home_faqs_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_achievements_order_idx\` ON \`_pages_v_version_about_intro_achievements\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_achievements_parent_id_idx\` ON \`_pages_v_version_about_intro_achievements\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_sections_order_idx\` ON \`_pages_v_version_about_intro_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_sections_parent_id_idx\` ON \`_pages_v_version_about_intro_sections\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_gallery_images_order_idx\` ON \`_pages_v_version_about_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_gallery_images_parent_id_idx\` ON \`_pages_v_version_about_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_gallery_images_image_idx\` ON \`_pages_v_version_about_gallery_images\` (\`image_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_numbers_stats_order_idx\` ON \`_pages_v_version_about_numbers_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_numbers_stats_parent_id_idx\` ON \`_pages_v_version_about_numbers_stats\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_reasons_items_order_idx\` ON \`_pages_v_version_about_reasons_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_reasons_items_parent_id_idx\` ON \`_pages_v_version_about_reasons_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_compliance_items_order_idx\` ON \`_pages_v_version_about_compliance_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_compliance_items_parent_id_idx\` ON \`_pages_v_version_about_compliance_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_version_contact_form_incoterms_order_idx\` ON \`_pages_v_version_contact_form_incoterms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_contact_form_incoterms_parent_id_idx\` ON \`_pages_v_version_contact_form_incoterms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
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
  	\`version_about_gallery_description\` text,
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
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_page_type_idx\` ON \`_pages_v\` (\`version_page_type\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_share_image_idx\` ON \`_pages_v\` (\`version_share_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_product_range_version_home_product_idx\` ON \`_pages_v\` (\`version_home_product_range_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_home_global_reach_version_home_global_r_idx\` ON \`_pages_v\` (\`version_home_global_reach_map_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_version_about_intro_main_im_idx\` ON \`_pages_v\` (\`version_about_intro_main_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_about_intro_version_about_intro_seconda_idx\` ON \`_pages_v\` (\`version_about_intro_secondary_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`posts_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`hero_image_id\` integer,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_hero_image_idx\` ON \`posts\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_hero_image_id\` integer,
  	\`version_content\` text,
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_hero_image_idx\` ON \`_posts_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`products_overview\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_overview_order_idx\` ON \`products_overview\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_overview_parent_id_idx\` ON \`products_overview\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_specification_groups_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_specification_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_specification_groups_specifications_order_idx\` ON \`products_specification_groups_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_specification_groups_specifications_parent_id_idx\` ON \`products_specification_groups_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_specification_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_specification_groups_order_idx\` ON \`products_specification_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_specification_groups_parent_id_idx\` ON \`products_specification_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_variants_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_variants_specifications_order_idx\` ON \`products_variants_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_variants_specifications_parent_id_idx\` ON \`products_variants_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_variants_order_idx\` ON \`products_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_variants_parent_id_idx\` ON \`products_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`category_id\` integer,
  	\`image_id\` integer,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`name\` text,
  	\`short_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`products_category_idx\` ON \`products\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`products_image_idx\` ON \`products\` (\`image_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`products_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_texts_order_parent\` ON \`products_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_overview\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_order_idx\` ON \`_products_v_version_overview\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_overview_parent_id_idx\` ON \`_products_v_version_overview\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_specification_groups_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_version_specification_groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_specification_groups_specifications_order_idx\` ON \`_products_v_version_specification_groups_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_specification_groups_specifications_parent_id_idx\` ON \`_products_v_version_specification_groups_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_specification_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_specification_groups_order_idx\` ON \`_products_v_version_specification_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_specification_groups_parent_id_idx\` ON \`_products_v_version_specification_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_variants_specifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`value\` text,
  	\`highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_version_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_variants_specifications_order_idx\` ON \`_products_v_version_variants_specifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_variants_specifications_parent_id_idx\` ON \`_products_v_version_variants_specifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_variants_order_idx\` ON \`_products_v_version_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_variants_parent_id_idx\` ON \`_products_v_version_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_category_id\` integer,
  	\`version_image_id\` integer,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_name\` text,
  	\`version_short_description\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_category_idx\` ON \`_products_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_image_idx\` ON \`_products_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_texts_order_parent\` ON \`_products_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`product_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`product_categories_slug_idx\` ON \`product_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`product_categories_updated_at_idx\` ON \`product_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`product_categories_created_at_idx\` ON \`product_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`caption\` text,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media_folder_idx\` ON \`media\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_doc_idx\` ON \`categories_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`priority\` numeric,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders_folder_type\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_order_idx\` ON \`payload_folders_folder_type\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_type_parent_idx\` ON \`payload_folders_folder_type\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_folders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`folder_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`folder_id\`) REFERENCES \`payload_folders\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_folders_name_idx\` ON \`payload_folders\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_folder_idx\` ON \`payload_folders\` (\`folder_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_updated_at_idx\` ON \`payload_folders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_folders_created_at_idx\` ON \`payload_folders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`products_id\` integer,
  	\`product_categories_id\` integer,
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
  	FOREIGN KEY (\`product_categories_id\`) REFERENCES \`product_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_product_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`product_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_folders_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_folders_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`description\` text,
  	\`url\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header_nav_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_order_idx\` ON \`header_nav_items_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_parent_id_idx\` ON \`header_nav_items_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_links_image_idx\` ON \`header_nav_items_links\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`credentials\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`company_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`network\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`company_social_links_order_idx\` ON \`company_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`company_social_links_parent_id_idx\` ON \`company_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`company_trade_terms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`company\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`company_trade_terms_order_idx\` ON \`company_trade_terms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`company_trade_terms_parent_id_idx\` ON \`company_trade_terms\` (\`_parent_id\`);`)
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
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  await db.run(sql`DROP TABLE \`pages\`;`)
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
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`posts_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`products_overview\`;`)
  await db.run(sql`DROP TABLE \`products_specification_groups_specifications\`;`)
  await db.run(sql`DROP TABLE \`products_specification_groups\`;`)
  await db.run(sql`DROP TABLE \`products_variants_specifications\`;`)
  await db.run(sql`DROP TABLE \`products_variants\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_texts\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_overview\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_specification_groups_specifications\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_specification_groups\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_variants_specifications\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_variants\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_texts\`;`)
  await db.run(sql`DROP TABLE \`product_categories\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_folders_folder_type\`;`)
  await db.run(sql`DROP TABLE \`payload_folders\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items_links\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header_mobile_groups_links\`;`)
  await db.run(sql`DROP TABLE \`header_mobile_groups\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`company_social_links\`;`)
  await db.run(sql`DROP TABLE \`company_trade_terms\`;`)
  await db.run(sql`DROP TABLE \`company\`;`)
}
