import { Router } from "express";
import contractorAndConsultantController from "../controllers/contractorAndConsultantController.js";


const router = Router();
// Contractor and Consultant Routes
router.post("/consultants", contractorAndConsultantController.addConsultant);
router.post("/contractors", contractorAndConsultantController.addContractor);
router.put("/consultants/:id", contractorAndConsultantController.updateConsultant);
router.put("/contractors/:id", contractorAndConsultantController.updateContractor);
router.delete("/consultants/:id", contractorAndConsultantController.deleteConsultant);
router.delete("/contractors/:id", contractorAndConsultantController.deleteContractor);
router.get("/consultants", contractorAndConsultantController.getAllConsultants);
router.get("/contractors", contractorAndConsultantController.getAllContractors);
router.get("/consultants/:id", contractorAndConsultantController.getConsultantById);
router.get("/contractors/:id", contractorAndConsultantController.getContractorById);

export default router;
