import { Route } from "react-router-dom";
import { ViewMapByCategoryPage } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";
import RegisterProspectiveInvestor from "../../../pages/Views/EICView/Forms/RegisterProspectiveInvestor";
import ViewReferredStatus from "../../../pages/Views/EICView/Forms/ViewReferredStatus";
import PromotionAndMarketingDashboard from "../../../pages/Views/PromotionAndMarketing/PromotionAndMarketingDashboard";
import MarketingAndPromotionReports from "../../../pages/Views/PromotionAndMarketing/Reports/MarketingAndPromotionReports";
import ExecActivities from "../../../pages/Views/ExecutiveView/Reports/ExecActivities";
import { FinancialSummaryReport } from "../../../pages/Views/CorporateResource/FinanceView/Reports";
import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";

export default function PromotionAndMarketingRoutes() {
  return (
    <>
      <Route path="/" element={<PromotionAndMarketingDashboard />} />
      <Route path="/prospectiveInvestor" element={<RegisterProspectiveInvestor />} />
      <Route path="/viewReferredStatus" element={<ViewReferredStatus />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/promReport" element={<MarketingAndPromotionReports />} />
      <Route path="/execActivities" element={<ExecActivities />} />
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />
      <Route path="/financeSummary" element={<FinancialSummaryReport />} />

      {/**<Route path="/execReportMonthly" element={<ExecReportMonthly />} />*/}
    </>
  );
}
