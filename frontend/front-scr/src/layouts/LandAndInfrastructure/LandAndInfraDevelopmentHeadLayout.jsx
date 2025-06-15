import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import {
	EditLocation,
	Home,
	ImportExport,
	Summarize,
	Logout,
	Map,
	Print,
	Report,
	SettingsAccessibility,
	AddBusiness,
	Route,
} from "@mui/icons-material";
import { Box } from "@mui/material";
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
const gisMenuItems = [
	{ key: "home", to: "/", title: "Home", iconClass: getThemedIcon({ icon: <Home /> }) },
	{
		key: "GROUP", iconClass: (
		  <Box sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'inherit' }}>
			<AddBusiness />
		  </Box>
		), title: "Map",
		detail: [
			{ key: "viewMap", to: "/viewMap", title: "View Map", iconClass: <Map /> },
			{ key: "viewMapByCategory", to: "/viewMapByCategory", title: "View Map by Category", iconClass: <Map /> },
			{ key: "viewInfrastructureMap", to: "/infrastructureMap", title: "View Infrastructure", iconClass: <Route /> },
			{ key: "viewPlanningMap", to: "/viewPlanningMap", title: "View Plans", iconClass: <EditLocation /> },
			{ key: "printMap", to: "/printMap", title: "Print Map", iconClass: <Print /> },
			{ key: "exportMap", to: "/exportMap", title: "Export Features", iconClass: <ImportExport /> },
		]
	  },
	
	{ key: "listOPermit", to: "/listOPermit", title: "Occupancy Permit", iconClass: <Summarize /> },
	{ key: "listBPermit", to: "/listBPermit", title: "Building Permit", iconClass: <Summarize /> },
	{ key: "landInfraReports", to: "/landInfraReports", title: "Reports", iconClass: <Report /> },
	{ key: "myPreference", to: "/myPreference", title: "Preferences", iconClass: <SettingsAccessibility /> },
	{ key: "logout", to: "/logout", title: "Logout", iconClass: <Logout /> },
];

export default function LandAndInfraDevelopmentHeadLayout() {
	const [open, setOpen] = useState(true);
	const [showProfile, setShowProfile] = useState(true);
	return (
		<RootLayout
			department="L & I Devt. "
			open={open}
			setOpen={setOpen}
			showProfile={showProfile}
			setShowProfile={setShowProfile}
			menuList={gisMenuItems}
		/>
	);
}
