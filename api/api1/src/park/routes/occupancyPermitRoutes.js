import { Router } from "express";
import multer from "multer";
import designAndConstructionController from "../controllers/designAndConstructionController.js"

const router = Router();
const upload = multer({ dest: "uploads/" });

// Occupancy Permit Routes
router.post("/", upload.single("file"), designAndConstructionController.addOccupancyPermit);
router.put("/", designAndConstructionController.updateOccupancyPermit);
router.delete("/", designAndConstructionController.deleteOccupancyPermit);
router.get("/:id", designAndConstructionController.getOccupancyPermitById);
router.get("/:PermitNo", designAndConstructionController.getOccupancyPermitByPermitNo);
router.get("/", designAndConstructionController.getAllOccupancyPermits);

export default router;
