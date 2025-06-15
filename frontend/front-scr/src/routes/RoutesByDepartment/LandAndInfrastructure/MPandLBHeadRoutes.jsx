//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import { Route } from "react-router-dom";
import AssignInfoToMap from "../../../pages/Views/LandInfraDevelopment/GISView/Forms/AssignInfoToMap/AssignInfoToMap";
import PrintMap from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/PrintMap/PrintMap";
//prettier-ignore
import { ViewMap, ViewInfrastructureMap, ViewMapByCategoryPage, ViewPlanningMap, ViewUnapprovedMap, ViewCadastreMap, } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";
import ExportDataPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/ExportDataPage";

import EditMap from "../../../pages/MapApproach2/EditMap2";
import GISReports from "../../../pages/Views/LandInfraDevelopment/GISView/Reports/GISReports";
import ImportExistingParkData from "../../../pages/Views/LandInfraDevelopment/GISView/Forms/ImportSpatialData/ImportExistingParkData";
import MasterPlanHeadDashboard from "../../../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/MasterPlanHeadDashboard";
import ApproveImported from "../../../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/Forms/ApproveImportedSpatialInfo";
import MPandLBReports from "../../../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/Reports/MPandLBReports";
import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import LandInfraReports from "../../../pages/Views/LandInfraDevelopment/Head/Report/LandInfraReports";
//import { LandUseProportionCard } from "../../../pages/Views/LandInfraDevelopment/Head/DashboardDetail";
import LandUseProportionDetailCard from "../../../pages/Views/LandInfraDevelopment/Head/DashboardDetail/LandUseProportionDetailCard";
import PreparePlanToIssueToInvestor from "../../../pages/Views/LandInfraDevelopment/MasterPlanandLandBankView/Forms/PreparePlanToIssueToInvestor";
import ViewUnapprovedSplitAndMerge from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views/ViewUnapprovedSplitAndMerge";
export default function MPandLBHeadRoutes() {
  return (
    <>
      <Route path="/" element={<MasterPlanHeadDashboard />} />
      <Route path="/viewMap" element={<ViewMap />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/importSpatial" element={<ImportExistingParkData />} />
      <Route path="/assignInfo" element={<AssignInfoToMap />} />
      <Route path="/editMap" element={<EditMap />} />
      <Route path="/printMap" element={<PrintMap />} />
      <Route
        path="/exportMap"
        element={
          <MapDataProvider>
            <ExportDataPage />
          </MapDataProvider>
        }
      />
      <Route path="/infrastructureMap" element={<ViewInfrastructureMap />} />
      <Route path="/infrastructureMap" element={<ViewInfrastructureMap />} />
      <Route path="/viewPlanningMap" element={<ViewPlanningMap />} />
      <Route path="/ApproveMapEdit" element={<ApproveImported />} />
      <Route path="/gisReports" element={<GISReports />} />
      <Route path="/landInfraReports" element={<LandInfraReports />} />
      <Route path="/viewUnapprovedMap" element={<ViewUnapprovedMap />} />
      <Route path="/viewCadastreMap" element={<ViewCadastreMap />} />
      <Route path="/mpHeadReports" element={<MPandLBReports />} />
      <Route path="/landUseProportionDetail" element={<LandUseProportionDetailCard />} />
      <Route path="/printPlanForOpearation" element={<PreparePlanToIssueToInvestor />} />
      <Route path="/viewUnapprovedSplitAndMergeMap" element={<ViewUnapprovedSplitAndMerge />} />
      {
        //ViewUnapprovedSplitAndMergeMap
      }
    </>
  );
}
