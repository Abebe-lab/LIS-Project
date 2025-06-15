import { Router } from "express";
import multer from "multer";
import InvestorAndAgreementController from "../controllers/investor/InvestorAndAgreementController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });
// Investor and Agreement Routes
router.post("/", upload.fields([
  { name: 'license', maxCount: 1 },
  { name: 'legal_documents', maxCount: 1 },
  { name: 'proposal', maxCount: 1 },
  { name: 'application', maxCount: 1 }
]), InvestorAndAgreementController.addProspectiveInvestor);
router.get("/", InvestorAndAgreementController.getProspectiveInvestorsInfo);
router.get(
  "/:tin_no",
  InvestorAndAgreementController.getProspectiveInvestorInfoByTinNo
);
router.put("/:tin_no", InvestorAndAgreementController.updateInvestorInfo);
router.delete(
  "/:tin_no",
  InvestorAndAgreementController.deleteProspectiveInvestorInfo
);
export default router;
