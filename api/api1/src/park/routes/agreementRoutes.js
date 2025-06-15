import { Router } from "express";
import InvestorAndAgreementController from "../controllers/investor/InvestorAndAgreementController.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/",upload.single("file") , InvestorAndAgreementController.addAgreement);
router.get("/", InvestorAndAgreementController.getAgreements);
router.get("/:id", InvestorAndAgreementController.getAgreementById);
router.get("/inPark/:park_id", InvestorAndAgreementController.getAgreementsByParkId);
router.get("/WithDetail", InvestorAndAgreementController.getAgreementsWithDetail);
router.get("/:parkId/getNewId", InvestorAndAgreementController.getNewAgreementIdByParkId);
router.post("/:id/terminationRequest",upload.single("file") ,InvestorAndAgreementController.addTerminationRequest);
router.put("/suspend", InvestorAndAgreementController.suspendAgreement);
router.put("/resume", InvestorAndAgreementController.resumeAgreement);
router.delete("/:id", InvestorAndAgreementController.deleteAgreement);
router.put("/:id", InvestorAndAgreementController.updateAgreement);
router.put("/:id/terminate", InvestorAndAgreementController.terminateAgreement);


export default router;