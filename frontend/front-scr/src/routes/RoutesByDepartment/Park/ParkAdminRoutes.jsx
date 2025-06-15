import React from "react";
import { Route } from "react-router-dom";
import ParkStaffDashboard from "../../../pages/Views/ParkView/ParkStaffDashboard";
import PrintMap from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/PrintMap/PrintMap";
import TransferPropertyForm from "../../../pages/Views/OperationAndManagement/Forms/TransferPropertyForm";
import ParcelList from "../../../pages/Views/Shared/Report/List/ParcelList";
import InvestorList from "../../../pages/Views/Shared/Report/List/InvestorList";
import ParkStaffReports from "../../../pages/Views/ParkView/Reports/ParkStaffReports";
import RegisterHandover from "../../../pages/Views/ParkView/Forms/RegisterHandover";

import { ViewMap, ViewMapByCategoryPage } from "../../../pages/Views/LandInfraDevelopment/GISView/MapRelated/Views";

export default function ParkAdminRoutes() {
  return (
    <>
      <Route path="/" element={<ParkStaffDashboard />} />
      <Route path="/registerHandover" element={<RegisterHandover />} />
      <Route path="/viewMap" element={<ViewMap />} />
      <Route path="/viewMapByCategory" element={<ViewMapByCategoryPage />} />
      <Route path="/printMap" element={<PrintMap />} />
      <Route path="/investorList" element={<InvestorList />} />

      <Route path="/listParcel" element={<ParcelList />} />
      <Route path="/PASummaryReport" element={<ParkStaffReports />} />
      <Route path="/transferProperty" element={<TransferPropertyForm />} />
    </>
  );
}
