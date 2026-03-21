import { Router } from "express";
import { db } from "@workspace/db";
import { jobsTable, organizationsTable } from "@workspace/db/schema";
import { eq, and, ilike, or } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { organization_id, sector, search } = req.query as Record<string, string>;

    const conditions = [eq(jobsTable.is_active, true)];
    if (organization_id) conditions.push(eq(jobsTable.organization_id, organization_id));
    if (sector) conditions.push(eq(jobsTable.sector, sector));

    const jobs = await db
      .select({
        id: jobsTable.id,
        title: jobsTable.title,
        description: jobsTable.description,
        organization_id: jobsTable.organization_id,
        sector: jobsTable.sector,
        location: jobsTable.location,
        deadline: jobsTable.deadline,
        employment_type: jobsTable.employment_type,
        is_active: jobsTable.is_active,
        created_at: jobsTable.created_at,
        organization: {
          id: organizationsTable.id,
          name: organizationsTable.name,
          description: organizationsTable.description,
          logo_url: organizationsTable.logo_url,
          website: organizationsTable.website,
          type: organizationsTable.type,
          created_at: organizationsTable.created_at,
        },
      })
      .from(jobsTable)
      .leftJoin(organizationsTable, eq(jobsTable.organization_id, organizationsTable.id))
      .where(and(...conditions))
      .orderBy(jobsTable.created_at);

    const result = search
      ? jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(search.toLowerCase()) ||
            j.description.toLowerCase().includes(search.toLowerCase()) ||
            j.location.toLowerCase().includes(search.toLowerCase())
        )
      : jobs;

    res.json(result);
  } catch (err) {
    req.log.error(err, "Failed to list jobs");
    res.status(500).json({ error: "Failed to list jobs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [job] = await db
      .select({
        id: jobsTable.id,
        title: jobsTable.title,
        description: jobsTable.description,
        organization_id: jobsTable.organization_id,
        sector: jobsTable.sector,
        location: jobsTable.location,
        deadline: jobsTable.deadline,
        employment_type: jobsTable.employment_type,
        is_active: jobsTable.is_active,
        created_at: jobsTable.created_at,
        organization: {
          id: organizationsTable.id,
          name: organizationsTable.name,
          description: organizationsTable.description,
          logo_url: organizationsTable.logo_url,
          website: organizationsTable.website,
          type: organizationsTable.type,
          created_at: organizationsTable.created_at,
        },
      })
      .from(jobsTable)
      .leftJoin(organizationsTable, eq(jobsTable.organization_id, organizationsTable.id))
      .where(eq(jobsTable.id, id));

    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    req.log.error(err, "Failed to get job");
    res.status(500).json({ error: "Failed to get job" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, organization_id, sector, location, deadline, employment_type } = req.body;
    if (!title || !description || !organization_id || !sector || !location || !employment_type) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [job] = await db
      .insert(jobsTable)
      .values({ title, description, organization_id, sector, location, deadline, employment_type })
      .returning();
    res.status(201).json(job);
  } catch (err) {
    req.log.error(err, "Failed to create job");
    res.status(500).json({ error: "Failed to create job" });
  }
});

export default router;
