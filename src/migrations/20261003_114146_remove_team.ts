import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "team_members_expertise" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_members" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "team_members_expertise" CASCADE;
  DROP TABLE "team_members" CASCADE;
  ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_author_id_team_members_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_author_id_team_members_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_team_members_fk";
  
  DROP INDEX IF EXISTS "posts_author_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_author_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_team_members_id_idx";
  ALTER TABLE "posts" DROP COLUMN "author_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_author_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_members_id";
  ALTER TABLE "home_page" DROP COLUMN "team_intro_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "team_intro_heading";
  ALTER TABLE "home_page" DROP COLUMN "team_intro_text";
  ALTER TABLE "home_page" DROP COLUMN "hosting_intro_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "hosting_intro_heading";
  ALTER TABLE "home_page" DROP COLUMN "hosting_intro_text";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_team_intro_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_team_intro_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_team_intro_text";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_hosting_intro_eyebrow";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_hosting_intro_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_hosting_intro_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_members_expertise" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"focus" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"links_linkedin" varchar,
  	"links_x" varchar,
  	"links_github" varchar,
  	"links_email" varchar,
  	"order" numeric DEFAULT 100,
  	"is_placeholder" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "author_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_author_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_members_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "team_intro_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "team_intro_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "team_intro_text" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hosting_intro_eyebrow" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hosting_intro_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN "hosting_intro_text" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_team_intro_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_team_intro_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_team_intro_text" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_hosting_intro_eyebrow" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_hosting_intro_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN "version_hosting_intro_text" varchar;
  ALTER TABLE "team_members_expertise" ADD CONSTRAINT "team_members_expertise_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "team_members_expertise_order_idx" ON "team_members_expertise" USING btree ("_order");
  CREATE INDEX "team_members_expertise_parent_id_idx" ON "team_members_expertise" USING btree ("_parent_id");
  CREATE INDEX "team_members_photo_idx" ON "team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "team_members" USING btree ("created_at");
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_team_members_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_team_members_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "public"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload_locked_documents_rels" USING btree ("team_members_id");`)
}
