import React from "react";
import { Route } from "react-router-dom";
import TransferPropertyForm from "../../../pages/Views/OperationAndManagement/Forms/TransferPropertyForm";
import ParcelList from "../../../pages/Views/Shared/Report/List/ParcelList";
import RegisterInvestorActivities from "../../../pages/Views/OperationAndManagement/Forms/RegisterInvestorActivities";
import InvestorList from "../../../pages/Views/Shared/Report/List/InvestorList";
import InvAftercareReport from "../../../pages/Views/OperationAndManagement/Reports/InvAftercareReport";
import ImportExistingTenant from "../../../pages/Views/OperationAndManagement/Forms/ImportExistingTenant";
import InvAftercareSettings from "../../../pages/Views/OperationAndManagement/Forms/InvAftercareSettings";

import ViewMapByCategoryPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";
//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";
import { FinancialSummaryReport } from "../../../pages/Views/CorporateResource/FinanceView/Reports";
import AgreementManagementPage from "../../../pages/Views/OperationAndManagement/Forms/AgreementManagementPage";
export default function OperationManagementHeadRoutes() {
  return (
    <>
      <Route path="/" element={<OperationManagementHeadRoutes />} />
      <Route path="/investorActivities" element={<RegisterInvestorActivities />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/investorList" element={<InvestorList />} />
      <Route path="/listParcel" element={<ParcelList />} />
      <Route path="/importTenant" element={<ImportExistingTenant />} />
      <Route path="/invAftercareReport" element={<InvAftercareReport />} />
      <Route path="/invAftercareSettings" element={<InvAftercareSettings />} />
      <Route path="/transferProperty" element={<TransferPropertyForm />} />
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />
      <Route path="/financeSummary" element={<FinancialSummaryReport />} />
      <Route path="/agreementList" element={<AgreementManagementPage />} />
    </>
  );
}
