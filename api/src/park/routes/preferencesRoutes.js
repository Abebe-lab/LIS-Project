import { Router } from "express";
import utilitiesController from "../controllers/utilitiesController.js";

const router = Router();

//===========Preference
router.post("/", utilitiesController.addPreference);
router.get("/:id", utilitiesController.getPreferences);
router.put("/:id", utilitiesController.updatePreference);
router.delete("/:id", utilitiesController.deletePreference);
/*router.post("/preferences", (req, res) => {
  console.log("see all data");
});*/
export default router;
