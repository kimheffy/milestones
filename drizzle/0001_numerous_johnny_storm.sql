CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"userId" varchar,
	"expiresAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL
);
--> statement-breakpoint
DROP TABLE "guestBook" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
