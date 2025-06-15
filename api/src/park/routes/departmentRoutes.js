import { Router } from "express";
import DepartmentController from "../controllers/DepartmentController.js";


const router = Router();
router.post("/", DepartmentController.registerDepartment);
router.get("/", DepartmentController.getDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.put("/:id", DepartmentController.updateDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);

export default router;
