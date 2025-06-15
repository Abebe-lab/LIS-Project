import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
//prettier-ignore
import { Home, HowToReg, Handshake, List, AddTask, FormatListNumbered, MoveDown, Report, SettingsAccessibility, 
          Cancel, Logout, Settings, AddBusiness, ListAlt, ImportExport,Map } from "@mui/icons-material";

import RootLayout from "../RootLayout";
//import IPDCCustomListItemIcon from "../../components/Controls/IPDCCustomListItemIcon";
const invsetorAftercareMenuItems = theme => [
  {
    key: "home",
    to: "/",
    title: "Home",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "white" }}>
        <Home sx={{fill: "white"}}/>
      </Box>
    ),
  },
  {
    key: "GROUP",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <AddBusiness />
      </Box>
    ),
    title: "Register",
    detail: [
      {
        key: "registerInvestor",
        to: "/registerInvestor",
        title: "Investor",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <HowToReg />
          </Box>
        ),
      },
      {
        key: "registerAgreement",
        to: "/registerAgreement",
        title: "Agreement",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <Handshake />
          </Box>
        ),
      },
      {
        key: "registerTerminationRequest",
        to: "/registerTerminationRequest",
        title: "Termination Application",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <Cancel />
          </Box>
        ),
      },
      {
        key: "investorActivities",
        to: "/investorActivities",
        title: "Investor Activities",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <AddTask />
          </Box>
        ),
      },
    ],
  },
  {
    key: "GROUP",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <ListAlt />
      </Box>
    ),
    title: "List",
    detail: [
      {
        key: "agreementList",
        to: "/agreementList",
        title: "Agreements",
        iconClass: (
          <Box>
            <List />
          </Box>
        ),
      },
      {
        key: "investorList",
        to: "/investorList",
        title: "Investors",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <List />
          </Box>
        ),
      },
      {
        key: "propertyList",
        to: "/parcelList",
        title: "Parcels",
        iconClass: (
          <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
            <FormatListNumbered />
          </Box>
        ),
      },
    ],
  },
  {
    key: "viewMapByCategory",
    to: "/viewMapByCategory",
    title: "Map By Category",
    iconClass: <Map />,
  },
  {
    key: "transferProperty",
    to: "/transferProperty",
    title: "Transfer Property",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <MoveDown />
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
    key: "importTenant",
    to: "/importTenant",
    title: "Import Existing Info",
    iconClass: (
      <Box sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}>
        <ImportExport />
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
      <Box sx={{ color: theme.palette.mode === "dark" ? "success" : "success" }}>
        <Logout color="success" />
      </Box>
    ),
  },
];

export default function InvestorAftercareHeadLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);

  return (
    <RootLayout
      department="Aftercare & Supervision"
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={invsetorAftercareMenuItems(theme)}
    />
  );
}
