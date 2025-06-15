import { useState } from "react";
import { Home, Send, Map, Report, AddBusiness, SwipeRight, Logout, SettingsAccessibility } from "@mui/icons-material";
import { pink } from "@mui/material/colors";

import RootLayout from "../RootLayout";

const EICMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home sx={{ color: pink[500] }} /> },
  { key: "viewMapByCategory", to: "/viewMapByCategory", title: "View map", iconClass: <Map /> },
  { key: "prospectiveInvestor", to: "/prospectiveInvestor", title: "Prospective Investor", iconClass: <AddBusiness /> },
  { key: "referToIPDC", to: "/referToIPDC", title: "Refer to IPDC", iconClass: <Send /> },
  { key: "viewReferredStatus", to: "/viewReferredStatus", title: "Referred Status", iconClass: <SwipeRight /> },
  //  { key: "printDeed", to: "/printDeed", title: "Print Deed", iconClass: <Print /> },
  { key: "eicReports", to: "/eicReports", title: "Reports", iconClass: <Report /> },
  //{ key: "eicRuleSettings", to: "/eicRuleSettings", title: "Settings", iconClass: <Settings /> },
  { key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function EICLayout() {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  return (
    <RootLayout
      department="E.I.C."
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={EICMenuItems}
    />
  );
}
