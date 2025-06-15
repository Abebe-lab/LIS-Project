import { useState } from "react";
//prettier-ignore
import { AddLocation, DataSaverOn, EditLocation, Home, ImportExport, ImportExportSharp, Info, Logout, Map, Print, Report, SettingsAccessibility } from "@mui/icons-material";
import "../no-print.css";
import RootLayout from "../RootLayout";

const gisMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home sx={{ color: "white" }} /> },
  {
    key: "GROUP", iconClass: <Map />, title: "Map",
    detail: [
      { key: "viewMap", to: "/viewMap", title: "View Map", iconClass: <AddLocation /> },
      { key: "viewMapByCategory", to: "/viewMapByCategory", title: "By Category", iconClass: <Map /> },
      { key: "infrastructureMap", to: "/infrastructureMap", title: "Infrastructure", iconClass: <Map /> },
      { key: "viewPlanningMap", to: "/viewPlanningMap", title: "Planning", iconClass: <Map /> },
    ],
  },
  {
    key: "GROUP", iconClass: <DataSaverOn />, title: "Spatial Data",
    detail: [
      { key: "EditMap", to: "/editMap", title: "Edit Map", iconClass: <EditLocation /> },
      { key: "assignInfo", to: "/assignInfo", title: "Assign Info", iconClass: <Info /> },
      { key: "importSpatial", to: "/importSpatial", title: "Import Map Data", iconClass: <ImportExportSharp /> },
      { key: "exportMap", to: "/exportMap", title: "Export Map Data", iconClass: <ImportExport /> },
    ],
  },
  { key: "printMap", to: "/printMap", title: "Print Map", iconClass: <Print /> },
  { key: "gisReports", to: "/gisReports", title: "Reports", iconClass: <Report /> },
  { key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function GISLayout() {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  return (
    <RootLayout department="GIS" open={open} setOpen={setOpen} showProfile={showProfile} setShowProfile={setShowProfile} menuList={gisMenuItems} />
  );
}
