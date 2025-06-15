import { Router } from "express";
import pushNotificatonController from "../controllers/pushNotificatonController.js";
const router = Router();

//Subscribe Route
router.post("/subscribe", pushNotificatonController.subscribe);
router.post("/notify", pushNotificatonController.notify);
export default router ;
