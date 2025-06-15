import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

import {
  Home,
  List,
  FormatListNumbered,
  Report,
  SettingsAccessibility,
  Logout,
  Settings,
  Map,
} from "@mui/icons-material";

import RootLayout from "../RootLayout";

const invsetorAftercareMenuItems = theme => [
  {
    key: "home",
    to: "/",
    title: "Home",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "white" }}>
        <Home />
      </Box>
    ),
  },

  {
    key: "investorList",
    to: "/investorList",
    title: "Investor List",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <List />
      </Box>
    ),
  },
  {
    key: "viewMapByCategory",
    to: "/viewMapByCategory",
    title: "Map By Category",
    iconClass: <Map />,
  },
  {
    key: "propertyList",
    to: "/parcelList",
    title: "Parcel List",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <FormatListNumbered />
      </Box>
    ),
  },
  {
    key: "InvAfterCareReport",
    to: "/InvAfterCareReport",
    title: "Report",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <Report />
      </Box>
    ),
  },
  {
    key: "invAftercareSettings",
    to: "/invAftercareSettings",
    title: "Settings",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <Settings />
      </Box>
    ),
  },
  {
    key: "myPreference",
    to: "/myPreference",
    title: "Preferences",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <SettingsAccessibility />
      </Box>
    ),
  },
  {
    key: "logout",
    to: "/logout",
    title: "Logout",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <Logout />
      </Box>
    ),
  },
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
      menuList={invsetorAftercareMenuItems(theme)}
    />
  );
}
