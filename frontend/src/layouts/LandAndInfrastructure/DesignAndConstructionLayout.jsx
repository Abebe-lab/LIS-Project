import { useState } from "react";
import {
  Foundation,
  Home,
  Map,
  AddBusiness,
  Logout,
  Engineering,
  Summarize,
  Report,
  SettingsAccessibility,
  AddComment,
} from "@mui/icons-material";
import RootLayout from "../RootLayout";
import "../no-print.css";

const designMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home /> },
  {
    key: "GROUP",
    iconClass: <AddBusiness />,
    title: "Building Permit",
    detail: [
      {
        key: "registerBPrequest",
        to: "/registerBPrequest",
        title: "Register",
        iconClass: <AddBusiness />,
      },
      {
        key: "listBPermit",
        to: "/listBPermit",
        title: "List",
        iconClass: <Summarize />,
      },
      {
        key: "registerComment",
        to: "/registerComment",
        title: "Comment",
        iconClass: <AddComment />,
      },
    ],
  },
  {
    key: "GROUP",
    iconClass: <Foundation />,
    title: "Occupancy Permit",
    detail: [
      {
        key: "registerOPrequest",
        to: "/registerOPrequest",
        title: "Register",
        iconClass: <Foundation />,
      },
      {
        key: "listOPermit",
        to: "/listOPermit",
        title: "List",
        iconClass: <Summarize />,
      },
    ],
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
export default function DesignAndConstructionLayout() {
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
