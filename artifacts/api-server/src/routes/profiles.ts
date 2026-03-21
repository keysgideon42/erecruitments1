import { Router } from "express";
import { db } from "@workspace/db";
import { profilesTable, documentsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.user_id, userId));
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    req.log.error(err, "Failed to get profile");
    res.status(500).json({ error: "Failed to get profile" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const isComplete = !!(data.full_name && data.email && data.phone && data.nationality && data.education && data.experience);

    const profileData = {
      user_id: userId,
      full_name: data.full_name ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      nationality: data.nationality ?? null,
      date_of_birth: data.date_of_birth ?? null,
      address: data.address ?? null,
      bio: data.bio ?? null,
      linkedin_url: data.linkedin_url ?? null,
      education: data.education ?? null,
      experience: data.experience ?? null,
      skills: data.skills ?? null,
      languages: data.languages ?? null,
      avatar_url: data.avatar_url ?? null,
      is_complete: isComplete,
      updated_at: new Date(),
    };

    const existing = await db.select().from(profilesTable).where(eq(profilesTable.user_id, userId));
    let profile;
    if (existing.length > 0) {
      [profile] = await db.update(profilesTable).set(profileData).where(eq(profilesTable.user_id, userId)).returning();
    } else {
      [profile] = await db.insert(profilesTable).values(profileData).returning();
    }

    res.json(profile);
  } catch (err) {
    req.log.error(err, "Failed to upsert profile");
    res.status(500).json({ error: "Failed to upsert profile" });
  }
});

export default router;
