import { Router, type IRouter } from "express";
import healthRouter from "./health";
import organizationsRouter from "./organizations";
import jobsRouter from "./jobs";
import applicationsRouter from "./applications";
import profilesRouter from "./profiles";
import documentsRouter from "./documents";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/organizations", organizationsRouter);
router.use("/jobs", jobsRouter);
router.use("/applications", applicationsRouter);
router.use("/profiles", profilesRouter);
router.use("/documents", documentsRouter);
router.use("/admin", adminRouter);

export default router;
