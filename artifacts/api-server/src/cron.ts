import cron from "node-cron";
import { db } from "@workspace/db";
import { jobsTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";
import { logger } from "./lib/logger";

async function refreshJobDates(): Promise<void> {
  try {
    logger.info("Cron: Starting weekly job date refresh...");

    const result = await db.execute(sql`
      UPDATE jobs
      SET
        created_at = NOW() - (random() * interval '7 days'),
        deadline   = (NOW() + interval '45 days' + (random() * interval '135 days'))::date::text
      WHERE is_active = true
      RETURNING id
    `);

    const count = (result as { rows: unknown[] }).rows?.length ?? 0;
    logger.info({ count }, "Cron: Job dates refreshed successfully");
  } catch (err) {
    logger.error({ err }, "Cron: Failed to refresh job dates");
  }
}

export function startCron(): void {
  cron.schedule(
    "0 3 * * 0",
    () => {
      void refreshJobDates();
    },
    { timezone: "UTC" },
  );

  logger.info("Cron: Weekly job date refresh scheduled (Sunday 03:00 UTC)");
}
