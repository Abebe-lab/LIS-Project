//https://www.youtube.com/watch?v=K-bxVELldCc
import React from "react";
import { Route } from "react-router-dom";
import {
  ExecutiveRoutes,
  EICRoutes,
  SystemAdminRoutes,
  SystemAdminHeadRoutes,
  FinanceRoutes,
  InvestorAftercareRoutes,
  CommonRoutes,
  ParkStaffRoutes,
  PromotionAndMarketingRoutes,
  DesignConstructionRoutes,
  GISRoutes,
  LandAndInfraDevelopmentHeadRoutes,
  MPandLBHeadRoutes,
  OperationManagementHeadRoutes,
} from "./RoutesByDepartment";

import ApprovePlanPage from "../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/Forms/ApprovePlanPage";
import ApproveImportedSpatialInfo from "../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/Forms/ApproveImportedSpatialInfo";
import ParkStaffReports from "../pages/Views/ParkView/Reports/ParkStaffReports";
import ViewMapByCategoryPage from "../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";
import ParcelList from "../pages/Views/Shared/Report/List/ParcelList";
import LandRuleSettingsForm from "../pages/Views/LandInfraDevelopment/Head/LandRuleSettingsForm";

export default function GetAppropriateRoute({ initialView, decodedUser }) {
  //console.log("decodedUser", decodedUser);
  try {
    const park = decodedUser?.park_id;
    const department = decodedUser?.department_id?.toUpperCase();
    const role = decodedUser?.role?.toUpperCase();
    return (
      <Route path="/" element={initialView}>
        {park !== "000" && ParkStaffRoutes()}
        {department === "EXEC" && ExecutiveRoutes()}
        {department === "EIC" && EICRoutes()}
        {department === "SA" && role === "PROFESSIONAL" && SystemAdminRoutes()}
        {department === "SA" && role === "HEAD" && SystemAdminHeadRoutes()}
        {department === "SA" && SystemAdminRoutes()}
        {department === "GIS" && role === "PROFESSIONAL" && GISRoutes()}
        {department === "GIS" && role === "HEAD" && MPandLBHeadRoutes()}
        {department === "MP" && role === "HEAD" && MPandLBHeadRoutes()}
        {department === "LI" && role === "HEAD" && LandAndInfraDevelopmentHeadRoutes()}
        {department === "FINANCE" && FinanceRoutes()}
        {department === "DES" && DesignConstructionRoutes()}
        {department === "OP-IA" && InvestorAftercareRoutes()}
        {department === "OP-IA" && role === "HEAD" && OperationManagementHeadRoutes()}
        {department === "PADMIN" && ParkStaffRoutes()}
        {department === "PROM" && PromotionAndMarketingRoutes()}
        <Route path="/landRuleSettings" element={<LandRuleSettingsForm />} />
        {/** Park Admin layouts */}
        <Route path="/approveplan" element={<ApprovePlanPage />} />
        <Route path="/approveImportedSpatialInfo" element={<ApproveImportedSpatialInfo />} />
        <Route path="/PASummaryReport" element={<ParkStaffReports />} />
        <Route path="/parcelList" element={<ParcelList />} />
        <Route path="/categorizedMap" element={<ViewMapByCategoryPage />} />
        {CommonRoutes(decodedUser)}
      </Route>
    );
  } catch (error) {
    console.log(error);
  }
}
