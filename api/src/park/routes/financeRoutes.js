import { Router } from "express";
import multer from "multer";
import financeController from "../controllers/financeController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });
router.post("/collections",  upload.single("file"),financeController.registerCollection);
router.post("/importcollections", upload.single("file"), financeController.importExistingCollections);
router.get("/collections", financeController.getCollections);
router.put("/collections/:id", financeController.updateCollection);
router.delete("/collections/:id", financeController.deleteCollection);

export default router;
