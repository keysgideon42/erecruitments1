import { Router } from "express";
import { db } from "@workspace/db";
import { organizationsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const orgs = await db.select().from(organizationsTable).orderBy(organizationsTable.name);
    res.json(orgs);
  } catch (err) {
    req.log.error(err, "Failed to list organizations");
    res.status(500).json({ error: "Failed to list organizations" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, logo_url, website, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: "name and type are required" });
    }
    const [org] = await db.insert(organizationsTable).values({ name, description, logo_url, website, type }).returning();
    res.status(201).json(org);
  } catch (err) {
    req.log.error(err, "Failed to create organization");
    res.status(500).json({ error: "Failed to create organization" });
  }
});

export default router;
