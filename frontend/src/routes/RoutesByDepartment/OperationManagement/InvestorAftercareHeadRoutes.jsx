import React from "react";
import { Route } from "react-router-dom";
import InvestorAftercareDashboard from "../../../pages/Views/OperationAndManagement/InvestorAftercareDashboard";
import ParcelList from "../../../pages/Views/Shared/Report/List/ParcelList";
import InvestorList from "../../../pages/Views/Shared/Report/List/InvestorList";
import InvAftercareReport from "../../../pages/Views/OperationAndManagement/Reports/InvAftercareReport";
import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";
import { FinancialSummaryReport } from "../../../pages/Views/CorporateResource/FinanceView/Reports";
import ExecActivities from "../../../pages/Views/ExecutiveView/Reports/ExecActivities";
import ViewReferredStatus from "../../../pages/Views/EICView/Forms/ViewReferredStatus";
import ViewMapByCategoryPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";
//prettier-ignore
import { RegisterAgreement, TransferPropertyForm, ImportExistingTenant, InvAftercareSettings, RegisterInvestorActivities, 
  RegisterTerminationRequest, AgreementManagementPage, RegisterNewInvestor } from "../../../pages/Views/OperationAndManagement/Forms";
import { LeaseRateTable, RentalRatesTable } from "../../../pages/Views/OperationAndManagement/Head";

export default function InvestorAftercareHeadRoutes() {
  return (
    <>
      <Route path="/" element={<InvestorAftercareDashboard />} />
      <Route path="/registerInvestor" element={<RegisterNewInvestor />} />
      <Route path="/registerAgreement" element={<RegisterAgreement />} />
      <Route path="/registerTerminationRequest" element={<RegisterTerminationRequest />} />
      <Route path="/investorActivities" element={<RegisterInvestorActivities />} />
      <Route path="/investorList" element={<InvestorList />} />
      <Route path="/agreementList" element={<AgreementManagementPage />} />

      <Route path="/listParcel" element={<ParcelList />} />
      <Route path="/importTenant" element={<ImportExistingTenant />} />
      <Route path="/invAftercareReport" element={<InvAftercareReport />} />
      <Route path="/invAftercareSettings" element={<InvAftercareSettings />} />
      <Route path="/transferProperty" element={<TransferPropertyForm />} />
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />
      <Route path="/financeSummary" element={<FinancialSummaryReport />} />
      <Route path="/execActivities" element={<ExecActivities />} />
      <Route path="/viewReferredStatus" element={<ViewReferredStatus />} />

      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/rentRateTable" element={<LeaseRateTable />} />
      <Route path="/leaseRateTable" element={<RentalRatesTable />} />
    </>
  );
}
