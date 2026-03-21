import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").notNull().unique(),
  full_name: text("full_name"),
  email: text("email"),
  phone: text("phone"),
  nationality: text("nationality"),
  date_of_birth: text("date_of_birth"),
  address: text("address"),
  bio: text("bio"),
  linkedin_url: text("linkedin_url"),
  education: text("education"),
  experience: text("experience"),
  skills: text("skills"),
  languages: text("languages"),
  avatar_url: text("avatar_url"),
  is_complete: boolean("is_complete").notNull().default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({ id: true, created_at: true, updated_at: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;
