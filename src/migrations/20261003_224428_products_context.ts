import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_products_availability" ADD VALUE 'custom';
  ALTER TYPE "public"."enum_products_visual" ADD VALUE 'health';
  ALTER TYPE "public"."enum_products_visual" ADD VALUE 'sacco';
  ALTER TYPE "public"."enum_products_visual" ADD VALUE 'store';
  ALTER TYPE "public"."enum__products_v_version_availability" ADD VALUE 'custom';
  ALTER TYPE "public"."enum__products_v_version_visual" ADD VALUE 'health';
  ALTER TYPE "public"."enum__products_v_version_visual" ADD VALUE 'sacco';
  ALTER TYPE "public"."enum__products_v_version_visual" ADD VALUE 'store';
  ALTER TABLE "products" ADD COLUMN "context_image_id" integer;
  ALTER TABLE "products" ADD COLUMN "context_caption" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_context_image_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_context_caption" varchar;
  ALTER TABLE "products" ADD CONSTRAINT "products_context_image_id_media_id_fk" FOREIGN KEY ("context_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_context_image_id_media_id_fk" FOREIGN KEY ("version_context_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_context_image_idx" ON "products" USING btree ("context_image_id");
  CREATE INDEX "_products_v_version_version_context_image_idx" ON "_products_v" USING btree ("version_context_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP CONSTRAINT "products_context_image_id_media_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_context_image_id_media_id_fk";
  
  ALTER TABLE "products" ALTER COLUMN "availability" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "availability" SET DEFAULT 'live'::text;
  DROP TYPE "public"."enum_products_availability";
  CREATE TYPE "public"."enum_products_availability" AS ENUM('live', 'beta', 'soon');
  ALTER TABLE "products" ALTER COLUMN "availability" SET DEFAULT 'live'::"public"."enum_products_availability";
  ALTER TABLE "products" ALTER COLUMN "availability" SET DATA TYPE "public"."enum_products_availability" USING "availability"::"public"."enum_products_availability";
  ALTER TABLE "products" ALTER COLUMN "visual" SET DATA TYPE text;
  ALTER TABLE "products" ALTER COLUMN "visual" SET DEFAULT 'comms'::text;
  DROP TYPE "public"."enum_products_visual";
  CREATE TYPE "public"."enum_products_visual" AS ENUM('comms', 'school', 'property', 'erp', 'sports', 'payments', 'pos');
  ALTER TABLE "products" ALTER COLUMN "visual" SET DEFAULT 'comms'::"public"."enum_products_visual";
  ALTER TABLE "products" ALTER COLUMN "visual" SET DATA TYPE "public"."enum_products_visual" USING "visual"::"public"."enum_products_visual";
  ALTER TABLE "_products_v" ALTER COLUMN "version_availability" SET DATA TYPE text;
  ALTER TABLE "_products_v" ALTER COLUMN "version_availability" SET DEFAULT 'live'::text;
  DROP TYPE "public"."enum__products_v_version_availability";
  CREATE TYPE "public"."enum__products_v_version_availability" AS ENUM('live', 'beta', 'soon');
  ALTER TABLE "_products_v" ALTER COLUMN "version_availability" SET DEFAULT 'live'::"public"."enum__products_v_version_availability";
  ALTER TABLE "_products_v" ALTER COLUMN "version_availability" SET DATA TYPE "public"."enum__products_v_version_availability" USING "version_availability"::"public"."enum__products_v_version_availability";
  ALTER TABLE "_products_v" ALTER COLUMN "version_visual" SET DATA TYPE text;
  ALTER TABLE "_products_v" ALTER COLUMN "version_visual" SET DEFAULT 'comms'::text;
  DROP TYPE "public"."enum__products_v_version_visual";
  CREATE TYPE "public"."enum__products_v_version_visual" AS ENUM('comms', 'school', 'property', 'erp', 'sports', 'payments', 'pos');
  ALTER TABLE "_products_v" ALTER COLUMN "version_visual" SET DEFAULT 'comms'::"public"."enum__products_v_version_visual";
  ALTER TABLE "_products_v" ALTER COLUMN "version_visual" SET DATA TYPE "public"."enum__products_v_version_visual" USING "version_visual"::"public"."enum__products_v_version_visual";
  DROP INDEX "products_context_image_idx";
  DROP INDEX "_products_v_version_version_context_image_idx";
  ALTER TABLE "products" DROP COLUMN "context_image_id";
  ALTER TABLE "products" DROP COLUMN "context_caption";
  ALTER TABLE "_products_v" DROP COLUMN "version_context_image_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_context_caption";`)
}
