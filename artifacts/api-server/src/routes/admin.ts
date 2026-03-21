import { Router } from "express";
import { db } from "@workspace/db";
import { applicationsTable, jobsTable, profilesTable, organizationsTable } from "@workspace/db/schema";
import { sql, count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [appCount] = await db.select({ count: count() }).from(applicationsTable);
    const [jobCount] = await db.select({ count: count() }).from(jobsTable);
    const [userCount] = await db.select({ count: count() }).from(profilesTable);
    const [orgCount] = await db.select({ count: count() }).from(organizationsTable);

    const byStatus = await db
      .select({
        status: applicationsTable.status,
        count: count(),
      })
      .from(applicationsTable)
      .groupBy(applicationsTable.status);

    const statusMap: Record<string, number> = {};
    for (const row of byStatus) {
      statusMap[row.status] = Number(row.count);
    }

    res.json({
      total_applications: Number(appCount.count),
      total_jobs: Number(jobCount.count),
      total_users: Number(userCount.count),
      total_organizations: Number(orgCount.count),
      by_status: statusMap,
    });
  } catch (err) {
    req.log.error(err, "Failed to get admin stats");
    res.status(500).json({ error: "Failed to get admin stats" });
  }
});

export default router;
