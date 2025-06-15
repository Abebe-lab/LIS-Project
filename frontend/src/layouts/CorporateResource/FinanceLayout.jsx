import { useState } from "react";

import {
  Home,
  Logout,
  Money,
  Payment,
  RequestQuote,
  PendingActions,
  Summarize,
  Gavel,
  Calculate,
  SettingsAccessibility,
  ReportSharp,
} from "@mui/icons-material";

import RootLayout from "../RootLayout";

const financeMenuItems = [
  { key: "home", to: "/", title: "Home", iconClass: <Home /> },
  {
    key: "collectPayment",
    to: "/collectPayment",
    title: "Collect Payment",
    iconClass: <Payment />,
  },
  {
    key: "GROUP",
    iconClass: <ReportSharp />,
    title: "Reports",
    detail: [
      {
        key: "financeSummary",
        to: "/financeSummary",
        title: "Land & Shed Revenue",
        iconClass: <RequestQuote />,
      },
      {
        key: "arrear",
        to: "/arrear",
        title: "Arrear",
        iconClass: <Calculate />,
      },
      {
        key: "uncollected",
        to: "/uncollected",
        title: "Uncollected",
        iconClass: <Money />,
      },
      {
        key: "paymentsDue",
        to: "/paymentsDue",
        title: "Payments Due",
        iconClass: <PendingActions />,
      },
      {
        key: "financialReports",
        to: "/financialReports",
        title: "Financial Reports",
        iconClass: <Summarize />,
      },
    ],
  },

  {
    key: "financeRule",
    to: "/financeRule",
    title: "Finance Rules",
    iconClass: <Gavel />,
  },
  {
    key: "importExistingCollection",
    to: "/importExistingCollection",
    title: "Import Existing Collection",
    iconClass: <Gavel />,
  },
  {
    key: "myPreference",
    to: "/myPreference",
    title: "Preferences",
    iconClass: <SettingsAccessibility />,
  },
  { key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function FinanceLayout() {
  const [open, setOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  return (
    <RootLayout
      department="Finance"
      open={open}
      setOpen={setOpen}
      showProfile={showProfile}
      setShowProfile={setShowProfile}
      menuList={financeMenuItems}
    />
  );
}
