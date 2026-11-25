import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "email" SET DEFAULT 'info@oqtekal.com';
  ALTER TABLE "site_settings" ADD COLUMN "privacy_email" varchar DEFAULT 'privacy@oqtekal.com' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "legal_name" varchar DEFAULT 'OQTEKAL EAST AFRICA LIMITED' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "company_number" varchar DEFAULT 'PVT-Y2UP85P' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ALTER COLUMN "email" SET DEFAULT 'hello@oqtekal.com';
  ALTER TABLE "site_settings" DROP COLUMN "privacy_email";
  ALTER TABLE "site_settings" DROP COLUMN "legal_name";
  ALTER TABLE "site_settings" DROP COLUMN "company_number";`)
}
