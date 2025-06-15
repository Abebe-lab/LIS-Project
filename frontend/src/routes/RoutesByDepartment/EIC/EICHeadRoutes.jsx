import { Route } from "react-router-dom";
import ExecutiveDashboard from "../../../pages/Views/ExecutiveView/ExecutiveDashboard";
import ExecActivities from "../../../pages/Views/ExecutiveView/Reports/ExecActivities";
import ExecFinance from "../../../pages/Views/ExecutiveView/Reports/ExecFinance";
//import ExecMapByOccupancy from "../../pages/Views/ExecutiveView/Reports/ExecMapByOccupancy";
//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import ViewMapByCategoryPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewMapByCategoryPage";
import ExecutiveReport from "../../../pages/Views/ExecutiveView/Reports/ExecutiveReport";
//import ExecReportOrganizations from "../../pages/Views/ExecutiveView/Reports/ExecReportOrganizations";
import ViewReferredStatus from "../../../pages/Views/EICView/Forms/ViewReferredStatus";
import ExecRuleSettings from "../../../pages/Views/ExecutiveView/Forms/ExecRuleSettings";
//import ExecReportWeekly from "../../../pages/Views/ExecutiveView/Reports/ExecReportWeekly";
import PlaceParcelOnHold from "../../../pages/Views/ExecutiveView/Forms/PlaceParcelOnHold";

import { ParksDetailByOccupancy, ParksDetailBySector } from "../../../pages/Views/ExecutiveView/DashboardDetail";

export default function EICHeadRoutes() {
  return (
    <>
      <Route path="/" element={<ExecutiveDashboard />} />
      <Route path="/placeOnHold" element={<PlaceParcelOnHold />} />
      <Route path="/execActivities" element={<ExecActivities />} />
      <Route path="/execFinance" element={<ExecFinance />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/execReport" element={<ExecutiveReport />} />
      <Route path="/viewReferredStatus" element={<ViewReferredStatus />} />
      <Route path="/execRuleSettings" element={<ExecRuleSettings />} />
      {/*<Route path="/execReportWeekly" element={<ExecReportWeekly />} /> */}
      <Route path="/parksByOccupancy" element={<ParksDetailByOccupancy />} />
      <Route path="/parksByIndustry" element={<ParksDetailBySector />} />

      {/**<Route path="/execReportMonthly" element={<ExecReportMonthly />} />*/}
    </>
  );
}
