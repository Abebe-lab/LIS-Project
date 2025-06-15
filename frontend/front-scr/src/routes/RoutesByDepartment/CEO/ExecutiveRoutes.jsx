import { Route } from "react-router-dom";
import ExecutiveDashboard from "../../../pages/Views/ExecutiveView/ExecutiveDashboard";
import ExecActivities from "../../../pages/Views/ExecutiveView/Reports/ExecActivities";
import ExecFinance from "../../../pages/Views/ExecutiveView/Reports/ExecFinance";
//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import ViewMapByCategoryPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";
import ExecutiveReport from "../../../pages/Views/ExecutiveView/Reports/ExecutiveReport";
import ViewReferredStatus from "../../../pages/Views/EICView/Forms/ViewReferredStatus";
import ExecRuleSettings from "../../../pages/Views/ExecutiveView/Forms/ExecRuleSettings";
import PlaceParcelOnHold from "../../../pages/Views/ExecutiveView/Forms/PlaceParcelOnHold";
import { FinancialSummaryReport } from "../../../pages/Views/CorporateResource/FinanceView/Reports";
import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";
import InvestorList from "../../../pages/Views/Shared/Report/List/InvestorList";

export default function ExecutiveRoutes() {
  return (
    <>
      <Route path="/" element={<ExecutiveDashboard />} />
      <Route path="/placeOnHold" element={<PlaceParcelOnHold />} />
      <Route path="/execActivities" element={<ExecActivities />} />
      <Route path="/execFinance" element={<ExecFinance />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/execReport" element={<ExecutiveReport />} />
      <Route path="/investorsList" element={<InvestorList />} />
      <Route path="/viewReferredStatus" element={<ViewReferredStatus />} />
      <Route path="/execRuleSettings" element={<ExecRuleSettings />} />
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />
      <Route path="/financeSummary" element={<FinancialSummaryReport />} />
    </>
  );
}