import { useState } from "react";
import {
  Home,
  Map,
  MapsHomeWork,
  Logout,
  Engineering,
  Report,
  SettingsAccessibility,
} from "@mui/icons-material";
import RootLayout from "../RootLayout";
import "../no-print.css";

const designMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home /> },
  {
    key: "issueBuildingPermit",
    to: "/issueBuildingPermit",
    title: "Issue Permit",
    iconClass: <MapsHomeWork />,
  },
  {
    key: "issueOccupancyPermit",
    to: "/issueOccupancyPermit",
    title: "Issue Permit",
    iconClass: <MapsHomeWork />,
  },
  { key: "viewMap", to: "/viewMap", title: "View Map", iconClass: <Map /> },
  {
    key: "GROUP",
    iconClass: <Engineering />,
    title: "Manage",
    detail: [
      {
        key: "Consultants",
        to: "/manageConsultants",
        title: "Consultants",
        iconClass: <Engineering />,
      },
      {
        key: "Contractors",
        to: "/manageContractors",
        title: "Contractors",
        iconClass: <Engineering />,
      },
    ],
  },
  {
    key: "designReports",
    to: "/designReports",
    title: "Reports",
    iconClass: <Report />,
  },
  {
    key: "myPreference",
    to: "/myPreference",
    title: "Preferences",
    iconClass: <SettingsAccessibility />,
  },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];
export default function DesignAndConstructionHeadLayout() {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  return (
    <RootLayout
      department="Design Management"
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={designMenuItems}
    />
  );
}
