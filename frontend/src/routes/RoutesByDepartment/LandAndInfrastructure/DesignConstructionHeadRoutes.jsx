//import MapDataProvider from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/MapData/MapDataProvider";
import { Route } from "react-router-dom";

import DaMHeadDashboard from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/DaMHeadDashboard";
import IssueBuildingPermit from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/IssueBuildingPermit";
import IssueOccupancyPermit from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/IssueOccupancyPermit";
//import RegisterBPRequest from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/BPRequest/RegisterBPRequest";
import RegisterComment from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/RegisterComment";
import RegisterConsultant from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/ConsultantAndContractor/RegisterConsultant";
import RegisterContractor from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/ConsultantAndContractor/RegisterContractor";
//import RegisterOPRequest from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/OPRequest/RegisterOPRequest";
import BuildingPermitList from "../../../pages/Views/LandInfraDevelopment/Head/BuildingPermitList";
import OccupancyPermitList from "../../../pages/Views/LandInfraDevelopment/Head/OccupancyPermitList";

import ManageConsultants from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/ConsultantAndContractor/ManageConsultants";
import ManageContractors from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Forms/ConsultantAndContractor/ManageContractors";

import { ViewMap } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";

import DesignReportSelector from "../../../pages/Views/LandInfraDevelopment/DesignAndConstructionView/Reports/DesignReportSelector";

export default function DesignConstructionRoutes() {
  return (
    <>
      <Route path="/" element={<DaMHeadDashboard />} />
      <Route path="/registerComment" element={<RegisterComment />} />
      <Route path="/issueBuildingPermit" element={<IssueBuildingPermit />} />
      <Route path="/issueOccupancyPermit" element={<IssueOccupancyPermit />} />
      <Route path="/listBPermit" element={<BuildingPermitList />} />
      <Route path="/listOPermit" element={<OccupancyPermitList />} />
      <Route path="/registerConsultant" element={<RegisterConsultant />} />
      <Route path="/registerContractor" element={<RegisterContractor />} />
      <Route path="/manageConsultants" element={<ManageConsultants />} />
      <Route path="/manageContractors" element={<ManageContractors />} />
      <Route path="/viewMap" element={<ViewMap />} />
      <Route path="/designReports" element={<DesignReportSelector />} />
    </>
  );
}
/*<Route path="/listContractor" element={<ListContractor />} />*/
