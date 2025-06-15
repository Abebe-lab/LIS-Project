import { Router } from "express";
import authController from "../../shared/security/authController.js";

const router = Router();

// router.post("/login", authController.loginUser);
// router.post("/register", authController.upload.single("file"), authController.registerUser);
// router.post("/logout", authController.logout);
router.get("/systemLog", authController.getSystemLog);

export default router;
