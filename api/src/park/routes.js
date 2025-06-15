import { Router } from "express";
//prettier-ignore
import {userRoutes, designManagementRoutes, departmentRoutes, investorRoutes, messageRoutes, agreementRoutes, prospectiveInvestors,
        occupancyPermitRoutes, buildingPermitRoutes, preferencesRoutes, financeRoutes, sharedRoutes, gisRoutes, consultantAndContractorRoutes,parkRoutes
} from "./routes/index.js";
//import pushNotificationRoutes from "./utils/pushNotificationRoutes.js";

const router = Router();
router.use("/users", userRoutes);
router.use("/design-management", designManagementRoutes);
router.use("/departments", departmentRoutes);
router.use("/investors", investorRoutes); //, authMiddleware.authenticateToken
router.use("/messages", messageRoutes);
router.use("/agreements", agreementRoutes);
router.use("/prospectiveInvestors", prospectiveInvestors);
router.use("/occupancyPermits", occupancyPermitRoutes);
router.use("/buildingPermits", buildingPermitRoutes);
router.use("/preferences", preferencesRoutes);
router.use("/finances", financeRoutes);
router.use("/parks", parkRoutes);
//***** BLANK ADDED */
router.use("/", sharedRoutes); //SEARCH, REPORT AND DASHBOARD + SYATEM CONFIG+ REFER TO IPDC + UPLOAD
router.use("/", gisRoutes); //GIS ROUTES
router.use("/", consultantAndContractorRoutes); //CONSULTANT AND CONTRACTOR
//router.use("/notification", pushNotificationRoutes);
export default router;
//TODO: see the bottom comment things to apply
//todo: api optimization https://www.youtube.com/watch?v=zvWKqUiovAM
