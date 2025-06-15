import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import { Home, List, Logout, Map, Print, Report, Handshake, SettingsAccessibility } from "@mui/icons-material";
import "../no-print.css";
import RootLayout from "../RootLayout";
const theme = createTheme({
	components: {
		MuiIcon: {
			styleOverrides: {
				root: {
					// Match 24px = 3 * 2 + 1.125 * 16
					color: "white",
					boxSizing: "content-box",
					padding: 3,
					fontSize: "1.125rem",
				},
			},
		},
	},
});
const getThemedIcon = ({ icon }) => {
	return <ThemeProvider theme={theme}>{icon}</ThemeProvider>;
};
const parkStaffMenuItems = [
	{ key: "home", to: "/", title: "Home", iconClass: getThemedIcon({ icon: <Home /> }) },
	{ key: "registerHandover", to: "/registerHandover", title: "Register Handover", iconClass: <Handshake /> },
	{ key: "viewMap", to: "/viewMap", title: "View Map", iconClass: <Map /> },
	{ key: "viewMapByCategory", to: "/viewMapByCategory", title: "View Map by Category", iconClass: <Map /> },
	{ key: "printMap", to: "/printMap", title: "Print Map", iconClass: <Print /> },
	{ key: "listParcel", to: "/listParcel", title: "Parcel List", iconClass: <List /> },
	{ key: "investorList", to: "/investorList", title: "Investor List", iconClass: <List /> },
	{ key: "parkReport", to: "/PASummaryReport", title: "Reports", iconClass: <Report /> },
	{ key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
	{ key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function ParkAdminLayout() {
	const [open, setOpen] = useState(true);
	const [showProfile, setShowProfile] = useState(true);
	return (
		<RootLayout
			department="Park Admin"
			open={open}
			setOpen={setOpen}
			showProfile={showProfile}
			setShowProfile={setShowProfile}
			menuList={parkStaffMenuItems}
		/>
	);
}
