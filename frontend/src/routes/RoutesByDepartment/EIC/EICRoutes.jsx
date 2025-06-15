import { Route } from "react-router-dom";
import RegisterProspectiveInvestor from "../../../pages/Views/EICView/Forms/RegisterProspectiveInvestor";
import PrintDeedForm from "../../../pages/Views/EICView/Forms/PrintDeedForm";
import ViewReferredStatus from "../../../pages/Views/EICView/Forms/ViewReferredStatus";
import EICRuleSettings from "../../../pages/Views/EICView/Forms/EICRuleSettings";
import ReferToIPDC from "../../../pages/Views/EICView/Forms/ReferToIPDC";
import EICReports from "../../../pages/Views/EICView/Reports/EICReports";
import EICDashboard from "../../../pages/Views/EICView/EICDashboard";
import ViewMapByCategoryPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";

import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";

export default function EICRoutes() {
  return (
    <>
      <Route path="/" element={<EICDashboard />} />
      <Route path="/prospectiveInvestor" element={<RegisterProspectiveInvestor />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/referToIPDC" element={<ReferToIPDC />} />
      <Route path="/viewReferredStatus" element={<ViewReferredStatus />} />
      <Route path="/printDeed" element={<PrintDeedForm />} />
      <Route path="/eicRuleSettings" element={<EICRuleSettings />} />
      <Route path="/eicReports" element={<EICReports />} />
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />
    </>
  );
}
