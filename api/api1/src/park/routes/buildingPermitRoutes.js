import { Router } from "express";
import multer from "multer";
import designAndConstructionController from "../controllers/designAndConstructionController.js"

const router = Router();
const upload = multer({ dest: "uploads/" });
// Building Permit Routes
router.post("/", upload.fields([
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
  
  router.put("/", designAndConstructionController.updateBuildingPermit);
  router.delete("/", designAndConstructionController.deleteBuildingPermit);
  router.get("/", designAndConstructionController.getAllBuildingPermits);
  router.get("/:requestNo/comment", designAndConstructionController.addComment);
  router.get("/report", designAndConstructionController.getBuildingPermitReport);
  router.get("/:id", designAndConstructionController.getBuildingPermitById);
  router.get("/getBuildingPermitsByPermitNo/:id", designAndConstructionController.getBuildingPermitByPermitNo);//???

export default router;
