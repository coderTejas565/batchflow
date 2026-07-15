CREATE TYPE "public"."batch_status" AS ENUM('active', 'completed', 'archived');--> statement-breakpoint
CREATE TABLE "batch" (
	"id" text PRIMARY KEY NOT NULL,
	"institute_id" text NOT NULL,
	"teacher_id" text NOT NULL,
	"created_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" "batch_status" DEFAULT 'active' NOT NULL,
	"start_date" timestamp with time zone,
	"end_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "batch" ADD CONSTRAINT "batch_institute_id_institute_id_fk" FOREIGN KEY ("institute_id") REFERENCES "public"."institute"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch" ADD CONSTRAINT "batch_teacher_id_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch" ADD CONSTRAINT "batch_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "batch_institute_idx" ON "batch" USING btree ("institute_id");--> statement-breakpoint
CREATE INDEX "batch_teacher_idx" ON "batch" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "batch_created_by_idx" ON "batch" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "batch_status_idx" ON "batch" USING btree ("status");