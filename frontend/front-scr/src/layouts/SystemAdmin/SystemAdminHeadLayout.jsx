import { useState } from "react";
//prettier-ignore
import {
	Home, List, PersonOff, ManageAccounts, HealthAndSafety, Logout, Report, Settings, SettingsAccessibility
} from "@mui/icons-material";
import "../no-print.css";
import RootLayout from "../RootLayout";

const saHeadMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home /> },
  {
    key: "activateDeactivateUser",
    to: "/activateDeactivateUser",
    title: "Activate/Deactivate User",
    iconClass: <PersonOff />,
  },
  { key: "userManagement", to: "/userManagement", title: "User Management", iconClass: <ManageAccounts /> },
  { key: "systemLog", to: "/systemLog", title: "System Log", iconClass: <List /> },
  { key: "systemHealth", to: "/systemHealth", title: "System Health", iconClass: <HealthAndSafety /> },
  { key: "systemConfig", to: "/systemConfig", title: "System Config", iconClass: <Settings /> },
  { key: "systemReport", to: "/systemAdminReport", title: "System Admin Report", iconClass: <Report /> },
  { key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];
//TODO: may be useful in the future when departments can change
//{key: 'registerDepartment', to: '/registerDepartment', title: 'Register Department', iconClass: <Add/>},
export default function SystemAdminHeadLayout() {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  return (
    <RootLayout
      department="S.A. Head"
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={saHeadMenuItems}
    />
  );
}
