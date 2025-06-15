import {Router} from "express";
const router = Router();
import loggingController from "../../shared/security/loggingController.js";

router.get("/",loggingController.getLogs);
router.get("/:id",loggingController.getLogsByUserId);
export default router;
