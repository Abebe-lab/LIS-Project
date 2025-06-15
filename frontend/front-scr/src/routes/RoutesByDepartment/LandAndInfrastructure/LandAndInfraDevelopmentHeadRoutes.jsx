import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import { Route } from "react-router-dom";
//prettier-ignore
import { ViewMap, ViewMapByCategoryPage, ViewInfrastructureMap, ViewCadastreMap, } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";
import ExportDataPage from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/ExportDataPage";
import PrintMap from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/PrintMap/PrintMap";

import BuildingPermitList from "../../../pages/Views/LandInfraDevelopment/Head/BuildingPermitList";
import OccupancyPermitList from "../../../pages/Views/LandInfraDevelopment/Head/OccupancyPermitList";

import LandInfraReports from "../../../pages/Views/LandInfraDevelopment/Head/Report/LandInfraReports";
import LandInfraDevelopmentDashboard from "../../../pages/Views/LandInfraDevelopment/Head/LandInfraDevelopmentDashboard";
import LandUseProportionDetailCard from "../../../pages/Views/LandInfraDevelopment/Head/DashboardDetail/LandUseProportionDetailCard";

export default function LandAndInfraDevelopmentHeadRoutes() {
  return (
    <>
      <Route path="/" element={<LandInfraDevelopmentDashboard />} />
      <Route path="/viewMap" element={<ViewMap />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/infrastructureMap" element={<ViewInfrastructureMap />} />
      <Route path="/viewCadastreMap" element={<ViewCadastreMap />} />
      <Route path="/printMap" element={<PrintMap />} />
      <Route path="/exportMap" element={<MapDataProvider><ExportDataPage /></MapDataProvider>} />

      <Route path="/landInfraReports" element={<LandInfraReports />} />
      <Route path="/listBPermit" element={<BuildingPermitList />} />
      <Route path="/listOPermit" element={<OccupancyPermitList />} />
      <Route path="/landUseProportionDetail" element={<LandUseProportionDetailCard />} />
    </>
  );
}
