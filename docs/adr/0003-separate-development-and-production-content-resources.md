# Separate development and production content resources

Development and Vercel Preview deployments will use dedicated Turso databases and Cloudflare R2 buckets, separate from production. This prevents experiments and unreviewed preview builds from modifying the Site Administrator's live Products, Posts, or Media Assets.
