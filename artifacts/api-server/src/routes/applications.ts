import { Router } from "express";
import { db } from "@workspace/db";
import { applicationsTable, jobsTable, organizationsTable } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import { Resend } from "resend";

const router = Router();

const FROM_EMAIL = "E-RECRUITMENTS <notifications@erecruitments.org>";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

router.get("/", async (req, res) => {
  try {
    const { user_id, status } = req.query as Record<string, string>;

    const conditions = [];
    if (user_id) conditions.push(eq(applicationsTable.user_id, user_id));
    if (status) conditions.push(eq(applicationsTable.status, status));

    const apps = await db
      .select({
        id: applicationsTable.id,
        user_id: applicationsTable.user_id,
        job_id: applicationsTable.job_id,
        cover_letter: applicationsTable.cover_letter,
        status: applicationsTable.status,
        applicant_name: applicationsTable.applicant_name,
        applicant_email: applicationsTable.applicant_email,
        submitted_at: applicationsTable.submitted_at,
        updated_at: applicationsTable.updated_at,
        job: {
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
        },
      })
      .from(applicationsTable)
      .leftJoin(jobsTable, eq(applicationsTable.job_id, jobsTable.id))
      .leftJoin(organizationsTable, eq(jobsTable.organization_id, organizationsTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(applicationsTable.submitted_at);

    res.json(apps);
  } catch (err) {
    req.log.error(err, "Failed to list applications");
    res.status(500).json({ error: "Failed to list applications" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [app] = await db
      .select({
        id: applicationsTable.id,
        user_id: applicationsTable.user_id,
        job_id: applicationsTable.job_id,
        cover_letter: applicationsTable.cover_letter,
        status: applicationsTable.status,
        applicant_name: applicationsTable.applicant_name,
        applicant_email: applicationsTable.applicant_email,
        submitted_at: applicationsTable.submitted_at,
        updated_at: applicationsTable.updated_at,
        job: {
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
          organization: null,
        },
      })
      .from(applicationsTable)
      .leftJoin(jobsTable, eq(applicationsTable.job_id, jobsTable.id))
      .where(eq(applicationsTable.id, id));

    if (!app) return res.status(404).json({ error: "Application not found" });
    res.json(app);
  } catch (err) {
    req.log.error(err, "Failed to get application");
    res.status(500).json({ error: "Failed to get application" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, job_id, cover_letter, applicant_name, applicant_email } = req.body;
    if (!user_id || !job_id || !applicant_name || !applicant_email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [app] = await db
      .insert(applicationsTable)
      .values({ user_id, job_id, cover_letter, applicant_name, applicant_email, status: "Received" })
      .returning();

    const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, job_id));
    const jobTitle = job?.title ?? "the position";

    try {
      const resend = getResend();
      if (resend) await resend.emails.send({
        from: FROM_EMAIL,
        to: applicant_email,
        subject: `Application Received — ${jobTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1e3a5f; padding: 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 22px;">E-RECRUITMENTS</h1>
            </div>
            <div style="padding: 32px; background: #f9fafb;">
              <h2 style="color: #1e3a5f;">Application Received</h2>
              <p>Dear <strong>${applicant_name}</strong>,</p>
              <p>Thank you for applying for <strong>${jobTitle}</strong>. Your application has been successfully submitted.</p>
              <div style="background: white; border-left: 4px solid #1e3a5f; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0;"><strong>Status:</strong> <span style="color: #2563eb;">Received</span></p>
                <p style="margin: 8px 0 0;"><strong>Reference:</strong> ${app.id}</p>
              </div>
              <p>Our team will review your application and keep you updated on any status changes. You can track your application status by logging into your dashboard.</p>
              <p style="color: #6b7280; font-size: 14px;">If you have any questions, please contact us at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a></p>
            </div>
            <div style="background: #1e3a5f; padding: 16px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} E-RECRUITMENTS. All rights reserved.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      req.log.warn(emailErr, "Failed to send confirmation email");
    }

    res.status(201).json(app);
  } catch (err) {
    req.log.error(err, "Failed to submit application");
    res.status(500).json({ error: "Failed to submit application" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, applicant_email, applicant_name, job_title } = req.body;

    if (!status) return res.status(400).json({ error: "status is required" });

    const validStatuses = ["Received", "Under Review", "Forwarded", "Approved", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [updated] = await db
      .update(applicationsTable)
      .set({ status, updated_at: new Date() })
      .where(eq(applicationsTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: "Application not found" });

    const emailTo = applicant_email ?? updated.applicant_email;
    const name = applicant_name ?? updated.applicant_name ?? "Applicant";
    const title = job_title ?? "the position";

    if (emailTo) {
      const statusColors: Record<string, string> = {
        "Received": "#2563eb",
        "Under Review": "#d97706",
        "Forwarded": "#7c3aed",
        "Approved": "#16a34a",
        "Rejected": "#dc2626",
      };
      const color = statusColors[status] ?? "#1e3a5f";

      try {
        const resend = getResend();
        if (resend) await resend.emails.send({
          from: FROM_EMAIL,
          to: emailTo,
          subject: `Application Update — ${title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1e3a5f; padding: 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 22px;">E-RECRUITMENTS</h1>
              </div>
              <div style="padding: 32px; background: #f9fafb;">
                <h2 style="color: #1e3a5f;">Application Status Update</h2>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Your application for <strong>${title}</strong> has been updated.</p>
                <div style="background: white; border-left: 4px solid ${color}; padding: 16px; margin: 24px 0; border-radius: 4px;">
                  <p style="margin: 0;"><strong>New Status:</strong> <span style="color: ${color}; font-weight: bold;">${status}</span></p>
                </div>
                ${status === "Approved" ? '<p style="color: #16a34a; font-weight: bold;">Congratulations! Please check your email for further instructions.</p>' : ""}
                ${status === "Rejected" ? '<p>Thank you for your interest. We encourage you to apply for future opportunities.</p>' : ""}
                <p style="color: #6b7280; font-size: 14px;">Questions? Contact us at <a href="mailto:info@erecruitments.org">info@erecruitments.org</a></p>
              </div>
              <div style="background: #1e3a5f; padding: 16px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} E-RECRUITMENTS. All rights reserved.</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        req.log.warn(emailErr, "Failed to send status update email");
      }
    }

    res.json(updated);
  } catch (err) {
    req.log.error(err, "Failed to update application status");
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
