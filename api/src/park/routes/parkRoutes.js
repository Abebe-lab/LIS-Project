import {Router} from "express";
import multer from "multer";

const router = Router();
import ParkController from '../controllers/parkController.js';
const upload = multer({ dest: "uploads/", limits: {fieldSize: 10 * 1024 * 1024} });

router.post("/handover", upload.single("file"),ParkController.registerHandover);

router.post("/", upload.none(), ParkController.registerPark);


router.get("/handover",ParkController.getHandovers);
router.get("/handover/:park_id",ParkController.getHandoversByPark);
export default router;
