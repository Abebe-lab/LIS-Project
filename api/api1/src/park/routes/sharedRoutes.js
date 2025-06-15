//*****COMMON SHARED */
import { Router } from "express";
import multer from "multer";
import reportController from "../controllers/reportController.js";
import DashboardController from "../controllers/DashboardController.js";
import controller from "../controllers/controller.js";
import authController from "../../shared/security/authController.js";
import utilitiesController from "../controllers/utilitiesController.js";
const router = Router();
const upload = multer({ dest: "uploads/" });
//router.get("/search/:term", utilitiesController.search);
router.get("/reports/:department/reportType/:reportType", reportController.getReportsByDepartment);
router.get('/dashboard/:department/:dashboardContent', DashboardController.getDashboardByDepartment);
router.put('/systemConfig', utilitiesController.updateSystemConfig);
router.get('/systemConfig', utilitiesController.getSystemConfig);
router.post("/referToIPDC", controller.referToIPDC);
router.post("/upload", upload.single("file"), controller.uploadZip);
router.get("/systemLog", authController.getSystemLog);

export default router;
