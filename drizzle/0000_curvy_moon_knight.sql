CREATE SCHEMA IF NOT EXISTS "drizzle";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "popularity" AS ENUM('unknown', 'known', 'popular');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle"."cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"popularity" "popularity",
	"country_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle"."countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"thoanh" varchar(26),
	CONSTRAINT "countries_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "drizzle"."countries" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle"."cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "drizzle"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
