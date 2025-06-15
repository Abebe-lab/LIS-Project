import { Router } from "express";
import multer from "multer";
import designAndConstructionController from "../controllers/designAndConstructionController.js";
import ContractorAndConsultantController from "../controllers/contractorAndConsultantController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// Building Permit Routes
router.post("/building-permits", upload.fields([
  { name: 'architectural', maxCount: 1 },
  { name: 'structural', maxCount: 1 },
  { name: 'sanitary', maxCount: 1 },
  { name: 'electrical', maxCount: 1 },
  { name: 'electroMechanical', maxCount: 1 },
  { name: 'environmental', maxCount: 1 },
  { name: 'other', maxCount: 1 },
  { name: 'ownerCommitment', maxCount: 1 },
  { name: 'consultantCommitment', maxCount: 1 },
  { name: 'contractorCommitment', maxCount: 1 }
]), designAndConstructionController.addBuildingPermit);

router.put("/building-permits", designAndConstructionController.updateBuildingPermit);
router.delete("/building-permits", designAndConstructionController.deleteBuildingPermit);
router.get("/building-permits", designAndConstructionController.getAllBuildingPermits);
router.get("/building-permits/:id", designAndConstructionController.getBuildingPermitById);
router.get("/building-permits/:requestNo/comment", designAndConstructionController.addComment);
router.get("/building-permits/report", designAndConstructionController.getBuildingPermitReport);
router.get("/building-permits/permit-no/:id", designAndConstructionController.getBuildingPermitByPermitNo);

// Occupancy Permit Routes
router.post("/occupancy-permits", upload.single("file"), designAndConstructionController.addOccupancyPermit);
router.put("/occupancy-permits", designAndConstructionController.updateOccupancyPermit);
router.delete("/occupancy-permits", designAndConstructionController.deleteOccupancyPermit);
router.get("/occupancy-permits", designAndConstructionController.getAllOccupancyPermits);
router.get("/occupancy-permits/:id", designAndConstructionController.getOccupancyPermitById);
router.get("/occupancy-permits/permit-no/:PermitNo", designAndConstructionController.getOccupancyPermitByPermitNo);

// Contractor and Consultant Routes
router.post("/consultants", ContractorAndConsultantController.addConsultant);
router.post("/contractors", ContractorAndConsultantController.addContractor);
router.put("/consultants/:id", ContractorAndConsultantController.updateConsultant);
router.put("/contractors/:id", ContractorAndConsultantController.updateContractor);
router.delete("/consultants/:id", ContractorAndConsultantController.deleteConsultant);
router.delete("/contractors/:id", ContractorAndConsultantController.deleteContractor);
router.get("/consultants", ContractorAndConsultantController.getAllConsultants);
router.get("/contractors", ContractorAndConsultantController.getAllContractors);
router.get("/consultants/:id", ContractorAndConsultantController.getConsultantById);
router.get("/contractors/:id", ContractorAndConsultantController.getContractorById);

export default router;
