import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
//prettier-ignore
import { Home, List, FormatListNumbered, Report, SettingsAccessibility, Logout, Settings, Map } from "@mui/icons-material";

import RootLayout from "../RootLayout";

const invsetorAftercareHeadMenuItems = theme => [
  { key: "home", to: "/", title: "Home", iconClass: <Home /> },
  { key: "investorList", to: "/investorList", title: "Investor List", iconClass: <List /> },
  { key: "viewMapByCategory", to: "/viewMapByCategory", title: "Map By Category", iconClass: <Map /> },
  { key: "propertyList", to: "/parcelList", title: "Parcel List", iconClass: <FormatListNumbered /> },
  { key: "InvAfterCareReport", to: "/InvAfterCareReport", title: "Report", iconClass: <Report /> },
  { key: "rentRateTable", to: "/rentRateTable", title: "Rent Rate Table", iconClass: <Settings /> },
  { key: "leaseRateTable", to: "/leaseRateTable", title: "Lease Rate Table", iconClass: <Settings /> },
  { key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function OperationAndManagementHeadLayout() {
  const theme = useTheme();
  useEffect(() => {
    console.log(theme.palette);
  }, [theme.palette]);
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);

  return (
    <RootLayout
      department="Operations"
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={invsetorAftercareHeadMenuItems(theme)}
    />
  );
}
