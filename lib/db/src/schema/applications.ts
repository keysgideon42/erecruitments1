import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { jobsTable } from "./jobs";

export const applicationsTable = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull(),
  job_id: uuid("job_id").notNull().references(() => jobsTable.id),
  cover_letter: text("cover_letter"),
  status: text("status").notNull().default("Received"),
  applicant_name: text("applicant_name"),
  applicant_email: text("applicant_email"),
  submitted_at: timestamp("submitted_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertApplicationSchema = createInsertSchema(applicationsTable).omit({ id: true, submitted_at: true, updated_at: true });
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applicationsTable.$inferSelect;
