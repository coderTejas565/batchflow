ALTER TABLE "teacher_invite" ADD COLUMN "accepted_by" text;--> statement-breakpoint
ALTER TABLE "teacher_invite" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_invite" ADD CONSTRAINT "teacher_invite_accepted_by_user_id_fk" FOREIGN KEY ("accepted_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;