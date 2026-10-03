import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"word" varchar
  );
  
  CREATE TABLE "home_page_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "_home_page_v_version_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"word" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_reasons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "home_page" ADD COLUMN "why_intro_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_intro_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "why_intro_text" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_why_intro_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_why_intro_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_why_intro_text" varchar;
  ALTER TABLE "home_page_hero_rotating_words" ADD CONSTRAINT "home_page_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_reasons" ADD CONSTRAINT "home_page_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_rotating_words" ADD CONSTRAINT "_home_page_v_version_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_reasons" ADD CONSTRAINT "_home_page_v_version_reasons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_hero_rotating_words_order_idx" ON "home_page_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "home_page_hero_rotating_words_parent_id_idx" ON "home_page_hero_rotating_words" USING btree ("_parent_id");
  CREATE INDEX "home_page_reasons_order_idx" ON "home_page_reasons" USING btree ("_order");
  CREATE INDEX "home_page_reasons_parent_id_idx" ON "home_page_reasons" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_hero_rotating_words_order_idx" ON "_home_page_v_version_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_rotating_words_parent_id_idx" ON "_home_page_v_version_hero_rotating_words" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_reasons_order_idx" ON "_home_page_v_version_reasons" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_reasons_parent_id_idx" ON "_home_page_v_version_reasons" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_hero_rotating_words" CASCADE;
  DROP TABLE "home_page_reasons" CASCADE;
  DROP TABLE "_home_page_v_version_hero_rotating_words" CASCADE;
  DROP TABLE "_home_page_v_version_reasons" CASCADE;
  ALTER TABLE "home_page" DROP COLUMN "why_intro_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "why_intro_heading";
  ALTER TABLE "home_page" DROP COLUMN "why_intro_text";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_why_intro_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_why_intro_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_why_intro_text";`)
}
