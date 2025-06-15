import { Router } from "express";
//import rateLimit from "express-rate-limit";

import authController from "../../shared/security/authController.js";
//import utilitiesController from "../controllers/utilitiesController.js";
import multer from "multer";
import path from "path";

const upload = multer({ dest: "uploads/" });
const userRoutes = Router();

/*const loginAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many login attempt from this terminal, Please try again after 15 minutes.",
});*/

//userRoutes.post("/login", loginAccountLimiter, authController.loginUser);
userRoutes.post("/login", authController.loginUser);
userRoutes.post("/", upload.single("file"), authController.registerUser);
userRoutes.get("/", authController.getUsers);
userRoutes.get("/summary", authController.getUsersSummary);
userRoutes.post("/resetPassword", authController.resetPassword);
userRoutes.get("/:id", authController.getUserById);
userRoutes.put("/:id/activateDeactivate", authController.activateDeactivateUser);
userRoutes.post("/:id/logout", authController.logout);
userRoutes.post("/:id/changePassword", authController.changePassword);
userRoutes.get("/systemLog", authController.getSystemLog);
userRoutes.get("/images/:id", (req, res) => {
  const imgPath = path.join(process.cwd(), "/assets/pictures/staff/", `${req.params.id}.jpg`);
  res.sendFile(imgPath);
});
//userRoutes.get("/", authController.getUsers);
//userRoutes.get("/summary", authController.getUsersSummary);
//userRoutes.get("/:id", authController.getUserById);
//userRoutes.put("/:id/activateDeactivate", authController.activateDeactivateUser);
userRoutes.post("/changePassword", authController.changePassword);

export default userRoutes;
//router.get("/systemLog", authController.getSystemLog);
/*protected
userRoutes.get("/protected", authController.verifyAuth, (req, res) => {
  res.send(`Hello ${req.user.username}!`);
});
userRoutes.get("/protected", authController.verifyAuth, (req, res) => {
  res.send(`Hello ${req.user.username}!`);
});*/
