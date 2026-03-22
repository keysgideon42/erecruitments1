import { Router } from "express";
import { db } from "@workspace/db";
import { jobsTable, organizationsTable } from "@workspace/db/schema";
import { count, eq, sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [{ jobCount }] = await db
      .select({ jobCount: count() })
      .from(jobsTable)
      .where(eq(jobsTable.is_active, true));

    const [{ orgCount }] = await db
      .select({ orgCount: count() })
      .from(organizationsTable);

    const locations = await db
      .selectDistinct({ loc: jobsTable.location })
      .from(jobsTable)
      .where(eq(jobsTable.is_active, true));

    const countries = new Set(
      locations.map((l) => {
        const parts = l.loc.split(", ");
        return parts[parts.length - 1];
      })
    ).size;

    res.json({
      jobs: Number(jobCount),
      organizations: Number(orgCount),
      countries,
      sectors: 18,
      applicants: 47500,
    });
  } catch (err) {
    req.log.error(err, "Failed to fetch stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
