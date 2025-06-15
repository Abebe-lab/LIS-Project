import { Route } from "react-router-dom";
import AssignInfoToMap from "../../../pages/Views/LandInfraDevelopment/GISView/Forms/AssignInfoToMap/AssignInfoToMap";
import ExportDataPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/ExportDataPage";
import PrintMap from "../../../pages/Views/LandInfraDevelopment/GISView/PrintMapFinal/PrintMap";
//prettier-ignore
import { ViewMap, ViewInfrastructureMap, EditMap, ViewMapByCategoryPage, ViewPlanningMap, ViewUnapprovedMap, ViewCadastreMap } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";
import GISReports from "../../../pages/Views/LandInfraDevelopment/GISView/Reports/GISReports";
import GISDashboard from "../../../pages/Views/LandInfraDevelopment/GISView/GISDashboard";
import ImportExistingParkData from "../../../pages/Views/LandInfraDevelopment/GISView/Forms/ImportSpatialData/ImportExistingParkData";
//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import EditImportedData from "../../../pages/Views/LandInfraDevelopment/GISView/Forms/ImportSpatialData/EditImportedData";
//import Map from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Map";
export default function GISRoutes() {
  return (
    <>
      <Route path="/" element={<GISDashboard />} />
      <Route path="/viewMap" element={<ViewMap />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />

      <Route path="/importSpatial" element={<ImportExistingParkData />} />
      <Route path="/assignInfo" element={<AssignInfoToMap />} />
      <Route path="/editMap" element={<EditMap />} />
      <Route path="/printMap" element={<PrintMap />} />
      <Route path="/exportMap" element={<ExportDataPage />} />
      <Route path="/infrastructureMap" element={<ViewInfrastructureMap />} />
      <Route path="/viewPlanningMap" element={<ViewPlanningMap />} />
      <Route path="/viewCadastreMap" element={<ViewCadastreMap />} />
      <Route path="/editImportedData" element={<EditImportedData />} />
      <Route path="/gisReports" element={<GISReports />} />
      <Route path="/viewUnapprovedMap" element={<ViewUnapprovedMap />} />
    </>
  );
}
