import { Router } from "express";
import { db } from "@workspace/db";
import { documentsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const docs = await db.select().from(documentsTable).where(eq(documentsTable.user_id, userId)).orderBy(documentsTable.uploaded_at);
    res.json(docs);
  } catch (err) {
    req.log.error(err, "Failed to list documents");
    res.status(500).json({ error: "Failed to list documents" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, name, type, url, size } = req.body;
    if (!user_id || !name || !type || !url) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [doc] = await db
      .insert(documentsTable)
      .values({ user_id, name, type, url, size: size ? String(size) : null })
      .returning();
    res.status(201).json(doc);
  } catch (err) {
    req.log.error(err, "Failed to record document");
    res.status(500).json({ error: "Failed to record document" });
  }
});

export default router;
