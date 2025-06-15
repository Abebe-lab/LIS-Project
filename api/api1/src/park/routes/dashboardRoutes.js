import {Router} from "express";
const dashboardRoutes = Router();
import DashboardController from '../controllers/DashboardController.js';

dashboardRoutes.get('/:department/:dashboardContent', DashboardController.getDashboardByDepartment);

export default dashboardRoutes;
