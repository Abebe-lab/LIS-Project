import { Router } from "express";
import InvestorAndAgreementController from "../controllers/investor/InvestorAndAgreementController.js";
import investorAftercareImportController from "../controllers/investor/investorAftercareImportController.js";
const router = Router();
import multer from "multer";
const upload = multer({ dest: "uploads/" });
// Investor and Agreement Routes
router.post("/importTenants", upload.single("file"), investorAftercareImportController.ImportExistingTenantAgreementOrCollection);
router.post("/", upload.single("file"), InvestorAndAgreementController.addNewInvestor);
router.get("/", InvestorAndAgreementController.getInvestorsInfo);
//router.get("/byParkAndSector", InvestorAndAgreementController.getInvestorsByParkAndSector);
router.get("/:id", InvestorAndAgreementController.getInvestorInfoById);
router.post("/activities", InvestorAndAgreementController.addInvestorActivity);
router.delete("/:tin_no", InvestorAndAgreementController.deleteInvestorInfo);
router.put("/:tin_no", InvestorAndAgreementController.updateInvestorInfo);
router.post("/propertyTransfer", upload.single("file"), InvestorAndAgreementController.addPropertyTransfer)
router.get("/propertyTransfer", InvestorAndAgreementController.getPropertyTransfer)
router.post("/propertyTransfer/:id", InvestorAndAgreementController.getPropertyTransferById)
export default router;
